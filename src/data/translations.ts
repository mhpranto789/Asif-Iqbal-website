export interface TranslationStrings {
  brand: {
    name: string;
    bengaliName: string;
    eyebrow: string;
    positioning: string;
    brandLine: string;
    heroSummary: string;
    ctaWork: string;
    ctaStory: string;
    ctaContact: string;
  };
  nav: {
    home: string;
    story: string;
    work: string;
    music: string;
    ideas: string;
    speaking: string;
    blog: string;
    contact: string;
    switchLanguage: string;
    menuOpen: string;
    menuClose: string;
  };
  blog: {
    heading: string;
    subheading: string;
    eyebrow: string;
    allArticles: string;
    readArticle: string;
    backToList: string;
    filterAll: string;
    shareArticle: string;
    copiedLink: string;
  };
  home: {
    connectingIdeaHeading: string;
    connectingIdeaParagraph: string;
    milestonesHeading: string;
    milestonesSubheading: string;
    venturesHeading: string;
    venturesSubheading: string;
    storyPreviewHeading: string;
    storyPreviewExcerpt: string;
    storyPreviewLink: string;
    musicPreviewHeading: string;
    musicPreviewSubheading: string;
    ideasPreviewHeading: string;
    ideasPreviewSubheading: string;
    speakingPreviewHeading: string;
    speakingPreviewSubheading: string;
    closingHeading: string;
    closingSubheading: string;
    closingAction: string;
  };
  framework: {
    title: string;
    subtitle: string;
    intro: string;
    resourcesTitle: string;
    resourcesList: string[];
    forcesTitle: string;
    forcesDesc: string;
    forcesItems: { name: string; note: string }[];
    stepsTitle: string;
    stepsSubtitle: string;
    outcomesTitle: string;
    outcomesDesc: string;
    closingTitle: string;
    closingQuestions: string[];
  };
  contact: {
    title: string;
    subtitle: string;
    previewNoticeTitle: string;
    previewNoticeText: string;
    categories: {
      business: string;
      speaking: string;
      creative: string;
      media: string;
      other: string;
    };
    labels: {
      name: string;
      email: string;
      organisation: string;
      category: string;
      message: string;
      submitPreview: string;
      submitProduction: string;
      copyDraft: string;
      draftCopied: string;
      openEmailClient: string;
      clearForm: string;
    };
    placeholders: {
      name: string;
      email: string;
      organisation: string;
      message: string;
    };
    errors: {
      nameRequired: string;
      emailInvalid: string;
      messageRequired: string;
      networkError: string;
    };
    success: {
      draftGenerated: string;
      sentTitle: string;
      sentMessage: string;
    };
  };
  footer: {
    brandStatement: string;
    navigationHeader: string;
    venturesHeader: string;
    connectHeader: string;
    editorialNotice: string;
    copyright: string;
  };
  common: {
    readMore: string;
    viewDetails: string;
    externalLink: string;
    role: string;
    year: string;
    verifiedContext: string;
    historicalMilestone: string;
    publishedWork: string;
    manuscriptExcerpt: string;
    enquire: string;
    backToHome: string;
  };
}

