export interface SeedProductCategory {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  coverImage: string;
  isCoreSolution: boolean;
  dedicatedRoute?: string;
  isFeatured: boolean;
  sortOrder: number;
}

export const CORE_SOLUTION_CATEGORIES: SeedProductCategory[] = [
  {
    name: "Industrial CCTV & Video Surveillance",
    slug: "cctv-surveillance",
    shortDescription:
      "Enterprise-grade industrial surveillance architectures, ruggedized camera systems, and network video infrastructure engineered for demanding environments.",
    description:
      "Zenin Systems designs and integrates end-to-end industrial CCTV and video surveillance systems tailored for manufacturing plants, hazardous zones, logistics hubs, and critical infrastructure. Our surveillance architectures prioritize continuous operational visibility, environmental resilience, and seamless network video management.",
    icon: "Camera",
    coverImage: "/images/pillars/cctv-surveillance.png",
    isCoreSolution: true,
    dedicatedRoute: "/products/cctv-surveillance",
    isFeatured: true,
    sortOrder: 1,
  },
  {
    name: "AI Video Analytics & AI Vision Solutions",
    slug: "ai-video-analytics",
    shortDescription:
      "Intelligent computer vision applications for industrial safety compliance, perimeter security, process quality inspection, and thermal anomaly detection.",
    description:
      "Transform passive camera feeds into proactive operational intelligence. Our AI Video Analytics suite covers 21 specialized industrial vision applications across five operational domains: Safety & Compliance, Security & Perimeter Surveillance, Process & Surface Quality Inspection, Thermal & Environmental Monitoring, and Custom AI Vision Engineering.",
    icon: "BrainCircuit",
    coverImage: "/images/pillars/ai-video-analytics.png",
    isCoreSolution: true,
    dedicatedRoute: "/products/ai-video-analytics",
    isFeatured: true,
    sortOrder: 2,
  },
  {
    name: "Video Management Solutions",
    slug: "video-management",
    shortDescription:
      "Centralized video management platforms, command room visualization, redundant recording infrastructure, and multi-site surveillance orchestration.",
    description:
      "Unified Video Management Systems (VMS) designed to consolidate multi-site camera streams, AI analytics alerts, access control events, and perimeter sensors into a single command interface. Built for high availability, scalable storage retention, and rapid incident investigation.",
    icon: "MonitorPlay",
    coverImage: "/images/pillars/video-management.png",
    isCoreSolution: true,
    dedicatedRoute: "/products/video-management",
    isFeatured: true,
    sortOrder: 3,
  },
  {
    name: "Intelligent Automation Solutions",
    slug: "intelligent-automation",
    shortDescription:
      "AI-enabled industrial automation, automated gate and weighbridge workflows, PLC/SCADA event triggers, and smart facility orchestration.",
    description:
      "Bridge visual intelligence and physical plant execution. Our Intelligent Automation Solutions connect AI vision events, industrial sensors, and facility control systems to automate safety interlocks, logistics gate workflows, conveyor sorting, and building management responses.",
    icon: "Cpu",
    coverImage: "/images/pillars/intelligent-automation.png",
    isCoreSolution: true,
    dedicatedRoute: "/products/intelligent-automation",
    isFeatured: true,
    sortOrder: 4,
  },
];

export const WIDER_PORTFOLIO_CATEGORIES: SeedProductCategory[] = [
  {
    name: "Industrial CCTV and Surveillance",
    slug: "industrial-cctv-and-surveillance",
    shortDescription:
      "Fixed, PTZ, weatherproof, explosion-protected, and specialized industrial imaging hardware and mounting accessories.",
    description:
      "Comprehensive range of industrial surveillance hardware including IP cameras, network video recorders, fiber media converters, industrial PoE switches, and ruggedized enclosures for indoor and outdoor plant deployments.",
    icon: "Video",
    coverImage: "/images/pillars/cctv-surveillance.png",
    isCoreSolution: false,
     dedicatedRoute: "/products/cctv-surveillance",
    isFeatured: true,
    sortOrder: 10,
  },
  {
    name: "Video Analytics with Artificial Intelligence",
    slug: "video-analytics-with-ai",
    shortDescription:
      "Edge AI appliances, GPU inference servers, and modular computer vision software licenses for industrial camera networks.",
    description:
      "Turnkey AI inference infrastructure and analytics software modules designed to integrate with new or existing IP camera deployments for automated safety, security, and quality monitoring.",
    icon: "Sparkles",
    coverImage: "/images/pillars/ai-video-analytics.png",
    isCoreSolution: false,
    dedicatedRoute: "/products/ai-video-analytics",
    isFeatured: true,
    sortOrder: 11,
  },
  {
    name: "EV Charging Solutions",
    slug: "ev-charging-solutions",
    shortDescription:
      "Commercial and industrial electric vehicle supply equipment (EVSE), AC/DC charging stations, and load management systems.",
    description:
      "Enterprise EV charging infrastructure for corporate campuses, logistics fleets, commercial buildings, and industrial facilities, supporting smart energy metering and access-controlled charging.",
    icon: "Zap",
    coverImage: "/images/categories/ev-charging-solutions.png",
    isCoreSolution: false,
    isFeatured: true,
    sortOrder: 12,
  },
  {
    name: "Video Conferencing and Audio Video Solutions",
    slug: "video-conferencing-and-av-solutions",
    shortDescription:
      "Boardroom AV integration, interactive displays, digital signage, control room video walls, and unified communication hardware.",
    description:
      "Professional audio-visual and unified collaboration systems engineered for executive boardrooms, training auditoriums, operations centers, and multi-location enterprise communications.",
    icon: "Presentation",
    coverImage: "/images/services/audio-visual-video-conferencing.png",
    isCoreSolution: false,
    isFeatured: false,
    sortOrder: 13,
  },
  {
    name: "PA Systems",
    slug: "pa-systems",
    shortDescription:
      "Industrial public address, IP paging consoles, zone amplifiers, weatherproof horn speakers, and emergency voice evacuation units.",
    description:
      "High-intelligibility public address and emergency mass notification hardware designed for noisy manufacturing floors, warehouses, utilities, and commercial complexes.",
    icon: "Volume2",
    coverImage: "/images/services/public-address-systems.png",
    isCoreSolution: false,
    isFeatured: false,
    sortOrder: 14,
  },
  {
    name: "FAS Systems",
    slug: "fas-systems",
    shortDescription:
      "Addressable and conventional Fire Alarm Systems (FAS), smoke/heat detectors, manual call points, and control panels.",
    description:
      "Industrial fire detection and alarm hardware engineered for early hazard identification, zone monitoring, and automated building safety interlocks.",
    icon: "Flame",
    coverImage: "/images/services/fire-detection-alarm-systems.png",
    isCoreSolution: false,
    isFeatured: true,
    sortOrder: 15,
  },
  {
    name: "Fire Hydrants and Accessories",
    slug: "fire-hydrants-and-accessories",
    shortDescription:
      "Industrial hydrant valves, hose reels, landing valves, branch pipes, couplings, and pressurized fire water distribution hardware.",
    description:
      "Complete mechanical and hydraulic components for industrial fire hydrant installations, plant perimeter protection, and active fire suppression networks.",
    icon: "ShieldAlert",
    coverImage: "/images/categories/fire-hydrants-and-accessories.png",
    isCoreSolution: false,
    isFeatured: false,
    sortOrder: 16,
  },
  {
    name: "Fire Extinguishers and Accessories",
    slug: "fire-extinguishers-and-accessories",
    shortDescription:
      "Portable and trolley-mounted ABC powder, CO2, clean agent, and foam fire extinguishers with mounting brackets and signage.",
    description:
      "First-response fire protection equipment and accessories configured for electrical rooms, server facilities, chemical storage, and manufacturing zones.",
    icon: "FlameKindling",
    coverImage: "/images/categories/fire-extinguishers-and-accessories.png",
    isCoreSolution: false,
    isFeatured: false,
    sortOrder: 17,
  },
  {
    name: "Access Control Systems",
    slug: "access-control-systems",
    shortDescription:
      "Biometric terminals, RFID card readers, turnstiles, electromagnetic locks, boom barriers, and visitor management hardware.",
    description:
      "Physical security and identity access control equipment for industrial gates, restricted R&D zones, data centers, and workforce attendance tracking.",
    icon: "KeyRound",
    coverImage: "/images/services/access-control-systems.png",
    isCoreSolution: false,
    isFeatured: true,
    sortOrder: 18,
  },
  {
    name: "Hydraulics and Pneumatics and Accessories",
    slug: "hydraulics-and-pneumatics",
    shortDescription:
      "Industrial hydraulic valves, pneumatic cylinders, actuators, FRL units, pressure gauges, hoses, and precision fittings.",
    description:
      "Fluid power and pneumatic motion components supporting industrial machinery, automated assembly lines, material handling systems, and plant maintenance.",
    icon: "Gauge",
    coverImage: "/images/categories/hydraulics-and-pneumatics.png",
    isCoreSolution: false,
    isFeatured: false,
    sortOrder: 19,
  },
  {
    name: "IT Electronics and Hardware",
    slug: "it-electronics-and-hardware",
    shortDescription:
      "Enterprise network switches, industrial firewalls, rack servers, NAS/SAN storage, structured cabling, and workstation hardware.",
    description:
      "Core IT and OT networking infrastructure, edge compute hardware, server racks, and ruggedized electronics supporting plant digitalization and enterprise connectivity.",
    icon: "Server",
    coverImage: "/images/categories/it-electronics-and-hardware.png",
    isCoreSolution: false,
    isFeatured: true,
    sortOrder: 20,
  },
  {
    name: "Electrical and Hardware Materials",
    slug: "electrical-and-hardware-materials",
    shortDescription:
      "Switchgear components, circuit breakers, contactors, industrial enclosures, terminal blocks, and plant electrical hardware.",
    description:
      "Industrial-grade electrical distribution and panel hardware for automation cabinets, power control centers, lighting distribution, and facility engineering.",
    icon: "Cpu",
    coverImage: "/images/categories/electrical-and-hardware-materials.png",
    isCoreSolution: false,
    isFeatured: false,
    sortOrder: 21,
  },
  {
    name: "Industrial Cables and Accessories",
    slug: "industrial-cables-and-accessories",
    shortDescription:
      "Armored power cables, instrumentation cables, fiber optic trunks, CAT6A industrial ethernet, cable glands, and cable trays.",
    description:
      "Signal, data, and power transmission cables with heavy-duty routing and termination accessories engineered for high-interference and harsh industrial environments.",
    icon: "Cable",
    coverImage: "/images/categories/industrial-cables-and-accessories.png",
    isCoreSolution: false,
    isFeatured: false,
    sortOrder: 22,
  },
  {
    name: "Industrial Project Fabrication and Assembly",
    slug: "industrial-project-fabrication-and-assembly",
    shortDescription:
      "Custom control panel fabrication, camera poles, gantry mounts, operator consoles, and turnkey electro-mechanical assemblies.",
    description:
      "Bespoke structural and electro-mechanical fabrication services supporting industrial surveillance towers, outdoor equipment skids, and control room builds.",
    icon: "Wrench",
    coverImage: "/images/categories/industrial-project-fabrication-and-assembly.png",
    isCoreSolution: false,
    isFeatured: false,
    sortOrder: 23,
  },
  {
    name: "Indirect Industrial Materials and Services",
    slug: "indirect-industrial-materials-and-services",
    shortDescription:
      "MRO consumables, industrial safety gear, testing instruments, labeling systems, and specialized technical procurement support.",
    description:
      "Consolidated B2B supply of indirect plant consumables, maintenance tools, and site support materials to streamline industrial procurement operations.",
    icon: "PackageCheck",
    coverImage: "/images/categories/indirect-industrial-materials-and-services.png",
    isCoreSolution: false,
    isFeatured: false,
    sortOrder: 24,
  },
];

