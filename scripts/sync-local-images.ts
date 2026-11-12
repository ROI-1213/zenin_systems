import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SEED_DATA_PATH = path.join(ROOT, "src", "lib", "db", "seed-data.ts");
const ARTIFACT_DIR = "C:\\Users\\LENOVO\\.gemini\\antigravity\\brain\\292dcb80-4127-4692-8581-47fb5161a518";

// 1. Update seed-data.ts so zero Unsplash URLs remain
function updateSeedDataFile() {
  let content = fs.readFileSync(SEED_DATA_PATH, "utf8");

  // Replace AI_SOLUTIONS_SEED featuredImage per slug
  const aiSlugs = [
    "ppe-detection",
    "fire-smoke-detection",
    "danger-zone-monitoring",
    "work-at-height-monitoring",
    "sop-compliance-monitoring",
    "intrusion-detection",
    "perimeter-monitoring",
    "people-vehicle-counting",
    "vehicle-speed-detection",
    "anpr",
    "process-quality-monitoring",
    "visual-quality-inspection",
    "conveyor-belt-monitoring",
    "industrial-process-monitoring",
    "steel-sheet-defect-monitoring",
    "hdri-wheel-inspection",
    "thermal-monitoring",
    "electrical-panel-monitoring",
    "chimney-smoke-monitoring",
    "custom-ai-video-analytics",
    "industrial-ai-vision-applications",
  ];

  for (const slug of aiSlugs) {
    const slugIndex = content.indexOf(`slug: "${slug}"`);
    if (slugIndex !== -1) {
      const nextFeatured = content.indexOf("featuredImage:", slugIndex);
      if (nextFeatured !== -1 && nextFeatured - slugIndex < 3500) {
        const block = content.slice(nextFeatured, nextFeatured + 220);
        const replaced = block.replace(
          /featuredImage:\s*\n?\s*"https:\/\/images\.unsplash\.com\/[^"]+"/,
          `featuredImage: "/images/ai/${slug}.png"`
        );
        content =
          content.slice(0, nextFeatured) +
          replaced +
          content.slice(nextFeatured + 220);
      }
    }
  }

  // Replace INITIAL_SERVICES coverImage per slug
  const serviceSlugs = [
    "fire-detection-alarm-systems",
    "integrated-building-management",
    "lighting-management",
    "energy-management",
    "ivr-solutions",
    "public-address-systems",
    "audio-visual-video-conferencing",
    "hvac-solutions",
    "intelligent-fencing",
    "access-control-systems",
    "iot-solutions",
    "parking-management",
  ];

  const servicesStart = content.indexOf("export const INITIAL_SERVICES");
  if (servicesStart !== -1) {
    let servicesSection = content.slice(servicesStart);
    for (const slug of serviceSlugs) {
      const slugIdx = servicesSection.indexOf(`slug: "${slug}"`);
      if (slugIdx !== -1) {
        const nextCover = servicesSection.indexOf("coverImage:", slugIdx);
        if (nextCover !== -1 && nextCover - slugIdx < 1200) {
          const block = servicesSection.slice(nextCover, nextCover + 220);
          const replaced = block.replace(
            /coverImage:\s*\n?\s*"https:\/\/images\.unsplash\.com\/[^"]+"/,
            `coverImage: "/images/services/${slug}.png"`
          );
          servicesSection =
            servicesSection.slice(0, nextCover) +
            replaced +
            servicesSection.slice(nextCover + 220);
        }
      }
    }
    content = content.slice(0, servicesStart) + servicesSection;
  }

  // Replace INITIAL_INDUSTRIES coverImage per slug
  const industrySlugs = [
    "manufacturing",
    "industrial-plants",
    "warehousing-logistics",
    "commercial-buildings",
    "infrastructure",
    "energy-utilities",
  ];

  const industriesStart = content.indexOf("export const INITIAL_INDUSTRIES");
  if (industriesStart !== -1) {
    let industriesSection = content.slice(industriesStart);
    for (const slug of industrySlugs) {
      const slugIdx = industriesSection.indexOf(`slug: "${slug}"`);
      if (slugIdx !== -1) {
        const nextCover = industriesSection.indexOf("coverImage:", slugIdx);
        if (nextCover !== -1 && nextCover - slugIdx < 900) {
          const block = industriesSection.slice(nextCover, nextCover + 220);
          const replaced = block.replace(
            /coverImage:\s*\n?\s*"https:\/\/images\.unsplash\.com\/[^"]+"/,
            `coverImage: "/images/industries/${slug}.png"`
          );
          industriesSection =
            industriesSection.slice(0, nextCover) +
            replaced +
            industriesSection.slice(nextCover + 220);
        }
      }
    }
    content = content.slice(0, industriesStart) + industriesSection;
  }

  // Replace INITIAL_PAGE_CONTENTS heroImage and about_preview image
  content = content.replace(
    /heroImage:\s*\n?\s*"https:\/\/images\.unsplash\.com\/[^"]+"/,
    `heroImage: "/images/hero/hero-command-center.png"`
  );
  content = content.replace(
    /image:\s*\n?\s*"https:\/\/images\.unsplash\.com\/[^"]+"/,
    `image: "/images/hero/about-engineering.png"`
  );

  fs.writeFileSync(SEED_DATA_PATH, content, "utf8");
  console.log("✅ Updated seed-data.ts with local image paths.");
}

