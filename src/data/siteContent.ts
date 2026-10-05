import { VentureItem, CareerMilestone, SongItem, BookItem, FrameworkStep, SpeakingTheme, BlogArticle } from '../types';
import { BOOK_COVERS } from './bookCoversData';

export const fourVentures: VentureItem[] = [
  {
    id: 'achieve-consulting',
    name: 'Achieve Consulting',
    nameBn: 'অ্যাচিভ কনসাল্টিং',
    taglineEn: 'Organisational Transformation & Executive Mentorship',
    taglineBn: 'প্রাতিষ্ঠানিক রূপান্তর ও নেতৃত্ব বিকাশ',
    relationshipEn: 'Founded by Asif Iqbal',
    relationshipBn: 'আসিফ ইকবাল কর্তৃক প্রতিষ্ঠিত',
    descriptionEn: 'Achieve Consulting partners with enterprise leaders to drive sustainable turnaround, cultural alignment, and execution excellence through proprietary strategic frameworks.',
    descriptionBn: 'প্রতিষ্ঠানের রূপান্তর, কর্মদক্ষতা বৃদ্ধি এবং টেকসই প্রবৃদ্ধি অর্জনে শীর্ষ নেতৃত্বের সঙ্গে কাজ করে অ্যাচিভ কনসাল্টিং।',
    operatingModelEn: 'Grounding organisational change in four core pillars: Strategic Insight, Creativity, Execution Excellence, and Mental Skill Development.',
    operatingModelBn: 'চারটি মূল ভিত্তির ওপর পরিচালিত: কৌশলগত অন্তর্দৃষ্টি, সৃজনশীলতা, নিখুঁত বাস্তবায়ন এবং মানসিক দক্ষতার উন্নয়ন।',
    keyHighlightsEn: [
      'Bespoke transformation roadmaps for complex market environments',
      'Executive mental skill development through AIM (Achieve Ignite Mentoring)',
      'Bridging boardroom strategy with shop-floor operational realities'
    ],
    keyHighlightsBn: [
      'জটিল প্রাতিষ্ঠানিক কাঠামোর টেকসই রূপান্তর ও পথনকশা তৈরি',
      'এইম (Achieve Ignite Mentoring)-এর মাধ্যমে শীর্ষ নেতৃত্বের মানসিক বিকাশ',
      'বোর্ডরুমের কৌশলের সাথে মাঠপর্যায়ের নিখুঁত বাস্তবায়ন সংযোগ'
    ],
    officialUrl: 'https://www.achieveconsultingbd.com/',
    enquiryType: 'business'
  },
  {
    id: 'acis',
    name: 'Achieve Creative Intelligence Studio (ACIS)',
    nameBn: 'অ্যাচিভ ক্রিয়েটিভ ইন্টেলিজেন্স স্টুডিও (ACIS)',
    taglineEn: 'AI-Powered Creative Strategy & Digital Communication',
    taglineBn: 'এআই-নির্ভর সৃজনশীল কৌশল ও ডিজিটাল যোগাযোগ',
    relationshipEn: 'Founded by Asif Iqbal',
    relationshipBn: 'আসিফ ইকবাল কর্তৃক প্রতিষ্ঠিত',
    descriptionEn: 'A specialized creative intelligence unit marrying brand storytelling with cutting-edge artificial intelligence, grounded strictly in human strategy and narrative depth.',
    descriptionBn: 'মানুষের গভীর বোধ ও সৃজনশীলতার সাথে কৃত্রিম বুদ্ধিমত্তার মেলবন্ধনে আধুনিক যোগাযোগ কৌশল ও ডিজিটাল কনটেন্ট নির্মাণ।',
    operatingModelEn: 'Deploying strategic AI tooling to amplify human creative insight rather than automate generic volume, ensuring brand soul is preserved.',
    operatingModelBn: 'সৃজনশীল মানুষের গভীর ভাবনার পরিপূরক হিসেবে প্রযুক্তি প্রয়োগ, যেখানে প্রতিটি কাজের কেন্দ্রে থাকে ব্র্যান্ডের মৌলিক দর্শন।',
    keyHighlightsEn: [
      'Next-generation campaign ideation and narrative architecture',
      'AI-augmented consumer sentiment analysis and market listening',
      'Culturally resonant visual and verbal asset creation'
    ],
    keyHighlightsBn: [
      'পরবর্তী প্রজন্মের ক্যাম্পেইন পরিকল্পনা ও বার্তা নির্মাণ',
      'বাজারের অনুভূতি বিশ্লেষণ ও প্রযুক্তিগত গবেষণা',
      'সাংস্কৃতিক শেকড় বজায় রেখে আধুনিক ডিজিটাল কনটেন্ট'
    ],
    officialUrl: '',
    enquiryType: 'business'
  },
  {
    id: 'asix',
    name: 'ASIX',
    nameBn: 'এসিক্স (ASIX)',
    taglineEn: 'Connecting Bangladeshi Artisan Craft with the World',
    taglineBn: 'ঐতিহ্যবাহী দেশীয় কারুশিল্পের বিশ্বায়ন ও জীবিকায়ন',
    relationshipEn: 'Co-founded by Asif Iqbal',
    relationshipBn: 'আসিফ ইকবাল কর্তৃক সহ-প্রতিষ্ঠিত',
    descriptionEn: 'A mission-driven social enterprise linking master Bangladeshi weavers and artisans with discerning international lifestyle markets.',
    descriptionBn: 'বাংলাদেশের প্রান্তিক কারুশিল্পী ও তাঁতিদের অসাধারণ শিল্পকর্মকে আন্তর্জাতিক অঙ্গনে তুলে ধরার একটি সামাজিক দায়বদ্ধ প্রতিষ্ঠান।',
    operatingModelEn: 'Fair-trade artisan collaboration supporting 900+ women artisans with sustainable livelihoods while exporting authentic heritage craft to 20+ countries.',
    operatingModelBn: '৯০০ জনেরও বেশি নারী কারুশিল্পীর টেকসই জীবিকা নিশ্চিত করে ২০টিরও বেশি দেশে ঐতিহ্যবাহী পণ্যের রপ্তানি বাজার তৈরি।',
    keyHighlightsEn: [
      'Sustainable livelihoods and dignified employment for 900+ rural women',
      'Export network reaching over 20 global destinations',
      'Preservation of indigenous Bangladeshi handloom and craft techniques'
    ],
    keyHighlightsBn: [
      '৯০০+ গ্রামীণ নারী কারুশিল্পীর আত্মমর্যাদাশীল জীবিকা নিশ্চিতকরণ',
      'বিশ্বের ২০টিরও বেশি দেশে বাংলাদেশের ঐতিহ্যবাহী পণ্যের রপ্তানি',
      'বাংলার প্রাচীন লোকশিল্প ও তাঁতশিল্পের সংরক্ষণ'
    ],
    officialUrl: 'https://asixbd.com',
    enquiryType: 'business'
  },
  {
    id: 'gaanchill-music',
    name: 'Gaanchill Music',
    nameBn: 'গানচিল মিউজিক',
    taglineEn: 'Nurturing Artistry & Advancing Bengali Music',
    taglineBn: 'নতুন শিল্পী তৈরি ও বাংলা গানের প্রাতিষ্ঠানিক বিস্তার',
    relationshipEn: 'Founded by Asif Iqbal',
    relationshipBn: 'আসিফ ইকবাল কর্তৃক প্রতিষ্ঠিত',
    descriptionEn: 'One of Bangladesh’s premier music and cultural platforms, dedicated to discovering musical talent, elevating lyricism, and archiving Bengali sonic culture.',
    descriptionBn: 'বাংলাদেশের অন্যতম শীর্ষ সংগীত প্রতিষ্ঠান, যা নতুন প্রতিভা অন্বেষণ, মানসম্মত গীতিকবিতা ও সুরের মাধ্যমে বাংলা গানকে বিশ্বদরবারে তুলে ধরছে।',
    operatingModelEn: 'Operating as a full-spectrum music label, production house, and intellectual property custodian for original contemporary Bengali music.',
    operatingModelBn: 'সম্পূর্ণ স্বাধীন সংগীত প্রযোজনা ও প্রকাশনা প্রতিষ্ঠান হিসেবে সুরকার, গীতিকার ও কণ্ঠশিল্পীদের অধিকার সুরক্ষা ও সমৃদ্ধ গান উপহার দেওয়া।',
    keyHighlightsEn: [
      'Catalyst for generational musical hits and breakthrough recording artists',
      'Pioneering digital distribution and intellectual property stewardship',
      'Rooted in Asif Iqbal’s 42+ years of dedication to Bengali songwriting'
    ],
    keyHighlightsBn: [
      'বহু কালজয়ী গান ও প্রতিভাবান কণ্ঠশিল্পীদের আত্মপ্রকাশের মঞ্চ',
      'ডিজিটাল মিউজিক কপিরাইট ও শিল্পীস্বত্বের আধুনিক ব্যবস্থাপনা',
      'আসিফ ইকবালের চার দশকেরও বেশি সময়ের সৃষ্টিশীল গানের অভিজ্ঞতার প্রতিফলন'
    ],
    officialUrl: 'https://www.youtube.com/@GaanchillMusicOfficial',
    enquiryType: 'creative'
  }
];

