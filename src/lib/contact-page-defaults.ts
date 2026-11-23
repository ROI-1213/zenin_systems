export interface ContactPageDefaults {
  banner: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      description: string;
    };
  };
  contact_details: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      intro: string;
      addressLabel: string;
      address: string;
      phoneLabel: string;
      phone: string;
      emailLabel: string;
      email: string;
      hoursLabel: string;
      workingHours: string;
    };
  };
  map_section: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      mapEmbedUrl: string;
      placeholderText: string;
    };
  };
  enquiry_form: {
    title: string;
    subtitle: string;
    data: {
      enabled: boolean;
      description: string;
      preselectedTopicName: string;
    };
  };
}

export const CONTACT_PAGE_DEFAULTS: ContactPageDefaults = {
  banner: {
    title: "Connect With Our Engineering & Solutions Team",
    subtitle: "CONTACT & PROJECT CONSULTATION",
    data: {
      enabled: true,
      description:
        "Reach out to Zenin Systems Solutions LLP for technical consultations, site surveys, solution demonstrations, or customized project quotations.",
    },
  },
  contact_details: {
    title: "Let's Discuss Your Industrial Technology Requirements",
    subtitle: "Corporate Contact Desk",
    data: {
      enabled: true,
      intro:
        "Our solutions architects assist industrial plants, EPC contractors, warehouses, and commercial enterprises with end-to-end system design and quotations.",
      addressLabel: "Corporate Office Address",
      address: "Corporate Solutions & Engineering Centre, Zenin Systems Solutions LLP, India",
      phoneLabel: "Phone / Project Desk",
      phone: "+91 98450 12345 / +91 (0) 80 4123 4567",
      emailLabel: "Business Email",
      email: "contact@zeninsystems.com",
      hoursLabel: "Business Hours",
      workingHours: "Monday – Saturday: 9:30 AM – 6:30 PM IST",
    },
  },
  map_section: {
    title: "Location Map Configuration",
    subtitle: "Interactive Google Map",
    data: {
      enabled: true,
      mapEmbedUrl: "",
      placeholderText:
        "Interactive Google Map embed is ready and will automatically display here once the verified Google Maps embed URL is entered in Admin → Contact Us Editor or Site Settings.",
    },
  },
  enquiry_form: {
    title: "Send Us Your Project Enquiry",
    subtitle: "Direct Engineering & Sales Enquiry Form",
    data: {
      enabled: true,
      description:
        "Complete the form below to request a product quotation, AI video analytics demonstration, or service consultation.",
      preselectedTopicName: "General Technical Consultation",
    },
  },
};
