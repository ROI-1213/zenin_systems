export interface HomeWhyChoosePillar {
  title: string;
  description: string;
  icon: string;
}

export interface HomeSectionDefaults {
  hero: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      description: string;
      primaryCtaText: string;
      primaryCtaHref: string;
      secondaryCtaText: string;
      secondaryCtaHref: string;
      heroImage: string;
      highlights: string[];
    };
  };
  about_preview: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      introduction: string;
      secondaryParagraph: string;
      image: string;
      imageCaption: string;
      capabilities: string[];
      ctaText: string;
      ctaHref: string;
      secondaryCtaText: string;
      secondaryCtaHref: string;
    };
  };
  core_solutions: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      description: string;
      ctaText: string;
      ctaHref: string;
    };
  };
  ai_highlights: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      description: string;
      ctaText: string;
      ctaHref: string;
    };
  };
  services_preview: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      description: string;
      ctaText: string;
      ctaHref: string;
    };
  };
  why_choose_us: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      description: string;
      pillars: HomeWhyChoosePillar[];
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
  projects_section: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      description: string;
    };
  };
  testimonials_section: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      description: string;
      ctaText: string;
      ctaHref: string;
    };
  };
  brands_section: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
    };
  };
  quote_section: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      description: string;
      nextStepsHeading: string;
      nextSteps: string[];
      formTitle: string;
      formSubtitle: string;
    };
  };
}

export const HOME_SECTION_DEFAULTS: HomeSectionDefaults = {
  hero: {
    title: "Intelligent Technology. Safer Industries. Smarter Operations.",
    subtitle: "ENTERPRISE INDUSTRIAL TECHNOLOGY & ENGINEERING SOLUTIONS",
    data: {
      enabled: true,
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
        "13 Core Facility & Engineering Service Verticals",
        "End-to-End Integration, Commissioning & Support",
      ],
    },
  },
  about_preview: {
    title: "Engineering Integrated Security, Vision & Automation Systems",
    subtitle: "About Zenin Systems",
    data: {
      enabled: true,
      introduction:
        "Zenin Systems Solutions LLP is a specialized industrial technology and engineering solutions provider focused on industrial security, AI video analytics, building management, fire safety, and plant automation infrastructure.",
      secondaryParagraph:
        "We work with industrial plants, manufacturing facilities, logistics hubs, and commercial enterprises to design, supply, integrate, and maintain reliable technology systems tailored to operational and safety requirements.",
      image: "/images/hero/about-engineering.png",
      imageCaption:
        "Unified engineering architecture spanning Industrial Surveillance, AI Computer Vision, Building Management, and Plant Systems.",
      capabilities: [
        "Industrial CCTV & Multi-Site Video Management",
        "AI Computer Vision for Safety, Security & Quality",
        "Fire Detection, IBMS, Access Control & HVAC Automation",
        "Industrial Electrical, Cabling & Custom Panel Fabrication",
      ],
      ctaText: "Learn More About Us",
      ctaHref: "/about-us",
      secondaryCtaText: "Browse Full Solutions Portfolio",
      secondaryCtaHref: "/products",
    },
  },
  core_solutions: {
    title: "Our Core Products & Solutions",
    subtitle: "Core Solution Architecture",
    data: {
      enabled: true,
      description:
        "Four integrated technology pillars engineered for industrial surveillance, real-time computer vision, centralized video management, and smart plant automation.",
      ctaText: "View Wider Product Catalog",
      ctaHref: "/products",
    },
  },
  ai_highlights: {
    title: "AI Video Analytics Highlights",
    subtitle: "AI Vision & Computer Vision Suite",
    data: {
      enabled: true,
      description:
        "Proactive deep-learning vision models transforming standard industrial CCTV feeds into real-time safety, security, and quality inspection sensors.",
      ctaText: "Explore All 21 AI Solutions",
      ctaHref: "/products/ai-video-analytics",
    },
  },
  services_preview: {
    title: "Integrated Industrial & Building Services",
    subtitle: "Turnkey Engineering & Facility Systems",
    data: {
      enabled: true,
      description:
        "Comprehensive design, installation, system integration, commissioning, and lifecycle support across 13 specialized engineering service domains.",
      ctaText: "View All 13 Services",
      ctaHref: "/services",
    },
  },
  why_choose_us: {
    title: "Engineered for Industrial Reliability and Operational Scale",
    subtitle: "Why Choose Zenin Systems",
    data: {
      enabled: true,
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
    },
  },
  industries_section: {
    title: "Industries We Serve",
    subtitle: "Sector Applications",
    data: {
      enabled: true,
      description:
        "Our surveillance, AI vision, building management, and automation architectures are designed for high-reliability deployment across core industrial and commercial sectors.",
    },
  },
  projects_section: {
    title: "Featured Projects & Implementations",
    subtitle: "Verified Deployments",
    data: {
      enabled: true,
      description:
        "Selected industrial technology deployments managed through our enterprise solutions portfolio.",
    },
  },
  testimonials_section: {
    title: "What Our Partners Say",
    subtitle: "Client Feedback",
    data: {
      enabled: true,
      description:
        "Verified feedback from industrial and commercial organizations working with Zenin Systems.",
      ctaText: "View All Testimonials →",
      ctaHref: "/testimonials",
    },
  },
  brands_section: {
    title: "Brands & OEM Technologies",
    subtitle: "Technology Ecosystem",
    data: {
      enabled: true,
    },
  },
  quote_section: {
    title: "Let's Discuss Your Next Technology Project",
    subtitle: "Project Enquiry & Consultation",
    data: {
      enabled: true,
      description:
        "Planning an industrial CCTV upgrade, deploying AI safety or quality inspection analytics, or integrating building management and fire protection systems? Share your requirements with our engineering team.",
      nextStepsHeading: "What Happens Next?",
      nextSteps: [
        "Requirement review by our surveillance, AI vision, or automation engineers",
        "Technical architecture discussion or on-site assessment scheduling",
        "Customized BOQ and commercial proposal tailored to your facility",
      ],
      formTitle: "Submit a Technical Quote Request",
      formSubtitle:
        "All fields marked with * are required. Your enquiry is logged directly in our project desk.",
    },
  },
};