export const careerMilestones: CareerMilestone[] = [
  {
    id: 'meghna-group',
    organisation: 'Meghna Group of Industries (MGI)',
    organisationBn: 'মেঘনা গ্রুপ অব ইন্ডাস্ট্রিজ',
    periodOrRoleEn: 'Executive Corporate Leadership',
    periodOrRoleBn: 'শীর্ষ করপোরেট নেতৃত্ব',
    contextEn: 'One of Bangladesh’s largest conglomerates spanning multiple consumer goods and industrial commodity sectors.',
    contextBn: 'ভোগ্যপণ্য ও ভারী শিল্প খাতে বাংলাদেশের অন্যতম বৃহৎ শিল্পগোষ্ঠী।',
    contributionEn: 'Led comprehensive commercial restructuring, portfolio modernization, and strategic market expansion across core business divisions.',
    contributionBn: 'বাণিজ্যিক রূপান্তর, নতুন ব্র্যান্ড সম্প্রসারণ ও বাজার আধিপত্য সুদৃঢ় করার কৌশলগত নেতৃত্ব প্রদান।',
    reportedOutcomeEn: 'Credited with steering revenue expansion from US$88M to US$388M (historical milestone recorded in corporate executive profile).',
    reportedOutcomeBn: 'রাজস্ব ৮৮ মিলিয়ন মার্কিন ডলার থেকে ৩৮৮ মিলিয়ন ডলারে উন্নীত করার ঐতিহাসিক বাণিজ্যিক মাইলফলক।',
    isHistoricalNote: true
  },
  {
    id: 'shwapno-retail',
    organisation: 'Shwapno (ACI Logistics)',
    organisationBn: 'স্বপ্ন (এসিআই লজিস্টিকস)',
    periodOrRoleEn: 'Executive Leadership & Retail Building',
    periodOrRoleBn: 'রিটেল নেটওয়ার্ক গঠন ও নেতৃত্ব',
    contextEn: 'The modern organized retail grocery sector in Bangladesh was in its infancy with immense supply-chain friction.',
    contextBn: 'বাংলাদেশে আধুনিক চেইন সুপারশপ বা অর্গানাইজড রিটেলের শুরুর সময়ের চ্যালেঞ্জ।',
    contributionEn: 'Guided brand positioning, store rollouts, vendor trust frameworks, and consumer value propositions during the formative growth phase.',
    contributionBn: 'ব্র্যান্ডের ভিত্তি স্থাপন, গ্রাহক আস্থা অর্জন ও দেশব্যাপী আউটলেট সম্প্রসারণের সার্বিক ব্যবস্থাপনা।',
    reportedOutcomeEn: 'Helped build the retail operation from inception to 59 operational stores in under two years.',
    reportedOutcomeBn: 'শূন্য থেকে দুই বছরেরও কম সময়ে ৫৯টি সফল আউটলেটের সমন্বয়ে দেশের শীর্ষ রিটেল চেইনে রূপান্তর।',
    isHistoricalNote: true
  },
  {
    id: 'aktel-telecom',
    organisation: 'AKTEL (now Robi Axiata)',
    organisationBn: 'একটেল (বর্তমান রবি আজিয়াটা)',
    periodOrRoleEn: 'Commercial & Brand Leadership',
    periodOrRoleBn: 'বাণিজ্যিক ও ব্র্যান্ড নেতৃত্ব',
    contextEn: 'Intense hyper-competition in Bangladesh’s rapidly liberalizing telecommunications landscape.',
    contextBn: 'টেলিকম খাতে তীব্র প্রতিযোগিতা ও দ্রুত বাজার সম্প্রসারণের যুগ।',
    contributionEn: 'Spearheaded disruptive youth marketing campaigns, emotional positioning, and customer acquisition strategies.',
    contributionBn: 'উদ্ভাবনী ক্যাম্পেইন, আবেগঘন ব্র্যান্ড যোগাযোগ ও গ্রাহকবান্ধব সেবার মাধ্যমে বাজার সম্প্রসারণ।',
    reportedOutcomeEn: 'Delivered transformative subscriber expansion and brand resurgence in the nationwide mobile connectivity race.',
    reportedOutcomeBn: 'টেলিকম খাতে লক্ষ লক্ষ নতুন গ্রাহক যুক্ত করে বাণিজ্যিক অবস্থানকে সুদৃঢ় করা।'
  },
  {
    id: 'unilever-experience',
    organisation: 'Unilever',
    organisationBn: 'ইউনিলিভার',
    periodOrRoleEn: 'Brand Management & Regional Assignment',
    periodOrRoleBn: 'ব্র্যান্ড ম্যানেজমেন্ট ও আন্তর্জাতিক দায়িত্ব',
    contextEn: 'Global multinational fast-moving consumer goods environment known for rigorous marketing science.',
    contextBn: 'আন্তর্জাতিক মানদণ্ডে পেশাদার ব্র্যান্ড ব্যবস্থাপনা ও বিপণনের বৈশ্বিক প্ল্যাটফর্ম।',
    contributionEn: 'Mastered consumer insights, retail channel management, and served on an executive marketing leadership assignment in Pakistan.',
    contributionBn: 'ভোক্তার আচরণ গবেষণা ও ব্র্যান্ড কৌশল পরিচালনার পাশাপাশি পাকিস্তানে আন্তর্জাতিক অ্যাসাইনমেন্ট সম্পন্ন।',
    reportedOutcomeEn: 'Established deep cross-border marketing fundamentals that informed thirty years of enterprise strategy.',
    reportedOutcomeBn: 'আন্তর্জাতিক বিপণনবিদ্যার গভীর অভিজ্ঞতা যা পরবর্তী তিন দশকের ব্যবসায়িক প্রজ্ঞার ভিত্তি গড়ে দেয়।'
  }
];

export const musicItems: SongItem[] = [
  {
    id: 'anonna-1988',
    titleEn: 'Anonna (অনন্যা)',
    titleBn: 'অনন্যা',
    artistCredit: 'Vocals: James (Nagar Baul) · Composition: Nagar Baul / Traditional arrangement',
    roleEn: 'Lyricist',
    roleBn: 'গীতিকার',
    year: 1988,
    yearText: '1988',
    contextEn: 'A foundational milestone in modern Bengali rock poetry. Written by Asif Iqbal and performed by James, "Anonna" bridged raw emotional intimacy with poetic urban realism, defining a generation of Bengali music lovers.',
    contextBn: 'বাংলা আধুনিক ব্যান্ড সংগীতের ইতিহাসের এক কালজয়ী অধ্যায়। আসিফ ইকবালের কথায় ও জেমসের কণ্ঠে এই গানটি নগর জীবনের প্রেম ও ব্যাকুলতাকে এক অনন্য কাব্যিক উচ্চতায় নিয়ে যায়।',
    youtubeId: '',
    externalLink: 'https://open.spotify.com/track/6j1FTv81yFdARO7LQPfwsj?si=11dedbc2f7fb4051',
    spotifyUrl: 'https://open.spotify.com/track/6j1FTv81yFdARO7LQPfwsj?si=11dedbc2f7fb4051'
  },
  {
    id: 'o-priyotoma',
    titleEn: 'O Priyotoma (ও প্রিয়তমা)',
    titleBn: 'ও প্রিয়তমা',
    artistCredit: 'Vocals: Arijit Singh & Somlata Acharyya Chowdhury · Tune: Akassh Sen',
    roleEn: 'Lyricist',
    roleBn: 'গীতিকার',
    year: 2023,
    yearText: '2023',
    contextEn: 'A modern romantic anthem that captivated Bengali-speaking listeners globally. Its heartfelt lyrical cadence resonated across generations, becoming one of the most widely shared and sung pieces in contemporary Bengali cinema.',
    contextBn: 'সাম্প্রতিক সময়ের অন্যতম জনপ্রিয় রোমান্টিক গান। আসিফ ইকবালের সাবলীল অথচ গভীর ভাবপূর্ণ কথার ছোঁয়ায় গানটি দুই বাংলার কোটি কোটি শ্রোতার হৃদয়ে স্থান করে নেয়।',
    youtubeId: 'KUff03C8Ki0',
    externalLink: 'https://youtu.be/KUff03C8Ki0?si=gaXZ6MDOQuWoQb0O'
  }
];

