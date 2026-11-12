import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";

const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME || "zenin_admin_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 12; // 12 hours

function getSecretKey(): Uint8Array {
  const secret =
    process.env.AUTH_SECRET || "zenin-fallback-dev-secret-change-in-production-2026";
  return new TextEncoder().encode(secret);
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: "SUPER_ADMIN" | "EDITOR";
}

// Simple in-memory rate limiter for login and public form submissions
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  key: string,
  maxAttempts = 8,
  windowMs = 60_000
): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxAttempts - 1, retryAfterSeconds: 0 };
  }

  if (entry.count >= maxAttempts) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: maxAttempts - entry.count,
    retryAfterSeconds: 0,
  };
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function createAdminSession(
  user: SessionUser,
  ipAddress?: string,
  userAgent?: string
): Promise<string> {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await prisma.session.create({
    data: {
      tokenHash,
      userId: user.id,
      expiresAt,
      ipAddress: ipAddress || null,
      userAgent: userAgent || null,
    },
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  const signedJwt = await new SignJWT({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    sid: tokenHash,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(getSecretKey());

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, signedJwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return signedJwt;
}

export async function getAdminSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, getSecretKey());
    const tokenHash = payload.sid as string | undefined;
    const userId = payload.sub as string | undefined;

    if (!tokenHash || !userId) return null;

    const dbSession = await prisma.session.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!dbSession || dbSession.expiresAt < new Date() || !dbSession.user.isActive) {
      return null;
    }

    return {
      id: dbSession.user.id,
      email: dbSession.user.email,
      name: dbSession.user.name,
      role: (dbSession.user.role as "SUPER_ADMIN" | "EDITOR") || "EDITOR",
    };
  } catch {
    return null;
  }
}

export async function destroyAdminSession(): Promise<void> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (token) {
      const { payload } = await jwtVerify(token, getSecretKey()).catch(() => ({
        payload: null,
      }));
      const tokenHash = payload?.sid as string | undefined;
      if (tokenHash) {
        await prisma.session.deleteMany({ where: { tokenHash } });
      }
    }
    cookieStore.delete(SESSION_COOKIE_NAME);
  } catch {
    // Ignore cleanup errors on logout
  }
}

export async function requireAdmin(): Promise<SessionUser> {
  const user = await getAdminSession();
  if (!user) {
    redirect("/admin/login");
  }
  return user;
}

export async function requireSuperAdmin(): Promise<SessionUser> {
  const user = await requireAdmin();
  if (user.role !== "SUPER_ADMIN") {
    throw new Error("FORBIDDEN: Super Administrator privileges required for this operation.");
  }
  return user;
}

export async function logAuditEvent(params: {
  user: SessionUser | null;
  action: string;
  entityType: string;
  entityId?: string;
  details?: string;
  ipAddress?: string;
}) {
  try {
    await prisma.auditLog.create({
      data: {
        userId: params.user?.id ?? null,
        userEmail: params.user?.email ?? "system",
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId ?? null,
        details: params.details ?? null,
        ipAddress: params.ipAddress ?? null,
      },
    });
  } catch (err) {
    console.error("[AuditLog Error]", err);
  }
}
