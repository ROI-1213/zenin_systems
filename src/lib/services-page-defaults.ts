export interface ServicesIconCard {
  title: string;
  description: string;
  icon: string;
}

export interface ServicesPageDefaults {
  banner: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      description: string;
      primaryCtaText: string;
      quoteTopic: string;
    };
  };
  catalog: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      description: string;
      showNumberBadges: boolean;
      featuresPerCard: string;
      exploreButtonText: string;
      quoteButtonText: string;
    };
  };
  lifecycle: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      description: string;
      pillars: ServicesIconCard[];
    };
  };
  why_services: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      description: string;
      items: ServicesIconCard[];
    };
  };
  enquiry: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      description: string;
      quoteTopic: string;
    };
  };
  detail_labels: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      bannerBadge: string;
      quoteButtonPrefix: string;
      backButtonText: string;
      overviewEyebrow: string;
      overviewTitle: string;
      featuresTitle: string;
      capabilitiesTitle: string;
      showLifecycleBadges: boolean;
      applicationsTitle: string;
      industriesTitle: string;
      quoteEyebrow: string;
      quoteTitlePrefix: string;
      quoteNote: string;
      relatedTitle: string;
      relatedLinkText: string;
    };
  };
}

export const SERVICES_PAGE_DEFAULTS: ServicesPageDefaults = {
  banner: {
    title: "Integrated Industrial, Safety & Building Engineering Services",
    subtitle: "13 Specialized Engineering Service Verticals",
    data: {
      enabled: true,
      description:
        "From Fire Detection and Integrated Building Management (IBMS) to Access Control, HVAC, Smart Lighting, Energy Management, IIoT, and Customized Fabrication—Zenin Systems delivers complete lifecycle engineering for industrial and commercial facilities.",
      primaryCtaText: "Request a Service Consultation & Quote",
      quoteTopic: "Engineering & Integration Services",
    },
  },
  catalog: {
    title: "Our 13 Core Engineering Service Verticals",
    subtitle: "Service Catalog",
    data: {
      enabled: true,
      description:
        "Select any service domain below to explore technical capabilities, industrial applications, and project enquiry options.",
      showNumberBadges: true,
      featuresPerCard: "2",
      exploreButtonText: "Explore Service",
      quoteButtonText: "Quote",
    },
  },
  lifecycle: {
    title: "Cross-Service Engineering & Execution Capabilities",
    subtitle: "Lifecycle Delivery Model",
    data: {
      enabled: true,
      description:
        "Every Zenin Systems service engagement is backed by structured project delivery—from initial system integration engineering to long-term technical support.",
      pillars: [
        {
          title: "System Integration",
          description:
            "Multi-protocol interfacing (BACnet, Modbus, ONVIF, SIP, Dry Contacts) connecting security, fire, and building automation subsystems.",
          icon: "Layers",
        },
        {
          title: "Installation",
          description:
            "Structured field cabling, containment routing, rack assembly, and industrial sensor/device mounting by trained site technicians.",
          icon: "Wrench",
        },
        {
          title: "Commissioning",
          description:
            "Systematic point-to-point verification, loop testing, cause-and-effect interlock validation, and operator handover.",
          icon: "Sliders",
        },
        {
          title: "Maintenance",
          description:
            "Scheduled preventive maintenance visits, detector cleaning, calibration checks, and Annual Maintenance Contracts (AMC).",
          icon: "ShieldCheck",
        },
        {
          title: "Technical Support",
          description:
            "Responsive remote diagnostics, on-site troubleshooting, firmware updates, and system expansion support.",
          icon: "Headset",
        },
      ],
    },
  },
  why_services: {
    title: "Why Facilities Choose Zenin Engineering Services",
    subtitle: "Service Advantages",
    data: {
      enabled: true,
      description:
        "One accountable engineering partner for design, supply, installation, integration, and long-term support across all facility systems.",
      items: [
        {
          title: "Single-Point Accountability",
          description:
            "One team owns design, supply, installation, and commissioning—no finger-pointing between multiple vendors.",
          icon: "CheckCircle2",
        },
        {
          title: "Industrial-Grade Engineering",
          description:
            "Systems specified for dust, heat, vibration, and 24/7 operation in plants, warehouses, and utilities.",
          icon: "Factory",
        },
        {
          title: "Integrated Architecture",
          description:
            "Fire, security, CCTV, access control, and building automation connected into unified workflows.",
          icon: "Network",
        },
        {
          title: "Custom Fabrication In-House",
          description:
            "Camera poles, brackets, enclosures, and water-cooled jackets fabricated to your exact site requirements.",
          icon: "Wrench",
        },
      ],
    },
  },
  enquiry: {
    title: "Request an Engineering Service Proposal",
    subtitle: "Project Enquiry",
    data: {
      enabled: true,
      description:
        "Specify your facility location and the service vertical(s) required for your project.",
      quoteTopic: "Engineering & Facility Services",
    },
  },
  detail_labels: {
    title: "Individual Service Page Labels",
    subtitle: "Applies to all 13 service detail pages",
    data: {
      enabled: true,
      bannerBadge: "Turnkey Engineering Service",
      quoteButtonPrefix: "Request Quote —",
      backButtonText: "All 13 Services",
      overviewEyebrow: "Service Overview",
      overviewTitle: "Engineering Scope & Architecture",
      featuresTitle: "Key Features",
      capabilitiesTitle: "Delivery & Integration Capabilities",
      showLifecycleBadges: true,
      applicationsTitle: "Typical Applications",
      industriesTitle: "Industries Served",
      quoteEyebrow: "Direct Service Attribution",
      quoteTitlePrefix: "Request a Proposal for",
      quoteNote: "Your request is automatically linked to",
      relatedTitle: "Related Engineering Services",
      relatedLinkText: "View All 13 Services →",
    },
  },
};