export const culturalAppointments = [
  {
    titleEn: 'President, Lyricist Association of Bangladesh',
    titleBn: 'সভাপতি, গীতিকবি সংসদ বাংলাদেশ',
    roleEn: 'Elected Leadership & Songwriters’ Rights Advocacy',
    roleBn: 'গীতিকারদের অধিকার ও মর্যাদা সুরক্ষা',
    descEn: 'Championing copyright compliance, royalty mechanisms, and dignified recognition for Bengali lyricists.',
    descBn: 'বাংলা গানের গীতিকারদের রয়্যালটি, কপিরাইট অধিকার এবং সামাজিক স্বীকৃতি নিশ্চিতকরণে সক্রিয় নেতৃত্ব।'
  },
  {
    titleEn: 'Treasurer, Music Alliance Worldwide',
    titleBn: 'কোষাধ্যক্ষ, মিউজিক অ্যালায়েন্স',
    roleEn: 'Institutional Music Industry Governance',
    roleBn: 'সংগীত শিল্পের প্রাতিষ্ঠানিক উন্নয়ন',
    descEn: 'Collaborating across regional music ecosystems to build transparent revenue structures for creative artists.',
    descBn: 'সংগীতশিল্পের সব পক্ষের স্বার্থ সুরক্ষা ও ডিজিটাল অর্থনীতির সাথে সুরকার-শিল্পীদের সমন্বয়সাধন।'
  },
  {
    titleEn: 'Conceptualizer of Close Up 1',
    titleBn: '‘ক্লোজ আপ ১’ ধারণার প্রবক্তা',
    roleEn: 'Cultural Discovery Platform Ideation',
    roleBn: 'প্রতিভা অন্বেষণের মঞ্চ ভাবনা',
    descEn: 'Conceived the conceptual vision for Bangladesh’s most influential televised musical talent hunt platform.',
    descBn: 'বাংলাদেশের ইতিহাসের সবচেয়ে প্রভাবশালী সংগীত প্রতিভা অন্বেষণ রিয়েলিটি শোর মূল ধারণার উন্মেষ ঘটান।'
  }
];

export const publishedBooks: BookItem[] = [
  {
    id: 'jodi-lokkho-thake-otut',
    titleEn: 'Jodi Lokkho Thake Otut',
    titleBn: 'যদি লক্ষ্য থাকে অটুট',
    subtitleEn: 'Mental Skill Development & The Anatomy of Focus',
    subtitleBn: 'মানসিক দক্ষতার উন্নয়ন ও লক্ষ্যনিষ্ঠ পথচলা',
    type: 'published',
    statusEn: 'Published Title',
    statusBn: 'প্রকাশিত গ্রন্থ',
    themeEn: 'Cognitive resilience, sustained personal discipline, and mental stamina in turbulent environments.',
    themeBn: 'লক্ষ্য নির্ধারণ, আত্মবিশ্বাস ধরে রাখা এবং প্রতিকূলতার মাঝেও মানসিক দৃঢ়তা বজায় রাখার উপায়।',
    descriptionEn: 'Drawing on decades of boardroom challenges and personal turning points, this book articulates practical mental protocols for individuals seeking to bridge the gap between intention and real-world results.',
    descriptionBn: 'পেশাগত ও ব্যক্তিগত জীবনের নানা অভিজ্ঞতার আলোকে লেখা এই বইয়ে তুলে ধরা হয়েছে কীভাবে মনকে লক্ষ্যের সাথে অবিচল রেখে যেকোনো অনিশ্চয়তা জয় করা যায়।',
    keyTakeawaysEn: [
      'Transforming dispersed motivation into habitual, calm consistency',
      'The psychological endurance required during protracted dry periods',
      'Shielding clarity of purpose from external noise and peer pressure'
    ],
    keyTakeawaysBn: [
      'ক্ষণস্থায়ী আবেগের বদলে শান্ত ও সুশৃঙ্খল অভ্যাসের শক্তি',
      'দীর্ঘমেয়াদি অনিশ্চয়তার সময়েও মানসিক ধৈর্য বজায় রাখার কৌশল',
      'বাইরের কোলাহল ও দ্বিধা এড়িয়ে নিজের লক্ষ্যে অবিচল থাকা'
    ],
    orderUrl: 'https://www.rokomari.com/book/457335/jodi-lokkho-thake-otut',
    coverImage: BOOK_COVERS['jodi-lokkho-thake-otut'] || '/images/books/jodi-lokkho-thake-otut.jpg'
  },
  {
    id: 'bhabia-korio-kaaj',
    titleEn: 'Bhabia Korio Kaaj',
    titleBn: 'ভাবিয়া করিও কাজ',
    subtitleEn: 'Decision-Making Through Bengali Cultural Wisdom & Behavioural Insights',
    subtitleBn: 'বাঙালির চিরায়ত প্রজ্ঞা ও আধুনিক চিন্তনে সিদ্ধান্ত গ্রহণ',
    type: 'published',
    statusEn: 'Published Title',
    statusBn: 'প্রকাশিত গ্রন্থ',
    themeEn: 'Synthesizing age-old Bengali proverbs with modern executive behavioural decision theory.',
    themeBn: 'আমাদের লোকজ জ্ঞান ও প্রবাদের অন্তর্নিহিত দর্শনকে আধুনিক জীবনের সিদ্ধান্ত গ্রহণের কাজে লাগানো।',
    descriptionEn: 'A masterclass in contemplative action. This volume reclaims indigenous proverbs not as nostalgic folklore, but as sophisticated heuristic decision frameworks tested over centuries.',
    descriptionBn: '‘ভাবিয়া করিও কাজ, করিয়া ভাবিও না’—এই সাধারণ প্রবাদের আড়ালে লুকিয়ে থাকা গভীর মনস্তাত্ত্বিক সত্যকে উন্মোচন করে সঠিক সিদ্ধান্ত গ্রহণের ব্যবহারিক পথনির্দেশ।',
    keyTakeawaysEn: [
      'The cost of impulsive commitments vs. the compounding value of measured reflection',
      'Unpacking hidden cognitive blind spots before committing capital or energy',
      'Aligning personal integrity with commercial strategic choices'
    ],
    keyTakeawaysBn: [
      'হুজুগে সিদ্ধান্তের ক্ষতি বনাম ধীরস্থির চিন্তার সুদূরপ্রসারী লাভ',
      'গুরুত্বপূর্ণ পদক্ষেপ নেওয়ার আগে নিজের অন্ধবিন্দুগুলো চিহ্নিত করা',
      'ব্যক্তিগত মূল্যবোধের সাথে প্রাতিষ্ঠানিক সিদ্ধান্তের সামঞ্জস্য রক্ষা'
    ],
    orderUrl: 'https://www.rokomari.com/book/545102/bhabiya-koriyo-kaj',
    coverImage: BOOK_COVERS['bhabia-korio-kaaj'] || '/images/books/bhabia-korio-kaaj.jpg'
  },
  {
    id: 'brikkho-tomar-naam-ki',
    titleEn: 'Brikkho Tomar Naam Ki? (বৃক্ষ তোমার নাম কী?)',
    titleBn: 'বৃক্ষ তোমার নাম কী?',
    subtitleEn: 'Autobiographical Manuscript & Philosophical Framework',
    subtitleBn: 'অপ্রকাশিত পাণ্ডুলিপি ও দার্শনিক রূপরেখা',
    type: 'manuscript',
    statusEn: 'Manuscript Excerpt (Unpublished Introduction)',
    statusBn: 'পাণ্ডুলিপির ভূমিকা (অপ্রকাশিত)',
    themeEn: 'The fruit reveals the tree. An exploration of humility, effort, choices, and personal responsibility.',
    themeBn: 'ফলেই বৃক্ষের পরিচয়। মানুষের অহংকার, আত্মত্যাগ, চেষ্টা এবং আত্মজিজ্ঞাসার অন্তরঙ্গ অনুসন্ধান।',
    descriptionEn: 'Headed by the timeless question "বৃক্ষ তোমার নাম কী? ফলে পরিচয়" (O tree, what is your name? Known by its fruit), this manuscript introduction reflects on early familial expectations, the humility forged through setbacks, and presents the 8-step decision path.',
    descriptionBn: '‘বৃক্ষ তোমার নাম কী? ফলে পরিচয়’—এই চিরন্তন সত্যকে কেন্দ্র করে রচিত পাণ্ডুলিপির ভূমিকা। এতে জীবনের নানা ওঠাপড়া, অহংকারমুক্ত হওয়ার শিক্ষা এবং নিজের প্রচেষ্টাকে মূল চালিকাশক্তি হিসেবে গ্রহণ করার কথা বর্ণিত হয়েছে।',
    keyTakeawaysEn: [
      'Effort is the only currency within human control; results remain in the hands of time and fate',
      'Setbacks are not indictments of worth, but vital corrections in self-understanding',
      'The three inescapable reflective questions every builder must face'
    ],
    keyTakeawaysBn: [
      'চেষ্টাই মানুষের একমাত্র নিজস্ব সম্বল; ফলাফল নিয়তি ও সময়ের ওপর নির্ভরশীল',
      'ব্যর্থতা কোনো স্থায়ী লজ্জা নয়, বরং নিজেকে নতুন করে চেনার সুযোগ',
      'কাজের শেষে নিজেকে জিজ্ঞাসা করার মতো তিনটি মৌলিক প্রশ্ন'
    ]
  }
];