export const INITIAL_PRODUCTS = [
  {
    name: "Industrial Weatherproof IP Bullet & Dome Surveillance Series",
    slug: "industrial-weatherproof-ip-surveillance-series",
    categorySlug: "cctv-surveillance",
    shortDescription:
      "Ruggedized IP imaging units designed for continuous outdoor and indoor plant monitoring across variable lighting and environmental conditions.",
    description:
      "Engineered for industrial perimeters, production bays, and logistics yards, this surveillance series provides reliable high-definition video streams for both human operators and downstream AI video analytics engines. Specific camera models and optical configurations are selected based on site survey requirements. [Note: Exact model datasheets pending administrator verification]",
    features: [
      "Ruggedized industrial housing for dust, moisture, and vibration resistance",
      "Wide dynamic range imaging for high-contrast plant entrances and loading bays",
      "IR / low-light illumination for 24/7 perimeter and yard visibility",
      "Standards-based IP streaming for VMS and AI analytics integration",
    ],
    applications: [
      "Manufacturing floor and assembly line monitoring",
      "Perimeter fence and gatehouse surveillance",
      "Warehouse loading dock and dispatch verification",
      "Utility substation and tank farm observation",
    ],
    technicalSpecifications: [
      { label: "Configuration Status", value: "Site-engineered / Pending OEM datasheet selection" },
      { label: "Deployment Environment", value: "Indoor & Outdoor Industrial Zones" },
      { label: "Network Interface", value: "Industrial Ethernet / PoE configurable" },
      { label: "Integration Support", value: "Compatible with enterprise VMS & AI Vision Appliances" },
    ],
    integrationCapabilities: [
      "Enterprise Video Management Systems (VMS)",
      "AI Video Analytics Inference Appliances",
      "Access Control & Alarm I/O Relays",
    ],
    featuredImage: "/images/pillars/cctv-surveillance.png",
    isFeatured: true,
    requiresReview: true,
    sortOrder: 1,
  },
  {
    name: "Long-Range Industrial PTZ & Perimeter Monitoring Camera System",
    slug: "long-range-industrial-ptz-surveillance",
    categorySlug: "cctv-surveillance",
    shortDescription:
      "Pan-Tilt-Zoom optical and thermal-ready camera assemblies for large industrial yards, ports, solar parks, and boundary corridors.",
    description:
      "Designed for wide-area coverage where fixed cameras are insufficient, our industrial PTZ surveillance solutions enable security operators to track movement across expansive yards and perimeters. [Note: Optical zoom ratios and thermal options configured per project specification]",
    features: [
      "360-degree continuous pan and programmable patrol presets",
      "High-zoom optical assembly for distant asset and boundary inspection",
      "Event-driven auto-tracking handoff from fixed perimeter cameras",
      "Heavy-duty pole and tower mounting assemblies",
    ],
    applications: [
      "Large industrial estates and logistics parks",
      "Power generation and utility perimeters",
      "Material stockpiles and open storage yards",
    ],
    technicalSpecifications: [
      { label: "Configuration Status", value: "Project-specific / Pending admin specification review" },
      { label: "Control Interface", value: "IP network PTZ telemetry & VMS joystick support" },
      { label: "Mounting Options", value: "Pole, corner, parapet, and custom gantry mounts" },
    ],
    integrationCapabilities: [
      "Perimeter Intrusion Detection Systems",
      "Central Command Room VMS Walls",
      "AI Intrusion & Perimeter Analytics",
    ],
    featuredImage: "/images/products/long-range-ptz.png",
    isFeatured: true,
    requiresReview: true,
    sortOrder: 2,
  },
  {
    name: "Edge AI Vision Inference Appliance & Analytics Server",
    slug: "edge-ai-vision-inference-appliance",
    categorySlug: "ai-video-analytics",
    shortDescription:
      "On-premise GPU-accelerated video analytics appliance designed to process multiple existing IP camera streams in real time.",
    description:
      "Deploy computer vision capabilities without replacing your existing camera network. The Edge AI Vision Inference Appliance connects to standard IP cameras or NVR streams on your local network to run safety, security, and process analytics models with low latency. [Note: Channel capacity and hardware sizing subject to site camera count]",
    features: [
      "Processes multiple RTSP / IP video streams locally on-premise",
      "Supports modular activation of safety, security, and process AI models",
      "Real-time alert generation via dashboard, email, webhook, or PLC relay",
      "Preserves data privacy by keeping video processing inside the plant network",
    ],
    applications: [
      "Multi-camera PPE and safety compliance monitoring",
      "Automated ANPR and gate vehicle logging",
      "Production line defect and anomaly alerts",
    ],
    technicalSpecifications: [
      { label: "Architecture", value: "On-premise Edge / Rackmount AI Processing Unit" },
      { label: "Stream Input", value: "Standard IP Camera / NVR video streams" },
      { label: "Alert Outputs", value: "Web Dashboard, REST API, Modbus/Relay I/O, Email" },
      { label: "Specification Status", value: "Sized per stream count — Pending admin hardware review" },
    ],
    integrationCapabilities: [
      "Existing IP CCTV & NVR Infrastructure",
      "Enterprise VMS & Command Dashboards",
      "Plant PLC / Hooter / Strobe Alarm Relays",
    ],
    featuredImage: "/images/categories/it-electronics-and-hardware.png",
    isFeatured: true,
    requiresReview: true,
    sortOrder: 3,
  },
  {
    name: "Enterprise Unified Video Management Platform (VMS)",
    slug: "enterprise-unified-video-management-platform",
    categorySlug: "video-management",
    shortDescription:
      "Centralized surveillance recording, multi-monitor video wall management, failover storage, and unified alarm orchestration.",
    description:
      "A scalable Video Management System architecture built for industrial command centers and multi-facility enterprises. Consolidate hundreds of camera channels, AI analytics alerts, and access events into a unified operator workflow.",
    features: [
      "Multi-server recording federation and central management",
      "Interactive facility maps with live camera and alarm overlays",
      "Smart forensic search and bookmarking for incident investigation",
      "Role-based operator permissions and audit trail logging",
    ],
    applications: [
      "Central security command and control rooms",
      "Multi-plant corporate surveillance monitoring",
      "Integrated security and fire safety visualization",
    ],
    technicalSpecifications: [
      { label: "Deployment Topology", value: "Single-site or Multi-site Federated Architecture" },
      { label: "Storage Support", value: "SAN / NAS / RAID NVR storage pools" },
      { label: "Client Interfaces", value: "Workstation Client, Video Wall Controller, Web/Mobile Viewer" },
    ],
    integrationCapabilities: [
      "AI Video Analytics Events",
      "Access Control & Perimeter Systems",
      "Fire Detection & Building Management Alarms",
    ],
    featuredImage: "/images/pillars/video-management.png",
    isFeatured: true,
    requiresReview: true,
    sortOrder: 4,
  },
  {
    name: "Intelligent Gate, Weighbridge & Plant Automation Controller",
    slug: "intelligent-gate-weighbridge-automation-controller",
    categorySlug: "intelligent-automation",
    shortDescription:
      "Integrated hardware-software automation suite linking ANPR cameras, boom barriers, RFID readers, and industrial I/O controllers.",
    description:
      "Automate industrial vehicle entry, weighbridge positioning, and safety interlocks. This solution synchronizes visual recognition (ANPR and vehicle classification) with physical barrier controls, traffic lights, and enterprise ERP/weighbridge software.",
    features: [
      "Automated boom barrier and sliding gate actuation on authorized entry",
      "Unmanned weighbridge vehicle positioning and license plate capture",
      "Industrial digital I/O integration for safety hooters and interlocks",
      "Complete audit log with timestamped entry/exit images",
    ],
    applications: [
      "Manufacturing plant logistics gates",
      "Warehouse yard and dock scheduling",
      "Automated weighbridge operations",
    ],
    technicalSpecifications: [
      { label: "Control Interfaces", value: "Industrial Digital I/O, RS-485, TCP/IP, Wiegand" },
      { label: "Peripheral Support", value: "Boom Barriers, Bollards, RFID Readers, Traffic Indicators" },
    ],
    integrationCapabilities: [
      "ANPR AI Video Analytics",
      "Access Control & Visitor Management",
      "Plant ERP / Weighbridge Software via API",
    ],
    featuredImage: "/images/pillars/intelligent-automation.png",
    isFeatured: true,
    requiresReview: true,
    sortOrder: 5,
  },
  {
    name: "Commercial & Fleet AC/DC EV Charging Station Series",
    slug: "commercial-fleet-ev-charging-station-series",
    categorySlug: "ev-charging-solutions",
    shortDescription:
      "Industrial-grade electric vehicle charging terminals for corporate campuses, commercial parking, and logistics fleets.",
    description:
      "Engineered for reliable workplace and fleet electrification, our EV charging portfolio covers smart AC wallboxes and fast DC charging units with RFID user authentication and centralized energy monitoring. [Note: Exact kW ratings and connector configurations tailored per site power capacity]",
    features: [
      "Weatherproof enclosure suitable for indoor and outdoor parking",
      "RFID card and smart management protocol support",
      "Dynamic load balancing to protect building electrical infrastructure",
      "Built-in electrical safety protections",
    ],
    applications: [
      "Corporate and industrial employee parking",
      "Last-mile logistics and electric fleet depots",
      "Commercial complexes and hospitality facilities",
    ],
    technicalSpecifications: [
      { label: "Charger Types", value: "AC Type-2 & Fast DC Charging configurations (Site-dependent)" },
      { label: "Authentication", value: "RFID / OCPP Central Management compatible" },
    ],
    integrationCapabilities: [
      "Energy Management Systems (EMS)",
      "Parking Management & Access Control",
    ],
    featuredImage: "/images/categories/ev-charging-solutions.png",
    isFeatured: false,
    requiresReview: true,
    sortOrder: 6,
  },
  {
    name: "Addressable Fire Alarm Control Panels & Hydrant Assemblies",
    slug: "addressable-fire-alarm-and-hydrant-assemblies",
    categorySlug: "fas-systems",
    shortDescription:
      "Integrated fire detection panels, multi-sensor detectors, manual call points, and pressurized hydrant accessories.",
    description:
      "Comprehensive fire detection and active protection hardware for industrial plants, warehouses, and commercial buildings. Configured to support zone-wise hazard identification and automated emergency interlocks.",
    features: [
      "Intelligent addressable loop panels and multi-criteria smoke/heat sensors",
      "Industrial hooters, strobes, and manual call points",
      "Heavy-duty fire hydrant landing valves, hose reels, and branch pipes",
      "Integration relays for HVAC shutdown and access door release",
    ],
    applications: [
      "Manufacturing plants and chemical storage zones",
      "Electrical substations and server rooms",
      "Commercial buildings and warehouses",
    ],
    technicalSpecifications: [
      { label: "System Type", value: "Addressable & Conventional Fire Detection / Hydrant Hardware" },
      { label: "Compliance Note", value: "Selected per applicable local fire safety norms (Pending project review)" },
    ],
    integrationCapabilities: [
      "Integrated Building Management Systems (IBMS)",
      "Public Address & Voice Evacuation",
      "Access Control Emergency Release",
    ],
    featuredImage: "/images/services/fire-detection-alarm-systems.png",
    isFeatured: false,
    requiresReview: true,
    sortOrder: 7,
  },
  {
    name: "Industrial Cables, Switchgear & Panel Fabrication Assemblies",
    slug: "industrial-cables-switchgear-panel-assemblies",
    categorySlug: "industrial-cables-and-accessories",
    shortDescription:
      "Armored power and instrumentation cabling, industrial switchgear components, and custom-fabricated automation panels.",
    description:
      "Supply and turnkey assembly of industrial electrical cables, fiber optic backbones, cable containment systems, and custom control panels built to project engineering drawings.",
    features: [
      "Armored power, control, instrumentation, and fiber optic cables",
      "Heavy-duty perforated and ladder cable trays with precision glands",
      "Custom PLC, MCC, and surveillance power distribution panel fabrication",
      "Industrial hydraulics, pneumatics, and indirect plant consumables support",
    ],
    applications: [
      "Greenfield and brownfield industrial project installations",
      "Plant network and CCTV backbone cabling",
      "Machine automation and panel upgrades",
    ],
    technicalSpecifications: [
      { label: "Supply Scope", value: "B2B Project Supply & Custom Panel Assembly" },
      { label: "Specification Status", value: "Manufactured/supplied per approved BOQ" },
    ],
    integrationCapabilities: [
      "Industrial Automation & PLC Systems",
      "Plant Power Distribution & IT Backbones",
    ],
    featuredImage: "/images/categories/industrial-cables-and-accessories.png",
    isFeatured: false,
    requiresReview: true,
    sortOrder: 8,
  },
];

export interface SeedAICategory {
  code: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  sortOrder: number;
}