export const translations: Record<'en' | 'bn', TranslationStrings> = {
  en: {
    brand: {
      name: "Asif Iqbal",
      bengaliName: "আসিফ ইকবাল",
      eyebrow: "BUSINESS · MUSIC · LEARNING · SERVICE",
      positioning: "The Polymath Builder",
      brandLine: "Where strategy meets soul, and profit serves purpose.",
      heroSummary: "Building businesses, writing songs, and helping people turn insight into action. A life connected by the belief that value begins with what we create for others.",
      ctaWork: "Explore the work",
      ctaStory: "Read the story",
      ctaContact: "Start a conversation",
    },
    nav: {
      home: "Home",
      story: "Story",
      work: "Work",
      music: "Music",
      ideas: "Ideas",
      speaking: "Speaking",
      blog: "Blog",
      contact: "Connect",
      switchLanguage: "বাংলা",
      menuOpen: "Open menu",
      menuClose: "Close menu",
    },
    blog: {
      heading: "Essays & Perspectives",
      subheading: "Reflections on business transformation, decision-making, mental discipline, and the craft of lyricism.",
      eyebrow: "THOUGHT LEADERSHIP · ESSAYS · PERSPECTIVES",
      allArticles: "All Essays",
      readArticle: "Read full essay",
      backToList: "Return to all essays",
      filterAll: "All Categories",
      shareArticle: "Share essay",
      copiedLink: "Link copied to clipboard",
    },
    home: {
      connectingIdeaHeading: "The Connecting Idea",
      connectingIdeaParagraph: "True breadth is not scattered ambition; it is a single philosophy expressed across distinct disciplines. Across thirty years of enterprise leadership, four decades of Bengali songwriting, university classrooms, and grassroots artisan livelihoods, one truth remains constant: sustainable value begins with what we build for others.",
      milestonesHeading: "Evidence of Work",
      milestonesSubheading: "A record of corporate turnaround, retail expansion, creative heritage, and social enterprise.",
      venturesHeading: "Four Ventures",
      venturesSubheading: "Strategic transformation, creative intelligence, artisan craft livelihoods, and cultural music production.",
      storyPreviewHeading: "The Person Behind the Work",
      storyPreviewExcerpt: "Grounded in Bengali heritage, an upbringing shaped by his father's Liberation War service, and pivotal turning points where early expectations gave way to conscious choices. His journey is defined by resilience, personal responsibility, and continuous learning.",
      storyPreviewLink: "Read the full narrative",
      musicPreviewHeading: "Selected Songs",
      musicPreviewSubheading: "Over 42 years of lyric writing bridging iconic modern classics and popular anthems.",
      ideasPreviewHeading: "Books & Intellectual Models",
      ideasPreviewSubheading: "Published works on mental skill development and decision-making, accompanied by practical frameworks for action.",
      speakingPreviewHeading: "Speaking & Service",
      speakingPreviewSubheading: "Invited addresses on strategy execution, creative leadership, and human mental skills, alongside lifelong humanitarian engagement.",
      closingHeading: "Start a meaningful conversation.",
      closingSubheading: "Whether exploring enterprise transformation with Achieve Consulting, discussing creative collaboration, or planning a keynote.",
      closingAction: "Initiate dialogue",
    },
    framework: {
      title: "সাফল্যের পথ নক্সা — A Path from Intention to Action",
      subtitle: "A practical model of effort, decisions, and learning drawn from Asif Iqbal's manuscript 'বৃক্ষ তোমার নাম কী?'.",
      intro: "This contemplative framework illustrates how lasting progress unfolds not by chance, but through the deliberate transformation of intention into disciplined action.",
      resourcesTitle: "Three Foundational Resources",
      resourcesList: [
        "সৃজনশীলতা (Creativity): The imaginative faculty to see possibilities where others see constraints.",
        "সাহস (Courage): The internal conviction to step into uncertainty and bear personal responsibility.",
        "ক্রমাগত শেখা (Continuous Learning): The humility to absorb feedback, unlearn assumptions, and adapt."
      ],
      forcesTitle: "Three Forces: Talent, Luck & Effort",
      forcesDesc: "The manuscript distinguishes three driving forces in any human endeavour: মেধা (talent), ভাগ্য (luck), and চেষ্টা (effort). Talent offers an initial foundation; luck introduces unpredictable external winds. Effort is the sole force entirely under one's direct conscious control.",
      forcesItems: [
        { name: "মেধা (Talent)", note: "Inherent disposition and aptitude — a gift, but inert without persistent application." },
        { name: "ভাগ্য (Luck)", note: "External timing, conditions, and unprompted circumstances beyond human jurisdiction." },
        { name: "চেষ্টা (Effort)", note: "The only sovereign force under your direct control. When sustained with purpose, it shapes character." }
      ],
      stepsTitle: "The Eight Steps",
      stepsSubtitle: "Follow the linear sequence from initial spark to rigorous review and correction.",
      outcomesTitle: "Outcomes Outside the Process",
      outcomesDesc: "Success (সাফল্য) and failure (ব্যর্থতা) are possible results that lie outside the eight-step mechanism itself. Neither is guaranteed by the process, and neither marks a permanent terminus. Both feed directly back into Step 8: Review and Correction.",
      closingTitle: "Three Closing Inquiries",
      closingQuestions: [
        "এখানে আমার নিজের কী ছিল? (What in this endeavour was truly mine?)",
        "আমি কী দাম চুকিয়েছি? (What price did I pay in discipline, sacrifice, or patience?)",
        "আমি এ কাজ করে কী শিখলাম? (What did I learn from the crucible of this work?)"
      ]
    },
    contact: {
      title: "Connect & Inquire",
      subtitle: "Direct channels for organisational consulting, keynotes, songwriting collaborations, and media inquiries.",
      previewNoticeTitle: "Preview Mode Notice",
      previewNoticeText: "This preview allows you to compose an inquiry and immediately copy a formatted draft or launch your email client. When a backend server endpoint is connected, inquiries route directly.",
      categories: {
        business: "Business & Organisational Transformation",
        speaking: "Keynote Speaking & University Invitations",
        creative: "Songwriting & Creative Collaboration",
        media: "Journalism & Media Inquiries",
        other: "General Correspondence"
      },
      labels: {
        name: "Your Full Name",
        email: "Work or Personal Email",
        organisation: "Organisation or Institution (Optional)",
        category: "Enquiry Nature",
        message: "Your Message or Brief",
        submitPreview: "Create Enquiry Draft",
        submitProduction: "Submit Enquiry",
        copyDraft: "Copy Formatted Draft",
        draftCopied: "Draft Copied to Clipboard",
        openEmailClient: "Open in Mail Client",
        clearForm: "Clear Form"
      },
      placeholders: {
        name: "e.g. Tanvir Ahmed",
        email: "name@organisation.com",
        organisation: "Company, University, or Media Outlet",
        message: "Provide relevant context, prospective timelines, or specific scope of collaboration..."
      },
      errors: {
        nameRequired: "Please enter your name.",
        emailInvalid: "Please enter a valid email address.",
        messageRequired: "Please enter your message.",
        networkError: "Unable to process request. Please try again or use the draft copy option."
      },
      success: {
        draftGenerated: "Enquiry draft generated successfully.",
        sentTitle: "Message Delivered",
        sentMessage: "Thank you for reaching out. We will review your correspondence thoughtfully."
      }
    },
    footer: {
      brandStatement: "Where strategy meets soul, and profit serves purpose.",
      navigationHeader: "Explore",
      venturesHeader: "Ventures",
      connectHeader: "Dialogue",
      editorialNotice: "Public profile of Asif Iqbal. Historical corporate milestones and cultural achievements presented in accordance with supplied source documentation.",
      copyright: "© Asif Iqbal. All rights reserved."
    },
    common: {
      readMore: "Read more",
      viewDetails: "View details",
      externalLink: "External link",
      role: "Role",
      year: "Year",
      verifiedContext: "Context",
      historicalMilestone: "Historical Corporate Milestone",
      publishedWork: "Published Book",
      manuscriptExcerpt: "Manuscript Excerpt",
      enquire: "Inquire about this",
      backToHome: "Return to Homepage"
    }
  },
  bn: {
    brand: {
      name: "আসিফ ইকবাল",
      bengaliName: "Asif Iqbal",
      eyebrow: "ব্যবসা · সংগীত · শিক্ষা · সমাজসেবা",
      positioning: "ব্যবসা, সংগীত ও মানুষের বিকাশে এক নির্মাতার পথচলা।",
      brandLine: "যেখানে কৌশলের সাথে আত্মার মেলবন্ধন, আর মুনাফা নিয়োজিত মহৎ উদ্দেশ্যে।",
      heroSummary: "প্রতিষ্ঠান গড়া, গান লেখা, আর ভাবনাকে কাজে রূপ দিতে মানুষকে সাহায্য করা—এই পথচলার কেন্দ্রে আছে অন্যের জন্য মূল্য তৈরি করার বিশ্বাস।",
      ctaWork: "কাজগুলো দেখুন",
      ctaStory: "গল্পটি পড়ুন",
      ctaContact: "যোগাযোগ করুন",
    },
    nav: {
      home: "মূলপাতা",
      story: "গল্প",
      work: "কাজ",
      music: "সংগীত",
      ideas: "ভাবনা",
      speaking: "বক্তৃতা",
      blog: "ব্লগ",
      contact: "যোগাযোগ",
      switchLanguage: "EN",
      menuOpen: "মেনু খুলুন",
      menuClose: "মেনু বন্ধ করুন",
    },
    blog: {
      heading: "প্রবন্ধ ও ভাবনা",
      subheading: "করপোরেট রূপান্তর, সিদ্ধান্ত বিজ্ঞান, মানসিক শৃঙ্খলা এবং গীতিকবিতার দর্শন নিয়ে চিন্তা ও পর্যালোচনা।",
      eyebrow: "চিন্তন · প্রবন্ধ · দৃষ্টিভঙ্গি",
      allArticles: "সকল প্রবন্ধ",
      readArticle: "সম্পূর্ণ প্রবন্ধ পড়ুন",
      backToList: "সকল প্রবন্ধে ফিরুন",
      filterAll: "সকল বিষয়",
      shareArticle: "প্রবন্ধ শেয়ার করুন",
      copiedLink: "লিংক কপি করা হয়েছে",
    },
    home: {
      connectingIdeaHeading: "সংযুক্ত ভাবনাসূত্র",
      connectingIdeaParagraph: "বহুমুখী কাজের বিস্তার মানে লক্ষ্যহীন পথচলা নয়; বরং একটি অবিচল জীবনদর্শনকে বিভিন্ন মাধ্যমে রূপ দেওয়া। তিন দশকের করপোরেট রূপান্তর, চার দশকের বেশি সময়ের বাংলা গান রচনা, বিশ্ববিদ্যালয়ের শ্রেণিকক্ষ এবং প্রান্তিক কারুশিল্পীদের জীবিকায়ন—সবকিছুর মূলেই রয়েছে একটি গভীর বিশ্বাস: অন্যের জন্য মূল্য সৃষ্টির মধ্য দিয়েই প্রকৃত সার্থকতা রচিত হয়।",
      milestonesHeading: "কাজের বাস্তব প্রমাণ",
      milestonesSubheading: "করপোরেট রূপান্তর, রিটেল নেটওয়ার্ক গঠন, সাংস্কৃতিক অবদান ও সামাজিক উদ্যোগের ঐতিহাসিক চালচিত্র।",
      venturesHeading: "চারটি উদ্যোগ",
      venturesSubheading: "কৌশলগত রূপান্তর, ক্রিয়েটিভ ইন্টেলিজেন্স, কারুশিল্পী জীবিকায়ন ও বাংলা সংগীতের বিকাশ।",
      storyPreviewHeading: "কাজের পেছনের মানুষটি",
      storyPreviewExcerpt: "বাঙালি সংস্কৃতির শিকড়, বাবার মুক্তিযুদ্ধের স্মৃতি আর জীবনের বাঁকবদলে পাওয়া শিক্ষার সমন্বয়ে গড়ে উঠেছে তাঁর পথচলা। প্রতিকূলতাকে অতিক্রম করে দায়িত্ব নেওয়া এবং কাজের মধ্য দিয়ে প্রতিনিয়ত শেখাই তাঁর মূল প্রেরণা।",
      storyPreviewLink: "সম্পূর্ণ জীবনগাথা পড়ুন",
      musicPreviewHeading: "নির্বাচিত গান",
      musicPreviewSubheading: "৪২ বছরেরও বেশি সময় ধরে আধুনিক ক্ল্যাসিক ও জনপ্রিয় গানের গীতিকবিতা রচনা।",
      ideasPreviewHeading: "বই ও বুদ্ধিবৃত্তিক চিন্তন",
      ideasPreviewSubheading: "মানসিক দক্ষতার উন্নয়ন ও সিদ্ধান্ত গ্রহণের ওপর প্রকাশিত বই এবং কাজের বাস্তব রূপরেখা।",
      speakingPreviewHeading: "বক্তৃতা ও সমাজসেবা",
      speakingPreviewSubheading: "কৌশল বাস্তবায়ন, সৃজনশীল নেতৃত্ব ও মানসিক বিকাশ নিয়ে বক্তব্য, এবং আজীবন তরুণদের ক্ষমতায়ন ও মানবসেবা।",
      closingHeading: "একটি অর্থপূর্ণ আলোচনা শুরু হোক।",
      closingSubheading: "প্রতিষ্ঠানের রূপান্তর, সৃজনশীল কাজ বা আয়োজনে আমন্ত্রণের বিষয়ে আলোচনা করতে যোগাযোগ করুন।",
      closingAction: "বার্তা পাঠান",
    },
    framework: {
      title: "সাফল্যের পথ নক্সা — A Path from Intention to Action",
      subtitle: "আসিফ ইকবালের অপ্রকাশিত পাণ্ডুলিপি ‘বৃক্ষ তোমার নাম কী?’ থেকে গৃহীত প্রচেষ্টা, সিদ্ধান্ত ও আত্মানুসন্ধানের একটি ব্যবহারিক রূপরেখা।",
      intro: "এই সুচিন্তিত কাঠামোটি দেখায় কীভাবে উদ্দেশ্যকে সুশৃঙ্খল কর্মপ্রচেষ্টায় রূপ দেওয়ার মাধ্যমে টেকসই উন্নতি অর্জিত হয়।",
      resourcesTitle: "তিনটি মূল অবলম্বন",
      resourcesList: [
        "সৃজনশীলতা (Creativity): যেখানে অন্যরা সীমাবদ্ধতা দেখে, সেখানে নতুন সম্ভাবনা দেখার মানসিক ক্ষমতা।",
        "সাহস (Courage): অনিশ্চয়তাকে আলিঙ্গন করে ব্যক্তিগত দায়িত্ব কাঁধে নেওয়ার আত্মিক প্রত্যয়।",
        "ক্রমাগত শেখা (Continuous Learning): অহংকারমুক্ত হয়ে ভুল থেকে শিক্ষা নেওয়া ও নিজেকে অভিযোজিত করার বিনম্র মানসিকতা।"
      ],
      forcesTitle: "তিন চালিকাশক্তি: মেধা, ভাগ্য ও চেষ্টা",
      forcesDesc: "মানুষের যেকোনো উদ্যোগে তিনটি প্রধান প্রভাবক থাকে: মেধা, ভাগ্য এবং চেষ্টা। মেধা প্রাথমিক ভিত্তি দেয়; ভাগ্য প্রতিকূল বা অনুকূল বাতাবরণ তৈরি করে। তবে কেবল ‘চেষ্টা’ই এমন এক শক্তি যা মানুষের নিজস্ব নিয়ন্ত্রণাধীন।",
      forcesItems: [
        { name: "মেধা", note: "সহজাত প্রবণতা ও দক্ষতা—উপহারস্বরূপ প্রাপ্ত, তবে অবিচল চর্চা ছাড়া এটি ফলদায়ক হয় না।" },
        { name: "ভাগ্য", note: "বাইরের সুযোগ, সময় ও পরিস্থিতি—যা মানুষের প্রত্যক্ষ নিয়ন্ত্রণের বাইরে।" },
        { name: "চেষ্টা", note: "একমাত্র চালিকাশক্তি যা সম্পূর্ণ আপনার নিয়ন্ত্রণে। লক্ষ্যনিষ্ঠ চেষ্টা মানুষের চরিত্র ও ভাগ্যকে গড়ে তোলে।" }
      ],
      stepsTitle: "আটটি ধারাবাহিক ধাপ",
      stepsSubtitle: "উদ্দেশ্য থেকে শুরু করে যাচাই ও সংশোধন পর্যন্ত সুনির্দিষ্ট ক্রম বজায় রাখুন।",
      outcomesTitle: "প্রক্রিয়ার বাইরের ফলাফলসমূহ",
      outcomesDesc: "সাফল্য ও ব্যর্থতা—উভয়ই এই আট ধাপের কাঠামোর ভেতরের কোনো অংশ নয়, বরং এগুলো হলো সম্ভাব্য ফলাফল। কোনো প্রক্রিয়াই চিরস্থায়ী সাফল্যের নিশ্চয়তা দেয় না। ফল যা-ই হোক, তা সরাসরি অষ্টম ধাপে (যাচাই ও সংশোধন) গিয়ে ভবিষ্যতের রসদ জোগায়।",
      closingTitle: "তিনটি আত্মজিজ্ঞাসা",
      closingQuestions: [
        "“এখানে আমার নিজের কী ছিল?”",
        "“আমি কী দাম চুকিয়েছি?”",
        "“আমি এ কাজ করে কী শিখলাম?”"
      ]
    },
    contact: {
      title: "যোগাযোগ ও অনুসন্ধান",
      subtitle: "প্রাতিষ্ঠানিক রূপান্তর, প্রধান বক্তা হিসেবে আমন্ত্রণ, সংগীত সহযোগিতা ও গণমাধ্যম সংক্রান্ত যোগাযোগের মাধ্যম।",
      previewNoticeTitle: "প্রিভিউ মোড তথ্য",
      previewNoticeText: "এই প্রিভিউতে আপনি বার্তা তৈরি করে সরাসরি কপি করে নিতে পারেন বা আপনার ইমেইল ক্লায়েন্টে পাঠাতে পারেন। ব্যাকএন্ড এপিআই সক্রিয় হলে এটি সরাসরি প্রেরিত হবে।",
      categories: {
        business: "ব্যবসায়িক ও প্রাতিষ্ঠানিক রূপান্তর",
        speaking: "সম্মেলন ও বিশ্ববিদ্যালয়ে বক্তব্য",
        creative: "গীতিরচনা ও সৃজনশীল উদ্যোগ",
        media: "সাংবাদিকতা ও গণমাধ্যম",
        other: "সাধারণ বার্তা"
      },
      labels: {
        name: "আপনার নাম",
        email: "ইমেইল ঠিকানা",
        organisation: "প্রতিষ্ঠান বা বিশ্ববিদ্যালয়ের নাম (ঐচ্ছিক)",
        category: "যোগাযোগের ধরন",
        message: "আপনার বার্তা বা প্রস্তাবনা",
        submitPreview: "ড্রাফট প্রস্তুত করুন",
        submitProduction: "বার্তা পাঠান",
        copyDraft: "ড্রাফট কপি করুন",
        draftCopied: "ড্রাফট কপি করা হয়েছে",
        openEmailClient: "ইমেইল ক্লায়েন্টে খুলুন",
        clearForm: "মুছে ফেলুন"
      },
      placeholders: {
        name: "যেমন: তানভীর আহমেদ",
        email: "name@organisation.com",
        organisation: "প্রতিষ্ঠান, বিশ্ববিদ্যালয় বা গণমাধ্যম",
        message: "প্রয়োজনীয় প্রেক্ষাপট, সম্ভাব্য সময়সূচি বা প্রস্তাবের বিবরণ লিখুন..."
      },
      errors: {
        nameRequired: "অনুগ্রহ করে আপনার নাম লিখুন।",
        emailInvalid: "সঠিক ইমেইল ঠিকানা দিন।",
        messageRequired: "অনুগ্রহ করে আপনার বার্তা লিখুন।",
        networkError: "অনুরোধ সম্পন্ন করা যায়নি। অনুগ্রহ করে ড্রাফট কপি করুন।"
      },
      success: {
        draftGenerated: "ড্রাফট সফলভাবে তৈরি হয়েছে।",
        sentTitle: "বার্তা গৃহীত হয়েছে",
        sentMessage: "যোগাযোগের জন্য ধন্যবাদ। আপনার বার্তাটি গুরুত্বের সাথে বিবেচনা করা হবে।"
      }
    },
    footer: {
      brandStatement: "যেখানে কৌশলের সাথে আত্মার মেলবন্ধন, আর মুনাফা নিয়োজিত মহৎ উদ্দেশ্যে।",
      navigationHeader: "সূচিপত্র",
      venturesHeader: "উদ্যোগসমূহ",
      connectHeader: "যোগাযোগ",
      editorialNotice: "আসিফ ইকবালের প্রাতিষ্ঠানিক প্রোফাইল। করপোরেট ও সাংস্কৃতিক মাইলফলকসমূহ সংরক্ষিত নথির ভিত্তিতে পরিবেশিত।",
      copyright: "© আসিফ ইকবাল। সর্বস্বত্ব সংরক্ষিত।"
    },
    common: {
      readMore: "বিস্তারিত পড়ুন",
      viewDetails: "বিবরণ দেখুন",
      externalLink: "বহিঃসংযোগ",
      role: "ভূমিকা",
      year: "সাল",
      verifiedContext: "প্রেক্ষাপট",
      historicalMilestone: "ঐতিহাসিক করপোরেট মাইলফলক",
      publishedWork: "প্রকাশিত গ্রন্থ",
      manuscriptExcerpt: "পাণ্ডুলিপি অংশ",
      enquire: "যোগাযোগ করুন",
      backToHome: "মূলপাতায় ফিরুন"
    }
  }
};