export const strategicPillars = [
  {
    number: '01',
    titleEn: 'Strategic Insight',
    titleBn: 'কৌশলগত অন্তর্দৃষ্টি',
    descEn: 'Diagnosing the fundamental mechanics of market change, consumer behaviour, and competitive advantage before making moves.',
    descBn: 'যেকোনো পদক্ষেপের পূর্বে বাজারের পরিবর্তন, ভোক্তার মনস্তত্ত্ব এবং নিজস্ব শক্তির সঠিক মূল্যায়ন।'
  },
  {
    number: '02',
    titleEn: 'Creativity',
    titleBn: 'সৃজনশীলতা',
    descEn: 'The imaginative capacity to break out of established industry templates and discover unconventional value.',
    descBn: 'প্রচলিত গণ্ডি পেরিয়ে নতুন সম্ভাবনা দেখা এবং সমস্যা সমাধানে মৌলিক ভাবনা প্রয়োগের ক্ষমতা।'
  },
  {
    number: '03',
    titleEn: 'Execution Excellence',
    titleBn: 'নিখুঁত বাস্তবায়ন',
    descEn: 'The operational discipline that turns lofty strategy into repeatable, high-standard day-to-day realities.',
    descBn: 'কেবল পরিকল্পনায় সীমাবদ্ধ না থেকে প্রতিটি পদক্ষেপকে সর্বোচ্চ মানে রূপ দেওয়ার ধারাবাহিক শৃঙ্খলা।'
  },
  {
    number: '04',
    titleEn: 'Mental Skill Development',
    titleBn: 'মানসিক দক্ষতার উন্নয়ন',
    descEn: 'Cultivating the inner psychological endurance, calmness under crisis, and resilience that leaders need to sustain impact.',
    descBn: 'চাপের মুখে অবিচল থাকা, আবেগ নিয়ন্ত্রণ এবং দীর্ঘমেয়াদি লক্ষ্য অর্জনের জন্য আত্মিক দৃঢ়তা।'
  }
];

export const aimFrameworks = [
  { name: 'GUIDE-IMPACT', focusEn: 'Comprehensive Turnaround Execution', focusBn: 'প্রাতিষ্ঠানিক রূপান্তরের সমন্বিত কাঠামো' },
  { name: 'Triple Lens Decision System', focusEn: 'Clarity Under Ambiguity', focusBn: 'জটিল মুহূর্তে সঠিক সিদ্ধান্ত প্রণয়ন' },
  { name: '5-Circle Stakeholder Model', focusEn: 'Holistic Ecosystem Alignment', focusBn: 'অংশীজনদের সমন্বয়ে টেকসই নেতৃত্ব' },
  { name: 'Cultural Bridge Framework', focusEn: 'Connecting Tradition with Global Markets', focusBn: 'ঐতিহ্য ও আধুনিকতার ভারসাম্য সৃষ্টি' },
  { name: 'Momentum Dashboard', focusEn: 'Sustained Operational Rhythm', focusBn: 'কাজের গতি ও ফলাফল মূল্যায়নের হাতিয়ার' },
  { name: 'Legacy Launch Protocol', focusEn: 'Enduring Enterprise Architecture', focusBn: 'দীর্ঘমেয়াদি প্রভাব সৃষ্টির কৌশল' },
  { name: 'Wellbeing Foundation', focusEn: 'Leader Stamina & Mental Balance', focusBn: 'নেতৃত্বের আত্মিক শান্তি ও মানসিক সুস্থতা' }
];

export const frameworkSteps: FrameworkStep[] = [
  {
    stepNumber: 1,
    labelEn: 'Goal (লক্ষ্য)',
    labelBn: '১. লক্ষ্য',
    summaryEn: 'Articulating a clear, noble objective born of genuine aspiration rather than vanity or imitation.',
    summaryBn: 'কোনো কাজ শুরু করার আগে তার উদ্দেশ্য স্পষ্ট করা। কেবল লোকদেখানো নয়, মনের গভীর থেকে লক্ষ্য নির্ধারণ।',
    reflectionPromptEn: 'Is this destination chosen consciously, or merely adopted from the expectations of others?',
    reflectionPromptBn: 'এই লক্ষ্য কি আমার অন্তরের সত্যিকারের তাগিদ, নাকি অন্যদের প্রত্যাশার চাপে নেওয়া?'
  },
  {
    stepNumber: 2,
    labelEn: 'Thinking (চিন্তা)',
    labelBn: '২. চিন্তা',
    summaryEn: 'Subjecting the goal to quiet, unhurried mental deliberation. Examining premises, constraints, and motives.',
    summaryBn: 'লক্ষ্যকে নিয়ে গভীরভাবে ও স্থিরভাবে ভাবা। এর পেছনের কারণ, প্রতিবন্ধকতা ও সম্ভাবনাগুলো বিশ্লেষণ করা।',
    reflectionPromptEn: 'Have you sat quietly with the challenge without rushing to immediate tactical answers?',
    reflectionPromptBn: 'হুজুগে সিদ্ধান্ত না নিয়ে আমি কি পুরো বিষয়টি নিয়ে যথেষ্ট একাগ্রতার সাথে ভেবেছি?'
  },
  {
    stepNumber: 3,
    labelEn: 'Insight (অন্তর্দৃষ্টি)',
    labelBn: '৩. অন্তর্দৃষ্টি',
    summaryEn: 'The arrival of clarity that cuts beneath surface appearances to uncover the core leverage point.',
    summaryBn: 'চিন্তার মধ্য দিয়ে সমস্যার মূল শেকড় বা আসল সত্যটি আবিষ্কার করা—যা বাইরের চোখে ধরা পড়ে না।',
    reflectionPromptEn: 'What essential truth about this endeavour remains hidden from casual observation?',
    reflectionPromptBn: 'এই কাজের কোন গভীর সত্যটি আমি উপলব্ধি করতে পেরেছি যা অন্যরা এড়িয়ে যায়?'
  },
  {
    stepNumber: 4,
    labelEn: 'Consultation (পরামর্শ)',
    labelBn: '৪. পরামর্শ',
    summaryEn: 'Seeking honest perspectives from wise mentors and trusted peers with the humility to hear hard truths.',
    summaryBn: 'অভিজ্ঞ ও নিরপেক্ষ মানুষের মতামত নেওয়া। আত্মঅহংকার দূরে রেখে সত্য পরামর্শ শোনার মানসিকতা।',
    reflectionPromptEn: 'Are you listening to test your convictions, or merely hunting for agreeable echoes?',
    reflectionPromptBn: 'আমি কি সত্য যাচাইয়ের জন্য পরামর্শ চাইছি, নাকি কেবল নিজের মতের সমর্থন খুঁজছি?'
  },
  {
    stepNumber: 5,
    labelEn: 'Decision (সিদ্ধান্ত)',
    labelBn: '৫. সিদ্ধান্ত',
    summaryEn: 'Making a firm, clear-eyed commitment. Taking full personal ownership of the course and its consequences.',
    summaryBn: 'দ্বিধাদ্বন্দ্ব কাটিয়ে দৃঢ়ভাবে পথ বেছে নেওয়া এবং তার ভালো-মন্দ ফলাফলের পূর্ণ দায় নিজের কাঁধে নেওয়া।',
    reflectionPromptEn: 'Are you ready to bear the entire weight of this choice without assigning blame if things go awry?',
    reflectionPromptBn: 'ফলাফল প্রতিকূল হলেও কি আমি কোনো অজুহাত ছাড়া এর পূর্ণ দায়িত্ব নিতে প্রস্তুত?'
  },
  {
    stepNumber: 6,
    labelEn: 'Committed Effort (মরিয়া চেষ্টা)',
    labelBn: '৬. মরিয়া চেষ্টা',
    summaryEn: 'Deploying sustained, tenacious energy. The sovereign human force where half-measures give way to total devotion.',
    summaryBn: 'কোনো ছাড় না দিয়ে নিজের সর্বশক্তি নিয়োগ করা। চেষ্টা হলো একমাত্র শক্তি যা সম্পূর্ণ নিজের নিয়ন্ত্রণাধীন।',
    reflectionPromptEn: 'Have you held back your deepest effort out of fear of vulnerability or defeat?',
    reflectionPromptBn: 'ব্যর্থতার ভয়ে কি আমি আমার চেষ্টার কোনো অংশ লুকিয়ে রাখছি, নাকি সর্বস্ব দিয়ে চেষ্টা করছি?'
  },
  {
    stepNumber: 7,
    labelEn: 'Action (কাজ)',
    labelBn: '৭. কাজ',
    summaryEn: 'Translating will into disciplined physical reality on the ground. Meticulous execution step by step.',
    summaryBn: 'ভাবনা ও ইচ্ছাকে মাঠপর্যায়ে বাস্তব কাজে রূপ দেওয়া। প্রতিটি ছোট কাজকে সর্বোচ্চ গুরুত্ব দিয়ে সম্পন্ন করা।',
    reflectionPromptEn: 'Is the standard of your daily craftsmanship worthy of the magnitude of your ambition?',
    reflectionPromptBn: 'আমার প্রতিদিনের কাজের মান কি আমার নির্ধারিত লক্ষ্যের প্রতি বিশ্বস্ত?'
  },
  {
    stepNumber: 8,
    labelEn: 'Review & Correction (যাচাই ও সংশোধন)',
    labelBn: '৮. যাচাই ও সংশোধন',
    summaryEn: 'Honest evaluation of what emerged. Whether greeted by success or failure, extracting wisdom to adjust course.',
    summaryBn: 'কাজের ফলাফলকে নির্মোহভাবে পরীক্ষা করা। সাফল্য বা ব্যর্থতা যাই আসুক, তা থেকে শিক্ষা নিয়ে নিজেকে শুধরে নেওয়া।',
    reflectionPromptEn: 'What blind spots did the outcome reveal, and how does this crucible reshape your next step?',
    reflectionPromptBn: 'এই অভিজ্ঞতায় আমার কোন ভুলটি ধরা পড়ল, আর সামনের দিনের জন্য আমি কী শিক্ষা নিলাম?'
  }
];