export const AI_SOLUTION_CATEGORIES: SeedAICategory[] = [
  {
    code: "CATEGORY_A",
    name: "Safety & Compliance Monitoring",
    slug: "safety-compliance-monitoring",
    shortDescription:
      "Automated computer vision monitoring for workplace PPE adherence, early fire/smoke indicators, hazardous exclusion zones, work-at-height protocols, and SOP compliance.",
    description:
      "Enhance industrial EHS (Environment, Health & Safety) programs with continuous, real-time visual monitoring. Our Safety & Compliance AI models identify unsafe conditions and protocol deviations across shop floors, construction zones, and hazardous plant areas.",
    icon: "HardHat",
    sortOrder: 1,
  },
  {
    code: "CATEGORY_B",
    name: "Security & Surveillance Analytics",
    slug: "security-surveillance-analytics",
    shortDescription:
      "Intelligent perimeter defense, unauthorized intrusion alerts, people and vehicle occupancy counting, internal plant speed monitoring, and ANPR.",
    description:
      "Strengthen facility security and gate operations with proactive video analytics. Detect boundary breaches, track facility occupancy during shifts or emergencies, enforce internal vehicle speed rules, and automate gate entry with Automatic Number Plate Recognition.",
    icon: "ShieldCheck",
    sortOrder: 2,
  },
  {
    code: "CATEGORY_C",
    name: "Industrial Process & Quality Analytics",
    slug: "industrial-process-quality-analytics",
    shortDescription:
      "Machine vision and AI inspection for production lines, visual defect detection, conveyor belt health, steel sheet surface quality, and HDRI wheel inspection.",
    description:
      "Bring high-speed computer vision to manufacturing and material processing lines. Detect surface anomalies, monitor conveyor belt alignment and material flow, verify assembly completeness, and flag process deviations before downstream waste occurs.",
    icon: "ScanSearch",
    sortOrder: 3,
  },
  {
    code: "CATEGORY_D",
    name: "Thermal & Environmental Monitoring",
    slug: "thermal-environmental-monitoring",
    shortDescription:
      "Radiometric thermal analytics, electrical switchgear hotspot detection, and industrial chimney/stack smoke emission monitoring.",
    description:
      "Combine thermal imaging and visible-spectrum AI analytics to identify equipment overheating, electrical panel anomalies, and stack emission irregularities before they escalate into unplanned downtime or environmental incidents.",
    icon: "ThermometerSun",
    sortOrder: 4,
  },
  {
    code: "CATEGORY_E",
    name: "Custom AI Solutions",
    slug: "custom-ai-solutions",
    shortDescription:
      "Bespoke computer vision model training, specialized industrial camera pipelines, and custom AI video analytics engineered for unique operational challenges.",
    description:
      "When standard off-the-shelf analytics do not match your proprietary manufacturing process or specialized inspection criteria, Zenin Systems engineers custom dataset pipelines, model architectures, and PLC/ERP integrations tailored to your exact use case.",
    icon: "Code2",
    sortOrder: 5,
  },
];

export interface SeedAISolution {
  name: string;
  slug: string;
  categoryCode: string;
  shortDescription: string;
  overview: string;
  problemStatement: string;
  howItWorks: string;
  capabilities: string[];
  applicableIndustries: string[];
  benefits: string[];
  integrationInfo: string;
  featuredImage: string;
  relatedSolutionSlugs: string[];
  requiresReview?: boolean;
  reviewNote?: string;
  isFeatured: boolean;
  sortOrder: number;
}