// 2. Copy generated images from ARTIFACT_DIR to public/images/...
function copyGeneratedImages() {
  const dirs = ["hero", "pillars", "categories", "products", "ai", "services", "industries"];
  for (const d of dirs) {
    fs.mkdirSync(path.join(ROOT, "public", "images", d), { recursive: true });
  }

  const files = fs.existsSync(ARTIFACT_DIR)
    ? fs.readdirSync(ARTIFACT_DIR).filter((f) => f.endsWith(".jpg") || f.endsWith(".png"))
    : [];

  const findLatestFile = (prefix: string): string | null => {
    const normalizedPrefix = prefix.replace(/-/g, "_");
    const matches = files
      .filter((f) => f.startsWith(normalizedPrefix))
      .sort();
    if (matches.length === 0) return null;
    return path.join(ARTIFACT_DIR, matches[matches.length - 1]);
  };

  const mappings: Array<{ prefix: string; dest: string }> = [
    // Hero & About
    { prefix: "hero_command_center", dest: "public/images/hero/hero-command-center.png" },
    { prefix: "about_engineering", dest: "public/images/hero/about-engineering.png" },
    // 4 Core Pillars
    { prefix: "cctv_surveillance", dest: "public/images/pillars/cctv-surveillance.png" },
    { prefix: "ai_video_analytics", dest: "public/images/pillars/ai-video-analytics.png" },
    { prefix: "video_management", dest: "public/images/pillars/video-management.png" },
    { prefix: "intelligent_automation", dest: "public/images/pillars/intelligent-automation.png" },
    // Categories & Products
    { prefix: "ev_charging_solutions", dest: "public/images/categories/ev-charging-solutions.png" },
    { prefix: "fire_hydrants_and_accessories", dest: "public/images/categories/fire-hydrants-and-accessories.png" },
    { prefix: "fire_extinguishers_and_accessories", dest: "public/images/categories/fire-extinguishers-and-accessories.png" },
    { prefix: "hydraulics_and_pneumatics", dest: "public/images/categories/hydraulics-and-pneumatics.png" },
    { prefix: "it_electronics_and_hardware", dest: "public/images/categories/it-electronics-and-hardware.png" },
    { prefix: "electrical_and_hardware_materials", dest: "public/images/categories/electrical-and-hardware-materials.png" },
    { prefix: "industrial_cables_and_accessories", dest: "public/images/categories/industrial-cables-and-accessories.png" },
    { prefix: "industrial_project_fabrication_and_assembly", dest: "public/images/categories/industrial-project-fabrication-and-assembly.png" },
    { prefix: "indirect_industrial_materials_and_services", dest: "public/images/categories/indirect-industrial-materials-and-services.png" },
    { prefix: "long_range_ptz", dest: "public/images/products/long-range-ptz.png" },
    // 21 AI Solutions
    { prefix: "ppe_detection", dest: "public/images/ai/ppe-detection.png" },
    { prefix: "fire_smoke_detection", dest: "public/images/ai/fire-smoke-detection.png" },
    { prefix: "danger_zone_monitoring", dest: "public/images/ai/danger-zone-monitoring.png" },
    { prefix: "work_at_height_monitoring", dest: "public/images/ai/work-at-height-monitoring.png" },
    { prefix: "sop_compliance_monitoring", dest: "public/images/ai/sop-compliance-monitoring.png" },
    { prefix: "intrusion_detection", dest: "public/images/ai/intrusion-detection.png" },
    { prefix: "perimeter_monitoring", dest: "public/images/ai/perimeter-monitoring.png" },
    { prefix: "people_vehicle_counting", dest: "public/images/ai/people-vehicle-counting.png" },
    { prefix: "vehicle_speed_detection", dest: "public/images/ai/vehicle-speed-detection.png" },
    { prefix: "anpr_detection", dest: "public/images/ai/anpr.png" },
    { prefix: "process_quality_monitoring", dest: "public/images/ai/process-quality-monitoring.png" },
    { prefix: "visual_quality_inspection", dest: "public/images/ai/visual-quality-inspection.png" },
    { prefix: "conveyor_belt_monitoring", dest: "public/images/ai/conveyor-belt-monitoring.png" },
    { prefix: "industrial_process_monitoring", dest: "public/images/ai/industrial-process-monitoring.png" },
    { prefix: "steel_sheet_defect_monitoring", dest: "public/images/ai/steel-sheet-defect-monitoring.png" },
    { prefix: "hdri_wheel_inspection", dest: "public/images/ai/hdri-wheel-inspection.png" },
    { prefix: "thermal_monitoring", dest: "public/images/ai/thermal-monitoring.png" },
    { prefix: "electrical_panel_monitoring", dest: "public/images/ai/electrical-panel-monitoring.png" },
    { prefix: "chimney_smoke_monitoring", dest: "public/images/ai/chimney-smoke-monitoring.png" },
    { prefix: "custom_ai_video_analytics", dest: "public/images/ai/custom-ai-video-analytics.png" },
    { prefix: "industrial_ai_vision_applications", dest: "public/images/ai/industrial-ai-vision-applications.png" },
    // 12 Services
    { prefix: "fire_detection_alarm_systems", dest: "public/images/services/fire-detection-alarm-systems.png" },
    { prefix: "integrated_building_management", dest: "public/images/services/integrated-building-management.png" },
    { prefix: "lighting_management", dest: "public/images/services/lighting-management.png" },
    { prefix: "energy_management", dest: "public/images/services/energy-management.png" },
    { prefix: "ivr_solutions", dest: "public/images/services/ivr-solutions.png" },
    { prefix: "public_address_systems", dest: "public/images/services/public-address-systems.png" },
    { prefix: "audio_visual_video_conferencing", dest: "public/images/services/audio-visual-video-conferencing.png" },
    { prefix: "hvac_solutions", dest: "public/images/services/hvac-solutions.png" },
    { prefix: "intelligent_fencing", dest: "public/images/services/intelligent-fencing.png" },
    { prefix: "access_control_systems", dest: "public/images/services/access-control-systems.png" },
    { prefix: "iot_solutions", dest: "public/images/services/iot-solutions.png" },
    { prefix: "parking_management", dest: "public/images/services/parking-management.png" },
    // 6 Industries
    { prefix: "manufacturing", dest: "public/images/industries/manufacturing.png" },
    { prefix: "industrial_plants", dest: "public/images/industries/industrial-plants.png" },
    { prefix: "warehousing_logistics", dest: "public/images/industries/warehousing-logistics.png" },
    { prefix: "commercial_buildings", dest: "public/images/industries/commercial-buildings.png" },
    { prefix: "infrastructure", dest: "public/images/industries/infrastructure.png" },
    { prefix: "energy_utilities", dest: "public/images/industries/energy-utilities.png" },
  ];

  let copiedCount = 0;
  const missing: string[] = [];

  for (const m of mappings) {
    const srcFile = findLatestFile(m.prefix);
    const destPath = path.join(ROOT, m.dest);
    if (srcFile) {
      fs.copyFileSync(srcFile, destPath);
      copiedCount++;
    } else {
      missing.push(m.dest);
    }
  }

  console.log(`✅ Copied ${copiedCount}/${mappings.length} generated AI images.`);
  if (missing.length > 0) {
    console.log("⏳ Waiting for remaining images:", missing);
  }
}

updateSeedDataFile();
copyGeneratedImages();