export const speakingThemes: SpeakingTheme[] = [
  {
    id: 'strategy-to-execution',
    titleEn: 'Where Strategy Meets Ground Reality: Flawless Execution',
    titleBn: 'কৌশল থেকে মাঠপর্যায়ের বাস্তবায়ন: নিখুঁত কর্মসম্পাদন',
    audienceEn: 'Executive summits, board retreats, enterprise leadership groups',
    audienceBn: 'করপোরেট শীর্ষ নেতৃত্ব ও ব্যবস্থাপনা পর্ষদ',
    summaryEn: 'Addressing the perennial gap between sophisticated boardroom strategies and actual marketplace outcomes. Asif shares pragmatic mechanisms for cascading clarity, aligning incentives, and enforcing accountability without stifling initiative.',
    summaryBn: 'বোর্ডরুমের চমৎকার পরিকল্পনা কেন অনেক সময় মাঠপর্যায়ে ব্যর্থ হয়? কৌশলকে দৈনন্দিন কাজের শৃঙ্খলায় রূপ দেওয়ার বাস্তবসম্মত রূপরেখা।',
    takeawaysEn: [
      'The 3 failure modes of corporate strategy communication',
      'Building operational dashboards that track leading indicators rather than rear-view metrics',
      'Instilling an owner mindset across middle management'
    ],
    takeawaysBn: [
      'করপোরেট কৌশল যোগাযোগের তিনটি সাধারণ ভুল',
      'অতীতের চেয়ে ভবিষ্যতের পথনির্দেশক ইন্ডিকেটর ট্র্যাকিং',
      'মধ্যম সারির ব্যবস্থাপকদের মধ্যে মালিকানাবোধ জাগ্রত করা'
    ]
  },
  {
    id: 'creativity-in-leadership',
    titleEn: 'Creativity as a Strategic Weapon in Ambiguous Markets',
    titleBn: 'অনিশ্চয়তার বাজারে কৌশলগত হাতিয়ার হিসেবে সৃজনশীলতা',
    audienceEn: 'Industry conferences, marketing forums, entrepreneur networks',
    audienceBn: 'বিপণন পেশাজীবী, উদ্যোক্তা ও শিল্প সম্মেলন',
    summaryEn: 'Drawing on four decades of songwriting and commercial turnaround, Asif demonstrates why analytical models alone cannot spark breakthrough value. True leadership requires the courage to discover narrative resonance.',
    summaryBn: 'চার দশকের গান লেখার সৃষ্টিশীল অভিজ্ঞতা ও ব্যবসায়িক সাফল্যের মেলবন্ধনে কীভাবে গতানুগতিক ছক ভেঙে অনন্য সমাধান বের করা যায়।',
    takeawaysEn: [
      'Why data without cultural intuition leads to commoditisation',
      'Cultivating cross-disciplinary curiosity inside structured teams',
      'Designing campaigns that command genuine emotional loyalty'
    ],
    takeawaysBn: [
      'সাংস্কৃতিক বোধহীন ডেটা কেন ব্র্যান্ডের স্বকীয়তা নষ্ট করে',
      'টিমের ভেতর বহুমুখী চিন্তার সমন্বয় ঘটানোর কৌশল',
      'গ্রাহকের অন্তরে স্থায়ী জায়গা করে নেওয়ার মতো কনটেন্ট তৈরি'
    ]
  },
  {
    id: 'mental-skills-leaders',
    titleEn: 'Mental Stamina: Thriving in High-Stakes Environments',
    titleBn: 'মানসিক শক্তি: চরম চাপের মুহূর্তে অবিচল থাকার শিল্প',
    audienceEn: 'University business schools, emerging leaders, professional associations',
    audienceBn: 'ব্যবসায় অনুষদের শিক্ষার্থী, তরুণ পেশাজীবী ও নেতৃত্ব',
    summaryEn: 'Based on the principles outlined in "Jodi Lokkho Thake Otut", this session explores cognitive resilience, dealing with public setbacks, and maintaining psychological equilibrium when outcomes hang in the balance.',
    summaryBn: '‘যদি লক্ষ্য থাকে অটুট’ বইয়ের আলোকে ব্যক্তিগত জীবনে হতাশা জয়, কঠিন সময়ে মানসিক ভারসাম্য রক্ষা ও দীর্ঘমেয়াদি লক্ষ্যের প্রতি একাগ্র থাকা।',
    takeawaysEn: [
      'The AIM framework for cognitive energy management',
      'De-linking self-worth from transient quarterly metrics',
      'Building disciplined daily rituals that protect creative focus'
    ],
    takeawaysBn: [
      'মানসিক শক্তি সঞ্চয় ও অপচয় রোধের কৌশল',
      'সাময়িক ব্যর্থতাকে ব্যক্তিগত পরাজয় হিসেবে না দেখে শিক্ষা হিসেবে নেওয়া',
      'মনোযোগ ও কাজের ধারাবাহিকতা রক্ষার দৈনন্দিন নিয়ম'
    ]
  },
  {
    id: 'bengali-wisdom-decisions',
    titleEn: 'Timeless Bengali Wisdom in Modern Decision-Making',
    titleBn: 'আধুনিক সিদ্ধান্ত গ্রহণে বাঙালির চিরায়ত লোকপ্রজ্ঞা',
    audienceEn: 'Cultural symposiums, cross-generational leadership forums, educational institutes',
    audienceBn: 'সাংস্কৃতিক সেমিনার, শিক্ষাপ্রতিষ্ঠান ও চিন্তাশীল সমাবেশ',
    summaryEn: 'Inspired by "Bhabia Korio Kaaj", Asif unpacks how regional proverbs and cultural proverbs encode centuries of behavioural economics and emotional intelligence applicable to modern life.',
    summaryBn: '‘ভাবিয়া করিও কাজ’ বইয়ের মূল ভাবনায় কীভাবে আমাদের লোকজ প্রবাদগুলোর মাঝে লুকিয়ে থাকা গভীর প্রজ্ঞা আধুনিক জীবনের কঠিন সিদ্ধান্ত নিতে পথ দেখায়।',
    takeawaysEn: [
      'Unpacking the cognitive perils of impulsivity',
      'Rooting modern enterprise culture in indigenous ethical foundations',
      'Balancing international best practices with local cultural nuances'
    ],
    takeawaysBn: [
      'উত্তেজনার বশে নেওয়া সিদ্ধান্তের দীর্ঘমেয়াদি ক্ষতি এড়ানো',
      'দেশীয় নৈতিক মূল্যবোধের ওপর টেকসই প্রাতিষ্ঠানিক সংস্কৃতি নির্মাণ',
      'আন্তর্জাতিক মানের সাথে স্থানীয় সংস্কৃতির মেলবন্ধন'
    ]
  },
  {
    id: 'purpose-and-service',
    titleEn: 'Profit Serves Purpose: The Service-First Leadership Model',
    titleBn: 'মুনাফা যখন মহৎ উদ্দেশ্যে: সেবামূলক নেতৃত্বের রূপরেখা',
    audienceEn: 'Social enterprises, philanthropic summits, development leadership',
    audienceBn: 'সামাজিক উদ্যোগ, দাতব্য সম্মেলন ও উন্নয়ন সংস্থা',
    summaryEn: 'Exploring why lasting enterprise durability is inextricably bound to the tangible value generated for others. From ASIX’s 900+ artisan livelihoods to healthcare crisis relief, purpose is presented as the primary driver of enterprise.',
    summaryBn: 'কেবল আর্থিক মুনাফা নয়, সমাজের মানুষের জন্য কী মূল্য তৈরি হলো—সেটিই প্রতিষ্ঠানের স্থায়িত্বের আসল মানদণ্ড। এসিক্সের ৯০০ কারুশিল্পীর অভিজ্ঞতা থেকে সেবামূলক ব্যবসার পাঠ।',
    takeawaysEn: [
      'Shifting from extractive business models to regenerative value creation',
      'Embedding social dignity inside commercial supply chains',
      'The personal peace of building an enterprise that outlives its founders'
    ],
    takeawaysBn: [
      'শোষণমূলক ব্যবসার পরিবর্তে মানুষের কল্যাণে সম্পদ সৃষ্টির পথ',
      'বাণিজ্যিক চেইনে প্রান্তিক মানুষের আত্মমর্যাদা প্রতিষ্ঠা',
      'প্রতিষ্ঠানের চেয়ে বড় কোনো মহৎ উদ্দেশ্যে নিজেকে নিবেদিত করার আনন্দ'
    ]
  }
];