export const AI_SOLUTIONS_SEED: SeedAISolution[] = [
  // CATEGORY A — SAFETY & COMPLIANCE MONITORING (5)
  {
    name: "PPE Detection",
    slug: "ppe-detection",
    categoryCode: "CATEGORY_A",
    shortDescription:
      "Automated real-time verification of safety helmets, high-visibility vests, gloves, safety goggles, and footwear across industrial zones.",
    overview:
      "Personal Protective Equipment (PPE) compliance is fundamental to industrial workplace safety, yet manual supervision cannot continuously cover every shift and entry point. Our PPE Detection AI solution analyzes live video feeds from existing or newly deployed IP cameras to identify personnel entering designated zones without required safety gear.",
    problemStatement:
      "In large manufacturing plants, warehouses, and construction sites, inconsistent PPE usage exposes workers to preventable injuries and creates compliance risks during safety audits.",
    howItWorks:
      "Video streams from zone entry points and shop floors are processed by deep-learning object detection models trained to recognize human figures and specific PPE attributes (helmets, vests, eye protection, masks, gloves). When a missing PPE condition is observed within a configured rule zone, the system logs a timestamped snapshot and triggers an alert.",
    capabilities: [
      "Hardhat / safety helmet presence detection",
      "High-visibility reflective vest and jacket recognition",
      "Zone-based rule scheduling (e.g., mandatory helmet + vest in bay A)",
      "Instant visual/audio alarm relay trigger and EHS dashboard logging",
    ],
    applicableIndustries: [
      "Manufacturing & Heavy Engineering",
      "Construction & Infrastructure",
      "Chemical & Petrochemical Plants",
      "Warehousing & Logistics",
    ],
    benefits: [
      "Supports proactive EHS safety culture across 24/7 shifts",
      "Reduces manual supervision burden on safety officers",
      "Provides objective trend analytics to identify high-risk zones",
      "Works with standard IP surveillance infrastructure",
    ],
    integrationInfo:
      "Supports RTSP/ONVIF IP camera feeds, VMS alarm events, access control turnstile interlocks, and local hooter/strobe relays. [Provisional architecture — site camera angles subject to engineering survey]",
    featuredImage: "/images/ai/ppe-detection.png",
    relatedSolutionSlugs: ["danger-zone-monitoring", "work-at-height-monitoring", "sop-compliance-monitoring"],
    isFeatured: true,
    sortOrder: 1,
  },
  {
    name: "Fire & Smoke Detection",
    slug: "fire-smoke-detection",
    categoryCode: "CATEGORY_A",
    shortDescription:
      "Video-based early flame and smoke plume recognition for high-ceiling warehouses, outdoor yards, and industrial bays.",
    overview:
      "Conventional point smoke detectors rely on smoke particles physically reaching ceiling sensors, which can cause delays in high-roof industrial sheds, semi-open yards, or high-airflow environments. Video-based Fire & Smoke Detection analyzes camera feeds to spot visual smoke plumes and flame signatures at their source.",
    problemStatement:
      "High-bay warehouses, scrap yards, sawmill floors, and turbine halls often experience delayed detection from ceiling-mounted point sensors due to thermal stratification or wind dispersion.",
    howItWorks:
      "Computer vision algorithms continuously evaluate spatial and temporal patterns in video streams—identifying the characteristic motion, color, texture, and expansion behavior of smoke plumes and open flames while filtering routine lighting changes.",
    capabilities: [
      "Early visual smoke plume and open flame pattern recognition",
      "Effective in high-ceiling bays and outdoor storage yards",
      "Immediate snapshot and video clip verification for control room operators",
      "Configurable sensitivity zones to minimize false alarms from steam or exhaust",
    ],
    applicableIndustries: [
      "Warehousing & Cold Storage",
      "Power & Energy Facilities",
      "Recycling, Paper & Timber Plants",
      "Manufacturing & Chemical Storage",
    ],
    benefits: [
      "Complements traditional fire alarm systems with visual source localization",
      "Enables rapid operator visual verification from the control room",
      "Covers expansive outdoor or semi-enclosed industrial areas",
    ],
    integrationInfo:
      "Designed as a supplementary early-warning visual layer alongside statutory Fire Detection & Alarm Systems (FAS). Can trigger VMS pop-ups and alarm relays.",
    featuredImage: "/images/ai/fire-smoke-detection.png",
    relatedSolutionSlugs: ["thermal-monitoring", "electrical-panel-monitoring", "chimney-smoke-monitoring"],
    isFeatured: true,
    sortOrder: 2,
  },
  {
    name: "Danger Zone Monitoring",
    slug: "danger-zone-monitoring",
    categoryCode: "CATEGORY_A",
    shortDescription:
      "Virtual geofencing around robotic cells, heavy presses, crane loads, and hazardous machinery to alert or interlock on human entry.",
    overview:
      "Industrial facilities contain dynamic hazard zones—such as robotic welding cells, overhead crane drop zones, high-voltage bays, and automated guided vehicle (AGV) corridors. Danger Zone Monitoring establishes virtual safety perimeters within camera views to detect unauthorized human proximity.",
    problemStatement:
      "Physical barriers are not always practical around active material-handling corridors or overhead crane paths, creating collision and crush hazards when workers inadvertently enter active zones.",
    howItWorks:
      "Administrators define polygonal exclusion zones on the camera view. The AI vision engine tracks personnel and mobile equipment in real time, triggering warnings or machine safety interlocks if a person crosses into an active danger boundary.",
    capabilities: [
      "Customizable multi-polygon virtual safety boundaries",
      "Human-vs-machinery differentiation to avoid false triggers from moving parts",
      "Time-based or machine-state-linked zone activation",
      "Audio-visual warning actuation and PLC signal output",
    ],
    applicableIndustries: [
      "Automotive & Heavy Manufacturing",
      "Steel & Metal Processing",
      "Ports, Cranes & Material Handling",
      "Automated Warehouses",
    ],
    benefits: [
      "Reduces man-machine interaction incidents",
      "Provides flexible virtual boundaries that adapt to layout changes",
      "Creates documented near-miss logs for proactive safety reviews",
    ],
    integrationInfo:
      "Integrates with IP cameras, local warning beacons/sirens, and PLC digital input modules for auxiliary warning workflows.",
    featuredImage: "/images/ai/danger-zone-monitoring.png",
    relatedSolutionSlugs: ["ppe-detection", "work-at-height-monitoring", "intrusion-detection"],
    isFeatured: false,
    sortOrder: 3,
  },
  {
    name: "Work-at-Height Monitoring",
    slug: "work-at-height-monitoring",
    categoryCode: "CATEGORY_A",
    shortDescription:
      "Visual safety monitoring for scaffolding, elevated platforms, ladder operations, and safety harness adherence.",
    overview:
      "Working at height remains one of the leading causes of severe industrial incidents. Work-at-Height Monitoring uses computer vision to oversee elevated maintenance bays, tank tops, scaffolding zones, and loading gantries.",
    problemStatement:
      "Elevated maintenance tasks are often temporary or intermittent, making continuous manual spot-checking difficult across sprawling industrial plants.",
    howItWorks:
      "Cameras positioned covering elevated work areas analyze worker presence, posture, helmet/harness indicators, and buddy-system rules (such as verifying a spotter is present at the base of a ladder or platform).",
    capabilities: [
      "Detection of personnel in elevated maintenance and gantry zones",
      "Safety helmet and visible harness indicator checks",
      "Lone-worker or missing-spotter alerts during elevated tasks",
      "Automated event logging for permit-to-work verification",
    ],
    applicableIndustries: [
      "Construction & EPC Projects",
      "Oil, Gas & Chemical Refineries",
      "Cement & Steel Plants",
      "Aircraft & Heavy Equipment Maintenance",
    ],
    benefits: [
      "Supports Permit-to-Work (PTW) compliance for elevated operations",
      "Alerts supervisors when unscheduled work-at-height activity begins",
      "Improves response time if an incident occurs on an elevated platform",
    ],
    integrationInfo:
      "Connects with fixed or PTZ industrial cameras and notifies EHS control desks via dashboard or messaging alerts.",
    featuredImage: "/images/ai/work-at-height-monitoring.png",
    relatedSolutionSlugs: ["ppe-detection", "danger-zone-monitoring", "sop-compliance-monitoring"],
    isFeatured: false,
    sortOrder: 4,
  },
  {
    name: "Safety Violation & SOP Compliance Monitoring",
    slug: "sop-compliance-monitoring",
    categoryCode: "CATEGORY_A",
    shortDescription:
      "Automated monitoring of standard operating procedures, pedestrian walkway adherence, man-down events, and unsafe workplace behaviors.",
    overview:
      "Beyond basic PPE, industrial safety depends on consistent adherence to Standard Operating Procedures (SOPs)—such as walking within designated pedestrian lanes, maintaining minimum staffing in critical rooms, avoiding mobile phone usage in hazard zones, and rapid detection of slip-and-fall incidents.",
    problemStatement:
      "Procedural drift and unsafe shortcuts often go unnoticed until an accident occurs, while lone workers experiencing a medical emergency or fall require immediate detection.",
    howItWorks:
      "Pose-estimation and action-recognition models analyze movement trajectories, dwell times, and body posture within defined operational zones to identify deviations from configured SOP rules.",
    capabilities: [
      "Slip, trip, fall, and man-down posture recognition",
      "Pedestrian walkway deviation and forklift-lane crossing alerts",
      "Minimum/maximum occupancy enforcement in hazardous rooms",
      "Unattended object or blocked emergency exit detection",
    ],
    applicableIndustries: [
      "Manufacturing & Assembly Plants",
      "Pharmaceutical & Cleanroom Facilities",
      "Logistics & Fulfillment Centers",
      "Energy & Utility Substations",
    ],
    benefits: [
      "Accelerates emergency response for fallen or immobilized workers",
      "Keeps emergency exits and forklift corridors clear of obstructions",
      "Provides actionable compliance metrics for plant management",
    ],
    integrationInfo:
      "Operates over existing facility CCTV cameras and integrates with central VMS and plant paging/alert systems.",
    featuredImage: "/images/ai/sop-compliance-monitoring.png",
    relatedSolutionSlugs: ["ppe-detection", "danger-zone-monitoring", "work-at-height-monitoring"],
    isFeatured: false,
    sortOrder: 5,
  },

  // CATEGORY B — SECURITY & SURVEILLANCE ANALYTICS (5)
  {
    name: "Intrusion Detection",
    slug: "intrusion-detection",
    categoryCode: "CATEGORY_B",
    shortDescription:
      "AI-powered human and vehicle intrusion detection for restricted rooms, substations, vaults, and after-hours facility zones.",
    overview:
      "Traditional pixel-based video motion detection generates excessive false alarms from shadows, insects, rain, and swaying foliage. AI Intrusion Detection accurately classifies human and vehicle targets entering restricted zones during scheduled or 24/7 protection windows.",
    problemStatement:
      "Security guards monitoring dozens of camera feeds suffer from alarm fatigue when conventional motion detectors trigger constantly due to weather or lighting shifts.",
    howItWorks:
      "Deep-learning object classification filters out environmental noise and triggers alerts only when a verified person or vehicle crosses a virtual tripwire or loiters inside a restricted polygon.",
    capabilities: [
      "High-precision human and vehicle classification",
      "Multi-zone loitering, virtual tripwire, and directional entry rules",
      "Shift-based and after-hours automated arming/disarming",
      "Instant clip forwarding to security command workstations",
    ],
    applicableIndustries: [
      "Industrial Plants & Warehouses",
      "Data Centers & Telecom Hubs",
      "Solar Parks & Utility Substations",
      "Commercial Campuses",
    ],
    benefits: [
      "Drastically reduces nuisance motion alarms in outdoor and semi-outdoor areas",
      "Focuses security guard attention on verified intrusion events",
      "Creates searchable forensic event timelines",
    ],
    integrationInfo:
      "Integrates with IP/thermal cameras, VMS alarm matrices, automated PTZ preset slewing, and perimeter lighting/sirens.",
    featuredImage: "/images/ai/intrusion-detection.png",
    relatedSolutionSlugs: ["perimeter-monitoring", "people-vehicle-counting", "anpr"],
    isFeatured: true,
    sortOrder: 6,
  },
  {
    name: "Perimeter Monitoring",
    slug: "perimeter-monitoring",
    categoryCode: "CATEGORY_B",
    shortDescription:
      "Long-range boundary surveillance analytics for fence climbing, boundary loitering, and sterile-zone breaches across large industrial estates.",
    overview:
      "Industrial compounds, refineries, and logistics hubs often span kilometers of boundary walls and fencing. Perimeter Monitoring analytics turns boundary cameras into an intelligent virtual fence that detects approach, loitering, and fence-scaling behavior.",
    problemStatement:
      "Patrolling vast industrial perimeters physically leaves blind windows, while unmonitored CCTV recordings only provide post-incident evidence rather than real-time prevention.",
    howItWorks:
      "Long-corridor visible and thermal camera streams are analyzed along dual virtual lines (early warning outer line and critical inner sterile zone), automatically slewing nearby PTZ cameras to track the target.",
    capabilities: [
      "Dual-line sterile zone and fence-line breach detection",
      "Automated PTZ camera call-up and target tracking",
      "Day/night and adverse weather operation with thermal camera compatibility",
      "Integration with Intelligent Fencing and PA warning systems",
    ],
    applicableIndustries: [
      "Refineries, Tank Farms & Chemical Plants",
      "Solar Farms & Power Generation",
      "Ports, Logistics Parks & Bonded Warehouses",
      "Critical Infrastructure",
    ],
    benefits: [
      "Detects threats at the boundary before facility assets are reached",
      "Synchronizes fixed cameras, PTZ units, and perimeter fencing sensors",
      "Reduces reliance on manual camera-wall scanning",
    ],
    integrationInfo:
      "Works seamlessly with Intelligent Fencing Solutions, IP horn speakers for automated audio warnings, and central VMS maps.",
    featuredImage: "/images/ai/perimeter-monitoring.png",
    relatedSolutionSlugs: ["intrusion-detection", "anpr", "thermal-monitoring"],
    isFeatured: false,
    sortOrder: 7,
  },
  {
    name: "People & Vehicle Counting",
    slug: "people-vehicle-counting",
    categoryCode: "CATEGORY_B",
    shortDescription:
      "Bi-directional footfall, shift occupancy, muster-point headcounts, and multi-class vehicle traffic analytics.",
    overview:
      "Accurate real-time knowledge of how many people and vehicles are inside a facility or specific zone is vital for both operational planning and emergency evacuation accounting. People & Vehicle Counting provides automated bi-directional tallying across gates, building entrances, and loading bays.",
    problemStatement:
      "Manual gate registers and card-only logs often miss passengers, contractors, or multi-vehicle queues, leaving management without live zone occupancy visibility.",
    howItWorks:
      "Multi-object tracking algorithms track individuals and vehicles (classified by car, truck, two-wheeler, forklift, bus) crossing virtual counting lines, maintaining live entry, exit, and net-occupancy counters.",
    capabilities: [
      "Bi-directional entry and exit counting for personnel and vehicles",
      "Vehicle type classification (Heavy Truck, LCV, Car, Two-Wheeler, Forklift)",
      "Live zone occupancy and crowding threshold alerts",
      "Historical hourly, shift-wise, and daily traffic reporting",
    ],
    applicableIndustries: [
      "Manufacturing & Industrial Campuses",
      "Warehousing & Distribution Hubs",
      "Commercial Complexes & IT Parks",
      "Public Infrastructure & Parking Facilities",
    ],
    benefits: [
      "Provides live occupancy visibility for safety and facility managers",
      "Optimizes gate staffing and loading dock scheduling",
      "Eliminates manual traffic tally errors",
    ],
    integrationInfo:
      "Exports occupancy and count metrics via web dashboard, CSV reports, and REST APIs for IBMS or ERP consumption.",
    featuredImage: "/images/ai/people-vehicle-counting.png",
    relatedSolutionSlugs: ["anpr", "vehicle-speed-detection", "intrusion-detection"],
    isFeatured: true,
    sortOrder: 8,
  },
  {
    name: "Vehicle Speed Detection",
    slug: "vehicle-speed-detection",
    categoryCode: "CATEGORY_B",
    shortDescription:
      "Internal plant road and warehouse corridor speed monitoring for trucks, forklifts, and commercial vehicles.",
    overview:
      "Overspeeding by logistics trucks and material-handling forklifts inside plant premises is a major cause of internal yard accidents. Vehicle Speed Detection uses calibrated video analytics to estimate vehicle speed along internal plant roads and warehouse aisles.",
    problemStatement:
      "Once vehicles pass the main security gate, enforcing internal plant speed limits (e.g., 15–20 km/h) across yard roads and loading zones is difficult without automated monitoring.",
    howItWorks:
      "Using perspective-calibrated camera zones or dual reference lines, the system measures vehicle transit velocity, captures the vehicle image and number plate (when paired with ANPR), and logs overspeeding events.",
    capabilities: [
      "Calibrated speed estimation for plant roads and forklift aisles",
      "Automated snapshot and license plate association for violators",
      "Support for LED speed-display feedback boards",
      "Contractor and transporter safety compliance reporting",
    ],
    applicableIndustries: [
      "Large Industrial Estates & Steel Plants",
      "Ports, Container Yards & Logistics Parks",
      "Cement & Mining Facilities",
      "Corporate Campuses",
    ],
    benefits: [
      "Deters unsafe driving inside pedestrian-shared industrial yards",
      "Identifies repeat transporter violations with objective visual records",
      "Reduces collision risks around loading docks and blind corners",
    ],
    integrationInfo:
      "Can be paired with ANPR cameras, roadside LED speed indicators, and gate access control blacklists.",
    featuredImage: "/images/ai/vehicle-speed-detection.png",
    relatedSolutionSlugs: ["anpr", "people-vehicle-counting", "danger-zone-monitoring"],
    isFeatured: false,
    sortOrder: 9,
  },
  {
    name: "ANPR — Automatic Number Plate Recognition",
    slug: "anpr",
    categoryCode: "CATEGORY_B",
    shortDescription:
      "Automated vehicle license plate capture, whitelist/blacklist gate automation, weighbridge integration, and yard turnaround tracking.",
    overview:
      "ANPR (Automatic Number Plate Recognition) automates vehicle identification at industrial gates, weighbridges, and parking barriers. By converting license plate images into searchable text records, facilities can streamline authorized entry and track commercial vehicle turnaround times.",
    problemStatement:
      "Manual gate entry logs cause truck queues, transcription errors, and delays at weighbridges and dispatch docks.",
    howItWorks:
      "Dedicated ANPR or high-shutter IP cameras capture approaching vehicles; optical character recognition (OCR) models extract the registration number, match it against authorized lists or pre-booked gate passes, and trigger barrier actuation.",
    capabilities: [
      "High-speed license plate recognition across commercial and private vehicles",
      "Automated boom barrier trigger for whitelisted vehicles",
      "Entry-to-exit dwell time and yard turnaround calculation",
      "Dual-camera capture (license plate + driver/overview snapshot)",
    ],
    applicableIndustries: [
      "Manufacturing & Logistics Gates",
      "Weighbridges & Bulk Material Plants",
      "Commercial Buildings & Parking Complexes",
      "Industrial Parks & SEZs",
    ],
    benefits: [
      "Accelerates gate throughput and reduces truck queueing",
      "Eliminates manual register manipulation at weighbridges",
      "Provides complete searchable audit logs of every visiting vehicle",
    ],
    integrationInfo:
      "Integrates with boom barriers, UHF RFID readers, weighbridge controllers, and SAP/ERP gate-entry modules.",
    featuredImage: "/images/ai/anpr.png",
    relatedSolutionSlugs: ["people-vehicle-counting", "vehicle-speed-detection", "intrusion-detection"],
    isFeatured: true,
    sortOrder: 10,
  },

  // CATEGORY C — INDUSTRIAL PROCESS & QUALITY ANALYTICS (6)
  {
    name: "AI-based Process & Quality Monitoring",
    slug: "process-quality-monitoring",
    categoryCode: "CATEGORY_C",
    shortDescription:
      "Real-time computer vision oversight of manufacturing workflows, cycle times, workstation sequencing, and process anomalies.",
    overview:
      "AI-based Process & Quality Monitoring brings continuous visual intelligence to production lines and manual assembly stations. By observing process steps in real time, the system helps production teams spot bottlenecks, sequence errors, and process drift early.",
    problemStatement:
      "Unnoticed deviations in multi-step manufacturing processes lead to batch rework, inconsistent cycle times, and delayed root-cause discovery.",
    howItWorks:
      "Fixed industrial cameras observe key process stages; computer vision models verify that required components, tool actions, or material states occur in the expected sequence and timeframe.",
    capabilities: [
      "Assembly step and operational sequence verification",
      "Station cycle-time measurement and bottleneck identification",
      "Process anomaly detection and line supervisor notification",
      "Visual batch documentation for quality traceability",
    ],
    applicableIndustries: [
      "Discrete Manufacturing & Assembly",
      "Automotive & Tier-1 Suppliers",
      "Electronics & Appliance Production",
      "Packaging & FMCG Lines",
    ],
    benefits: [
      "Catches process deviations before defective sub-assemblies advance",
      "Provides data-driven cycle-time insights for continuous improvement",
      "Supports traceable quality records per production shift",
    ],
    integrationInfo:
      "Interfaces with shop-floor Andon lights, line PLCs, and Manufacturing Execution Systems (MES).",
    featuredImage: "/images/ai/process-quality-monitoring.png",
    relatedSolutionSlugs: ["visual-quality-inspection", "industrial-process-monitoring", "conveyor-belt-monitoring"],
    isFeatured: false,
    sortOrder: 11,
  },
  {
    name: "Visual Quality Inspection",
    slug: "visual-quality-inspection",
    categoryCode: "CATEGORY_C",
    shortDescription:
      "Automated machine vision inspection for surface defects, dimensional completeness, label verification, and packaging integrity.",
    overview:
      "Manual visual inspection on fast-moving production lines is prone to eye fatigue and inconsistency. Visual Quality Inspection combines industrial imaging optics, controlled illumination, and deep-learning defect classification to inspect manufactured parts and packaged goods.",
    problemStatement:
      "Human inspectors struggle to maintain consistent defect detection across thousands of units per shift, leading to customer returns or excessive scrap.",
    howItWorks:
      "Synchronized industrial cameras capture high-clarity images of each passing unit; trained AI classification and segmentation models identify scratches, dents, missing components, misprints, or seal defects in milliseconds.",
    capabilities: [
      "Surface defect, scratch, dent, and burr identification",
      "Component presence/absence and orientation verification",
      "Packaging seal, cap, and barcode/OCR label verification",
      "Automated reject-mechanism trigger via PLC I/O",
    ],
    applicableIndustries: [
      "Automotive Components & Precision Engineering",
      "Pharmaceutical & Medical Device Packaging",
      "Food, Beverage & Consumer Goods",
      "Plastics, Glass & Metal Stamping",
    ],
    benefits: [
      "Delivers consistent, fatigue-free inspection across all shifts",
      "Reduces downstream warranty claims and defective dispatches",
      "Categorizes defect types to pinpoint upstream tooling wear",
    ],
    integrationInfo:
      "Supports industrial area-scan and line-scan cameras, strobe controllers, and PLC pneumatic reject actuators. [Optical setup engineered per line speed and part geometry]",
    featuredImage: "/images/ai/visual-quality-inspection.png",
    relatedSolutionSlugs: ["process-quality-monitoring", "steel-sheet-defect-monitoring", "hdri-wheel-inspection"],
    isFeatured: true,
    sortOrder: 12,
  },
  {
    name: "Conveyor Belt Monitoring",
    slug: "conveyor-belt-monitoring",
    categoryCode: "CATEGORY_C",
    shortDescription:
      "AI vision monitoring for conveyor belt rips, edge misalignment, chute blockages, foreign object detection, and material spillage.",
    overview:
      "In bulk material handling and manufacturing plants, conveyor belt failure causes costly unplanned stoppages. Conveyor Belt Monitoring uses computer vision to continuously inspect belt condition, alignment, and material loading.",
    problemStatement:
      "Longitudinal belt rips, belt sway, idler failures, or foreign metal/oversized rocks can destroy expensive conveyor belts and halt plant throughput.",
    howItWorks:
      "Cameras aimed at critical transfer points and belt return runs analyze belt edge geometry, surface integrity, and material profile to detect sway, tears, blockages, or empty-running belts.",
    capabilities: [
      "Belt sway and edge misalignment tracking",
      "Surface tear, splice damage, and longitudinal rip warning",
      "Transfer chute blockage and material spillage detection",
      "Foreign object and oversized lump identification",
    ],
    applicableIndustries: [
      "Mining, Cement & Aggregates",
      "Steel & Thermal Power Plants",
      "Ports & Bulk Material Terminals",
      "Automated Logistics & Sortation Hubs",
    ],
    benefits: [
      "Prevents catastrophic full-length conveyor belt tears",
      "Reduces material spillage cleanup and maintenance downtime",
      "Enables predictive maintenance planning for belt assets",
    ],
    integrationInfo:
      "Provides dry-contact relay and Modbus/PROFINET alerts to conveyor SCADA/PLC trip circuits.",
    featuredImage: "/images/ai/conveyor-belt-monitoring.png",
    relatedSolutionSlugs: ["industrial-process-monitoring", "process-quality-monitoring", "thermal-monitoring"],
    isFeatured: false,
    sortOrder: 13,
  },
  {
    name: "Industrial Process Monitoring",
    slug: "industrial-process-monitoring",
    categoryCode: "CATEGORY_C",
    shortDescription:
      "Continuous visual telemetry for heavy industrial equipment, furnace/kiln observation, liquid level/spill checks, and gauge reading.",
    overview:
      "Industrial Process Monitoring extends visual awareness into hazardous or hard-to-reach plant areas where operators cannot remain physically present. Cameras paired with AI analytics monitor equipment state, liquid/material movement, and analog indicators.",
    problemStatement:
      "High-temperature, high-noise, or chemically hazardous zones limit direct human observation, creating blind spots between periodic operator rounds.",
    howItWorks:
      "Ruggedized cameras observe critical machinery and vessels; vision models monitor visual state changes, material overflow, valve positions, or unexpected mechanical motion.",
    capabilities: [
      "Remote visual monitoring of hazardous or high-temperature process zones",
      "Material overflow, leak, and spill visual detection",
      "Analog gauge and indicator state verification",
      "Synchronized video playback alongside SCADA process timestamps",
    ],
    applicableIndustries: [
      "Metals, Foundries & Glass Manufacturing",
      "Chemical & Process Industries",
      "Water & Wastewater Treatment Plants",
      "Power Generation",
    ],
    benefits: [
      "Reduces operator exposure to hazardous plant environments",
      "Accelerates diagnosis of process upsets from the control room",
      "Creates visual history correlated with plant instrumentation",
    ],
    integrationInfo:
      "Integrates with central VMS, control room video walls, and plant historians.",
    featuredImage: "/images/ai/industrial-process-monitoring.png",
    relatedSolutionSlugs: ["conveyor-belt-monitoring", "process-quality-monitoring", "thermal-monitoring"],
    isFeatured: false,
    sortOrder: 14,
  },
  {
    name: "Steel Sheet Surface Quality / Defect Monitoring",
    slug: "steel-sheet-defect-monitoring",
    categoryCode: "CATEGORY_C",
    shortDescription:
      "High-speed surface inspection for rolled steel strips, coils, and metal sheets to identify scratches, pits, scale, and edge cracks.",
    overview:
      "In steel rolling mills, slitting lines, and metal processing plants, surface defects on moving metal strips must be detected immediately to grade coils accurately and correct roll marks. Our Steel Sheet Surface Quality / Defect Monitoring solution uses specialized imaging and AI defect classification.",
    problemStatement:
      "At high line speeds, naked-eye inspection cannot spot fine rolled-in scale, pinholes, slivers, or periodic roll marks on moving steel sheets.",
    howItWorks:
      "High-speed cameras with uniform linear illumination capture continuous images of the top and bottom sheet surfaces; AI segmentation models detect, classify, and map defects by longitudinal coil position.",
    capabilities: [
      "Detection of scratches, roll marks, slivers, scale, pits, and edge cracks",
      "Defect classification and coil quality mapping",
      "Real-time alerts for repeating periodic roll defects",
      "Historical coil inspection archive for quality assurance certificates",
    ],
    applicableIndustries: [
      "Steel Rolling Mills & Coil Processing Centers",
      "Aluminum & Non-Ferrous Sheet Production",
      "Automotive Body-in-White Stamping Plants",
      "Metal Coating & Galvanizing Lines",
    ],
    benefits: [
      "Improves coil grading accuracy and customer quality assurance",
      "Allows operators to stop or adjust rolls when periodic marks appear",
      "Reduces scrap and secondary sorting costs",
    ],
    integrationInfo:
      "Designed for integration with line encoders, PLC length tracking, and quality management databases. [Camera and lighting specification engineered per strip width and line speed]",
    featuredImage: "/images/ai/steel-sheet-defect-monitoring.png",
    relatedSolutionSlugs: ["visual-quality-inspection", "hdri-wheel-inspection", "process-quality-monitoring"],
    isFeatured: false,
    sortOrder: 15,
  },
  {
    name: "HDRI Wheel Inspection",
    slug: "hdri-wheel-inspection",
    categoryCode: "CATEGORY_C",
    shortDescription:
      "High Dynamic Range Imaging (HDRI) and AI computer vision inspection for industrial/automotive/railway wheel geometry and surface integrity.",
    overview:
      "HDRI Wheel Inspection utilizes high-contrast imaging and AI-driven visual analysis to inspect metallic wheel surfaces, rims, and structural profiles where highly reflective or variable surface finishes challenge conventional machine vision systems. [Provisional Overview — Flagged for Administrator Technical Specification Review]",
    problemStatement:
      "Inspecting cast, forged, or machined wheels involves complex curved geometries and specular metal reflections that can mask surface cracks, porosity, machining defects, or tread wear under standard lighting.",
    howItWorks:
      "High Dynamic Range Imaging (HDRI) multi-exposure capture combined with controlled lighting normalizes extreme glare and shadow regions across the wheel profile, enabling deep-learning vision models to evaluate surface quality, bolt-hole geometry, and structural anomalies.",
    capabilities: [
      "High Dynamic Range imaging for reflective metallic wheel surfaces",
      "Surface defect, crack, and casting/machining anomaly detection",
      "Dimensional and profile consistency verification",
      "Automated inspection logging per wheel serial/batch identifier",
    ],
    applicableIndustries: [
      "Automotive & Alloy Wheel Manufacturing",
      "Railway Rolling Stock & Bogie Maintenance",
      "Heavy Commercial Vehicle Assembly",
      "Industrial Crane & Material Handling Wheel Systems",
    ],
    benefits: [
      "Overcomes glare and reflection challenges on machined metal surfaces",
      "Supports consistent quality control for safety-critical wheel assemblies",
      "Provides digital visual inspection records",
    ],
    integrationInfo:
      "Configurable with rotary inspection stations, trackside/in-line imaging rigs, and plant MES/PLC systems. [Note: Specific optical, sensor, and industry application details flagged for administrator review]",
    featuredImage: "/images/ai/hdri-wheel-inspection.png",
    relatedSolutionSlugs: ["visual-quality-inspection", "steel-sheet-defect-monitoring", "custom-ai-video-analytics"],
    requiresReview: true,
    reviewNote:
      "Preserved 'HDRI Wheel Inspection' from architecture specification. Administrator review requested to confirm exact target application (automotive alloy wheel manufacturing vs. railway rolling stock wheel inspection) and hardware optical specifications.",
    isFeatured: false,
    sortOrder: 16,
  },

  // CATEGORY D — THERMAL & ENVIRONMENTAL MONITORING (3)
  {
    name: "Thermal Monitoring",
    slug: "thermal-monitoring",
    categoryCode: "CATEGORY_D",
    shortDescription:
      "Continuous radiometric thermal imaging and AI temperature anomaly detection for critical plant equipment, vessels, and stockpiles.",
    overview:
      "Abnormal heat generation is one of the earliest indicators of mechanical friction, insulation breakdown, refractory wear, or spontaneous combustion in bulk storage. Thermal Monitoring pairs radiometric thermal cameras with intelligent threshold and rate-of-rise analytics.",
    problemStatement:
      "Periodic manual thermography inspections only capture a snapshot once a month or quarter, missing sudden thermal runaways between scheduled checks.",
    howItWorks:
      "Fixed thermal sensors continuously measure surface temperature across multiple Regions of Interest (ROIs), alerting operators when absolute temperature limits, delta-T comparisons, or rapid heating trends are detected.",
    capabilities: [
      "Multi-zone temperature threshold and rate-of-temperature-rise alerts",
      "Early hotspot detection in coal/biomass stockpiles and storage silos",
      "Rotary kiln shell, refractory, and bearing heat monitoring",
      "Radiometric thermal + visible bi-spectrum overlay visualization",
    ],
    applicableIndustries: [
      "Power Plants, Cement & Steel",
      "Chemical, Petrochemical & Refineries",
      "Coal Yards, Biomass & Waste Management",
      "Battery Storage & Data Centers",
    ],
    benefits: [
      "Identifies overheating equipment before catastrophic failure or fire",
      "Replaces periodic manual spot-checks with 24/7 continuous telemetry",
      "Integrates temperature trend alarms directly into the control room",
    ],
    integrationInfo:
      "Supports radiometric thermal IP cameras, Modbus TCP temperature register output, and VMS alarm dashboards.",
    featuredImage: "/images/ai/thermal-monitoring.png",
    relatedSolutionSlugs: ["electrical-panel-monitoring", "fire-smoke-detection", "chimney-smoke-monitoring"],
    isFeatured: false,
    sortOrder: 17,
  },
  {
    name: "Electrical Panel Monitoring",
    slug: "electrical-panel-monitoring",
    categoryCode: "CATEGORY_D",
    shortDescription:
      "Continuous thermal and visual monitoring for MCC/PCC panels, switchgear, busbars, transformers, and substation terminations.",
    overview:
      "Loose terminations, phase imbalances, and overloaded breakers inside electrical panels generate localized heat long before an arc flash or electrical fire occurs. Electrical Panel Monitoring provides continuous thermal and visual oversight for critical electrical rooms and switchgear.",
    problemStatement:
      "Electrical cabinet fires and transformer failures cause severe safety hazards and prolonged plant blackouts, yet closed panels cannot be inspected continuously by hand.",
    howItWorks:
      "Compact cabinet thermal sensors, IR inspection windows, and substation thermal cameras monitor busbar joints, cable terminations, and transformer bushings, comparing live temperatures against baseline thresholds.",
    capabilities: [
      "Continuous hotspot detection on busbars, breakers, and cable lugs",
      "Substation transformer and switchgear bay thermal monitoring",
      "Early smoke and panel door-open visual verification",
      "Automated alerts to electrical maintenance and IBMS teams",
    ],
    applicableIndustries: [
      "Industrial Manufacturing & Process Plants",
      "Data Centers & IT Infrastructure",
      "Commercial High-Rise & Hospital Substations",
      "Power Distribution & Renewable Energy",
    ],
    benefits: [
      "Mitigates electrical fire risk in critical PCC/MCC and server rooms",
      "Supports condition-based electrical maintenance without opening live panels",
      "Reduces unplanned power outages",
    ],
    integrationInfo:
      "Integrates with Integrated Building Management Systems (IBMS), SCADA, and Fire Detection & Alarm networks.",
    featuredImage: "/images/ai/electrical-panel-monitoring.png",
    relatedSolutionSlugs: ["thermal-monitoring", "fire-smoke-detection", "industrial-process-monitoring"],
    isFeatured: false,
    sortOrder: 18,
  },
  {
    name: "Chimney Smoke Monitoring",
    slug: "chimney-smoke-monitoring",
    categoryCode: "CATEGORY_D",
    shortDescription:
      "Automated visual monitoring of industrial stacks, flares, and chimneys for abnormal smoke opacity, color shifts, and emission events.",
    overview:
      "Industrial boilers, furnaces, and process stacks require continuous observation to detect incomplete combustion, baghouse filter breaches, or abnormal flare behavior. Chimney Smoke Monitoring uses dedicated cameras and AI vision to monitor stack plumes 24/7.",
    problemStatement:
      "Sudden baghouse filter tears or burner upsets can release visible dark or colored smoke plumes that go unnoticed by indoor operators, risking environmental non-compliance.",
    howItWorks:
      "Cameras trained on industrial chimneys and flare stacks analyze plume presence, color characteristics (black, white, colored smoke), and visual opacity changes, notifying environmental and boiler control rooms immediately.",
    capabilities: [
      "Continuous visual tracking of stack and chimney exit plumes",
      "Detection of abnormal dark smoke or sudden opacity spikes",
      "Timestamped video recording for environmental compliance review",
      "Multi-stack monitoring from a single elevated camera vantage point",
    ],
    applicableIndustries: [
      "Thermal Power & Captive Cogeneration Plants",
      "Cement, Steel & Metallurgical Plants",
      "Chemical & Process Boilers",
      "Refineries & Petrochemical Complexes",
    ],
    benefits: [
      "Alerts boiler and process operators immediately to combustion or filter upsets",
      "Maintains visual audit logs for internal EHS teams",
      "Supports proactive environmental stewardship",
    ],
    integrationInfo:
      "Connects to plant CCTV/VMS networks and environmental control room dashboards.",
    featuredImage: "/images/ai/chimney-smoke-monitoring.png",
    relatedSolutionSlugs: ["fire-smoke-detection", "thermal-monitoring", "industrial-process-monitoring"],
    isFeatured: false,
    sortOrder: 19,
  },

  // CATEGORY E — CUSTOM AI SOLUTIONS (2)
  {
    name: "Customized AI Video Analytics",
    slug: "custom-ai-video-analytics",
    categoryCode: "CATEGORY_E",
    shortDescription:
      "Tailor-made computer vision models, custom dataset curation, and site-specific video analytics rules built for unique enterprise workflows.",
    overview:
      "Every industrial facility has unique layouts, proprietary products, and specialized operational rules. Customized AI Video Analytics provides full-lifecycle computer vision engineering—from site feasibility and custom dataset annotation to model training, edge deployment, and enterprise software integration.",
    problemStatement:
      "Off-the-shelf video analytics packages often fail when confronted with custom industrial equipment, specialized packaging formats, or site-specific SOP rules.",
    howItWorks:
      "Our engineering team collaborates with your operations and safety stakeholders to capture representative video data, train and validate custom deep-learning models, and deploy them on on-premise edge appliances with bespoke alert logic.",
    capabilities: [
      "Custom object detection, segmentation, and action recognition model training",
      "Site-specific rule engine and multi-camera event correlation",
      "Custom webhook, REST API, Modbus, and PLC integration interfaces",
      "Iterative model fine-tuning for lighting and seasonal variations",
    ],
    applicableIndustries: [
      "Specialized Manufacturing & R&D Facilities",
      "Defense, Aerospace & Critical Infrastructure",
      "Custom Logistics & Automated Warehousing",
      "Process & Chemical Industries",
    ],
    benefits: [
      "Solves domain-specific monitoring challenges that generic software cannot address",
      "Retains complete data ownership and on-premise security",
      "Scales across multiple plants once validated at a pilot site",
    ],
    integrationInfo:
      "Engineered to integrate with your existing cameras, VMS, SCADA, MES, or ERP environment.",
    featuredImage: "/images/ai/custom-ai-video-analytics.png",
    relatedSolutionSlugs: ["industrial-ai-vision-applications", "visual-quality-inspection", "process-quality-monitoring"],
    isFeatured: false,
    sortOrder: 20,
  },
  {
    name: "Industrial AI Vision Applications",
    slug: "industrial-ai-vision-applications",
    categoryCode: "CATEGORY_E",
    shortDescription:
      "End-to-end machine vision systems combining specialized industrial optics, lighting, sensors, edge compute, and PLC automation.",
    overview:
      "Industrial AI Vision Applications combine optical hardware engineering with advanced AI inference for factory-floor automation, robotic guidance, custom OCR/barcode reading, and automated material grading.",
    problemStatement:
      "High-speed industrial inspection and automation require tightly synchronized lighting, optics, triggers, and PLC communication beyond standard CCTV cameras.",
    howItWorks:
      "We design integrated vision cells featuring industrial cameras, specialized illumination (ring, bar, dome, backlights, or structured light), photoelectric triggers, edge GPU processors, and direct PLC handshakes.",
    capabilities: [
      "Industrial OCR, dot-peen, and embossed serial code reading",
      "Automated material sorting, counting, and dimensional verification",
      "Vision-guided robotics and pick-and-place verification",
      "Turnkey optical enclosure and gantry fabrication",
    ],
    applicableIndustries: [
      "Automotive & Precision Machining",
      "Metals, Forging & Casting",
      "Pharmaceuticals & Medical Devices",
      "FMCG & High-Speed Packaging",
    ],
    benefits: [
      "Single-vendor accountability for optics, lighting, AI software, and PLC integration",
      "Built to withstand factory vibration, coolant mist, and ambient light shifts",
      "Directly drives automated sorting and quality gates",
    ],
    integrationInfo:
      "Supports industrial protocols including Digital I/O, Modbus TCP, Ethernet/IP, PROFINET, and OPC-UA.",
    featuredImage: "/images/ai/industrial-ai-vision-applications.png",
    relatedSolutionSlugs: ["custom-ai-video-analytics", "visual-quality-inspection", "hdri-wheel-inspection"],
    isFeatured: false,
    sortOrder: 21,
  },
];

