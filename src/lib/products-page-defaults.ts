export interface ProductsPageDefaults {
  banner: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      description: string;
    };
  };
  core_groups: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      description: string;
      exploreButtonText: string;
      enquireButtonText: string;
    };
  };
  featured_systems: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      description: string;
    };
  };
  wider_portfolio: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      description: string;
      defaultLabel: string;
      quoteButtonText: string;
    };
  };
  cctv_hub: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      description: string;
      primaryCtaText: string;
    };
  };
  ai_hub: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      description: string;
      primaryCtaText: string;
    };
  };
  vms_hub: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      description: string;
      primaryCtaText: string;
    };
  };
  automation_hub: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      description: string;
      primaryCtaText: string;
    };
  };
}

export const PRODUCTS_PAGE_DEFAULTS: ProductsPageDefaults = {
  banner: {
    title: "Industrial Products, AI Vision & Turnkey Technology Solutions",
    subtitle: "Industrial Technology Solutions & Engineering Supplies",
    data: {
      enabled: true,
      description:
        "Our catalog spans four flagship engineering solution suites alongside a comprehensive portfolio of industrial surveillance, safety, electrical, automation, valves & pumps, and infrastructure hardware.",
    },
  },
  core_groups: {
    title: "Four Core Solution Groups",
    subtitle: "Primary Solution Pillars",
    data: {
      enabled: true,
      description:
        "Dedicated engineering architectures for industrial video surveillance, AI computer vision, centralized video management, and intelligent plant automation.",
      exploreButtonText: "Explore Hub",
      enquireButtonText: "Enquire",
    },
  },
  featured_systems: {
    title: "Featured Systems & Solution Configurations",
    subtitle: "Configured Systems & Hardware",
    data: {
      enabled: true,
      description:
        "Filter our representative industrial systems and request a customized quotation matched to your facility requirements.",
    },
  },
  wider_portfolio: {
    title: "Wider Industrial Product & Material Portfolio",
    subtitle: "Comprehensive Supply & Integration Scope",
    data: {
      enabled: true,
      description:
        "Beyond our four core solution hubs, Zenin Systems supplies and integrates a broad spectrum of industrial security, safety, electrical, fluid power, valves & pumps, and project fabrication materials.",
      defaultLabel: "Project Supply & Integration",
      quoteButtonText: "Request BOQ Quote",
    },
  },
  cctv_hub: {
    title: "Industrial CCTV & Video Surveillance",
    subtitle: "CORE SOLUTION PILLAR 01",
    data: {
      enabled: true,
      description:
        "Enterprise-grade industrial surveillance architectures, ruggedized camera systems, water-cooling protective jackets, and network video infrastructure engineered for demanding environments.",
      primaryCtaText: "Request CCTV Site Survey",
    },
  },
  ai_hub: {
    title: "AI Video Analytics & Computer Vision",
    subtitle: "CORE SOLUTION PILLAR 02 • 21 SPECIALIZED APPLICATIONS",
    data: {
      enabled: true,
      description:
        "Transform passive industrial CCTV streams into proactive safety, perimeter security, ANPR & vehicle speed enforcement, surface defect inspection, and thermal/furnace monitoring intelligence.",
      primaryCtaText: "Request AI Vision Demo",
    },
  },
  vms_hub: {
    title: "Enterprise Video Management Solutions (VMS)",
    subtitle: "CORE SOLUTION PILLAR 03",
    data: {
      enabled: true,
      description:
        "Centralized command-room visualization, multi-site recording redundancy, unified AI alert triage, and high-availability surveillance orchestration.",
      primaryCtaText: "Request VMS Architecture Proposal",
    },
  },
  automation_hub: {
    title: "Intelligent Industrial Automation Solutions",
    subtitle: "CORE SOLUTION PILLAR 04",
    data: {
      enabled: true,
      description:
        "Bridge visual AI intelligence and physical plant execution—connecting ANPR gates, weighbridges, PLC/SCADA interlocks, and facility management workflows.",
      primaryCtaText: "Request Automation Consultation",
    },
  },
};