export const educationAndService = {
  academicEn: 'Adjunct Faculty and Guest Lecturer at the Institute of Business Administration (IBA), University of Dhaka, engaging regularly with emerging business graduates, executive cohorts, and youth leadership forums.',
  academicBn: 'ঢাকা বিশ্ববিদ্যালয়ের আইবিএ (IBA)-এর অ্যাডজাঙ্কট ফ্যাকাল্টি ও অতিথি শিক্ষক হিসেবে তরুণ গ্র্যাজুয়েট ও করপোরেট পেশাজীবীদের পাঠদান ও দিকনির্দেশনা প্রদান।',
  institutesEn: [
    'Marketers Institute Bangladesh (MIB) – Knowledge sharing & industry dialogue',
    'Bangladesh Brand Forum (BBF) – Speaker & panel contributor',
    'Excellence Bangladesh – Youth career development mentorship',
    'National University Skill Development Program – Practical capability building'
  ],
  institutesBn: [
    'মার্কেটার্স ইনস্টিটিউট বাংলাদেশ (MIB) – জ্ঞান বিনিময় ও পেশাগত উৎকর্ষ',
    'বাংলাদেশ ব্র্যান্ড ফোরাম (BBF) – নিয়মিত আলোচক ও প্যানেলিস্ট',
    'এক্সিলেন্স বাংলাদেশ – তরুণদের ক্যারিয়ার বিষয়ক মেন্টরশিপ',
    'জাতীয় বিশ্ববিদ্যালয় স্কিল ডেভেলপমেন্ট প্রোগ্রাম – কর্মমুখী দক্ষতা উন্নয়ন'
  ],
  humanitarianEn: 'From volunteering with the Red Crescent in his early youth to mobilizing critical medical equipment and emergency oxygen supplies during the COVID-19 pandemic in Chattogram, Asif’s leadership is anchored in the conviction that privilege demands hands-on responsibility. His father’s Liberation War service in 1971 stands as the enduring family moral compass.',
  humanitarianBn: 'কৈশোরে রেড ক্রিসেন্টের স্বেচ্ছাসেবা থেকে শুরু করে করোনা মহামারির সময়ে চট্টগ্রামে জরুরি অক্সিজেন ও চিকিৎসাসামগ্রী পৌঁছে দেওয়া—আসিফ ইকবালের জীবনের অন্যতম বড় ব্রত মানবসেবা। ১৯৭১ সালে তাঁর বাবার মহান মুক্তিযুদ্ধে অংশগ্রহণ তাঁর পরিবারের দেশপ্রেম ও নৈতিক মূল্যবোধের প্রধান বাতিঘর।'
};