export interface SeedService {
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  coverImage: string;
  features: string[];
  capabilities: string[];
  applications: string[];
  industries: string[];
  relatedServiceSlugs: string[];
  isFeatured: boolean;
  sortOrder: number;
}

export const INITIAL_SERVICES: SeedService[] = [
  {
    name: "Fire Detection & Alarm Systems",
    slug: "fire-detection-alarm-systems",
    shortDescription:
      "Design, supply, installation, testing, and commissioning of addressable and conventional industrial fire detection and alarm networks.",
    longDescription:
      "Zenin Systems provides end-to-end engineering services for Fire Detection & Alarm Systems (FAS) across industrial plants, warehouses, data centers, and commercial facilities. Our scope encompasses site hazard assessment, loop architecture design, multi-sensor detector installation, control panel programming, and emergency interlock integration with HVAC, access control, and PA systems.",
    icon: "Flame",
    coverImage: "/images/services/fire-detection-alarm-systems.png",
    features: [
      "Addressable and conventional fire alarm control panel (FACP) integration",
      "Optical smoke, rate-of-rise heat, multi-criteria, and beam detector deployment",
      "Flame and gas leak detection for hazardous industrial bays",
      "Cause-and-effect programming for elevator homing, damper control, and door release",
    ],
    capabilities: [
      "System Design & Loop Engineering",
      "Cabling, Installation & Termination",
      "Testing, Commissioning & Cause-Effect Verification",
      "Preventive Maintenance & AMC Support",
    ],
    applications: [
      "Manufacturing floors and raw material warehouses",
      "Electrical substations, server rooms, and battery banks",
      "Commercial office buildings and institutional campuses",
    ],
    industries: ["Manufacturing", "Warehousing & Logistics", "Commercial Buildings", "Energy & Utilities"],
    relatedServiceSlugs: ["integrated-building-management", "public-address-systems", "access-control-systems"],
    isFeatured: true,
    sortOrder: 1,
  },
  {
    name: "Integrated Building Management Systems (IBMS)",
    slug: "integrated-building-management",
    shortDescription:
      "Unified monitoring and automation of HVAC, lighting, energy meters, fire safety, access control, and utility subsystems from a central command platform.",
    longDescription:
      "Our Integrated Building Management Systems (IBMS) consolidate disparate mechanical, electrical, plumbing (MEP), and security subsystems into a single supervisory platform. By bridging open protocols (BACnet, Modbus, LonWorks, OPC), we help facility teams optimize occupant comfort, equipment reliability, and operational visibility.",
    icon: "Building2",
    coverImage: "/images/services/integrated-building-management.png",
    features: [
      "Centralized graphical SCADA/BMS workstation visualization",
      "DDC controller programming for chillers, AHUs, pumps, and ventilation",
      "Cross-system alarm correlation between fire, security, and HVAC",
      "Automated scheduling and equipment runtime balancing",
    ],
    capabilities: [
      "IBMS Architecture & DDC Panel Engineering",
      "Multi-Protocol Subsystem Integration",
      "Commissioning & Operator Training",
      "Lifecycle Maintenance & Technical Support",
    ],
    applications: [
      "Corporate headquarters and IT parks",
      "Pharmaceutical cleanrooms and precision manufacturing",
      "Hospitals, airports, and large commercial facilities",
    ],
    industries: ["Commercial Buildings", "Manufacturing", "Infrastructure", "Industrial Plants"],
    relatedServiceSlugs: ["hvac-solutions", "energy-management", "lighting-management"],
    isFeatured: true,
    sortOrder: 2,
  },
  {
    name: "Lighting Management Systems",
    slug: "lighting-management",
    shortDescription:
      "Smart industrial and commercial lighting automation using occupancy sensing, daylight harvesting, DALI/KNX controls, and scheduled zoning.",
    longDescription:
      "Reduce lighting energy waste and extend luminaire lifespan across high-bay warehouses, manufacturing plants, office floors, and outdoor yards. Our Lighting Management Systems combine intelligent sensors, programmable gateways, and centralized dashboards to deliver the right illumination level exactly when and where work is happening.",
    icon: "Lightbulb",
    coverImage: "/images/services/lighting-management.png",
    features: [
      "High-bay aisle occupancy and motion-triggered dimming",
      "Daylight harvesting near skylights and perimeter glazing",
      "Centralized shift-based scheduling and scene control",
      "Luminaire fault monitoring and energy consumption tracking",
    ],
    capabilities: [
      "Lighting Control Design & Zoning",
      "Sensor & Gateway Installation",
      "IBMS Integration & Scene Programming",
      "Ongoing System Support",
    ],
    applications: [
      "High-bay logistics warehouses and fulfillment centers",
      "Production halls and assembly bays",
      "Corporate offices, parking decks, and campus street lighting",
    ],
    industries: ["Warehousing & Logistics", "Commercial Buildings", "Manufacturing", "Infrastructure"],
    relatedServiceSlugs: ["energy-management", "integrated-building-management", "iot-solutions"],
    isFeatured: false,
    sortOrder: 3,
  },
  {
    name: "Energy Management Systems",
    slug: "energy-management",
    shortDescription:
      "Smart sub-metering, power quality monitoring, load profiling, and ISO-aligned energy analytics dashboards for industrial and commercial facilities.",
    longDescription:
      "Gain granular visibility into electrical, water, compressed air, and thermal energy consumption across your plant or building. Our Energy Management Systems (EMS) connect smart multifunction meters and IoT gateways to a centralized analytics platform to identify peak demand spikes, power factor penalties, and equipment inefficiencies.",
    icon: "Zap",
    coverImage: "/images/services/energy-management.png",
    features: [
      "Real-time monitoring of feeders, transformers, DG sets, and utility meters",
      "Power quality, harmonic distortion, and power factor tracking",
      "Department-wise and machine-level energy cost allocation",
      "Automated threshold alarms for abnormal base-load draw",
    ],
    capabilities: [
      "Smart Metering & Modbus/Gateway Networking",
      "EMS Dashboard Configuration & Reporting",
      "Integration with Solar, EV Charging & Utility Panels",
      "Calibration & Maintenance Support",
    ],
    applications: [
      "Energy-intensive manufacturing and process industries",
      "Multi-tenant commercial buildings and IT campuses",
      "Cold storage and utility plants",
    ],
    industries: ["Industrial Plants", "Manufacturing", "Energy & Utilities", "Commercial Buildings"],
    relatedServiceSlugs: ["integrated-building-management", "lighting-management", "iot-solutions"],
    isFeatured: true,
    sortOrder: 4,
  },
  {
    name: "IVR Solutions",
    slug: "ivr-solutions",
    shortDescription:
      "Enterprise Interactive Voice Response (IVR), automated call routing, emergency telephony notification, and helpdesk communication systems.",
    longDescription:
      "Streamline enterprise inbound and outbound voice communications with customizable IVR Solutions. From customer service call trees and internal service desk routing to automated emergency voice alerts for industrial plants, our voice communication solutions integrate seamlessly with IP-PBX and CRM/ticketing platforms.",
    icon: "PhoneCall",
    coverImage: "/images/services/ivr-solutions.png",
    features: [
      "Multi-level menu call routing and department extension forwarding",
      "Automated outbound voice blast for plant emergency notifications",
      "SIP trunk and on-premise/cloud IP-PBX compatibility",
      "Call logging, recording management, and queue analytics",
    ],
    capabilities: [
      "Call Flow Architecture & Voice Prompt Setup",
      "IP-PBX & Telephony Integration",
      "CRM / Helpdesk Webhook Connectivity",
      "System Maintenance & Administration",
    ],
    applications: [
      "Corporate customer support and B2B service desks",
      "Industrial plant emergency alert broadcasting",
      "Automated visitor and vendor status hotlines",
    ],
    industries: ["Commercial Buildings", "Industrial Plants", "Infrastructure", "Warehousing & Logistics"],
    relatedServiceSlugs: ["public-address-systems", "audio-visual-video-conferencing", "iot-solutions"],
    isFeatured: false,
    sortOrder: 5,
  },
  {
    name: "Public Address (PA) Systems",
    slug: "public-address-systems",
    shortDescription:
      "Industrial IP and analog public address, zone paging, background music, and emergency voice evacuation systems for plants and campuses.",
    longDescription:
      "Clear acoustic communication is critical across noisy industrial shop floors, expansive warehouses, and multi-building campuses. Zenin Systems designs and installs Public Address (PA) and Voice Alarm systems engineered for high speech intelligibility, multi-zone paging, and automatic fire alarm override.",
    icon: "Volume2",
    coverImage: "/images/services/public-address-systems.png",
    features: [
      "Multi-zone IP and 100V line amplifier and speaker architectures",
      "Weatherproof horn speakers for high-decibel industrial bays and yards",
      "Ceiling and wall-mount acoustic speakers for offices and corridors",
      "Automated emergency evacuation message integration with Fire Alarm panels",
    ],
    capabilities: [
      "Acoustic Coverage Planning & Speaker Selection",
      "Amplifier Rack Assembly & Field Cabling",
      "Fire Alarm Interlock & Zone Commissioning",
      "Preventive Maintenance Support",
    ],
    applications: [
      "Manufacturing plants and assembly halls",
      "Warehouses, logistics yards, and railway/transport hubs",
      "Corporate buildings, schools, and hospitals",
    ],
    industries: ["Manufacturing", "Industrial Plants", "Warehousing & Logistics", "Commercial Buildings"],
    relatedServiceSlugs: ["fire-detection-alarm-systems", "audio-visual-video-conferencing", "ivr-solutions"],
    isFeatured: false,
    sortOrder: 6,
  },
  {
    name: "Audio Visual & Video Conferencing (AV & VC) Solutions",
    slug: "audio-visual-video-conferencing",
    shortDescription:
      "Turnkey boardroom AV, control room video walls, digital signage, town-hall sound systems, and unified video conferencing rooms.",
    longDescription:
      "Empower executive decision-making and command-center situational awareness with professional Audio Visual & Video Conferencing solutions. We engineer and integrate LED/LCD video walls for security and process control rooms, interactive collaboration spaces, and acoustic-treated conference rooms.",
    icon: "Presentation",
    coverImage: "/images/services/audio-visual-video-conferencing.png",
    features: [
      "24/7 command-and-control room multi-screen video walls and controllers",
      "Boardroom and training room PTZ conferencing cameras and beamforming mics",
      "Wireless presentation, matrix switching, and touch-panel room control",
      "Corporate lobby and plant safety KPI digital signage networks",
    ],
    capabilities: [
      "AV System Engineering & Schematic Design",
      "Display, Audio & Control Hardware Integration",
      "Control Room Ergonomic & VMS Wall Calibration",
      "On-Site Technical Support & AMC",
    ],
    applications: [
      "Security and SCADA central command rooms",
      "Executive boardrooms, huddle rooms, and auditoriums",
      "Plant floor safety and production KPI display boards",
    ],
    industries: ["Commercial Buildings", "Industrial Plants", "Manufacturing", "Infrastructure"],
    relatedServiceSlugs: ["public-address-systems", "integrated-building-management", "ivr-solutions"],
    isFeatured: true,
    sortOrder: 7,
  },
  {
    name: "HVAC Solutions",
    slug: "hvac-solutions",
    shortDescription:
      "Industrial ventilation, precision air conditioning, chiller/AHU automation controls, and indoor air quality monitoring.",
    longDescription:
      "Maintain optimal thermal conditions and air quality for both personnel and sensitive electronic/industrial equipment. Our HVAC Solutions cover ventilation engineering, precision cooling for server and electrical rooms, and automated DDC control upgrades for chillers, Variable Air Volume (VAV) boxes, and Air Handling Units (AHUs).",
    icon: "Wind",
    coverImage: "/images/services/hvac-solutions.png",
    features: [
      "AHU, FCU, VAV, and chiller plant instrumentation and control automation",
      "Server room and UPS/electrical room precision temperature & humidity monitoring",
      "Industrial exhaust, fresh-air makeup, and fume extraction control",
      "CO2, differential pressure, and indoor air quality sensor integration",
    ],
    capabilities: [
      "HVAC Control & Instrumentation Engineering",
      "Installation, Testing & Air Balancing",
      "IBMS & Fire Damper Interlock Integration",
      "Scheduled Maintenance & Servicing",
    ],
    applications: [
      "Data centers, telecom rooms, and electrical substations",
      "Pharmaceutical, food processing, and clean manufacturing",
      "Commercial office buildings and R&D labs",
    ],
    industries: ["Industrial Plants", "Commercial Buildings", "Manufacturing", "Energy & Utilities"],
    relatedServiceSlugs: ["integrated-building-management", "energy-management", "fire-detection-alarm-systems"],
    isFeatured: false,
    sortOrder: 8,
  },
  {
    name: "Intelligent Fencing Solutions",
    slug: "intelligent-fencing",
    shortDescription:
      "Perimeter intrusion detection fencing, vibration/strain sensor cables, non-lethal energized deterrent systems, and CCTV-synchronized zone alarms.",
    longDescription:
      "Secure the physical boundary of critical facilities with Intelligent Fencing Solutions. By instrumenting perimeter fences and walls with zone-based intrusion sensors and integrating them directly with perimeter CCTV, PTZ cameras, and lighting, security teams receive immediate, pinpointed alerts upon any tampering or climbing attempt.",
    icon: "Shield",
    coverImage: "/images/services/intelligent-fencing.png",
    features: [
      "Zone-based fence vibration, cut, and climb detection sensors",
      "Automated PTZ camera preset call-up to the exact breached fence zone",
      "Integration with perimeter floodlights, sirens, and IP horn speakers",
      "Centralized graphical perimeter map for security command centers",
    ],
    capabilities: [
      "Perimeter Threat Survey & Zone Design",
      "Fence Sensor & Controller Installation",
      "VMS & AI Perimeter Analytics Synchronization",
      "Ongoing Calibration & Maintenance",
    ],
    applications: [
      "Solar parks, power plants, and electrical substations",
      "Refineries, tank farms, and chemical storage yards",
      "Bonded warehouses, logistics hubs, and defense/infrastructure sites",
    ],
    industries: ["Energy & Utilities", "Industrial Plants", "Warehousing & Logistics", "Infrastructure"],
    relatedServiceSlugs: ["access-control-systems", "iot-solutions", "parking-management"],
    isFeatured: false,
    sortOrder: 9,
  },
  {
    name: "Access Control Systems",
    slug: "access-control-systems",
    shortDescription:
      "Enterprise biometric, smart-card, mobile credential, turnstile, flap barrier, and visitor management systems integrated with workforce attendance.",
    longDescription:
      "Regulate and audit movement across facility gates, production zones, server rooms, and corporate offices. Zenin Systems delivers scalable Access Control Systems combining multi-factor readers, pedestrian turnstiles, electromagnetic door locks, and centralized identity management with emergency fire-release fail-safes.",
    icon: "KeyRound",
    coverImage: "/images/services/access-control-systems.png",
    features: [
      "Biometric (face/fingerprint), RFID smart card, and PIN access controllers",
      "Full-height and tripod turnstiles, flap barriers, and speed gates",
      "Multi-door anti-passback, interlocking airlocks, and zone muster reporting",
      "Direct fire alarm integration for automatic emergency door release",
    ],
    capabilities: [
      "Access Security Architecture & Door Hardware Selection",
      "Controller, Reader & Turnstile Installation",
      "HRMS/Attendance & Visitor Management Integration",
      "System Maintenance & Support",
    ],
    applications: [
      "Industrial plant gates and time-attendance checkpoints",
      "Data centers, R&D labs, and electrical rooms",
      "Corporate offices and multi-tenant buildings",
    ],
    industries: ["Manufacturing", "Commercial Buildings", "Industrial Plants", "Warehousing & Logistics"],
    relatedServiceSlugs: ["parking-management", "fire-detection-alarm-systems", "intelligent-fencing"],
    isFeatured: true,
    sortOrder: 10,
  },
  {
    name: "IoT Solutions",
    slug: "iot-solutions",
    shortDescription:
      "Industrial IoT (IIoT) sensor networks, environmental telemetry, asset condition monitoring, and cloud/on-premise data dashboards.",
    longDescription:
      "Connect physical industrial assets and facility environments to real-time digital dashboards. Our IoT Solutions deploy wired and wireless industrial sensors (temperature, humidity, vibration, pressure, tank level, air quality, and door/asset state) across plants and warehouses to enable predictive maintenance and automated alerts.",
    icon: "Radio",
    coverImage: "/images/services/iot-solutions.png",
    features: [
      "Industrial wireless (LoRaWAN / Wi-Fi / Cellular) and wired (RS-485 / Modbus) sensor gateways",
      "Cold-chain, warehouse, and cleanroom temperature & humidity logging",
      "Rotating machinery vibration and surface temperature telemetry",
      "Real-time threshold alerting via SMS, email, and web dashboards",
    ],
    capabilities: [
      "IIoT Sensor Selection & Gateway Architecture",
      "Field Deployment & PLC/SCADA Bridging",
      "Custom Telemetry Dashboard Configuration",
      "Lifecycle Support & Sensor Calibration",
    ],
    applications: [
      "Cold storage and pharmaceutical warehouse monitoring",
      "Utility equipment, DG set, and water tank level tracking",
      "Smart factory environmental and asset health monitoring",
    ],
    industries: ["Manufacturing", "Warehousing & Logistics", "Industrial Plants", "Energy & Utilities"],
    relatedServiceSlugs: ["energy-management", "integrated-building-management", "hvac-solutions"],
    isFeatured: true,
    sortOrder: 11,
  },
  {
    name: "Parking Management Systems",
    slug: "parking-management",
    shortDescription:
      "Automated boom barriers, UHF RFID & ANPR vehicle access, bay occupancy sensors, LED guidance displays, and industrial yard traffic control.",
    longDescription:
      "Eliminate congestion and unauthorized parking across corporate campuses, commercial complexes, and industrial logistics yards. Our Parking Management Systems combine heavy-duty boom barriers, long-range UHF RFID tags, ANPR camera verification, and ultrasonic/camera bay guidance into a seamless vehicle flow architecture.",
    icon: "Car",
    coverImage: "/images/services/parking-management.png",
    features: [
      "Heavy-duty industrial boom barriers, bollards, and spike barriers",
      "Hands-free UHF RFID and ANPR-based authorized vehicle entry",
      "Slot occupancy sensors and dynamic LED parking availability displays",
      "Visitor pass and commercial truck dock-slot check-in workflows",
    ],
    capabilities: [
      "Traffic Flow & Gate Lane Engineering",
      "Barrier, Loop Detector & Reader Installation",
      "ANPR & Access Control Integration",
      "AMC & Rapid Field Servicing",
    ],
    applications: [
      "Corporate campuses and commercial office towers",
      "Industrial plant gates and truck holding yards",
      "Residential townships, hospitals, and public infrastructure",
    ],
    industries: ["Commercial Buildings", "Warehousing & Logistics", "Infrastructure", "Manufacturing"],
    relatedServiceSlugs: ["access-control-systems", "intelligent-fencing", "iot-solutions"],
    isFeatured: false,
    sortOrder: 12,
  },
];

