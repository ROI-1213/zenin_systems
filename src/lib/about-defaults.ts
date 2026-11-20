export interface AboutCardItem {
  title: string;
  description: string;
}

export interface AboutSectionDefaults {
  banner: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      overview: string;
    };
  };
  corporate_overview: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      overview: string;
      extendedOverview: string;
      highlights: AboutCardItem[];
    };
  };
  mission_vision: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      missionTitle: string;
      mission: string;
      visionTitle: string;
      vision: string;
    };
  };
  capabilities: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      description: string;
      items: AboutCardItem[];
    };
  };
  why_choose_us: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      description: string;
    };
  };
  industries_section: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      description: string;
    };
  };
  certifications: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      certificationsNote: string;
    };
  };
  contact_cta: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      description: string;
      primaryCtaText: string;
      quoteTopic: string;
      secondaryCtaText: string;
      secondaryCtaHref: string;
    };
  };
}

export const ABOUT_SECTION_DEFAULTS: AboutSectionDefaults = {
  banner: {
    title: "Engineering Intelligent Infrastructure for Safer, Smarter Operations",
    subtitle: "ABOUT ZENIN SYSTEMS SOLUTIONS LLP",
    data: {
      enabled: true,
      overview:
        "Zenin Systems Solutions LLP is an industrial technology and engineering solutions company delivering integrated systems across Industrial CCTV Surveillance, AI Video Analytics, Video Management, Intelligent Automation, Fire Safety, Integrated Building Management (IBMS), and Industrial Engineering Supplies.",
    },
  },
  corporate_overview: {
    title: "Integrated Industrial Technology & Engineering Partner",
    subtitle: "Corporate Overview",
    data: {
      enabled: true,
      overview:
        "Zenin Systems Solutions LLP is an industrial technology and engineering solutions company delivering integrated systems across Industrial CCTV Surveillance, AI Video Analytics, Video Management, Intelligent Automation, Fire Safety, Integrated Building Management (IBMS), and Industrial Engineering Supplies.",
      extendedOverview:
        "Rather than operating as a generic IT hardware reseller, Zenin Systems focuses on complete operational solutions—bridging optical sensors, edge AI computing, electromechanical automation, and facility management systems into dependable enterprise infrastructure.",
      highlights: [
        {
          title: "Surveillance & AI Vision",
          description:
            "Industrial CCTV, Central VMS, and 21 specialized AI video analytics applications for safety, security, and quality control.",
        },
        {
          title: "Facility & Plant Systems",
          description:
            "13 turnkey service verticals including Fire Alarm, IBMS, Access Control, HVAC, PA, Customized Fabrication, EV Charging, and Industrial Supplies.",
        },
      ],
    },
  },
  mission_vision: {
    title: "Mission & Vision",
    subtitle: "Guiding Purpose",
    data: {
      enabled: true,
      missionTitle: "Our Mission",
      mission:
        "To empower industrial and commercial organizations with reliable surveillance, intelligent computer vision, safety automation, and engineering systems that protect people, optimize processes, and strengthen operational resilience.",
      visionTitle: "Our Vision",
      vision:
        "To be a trusted engineering partner for intelligent industrial security, AI vision analytics, and integrated facility automation across manufacturing, infrastructure, and enterprise sectors.",
    },
  },
  capabilities: {
    title: "Expertise & Engineering Capabilities",
    subtitle: "Technical Domains",
    data: {
      enabled: true,
      description:
        "End-to-end execution across hardware selection, AI vision model deployment, field installation, system integration, and lifecycle maintenance.",
      items: [
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
            "Consolidated procurement and assembly of industrial cables, switchgear, hydraulics/pneumatics, water-cooling camera jackets, EV chargers, and custom control panels.",
        },
      ],
    },
  },
  why_choose_us: {
    title: "Why Choose Zenin Systems",
    subtitle: "Enterprise Value Proposition",
    data: {
      enabled: true,
      description:
        "Our approach combines hardware engineering, computer vision intelligence, and field integration expertise to deliver cohesive systems built for demanding industrial environments.",
    },
  },
  industries_section: {
    title: "Industries We Serve",
    subtitle: "Target Verticals",
    data: {
      enabled: true,
      description:
        "Tailored surveillance, AI monitoring, and facility automation solutions for industrial and commercial environments.",
    },
  },
  certifications: {
    title: "Certifications & Technology Partners",
    subtitle: "Verified Credentials",
    data: {
      enabled: true,
      certificationsNote: "",
    },
  },
  contact_cta: {
    title: "Ready to Upgrade Your Facility Security or Industrial Automation?",
    subtitle: "Partner With Zenin Systems",
    data: {
      enabled: true,
      description:
        "Speak with our engineering team for a comprehensive site review or project proposal.",
      primaryCtaText: "Request a Quote",
      quoteTopic: "Corporate / Multi-System Consultation",
      secondaryCtaText: "Contact Desk",
      secondaryCtaHref: "/contact-us",
    },
  },
};