export const blogArticles: BlogArticle[] = [
  {
    id: 'effort-over-luck',
    slug: 'the-sovereign-power-of-effort-over-luck',
    titleEn: 'The Sovereign Power of Effort Over Luck',
    titleBn: 'ভাগ্যের চেয়ে চেষ্টার সার্বভৌম শক্তি',
    subtitleEn: 'Why human dignity is forged not in circumstances, but in the single currency we directly control.',
    subtitleBn: 'পরিস্থিতি নয়, মানুষের আত্মমর্যাদা রচিত হয় তার একমাত্র নিয়ন্ত্রণাধীন শক্তিতে।',
    categoryEn: 'Manuscript Reflections',
    categoryBn: 'পাণ্ডুলিপি ভাবনা',
    publishDateEn: 'February 2026',
    publishDateBn: 'ফেব্রুয়ারি ২০২৬',
    excerptEn: 'In our lifelong pursuit of achievement, we encounter three distinct forces: talent, luck, and effort. While talent is a gifted baseline and luck remains fickle, sustained effort is the only sovereign currency under our conscious jurisdiction.',
    excerptBn: 'মানুষের জীবনের যেকোনো অর্জনে তিনটি প্রধান শক্তি কাজ করে: মেধা, ভাগ্য এবং চেষ্টা। মেধা প্রকৃতিপ্রদত্ত আর ভাগ্য সময়ের ওপর নির্ভরশীল, কিন্তু অবিচল চেষ্টাই একমাত্র শক্তি যা সম্পূর্ণ আমাদের নিজস্ব নিয়ন্ত্রণে থাকে।',
    paragraphsEn: [
      'In any consequential human endeavour, three distinct forces govern the journey: talent (মেধা), luck (ভাগ্য), and effort (চেষ্টা). Society often fixates on the first two. We celebrate gifted prodigies with innate intelligence, or we attribute dramatic ascents to serendipitous timing and fortunate windfalls. Yet both talent and luck possess a peculiar quality: neither is generated solely by the will of the protagonist.',
      'Talent is an initial seed, endowed without prior negotiation. Left untended by sweat and sleepless devotion, it decays into unfulfilled promise. Luck, conversely, is an external climate—sometimes offering gentle rain, at other times presenting harsh arid droughts. To hinge one’s self-worth or strategic plans upon the capricious tides of fortune is to hand over the steering wheel of one’s destiny to the wind.',
      'Effort remains the singular, unyielding force within our sovereign jurisdiction. It is what we choose to do when the market is indifferent, when early expectations crumble, and when the crowd has long departed. As explored in the manuscript “বৃক্ষ তোমার নাম কী?”, the tree is ultimately revealed by its fruit, but that fruit is ripened only through deep, quiet root-work.',
      'When effort is committed without calculation of instant applause, failure loses its sting. Setbacks cease to be an indictment of human dignity; instead, they serve as rigorous feedback, redirecting the builder back to Step 8: review, correction, and renewed dedication.'
    ],
    paragraphsBn: [
      'মানুষের যেকোনো মহৎ ও দীর্ঘমেয়াদি অর্জনের পেছনে তিনটি প্রধান প্রভাবক কাজ করে: মেধা, ভাগ্য এবং চেষ্টা। সমাজ প্রায়শই প্রথম দুটি নিয়েই বেশি মেতে থাকে। আমরা সহজাত মেধার প্রশংসা করি, কিংবা কারো আকাশচুম্বী সাফল্যকে নিখাদ সৌভাগ্যের ফল বলে ধরে নিই। অথচ মেধা ও ভাগ্য—উভয়েরই একটি সীমাবদ্ধতা রয়েছে: কোনোটিই মানুষের নিজস্ব ইচ্ছার ওপর নির্ভরশীল নয়।',
      'মেধা হলো একটি বীজ, যা মানুষ জন্মসূত্রে উপহার হিসেবে পায়। কিন্তু নির্ঘুম পরিশ্রম আর সাধনা ছাড়া সেই মেধা সময়ের সাথে হারিয়ে যায়। অন্যদিকে ভাগ্য হলো বাইরের আবহাওয়া—কখনো তা অনুকূল বৃষ্টি দেয়, কখনো বা তীব্র খরা। ভাগ্যের অনিশ্চিত বাতাবরণের ওপর জীবনের হাল ছেড়ে দেওয়া মানে নিজের ভাগ্যের নিয়ন্ত্রণ অন্য কারো হাতে তুলে দেওয়া।',
      'কেবল ‘চেষ্টা’ই মানুষের একমাত্র অবিচল সার্বভৌম শক্তি। যখন বাজার প্রতিকূল থাকে, যখন প্রথম দিকের প্রত্যাশাগুলো ভেঙে পড়ে এবং চারপাশের কোলাহল থেমে যায়—তখন মানুষ কী করে, সেটাই তার আসল পরিচয়। ‘বৃক্ষ তোমার নাম কী?’ পাণ্ডুলিপির মূল কথা যেমন: ফলেই বৃক্ষের পরিচয়, আর সেই ফল ধারণ করতে হলে মাটির গভীরে শিকড় ছড়িয়ে প্রতিদিন নীরবে রস সংগ্রহ করতে হয়।',
      'যখন মানুষ তাৎক্ষণিক করতালির আশা না করে অবিচলভাবে চেষ্টা করে যায়, তখন ব্যর্থতা আর কোনো স্থায়ী লজ্জা থাকে না। তখন প্রতিটি ভুল নতুন করে নিজেকে শুধরে নেওয়ার সুযোগ তৈরি করে দেয়।'
    ]
  },
  {
    id: 'bengali-wisdom-decisions',
    slug: 'bengali-folk-wisdom-in-modern-decisions',
    titleEn: 'Bengali Folk Wisdom as a Heuristic for Modern Executive Decisions',
    titleBn: 'আধুনিক সিদ্ধান্ত গ্রহণে বাঙালির লোকপ্রজ্ঞার ব্যবহারিক প্রয়োগ',
    subtitleEn: 'Reclaiming age-old proverbs from nostalgia into rigorous behavioral economics.',
    subtitleBn: 'লোকজ প্রবাদকে নস্টালজিয়া নয়, মনস্তাত্ত্বিক সিদ্ধান্তের বিজ্ঞান হিসেবে গ্রহণ।',
    categoryEn: 'Decision Architecture',
    categoryBn: 'সিদ্ধান্ত বিজ্ঞান',
    publishDateEn: 'January 2026',
    publishDateBn: 'জানুয়ারি ২০২৬',
    excerptEn: 'Behind simple Bengali adages like "Bhabia Korio Kaaj" lie centuries of behavioral economics and cognitive safeguards designed to prevent executive impulsivity and hubris.',
    excerptBn: '‘ভাবিয়া করিও কাজ, করিয়া ভাবিও না’—এই সাধারণ বাংলা প্রবাদের আড়ালে লুকিয়ে আছে শত শত বছরের মনস্তাত্ত্বিক সতর্কতা, যা আধুনিক করপোরেট হঠকারিতা রোধে কার্যকর হাতিয়ার।',
    paragraphsEn: [
      'Modern executive leadership is often inundated with complex management frameworks, algorithmic dashboards, and quantitative risk matrices. Yet the most devastating institutional failures rarely stem from mathematical deficiencies; they occur when leaders fall prey to timeless psychological blind spots: overconfidence, impatience, and unexamined impulses.',
      'In our cultural heritage, Bengali proverbs have frequently been relegated to childhood textbooks or nostalgic bedtime stories. In my work and in the book “Bhabia Korio Kaaj” (ভাবিয়া করিও কাজ), I argue for the exact opposite: these adages represent sophisticated, centuries-tested heuristics for behavioural risk management.',
      'Consider the profound simplicity of “Bhabia korio kaaj, koria bhabio na” (Reflect before acting; do not act and then scramble to rationalize). In modern behavioral finance, this is precisely what Daniel Kahneman terms shifting from impulsive System 1 reaction to deliberate System 2 reflection. By formalizing a pause between initial insight and capital commitment, an organization protects itself from costly strategic blunders.',
      'When leaders ground modern global best practices in their indigenous ethical soil, decision-making gains both analytical rigor and cultural authenticity.'
    ],
    paragraphsBn: [
      'আধুনিক করপোরেট ব্যবস্থাপনা প্রতিনিয়ত জটিল ফ্রেমওয়ার্ক, অ্যালগরিদমিক ড্যাশবোর্ড এবং গাণিতিক ঝুঁকি ব্যবস্থাপনার ডেটায় ডুবে থাকে। অথচ প্রতিষ্ঠানের বড় বড় বিপর্যয়গুলো কিন্তু কোনো গাণিতিক ভুলের কারণে ঘটে না; বরং ঘটে মানুষের অতি-আত্মবিশ্বাস, অধৈর্য এবং অবিবেচক আবেগের বশে নেওয়া সিদ্ধান্তের কারণে।',
      'আমাদের সাংস্কৃতিক ঐতিহ্যে বাংলা প্রবাদগুলোকে প্রায়শই শৈশবের নীতিকথা বা নস্টালজিয়া হিসেবে দেখা হয়। কিন্তু আমার পেশাগত অভিজ্ঞতায় এবং ‘ভাবিয়া করিও কাজ’ বইটিতে আমি দেখিয়েছি কীভাবে এই লোকপ্রবাদগুলো মূলত অত্যন্ত সমৃদ্ধ মনস্তাত্ত্বিক সিদ্ধান্ত গ্রহণের কাঠামো হিসেবে কাজ করে।',
      '‘ভাবিয়া করিও কাজ, করিয়া ভাবিও না’—এই সরল কথার পেছনে রয়েছে আধুনিক আচরণগত অর্থনীতির অন্যতম মৌলিক সূত্র। কোনো পদক্ষেপ নেওয়ার আগে নিজের অন্ধবিন্দুগুলো নিরপেক্ষভাবে পরীক্ষা করে নেওয়ার যে শৃঙ্খলা, তা প্রতিষ্ঠানকে কোটি কোটি টাকার ক্ষতি ও কৌশলগত ভুল থেকে বাঁচিয়ে দিতে পারে।',
      'যখন কোনো নেতা বৈশ্বিক মানের সাথে নিজের দেশীয় সংস্কৃতির প্রজ্ঞাকে মিলিয়ে সিদ্ধান্ত নেন, তখন সেই সিদ্ধান্ত কেবল যৌক্তিকই হয় না, বরং তা দীর্ঘমেয়াদে টেকসই রূপ পায়।'
    ]
  },
  {
    id: 'anatomy-of-focus',
    slug: 'the-psychological-anatomy-of-focus',
    titleEn: 'Where Strategy Meets Soul: The Psychological Anatomy of Focus',
    titleBn: 'যদি লক্ষ্য থাকে অটুট: একাগ্রতার মনস্তত্ত্ব ও মানসিক শক্তি',
    subtitleEn: 'Shielding clarity of purpose from external applause and market turbulence.',
    subtitleBn: 'বাইরের কোলাহল ও সাময়িক ব্যর্থতার মুখে নিজের লক্ষ্যে অবিচল থাকা।',
    categoryEn: 'Mental Skills',
    categoryBn: 'মানসিক দক্ষতা',
    publishDateEn: 'December 2025',
    publishDateBn: 'ডিসেম্বর ২০২৫',
    excerptEn: 'Focus is not merely time management; it is emotional stamina under crisis. How the principles of "Jodi Lokkho Thake Otut" empower leaders to endure protracted uncertainty.',
    excerptBn: 'একাগ্রতা মানে কেবল সময় ব্যবস্থাপনা নয়; এটি হলো চরম সংকটের মুখে নিজের মানসিক ভারসাম্য বজায় রাখার আত্মিক ক্ষমতা।',
    paragraphsEn: [
      'In a hyper-connected economy driven by rapid news cycles and vanity metrics, the rarest asset is not capital or technical bandwidth—it is sustained, undisturbed cognitive focus. Leaders and creators constantly battle the dispersion of their emotional energy.',
      'The premise of “Jodi Lokkho Thake Otut” (যদি লক্ষ্য থাকে অটুট) begins with an unsparing diagnosis: motivation is an initial spark, but focus is an engineered daily ritual. When external praise dries up or unexpected commercial roadblocks emerge, undisciplined enthusiasm evaporates.',
      'To build unwavering focus, one must deliberately sever the subconscious link between daily self-worth and transient quarterly numbers. True mental stamina is forged during the silent, unglamorous hours of preparation—revisiting the original purpose and refusing to let external anxiety dictate internal conviction.',
      'A calm mind sees leverage points where a frantic mind only sees panic. When the goal remains intact and rooted in service, patience transforms into compounding competitive advantage.'
    ],
    paragraphsBn: [
      'তথ্যপ্রযুক্তির এই দ্রুতগতির যুগে সবচেয়ে দুর্লভ সম্পদ কিন্তু অর্থ বা প্রযুক্তিগত জ্ঞান নয়—সবচেয়ে দুর্লভ সম্পদ হলো নিরবচ্ছিন্ন গভীর মনোযোগ ও একাগ্রতা। আজকের পেশাজীবী ও নেতারা প্রতিনিয়ত নানামুখী বিভ্রান্তির শিকার হচ্ছেন।',
      '‘যদি লক্ষ্য থাকে অটুট’ বইয়ের মূল দর্শন হলো: ক্ষণস্থায়ী আবেগ দিয়ে বড় কোনো কাজ সম্পন্ন করা যায় না। অনুপ্রেরণা প্রাথমিক আগুন ধরাতে পারে, কিন্তু সেই আগুনকে দিনের পর দিন জ্বালিয়ে রাখতে প্রয়োজন মানসিক শৃঙ্খলা ও অবিচল একাগ্রতা।',
      'মানসিক দৃঢ়তা অর্জনের জন্য নিজের আত্মমর্যাদাকে সাময়িক লাভ-ক্ষতির পাল্লা থেকে আলাদা রাখতে হয়। যখন পরিস্থিতি প্রতিকূল হয়, তখন শান্ত মনের মানুষ সমস্যার ভেতরে নতুন সমাধানের পথ দেখতে পায়, যেখানে অধৈর্য মানুষ কেবল আতঙ্কগ্রস্ত হয়ে পড়ে।',
      'লক্ষ্য যখন স্থির এবং জনকল্যাণের সাথে যুক্ত থাকে, তখন ধৈর্য কোনো দুর্বলতা নয়, বরং তা পরিণত হয় এক অপ্রতিরোধ্য শক্তিতে।'
    ]
  },
  {
    id: 'profit-serves-purpose',
    slug: 'profit-serves-purpose-building-for-others',
    titleEn: 'Profit Serves Purpose: The Generative Power of Building for Others',
    titleBn: 'মুনাফা যখন সেবার অধীন: অন্যের জন্য স্থায়ী মূল্য সৃষ্টি',
    subtitleEn: 'Lessons from 900+ handloom artisan livelihoods and the longevity of regenerative enterprise.',
    subtitleBn: '৯০০ কারুশিল্পীর অভিজ্ঞতা থেকে টেকসই ও দায়বদ্ধ ব্যবসার পাঠ।',
    categoryEn: 'Enterprise Leadership',
    categoryBn: 'নেতৃত্ব ও দর্শন',
    publishDateEn: 'November 2025',
    publishDateBn: 'নভেম্বর ২০২৫',
    excerptEn: 'An enterprise that merely extracts economic surplus ultimately exhausts its community. True durability arises when commercial mechanisms exist to uplift lives.',
    excerptBn: 'যে প্রতিষ্ঠান কেবল মুনাফা শোষণ করে, সে দীর্ঘমেয়াদে টিকে থাকতে পারে না। ব্যবসার আসল শক্তি হলো মানুষের জীবনে ইতিবাচক পরিবর্তনের হাতিয়ার হওয়া।',
    paragraphsEn: [
      'For decades, standard business education taught that the sole responsibility of enterprise was shareholder maximization. Yet thirty years across consumer goods, retail, and social business have confirmed the exact opposite: an extractive mindset creates fragile institutions that collapse at the first major shock.',
      'At ASIX, co-founded to bridge authentic Bangladeshi handloom craft with international markets, we witnessed this regenerative truth firsthand. By anchoring the operating model in the dignity and fair livelihood of 900+ rural women artisans, commercial profit became the fuel for social uplift rather than an end in itself.',
      'When an artisan knows her craft is respected globally and her household has stable economic security, the quality of weaving rises to extraordinary heights. Purpose does not weaken commercial margins; it fortifies the supply chain with unparalleled loyalty and authenticity.',
      'Where strategy meets soul, profit ceases to be a selfish trophy. It becomes the sustainable engine that allows good work to continue across generations.'
    ],
    paragraphsBn: [
      'বহু বছর ধরে ব্যবসায়িক শিক্ষায় শেখানো হয়েছে যে কোম্পানির একমাত্র কাজ কেবল শেয়ারহোল্ডারদের মুনাফা বাড়ানো। অথচ তিন দশকের করপোরেট ও উদ্যোক্তা জীবনের অভিজ্ঞতা বলে: কেবল শোষণভিত্তিক মানসিকতা নিয়ে কোনো প্রতিষ্ঠান দীর্ঘস্থায়ী হতে পারে না।',
      'গ্রামীণ ঐতিহ্যবাহী তাঁতশিল্প নিয়ে গড়ে তোলা ‘এসিক্স’-এর অভিজ্ঞতায় আমরা দেখেছি কীভাবে প্রান্তিক ৯০০ নারী কারুশিল্পীর ন্যায্য অধিকার ও জীবিকা নিশ্চিত করে আন্তর্জাতিক বাজারে একটি আত্মমর্যাদাশীল ব্র্যান্ড তৈরি করা যায়।',
      'যখন একজন কারুশিল্পী অনুভব করেন যে তাঁর কাজের মর্যাদা বিশ্বদরবারে পৌঁছাচ্ছে এবং তাঁর পরিবারের আর্থিক নিরাপত্তা সুনিশ্চিত, তখন কাজের মান আপনা থেকেই অসাধারণ হয়ে ওঠে। সামাজিক দায়বদ্ধতা কখনো ব্যবসার পথে বাধা নয়, বরং তা ব্র্যান্ডের সবচেয়ে বড় শক্তি।',
      'মুনাফা যখন মহৎ উদ্দেশ্য অর্জনের মাধ্যম হয়, তখন ব্যবসা কেবল একটি প্রতিষ্ঠান থাকে না—তা মানুষের ভালোবাসা ও আস্থার প্রতীকে পরিণত হয়।'
    ]
  },
  {
    id: 'lyricist-in-boardroom',
    slug: 'the-lyricist-in-the-boardroom',
    titleEn: 'The Lyricist in the Boardroom: Cultivating Intuition in Ambiguous Markets',
    titleBn: 'বোর্ডরুমে গীতিকবিতার শিক্ষা: অনিশ্চয়তার বাজারে মানবিক বোধের ক্ষমতা',
    subtitleEn: 'Why analytical spreadsheets alone cannot spark loyalty without cultural depth.',
    subtitleBn: 'সাংস্কৃতিক সংবেদনশীলতা ছাড়া কেবল ডেটা দিয়ে মানুষের অন্তরে পৌঁছানো যায় না।',
    categoryEn: 'Creative Strategy',
    categoryBn: 'সৃজনশীল কৌশল',
    publishDateEn: 'October 2025',
    publishDateBn: 'অক্টোবর ২০২৫',
    excerptEn: 'Songwriting teaches you to say in twelve lines what people feel across a lifetime. How poetic brevity transforms corporate communication from sterile transactions into emotional loyalty.',
    excerptBn: 'একটি সফল গান মানুষের আজীবনের না-বলা অনুভূতিকে অল্প কয়েকটি চরণে প্রকাশ করে। এই সৃষ্টিশীল বোধ কীভাবে ব্র্যান্ড যোগাযোগকে মানুষের হৃদয়ের সাথে যুক্ত করে।',
    paragraphsEn: [
      'In traditional corporate corridors, artistic pursuit is often dismissed as an eccentric hobby detached from commercial realities. Yet over four decades of writing songs alongside executive corporate roles, I discovered that lyric writing was the finest training in consumer empathy I could ever possess.',
      'A song cannot hide behind technical jargon. In three minutes and a dozen lyrical lines, a lyricist must strike an emotional truth so resonant that a stranger immediately feels: “This was written about my own heartbreak, my own hope, my own silent prayer.”',
      'When this same poetic economy is applied to brand strategy and marketing architecture, transformative clarity emerges. Marketing campaigns cease sounding like automated sales pitches. Instead, they articulate the unspoken aspirations of the consumer.',
      'Data will inform you where people walked yesterday; but cultural intuition and poetic honesty show you where people dream of going tomorrow.'
    ],
    paragraphsBn: [
      'প্রচলিত করপোরেট অঙ্গনে শিল্পচর্চাকে অনেক সময় ব্যবসায়িক জগতের বাইরের একটি বিষয় মনে করা হয়। অথচ চার দশকেরও বেশি সময় ধরে একদিকে গান লেখা এবং অন্যদিকে করপোরেট নেতৃত্ব দেওয়ার অভিজ্ঞতায় আমি দেখেছি: গীতিকবিতা মূলত মানুষের গভীর মনস্তত্ত্ব বোঝার সর্বশ্রেষ্ঠ পাঠশালা।',
      'গানে কোনো ভণিতার সুযোগ থাকে না। মাত্র তিন-চার মিনিটে কয়েকটি পঙ্‌ক্তির ভেতর এমন গভীর সত্য ফুটিয়ে তুলতে হয়, যা শুনে একজন অচেনা শ্রোতাও নিজের জীবনের গল্প খুঁজে পান।',
      'এই সৃষ্টিশীল পরিমিতিবোধ ও গভীর আবেগ যখন কোনো ব্যবসায়িক ব্র্যান্ড বা ক্যাম্পেইনে প্রয়োগ করা হয়, তখন তা কেবল তথ্যের প্রচার থাকে না—তা হয়ে ওঠে মানুষের হৃদয়ের সাথে সংযোগ।',
      'ডেটা আপনাকে জানাতে পারে অতীতে মানুষ কী করেছে; কিন্তু সৃজনশীল অনুভূতিই বলে দিতে পারে মানুষ ভবিষ্যতে কোন স্বপ্নের দিকে হাত বাড়াবে।'
    ]
  }
];