export const INITIAL_INDUSTRIES = [
  {
    name: "Manufacturing",
    slug: "manufacturing",
    shortDescription:
      "Integrated shop-floor CCTV, AI PPE & SOP safety analytics, visual quality inspection, fire detection, and machine automation.",
    applications: [
      "Shop-floor PPE & Danger Zone AI Monitoring",
      "Visual Quality & Surface Defect Inspection",
      "Fire Detection, PA & Access Control Integration",
    ],
    icon: "Factory",
    coverImage: "/images/industries/manufacturing.png",
    sortOrder: 1,
  },
  {
    name: "Industrial Plants",
    slug: "industrial-plants",
    shortDescription:
      "Ruggedized surveillance, thermal & electrical panel monitoring, conveyor belt analytics, and plant-wide safety systems for heavy industry.",
    applications: [
      "Radiometric Thermal & Electrical Panel Monitoring",
      "Conveyor Belt & Chimney Smoke Analytics",
      "Perimeter Security & Intelligent Fencing",
    ],
    icon: "Cpu",
    coverImage: "/images/industries/industrial-plants.png",
    sortOrder: 2,
  },
  {
    name: "Warehousing & Logistics",
    slug: "warehousing-logistics",
    shortDescription:
      "Automated ANPR gate workflows, loading dock surveillance, high-bay fire/smoke video detection, and smart lighting management.",
    applications: [
      "ANPR Gate & Weighbridge Automation",
      "High-Bay Video Fire & Smoke Detection",
      "People, Forklift & Vehicle Speed Monitoring",
    ],
    icon: "Warehouse",
    coverImage: "/images/industries/warehousing-logistics.png",
    sortOrder: 3,
  },
  {
    name: "Commercial Buildings",
    slug: "commercial-buildings",
    shortDescription:
      "Integrated Building Management Systems (IBMS), biometric access control, parking automation, HVAC controls, and boardroom AV.",
    applications: [
      "Centralized IBMS, HVAC & Energy Management",
      "Access Control, Turnstiles & Parking Management",
      "Fire Alarm, PA & Boardroom AV Integration",
    ],
    icon: "Building2",
    coverImage: "/images/industries/commercial-buildings.png",
    sortOrder: 4,
  },
  {
    name: "Infrastructure",
    slug: "infrastructure",
    shortDescription:
      "Central command room VMS walls, long-range perimeter surveillance, ANPR traffic analytics, and public address systems.",
    applications: [
      "Central Command Center VMS & Video Walls",
      "Long-Range PTZ & Perimeter Intrusion Analytics",
      "Public Address, EV Charging & Smart Lighting",
    ],
    icon: "Network",
    coverImage: "/images/industries/infrastructure.png",
    sortOrder: 5,
  },
  {
    name: "Energy & Utilities",
    slug: "energy-utilities",
    shortDescription:
      "Substation thermal monitoring, solar perimeter fencing, switchgear hotspot detection, and remote IIoT telemetry.",
    applications: [
      "Substation & Switchgear Thermal Monitoring",
      "Intelligent Perimeter Fencing & Intrusion AI",
      "Smart Energy Metering & IIoT Telemetry",
    ],
    icon: "Zap",
    coverImage: "/images/industries/energy-utilities.png",
    sortOrder: 6,
  },
];

