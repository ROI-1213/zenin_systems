export interface EnquiryNotificationPayload {
  referenceCode: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  enquiryType: string;
  interestedTopic?: string | null;
  projectLocation?: string | null;
  message: string;
  sourcePage: string;
}

export async function sendEnquiryNotificationEmail(
  payload: EnquiryNotificationPayload
): Promise<{ sent: boolean; provider: string; error?: string }> {
  const provider = process.env.EMAIL_PROVIDER || "console";
  const adminRecipient = process.env.ADMIN_NOTIFICATION_EMAIL || "contact@zeninsystems.com";
  const fromAddress = process.env.EMAIL_FROM || "notifications@zeninsystems.com";

  try {
    if (provider === "resend" && process.env.RESEND_API_KEY) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [adminRecipient],
          reply_to: payload.email,
          subject: `[Zenin Systems Lead ${payload.referenceCode}] ${payload.enquiryType} — ${payload.companyName}`,
          html: `
            <h2>New Business Enquiry — ${payload.referenceCode}</h2>
            <p><strong>Name:</strong> ${payload.fullName}</p>
            <p><strong>Company:</strong> ${payload.companyName}</p>
            <p><strong>Email:</strong> ${payload.email}</p>
            <p><strong>Phone:</strong> ${payload.phone}</p>
            <p><strong>Enquiry Type:</strong> ${payload.enquiryType}</p>
            <p><strong>Interested Solution / Service:</strong> ${payload.interestedTopic || "General Enquiry"}</p>
            <p><strong>Location:</strong> ${payload.projectLocation || "Not specified"}</p>
            <p><strong>Source Page:</strong> ${payload.sourcePage}</p>
            <hr />
            <p><strong>Message:</strong></p>
            <p>${payload.message}</p>
          `,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        return { sent: false, provider: "resend", error: text };
      }

      return { sent: true, provider: "resend" };
    }

    // Default / Development safe console log boundary
    if (process.env.NODE_ENV !== "test") {
      console.info(
        `[EmailNotification:${provider}] Enquiry ${payload.referenceCode} from ${payload.fullName} (${payload.companyName}) queued for ${adminRecipient}`
      );
    }

    return { sent: true, provider: "console" };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown email error";
    console.warn("[EmailNotification Warning] Failed to dispatch notification email:", message);
    return { sent: false, provider, error: message };
  }
}