export const INITIAL_PAGE_CONTENTS = [
  {
    pageKey: "home",
    sectionKey: "hero",
    title: "Intelligent Technology. Safer Industries. Smarter Operations.",
    subtitle: "ENTERPRISE INDUSTRIAL TECHNOLOGY & ENGINEERING SOLUTIONS",
    content: JSON.stringify({
      description:
        "Explore integrated industrial surveillance, AI-powered video analytics, intelligent automation, and engineering solutions designed for modern operations.",
      primaryCtaText: "Explore Our Solutions",
      primaryCtaHref: "/products",
      secondaryCtaText: "Request a Quote",
      secondaryCtaHref: "/contact-us",
      heroImage: "/images/hero/hero-command-center.png",
      highlights: [
        "Industrial CCTV & Network Video Infrastructure",
        "21 Specialized AI Video Analytics Applications",
        "12 Core Facility & Engineering Service Verticals",
        "End-to-End Integration, Commissioning & Support",
      ],
    }),
  },
  {
    pageKey: "home",
    sectionKey: "about_preview",
    title: "Engineering Integrated Security, Vision & Automation Systems",
    subtitle: "About Zenin Systems",
    content: JSON.stringify({
      introduction:
        "Zenin Systems Solutions LLP is a specialized B2B technology and engineering solutions provider focused on industrial security, AI video analytics, building management, fire safety, and plant automation infrastructure.",
      secondaryParagraph:
        "We work with industrial plants, manufacturing facilities, logistics hubs, and commercial enterprises to design, supply, integrate, and maintain reliable technology systems tailored to operational and safety requirements.",
      image: "/images/hero/about-engineering.png",
      capabilities: [
        "Industrial CCTV & Multi-Site Video Management",
        "AI Computer Vision for Safety, Security & Quality",
        "Fire Detection, IBMS, Access Control & HVAC Automation",
        "Industrial Electrical, Cabling & Custom Panel Fabrication",
      ],
      ctaText: "Learn More About Us",
      ctaHref: "/about-us",
    }),
  },
  {
    pageKey: "home",
    sectionKey: "why_choose_us",
    title: "Engineered for Industrial Reliability and Operational Scale",
    subtitle: "Why Choose Zenin Systems",
    content: JSON.stringify({
      description:
        "Our approach combines hardware engineering, computer vision intelligence, and field integration expertise to deliver cohesive systems built for demanding industrial environments.",
      pillars: [
        {
          title: "Integrated Technology Solutions",
          description:
            "Unified architecture connecting surveillance, AI analytics, fire safety, access control, and building automation under cohesive operational workflows.",
          icon: "Layers",
        },
        {
          title: "Industrial Application Focus",
          description:
            "Purpose-built solutions designed for manufacturing floors, warehouses, utilities, and high-compliance industrial environments.",
          icon: "Factory",
        },
        {
          title: "Scalable Systems",
          description:
            "Modular architectures that grow from a single pilot zone or production line to multi-plant enterprise command centers.",
          icon: "Maximize2",
        },
        {
          title: "Customized Engineering",
          description:
            "Tailored system design, custom AI model workflows, and bespoke panel fabrication matched to your site specifications.",
          icon: "Sliders",
        },
        {
          title: "Installation and Integration",
          description:
            "Structured cabling, field hardware mounting, PLC/VMS interfacing, testing, and systematic commissioning.",
          icon: "Wrench",
        },
        {
          title: "Technical Support",
          description:
            "Dedicated lifecycle maintenance, system calibration, operator training, and responsive engineering support.",
          icon: "Headset",
        },
      ],
    }),
  },
  {
    pageKey: "about",
    sectionKey: "corporate_profile",
    title: "Engineering Intelligent Infrastructure for Safer, Smarter Operations",
    subtitle: "ABOUT ZENIN SYSTEMS SOLUTIONS LLP",
    content: JSON.stringify({
      overview:
        "Zenin Systems Solutions LLP is a B2B industrial technology and engineering solutions company delivering integrated systems across Industrial CCTV Surveillance, AI Video Analytics, Video Management, Intelligent Automation, Fire Safety, Integrated Building Management (IBMS), and Industrial Engineering Supplies.",
      extendedOverview:
        "Rather than operating as a generic IT hardware reseller, Zenin Systems focuses on complete operational solutions—bridging optical sensors, edge AI computing, electromechanical automation, and facility management systems into dependable enterprise infrastructure. [Editable corporate overview — company history milestones can be updated via Admin CMS]",
      mission:
        "To empower industrial and commercial organizations with reliable surveillance, intelligent computer vision, safety automation, and engineering systems that protect people, optimize processes, and strengthen operational resilience.",
      vision:
        "To be a trusted engineering partner for intelligent industrial security, AI vision analytics, and integrated facility automation across manufacturing, infrastructure, and enterprise sectors.",
      capabilities: [
        {
          title: "System Architecture & Site Engineering",
          description:
            "Detailed site surveys, camera coverage optics, network topology planning, and BOQ engineering aligned with industrial operational requirements.",
        },
        {
          title: "AI Video Analytics & Machine Vision",
          description:
            "Deployment of 21+ specialized computer vision applications across safety compliance, perimeter security, surface quality inspection, and thermal monitoring.",
        },
        {
          title: "Building & Plant Automation",
          description:
            "End-to-end implementation of IBMS, Fire Detection & Alarm Systems, HVAC controls, Smart Lighting, Energy Management, and Access Control.",
        },
        {
          title: "Industrial Supply & Custom Fabrication",
          description:
            "Consolidated procurement and assembly of industrial cables, switchgear, hydraulics/pneumatics, EV chargers, and custom control panels.",
        },
      ],
      certificationsNote: "", // Empty by default so unverified certifications are omitted per Phase 6 rules
    }),
  },
  {
    pageKey: "contact",
    sectionKey: "details",
    title: "Connect With Our Engineering & Solutions Team",
    subtitle: "CONTACT & PROJECT CONSULTATION",
    content: JSON.stringify({
      heading: "Let's Discuss Your Industrial Technology Requirements",
      description:
        "Reach out to Zenin Systems Solutions LLP for technical consultations, site surveys, solution demonstrations, or customized project quotations.",
      address: "Corporate Solutions & Engineering Centre, Zenin Systems Solutions LLP, India",
      phone: "+91 98450 12345 / +91 (0) 80 4123 4567",
      email: "info@zeninsystems.com",
      workingHours: "Monday – Saturday: 9:30 AM – 6:30 PM IST",
      mapEmbedUrl: "", // Empty until verified company location URL is configured in Admin
    }),
  },
  {
    pageKey: "legal",
    sectionKey: "privacy_policy",
    title: "Privacy Policy",
    subtitle: "DATA PROTECTION & PRIVACY NOTICE",
    content: JSON.stringify({
      lastUpdated: "November 2026",
      sections: [
        {
          heading: "1. Information We Collect",
          body: "When you submit a business enquiry or quote request on the Zenin Systems Solutions LLP website, we collect your name, company name, business email address, phone number, project location, and enquiry details solely to respond to your request.",
        },
        {
          heading: "2. How We Use Business Enquiry Data",
          body: "Submitted contact and project requirements are accessed only by authorized Zenin Systems personnel to prepare technical proposals, schedule consultations, and provide requested product or service information.",
        },
        {
          heading: "3. Data Security & Retention",
          body: "We implement server-side validation, encrypted transport, and role-based access controls to protect submitted B2B enquiry records. We do not sell or rent business contact information to third parties.",
        },
      ],
    }),
  },
  {
    pageKey: "legal",
    sectionKey: "terms_and_conditions",
    title: "Terms and Conditions",
    subtitle: "WEBSITE USAGE & B2B CATALOG TERMS",
    content: JSON.stringify({
      lastUpdated: "November 2026",
      sections: [
        {
          heading: "1. Informational & Enquiry Scope",
          body: "The Zenin Systems Solutions LLP website serves as a B2B corporate catalog and project enquiry portal. Product descriptions, AI solution overviews, and service architectures represent engineering capabilities and are customized per project site survey and formal commercial proposal.",
        },
        {
          heading: "2. Technical Specifications & Proposals",
          body: "Final technical specifications, camera/sensor models, detection parameters, and compliance certifications are governed exclusively by signed project quotations and Statement of Work (SOW) documents.",
        },
        {
          heading: "3. Intellectual Property",
          body: "All text, structure, graphics, and design elements on this website are the property of Zenin Systems Solutions LLP or their respective licensed owners.",
        },
      ],
    }),
  },
];

export const INITIAL_SITE_SETTINGS = [
  {
    key: "company_name",
    value: "Zenin Systems Solutions LLP",
    group: "general",
    description: "Official legal company name",
  },
  {
    key: "company_tagline",
    value: "Industrial Security, AI Video Analytics & Engineering Solutions",
    group: "general",
    description: "Primary brand positioning line",
  },
  {
    key: "announcement_enabled",
    value: "false",
    group: "announcement",
    description: "Toggle top announcement bar visibility",
  },
  {
    key: "announcement_text",
    value: "Enterprise AI Video Analytics & Industrial Automation Solutions — Request a Technical Consultation.",
    group: "announcement",
    description: "Announcement bar text",
  },
  {
    key: "contact_address",
    value: "Corporate Solutions & Engineering Centre, Zenin Systems Solutions LLP, India",
    group: "contact",
    description: "Official corporate address",
  },
  {
    key: "contact_email",
    value: "contact@zeninsystems.com",
    group: "contact",
    description: "Primary business enquiry email",
  },
  {
    key: "contact_phone",
    value: "+91 98450 12345 / +91 (0) 80 4123 4567",
    group: "contact",
    description: "Primary business phone number",
  },
  {
    key: "contact_map_url",
    value: "",
    group: "contact",
    description: "Verified Google Maps embed URL (leave blank until verified)",
  },
  {
    key: "social_linkedin",
    value: "",
    group: "contact",
    description: "Official LinkedIn profile URL",
  },
  {
    key: "social_youtube",
    value: "",
    group: "contact",
    description: "Official YouTube channel URL",
  },
  {
    key: "nav_show_brands",
    value: "true",
    group: "navigation",
    description: "Show Brands page link in main navigation",
  },
  {
    key: "nav_show_testimonials",
    value: "true",
    group: "navigation",
    description: "Show Testimonials page link in main navigation",
  },
  {
    key: "nav_show_legal",
    value: "true",
    group: "navigation",
    description: "Show Privacy Policy and Terms links in footer",
  },
  {
    key: "seo_default_title",
    value: "Zenin Systems Solutions LLP | Industrial CCTV, AI Video Analytics & Automation",
    group: "seo",
    description: "Default site meta title",
  },
  {
    key: "seo_default_description",
    value: "Enterprise industrial CCTV surveillance, 21+ AI video analytics solutions, video management systems, building automation (IBMS), fire safety, and engineering solutions by Zenin Systems Solutions LLP.",
    group: "seo",
    description: "Default site meta description",
  },
];
