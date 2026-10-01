import React, { useState } from 'react';
import { Language, RoutePath } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Shield,
  Feather,
  Briefcase,
  Music,
  Users,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Award,
  ChevronRight,
  ExternalLink,
  Layers,
  Heart,
  Globe2,
  TreePine,
  Maximize2
} from 'lucide-react';

interface CareerTreeDiagramProps {
  language: Language;
  onNavigate?: (route: RoutePath) => void;
}

export type TreeNodeType = 'root' | 'trunk' | 'branch' | 'fruit';

export interface TreeNode {
  id: string;
  type: TreeNodeType;
  level: number; // 0 = roots, 1 = trunk, 2 = branches, 3 = fruits
  titleEn: string;
  titleBn: string;
  subtitleEn: string;
  subtitleBn: string;
  categoryEn: string;
  categoryBn: string;
  yearOrEraEn: string;
  yearOrEraBn: string;
  icon: typeof Shield;
  color: 'teal' | 'emerald' | 'amber' | 'cyan' | 'rose';
  descriptionEn: string;
  descriptionBn: string;
  quoteEn?: string;
  quoteBn?: string;
  metricsEn?: string;
  metricsBn?: string;
  relatedRoute?: RoutePath;
  ctaTextEn?: string;
  ctaTextBn?: string;
}

const TREE_NODES: TreeNode[] = [
  // --- ROOTS (Origins & Moral Foundations) ---
  {
    id: 'root-moral-heritage',
    type: 'root',
    level: 0,
    titleEn: '1971 Liberation War & Moral Anchor',
    titleBn: '১৯৭১ মুক্তিযুদ্ধ ও নৈতিক উত্তরাধিকার',
    subtitleEn: 'Paternal service in liberation war shaping civic responsibility',
    subtitleBn: 'বাবার সক্রিয় মুক্তিযুদ্ধ ও দেশপ্রেমের আজীবন আদর্শ',
    categoryEn: 'Root 01 · Moral Foundation',
    categoryBn: 'শিকড় ০১ · নৈতিক ভিত্তি',
    yearOrEraEn: '1971 Heritage',
    yearOrEraBn: '১৯৭১ ঐতিহ্য',
    icon: Shield,
    color: 'teal',
    descriptionEn:
      'Growing up in a family rooted in dignity, education, and public duty. His father’s active service in the 1971 Liberation War established his lifelong conviction that freedom, citizenship, and leadership require direct, unhesitating sacrifice for the collective good.',
    descriptionBn:
      'মর্যাদাপূর্ণ ও শিক্ষানুরাগী পারিবারিক আবহ। ১৯৭১ সালে মহান মুক্তিযুদ্ধে বাবার সরাসরি অংশগ্রহণ জীবনের অন্যতম প্রধান নৈতিক বাতিঘর। সেখান থেকেই তাঁর মনে দেশপ্রেম, দায়িত্ববোধ ও নিঃস্বার্থ আত্মত্যাগের গভীর বীজ রোপিত হয়।',
    quoteEn: '“Freedom and dignity are never passive inheritances; they require active contribution.”',
    quoteBn: '“মর্যাদা ও স্বাধীনতা কোনো নিস্ক্রিয় প্রাপ্তি নয়; এর জন্য প্রয়োজন অবিরাম কর্ম ও দায়বদ্ধতা।”',
    metricsEn: 'Foundational moral compass',
    metricsBn: 'জীবনের মূল নৈতিক কম্পাস',
  },
  {
    id: 'root-humanitarian-service',
    type: 'root',
    level: 0,
    titleEn: 'Youth Red Crescent Humanitarian Service',
    titleBn: 'কৈশোরের রেড ক্রিসেন্ট স্বেচ্ছাসেবা',
    subtitleEn: 'Grassroots relief fieldwork in Chittagong',
    subtitleBn: 'চট্টগ্রামে মাঠপর্যায়ে আর্তমানবতার পাশে দাঁড়ানোর অভিজ্ঞতা',
    categoryEn: 'Root 02 · Grassroots Empathy',
    categoryBn: 'শিকড় ০২ · তৃণমূল সহমর্মিতা',
    yearOrEraEn: 'Early Youth',
    yearOrEraBn: 'কৈশোর ও প্রথম যৌবন',
    icon: Heart,
    color: 'rose',
    descriptionEn:
      'Rather than observing social deprivation from a distance, Asif threw himself into volunteer humanitarian operations with the Red Crescent during devastating cyclones and floods in coastal Bangladesh. This early physical encounter with human resilience shaped his empathetic leadership style.',
    descriptionBn:
      'দূর থেকে কেবল পর্যবেক্ষণ নয়, বরং সংকটকালে রেড ক্রিসেন্টের সাথে উপকূলীয় এলাকায় সরাসরি ত্রাণ ও দুর্যোগ মোকাবিলার অভিজ্ঞতা। মানুষের বেঁচে থাকার লড়াইয়ের এই প্রত্যক্ষ দর্শন তাঁর নেতৃত্বের ভাষা ও সামাজিক দায়বদ্ধতাকে আজীবন প্রভাবিত করেছে।',
    quoteEn: '“Standing beside vulnerable people in crisis teaches leadership no business school can replicate.”',
    quoteBn: '“সংকটকালে মানুষের পাশে দাঁড়ানোর যে শিক্ষা, তা কোনো করপোরেট পাঠশালায় শেখা যায় না।”',
    metricsEn: 'Disaster response & relief',
    metricsBn: 'ত্রাণ ও মানবিক সহমর্মিতা',
  },
  {
    id: 'root-sober-humility',
    type: 'root',
    level: 0,
    titleEn: 'Academic Setbacks & Sober Humility',
    titleBn: 'বাস্তবতার অভিঘাত ও অহংকার বিসর্জন',
    subtitleEn: 'The turning point documented in "বৃক্ষ তোমার নাম কী?"',
    subtitleBn: '‘বৃক্ষ তোমার নাম কী?’ পাণ্ডুলিপির গভীর আত্মোপলব্ধি',
    categoryEn: 'Root 03 · Soul Searching',
    categoryBn: 'শিকড় ০৩ · আত্মানুসন্ধান',
    yearOrEraEn: 'Mid 1980s',
    yearOrEraBn: 'আশির দশকের মাঝামাঝি',
    icon: Compass,
    color: 'amber',
    descriptionEn:
      'As candidly chronicled in his autobiographical manuscript, early unexpected academic hurdles shattered youthful complacencies. Stripped of superficial pride, Asif was forced to look inward, discovering that true resilience begins when one stops relying on excuses and embraces total accountability.',
    descriptionBn:
      'জীবনের প্রথম দিকের অপ্রত্যাশিত প্রাতিষ্ঠানিক ব্যর্থতা ও অনিশ্চয়তা অহংকার চূর্ণ করে নতুন আত্মোপলব্ধির জন্ম দেয়। অজুহাত ছেড়ে নিজের দায় নিজের কাঁধে নেওয়ার এই কঠিন পাঠ থেকেই শুরু হয় নবজন্ম।',
    quoteEn: '“When illusions fade, genuine effort becomes the only sovereign currency.”',
    quoteBn: '“অহংকার ঝরে গেলে একমাত্র সৎ চেষ্টাই মানুষের প্রকৃত শক্তিতে পরিণত হয়।”',
    metricsEn: 'Catalyst for creative rebirth',
    metricsBn: 'সৃজনশীল জাগরণের সূচনা',
    relatedRoute: 'story',
  },

  // --- TRUNK (Core Polymath Skills & Disciplines) ---
  {
    id: 'trunk-corporate-turnaround',
    type: 'trunk',
    level: 1,
    titleEn: 'Executive Turnaround & Commercial Vision',
    titleBn: 'করপোরেট রূপান্তর ও বাণিজ্যিক দূরদর্শিতা',
    subtitleEn: '30+ years orchestrating growth across 12 industry verticals',
    subtitleBn: '১২টি শীর্ষ শিল্পখাতে তিন দশকের নেতৃত্ব ও সংস্কার',
    categoryEn: 'Core Skill 01 · Strategic Rigour',
    categoryBn: 'মূল দক্ষতা ০১ · কৌশলগত শৃঙ্খলা',
    yearOrEraEn: '30+ Years Practice',
    yearOrEraBn: '৩০+ বছরের অভিজ্ঞতা',
    icon: Briefcase,
    color: 'teal',
    descriptionEn:
      'Mastery in FMCG supply chains, national distribution logistics, market share reversals, and multi-tier enterprise restructuring. Known as a turnaround architect who transforms struggling business units into profitable national market leaders through cultural discipline and data-backed accountability.',
    descriptionBn:
      'এফএমসিজি, রিটেইল এবং শিল্পখাতে বাজার রূপান্তরের প্রমাণিত দক্ষতা। বাণিজ্যিক সংকট উত্তরণ, সাপ্লাই চেইন উন্নয়ন এবং মানবসম্পদকে অনুপ্রাণিত করে লাভজনক ধারায় ফিরিয়ে আনার অনন্য কৌশল।',
    quoteEn: '“Turnaround is not merely cutting costs; it is restoring a company’s belief in its own capabilities.”',
    quoteBn: '“ব্যবসার রূপান্তর কেবল ব্যয় কমানো নয়; বরং প্রতিষ্ঠানের আত্মবিশ্বাস ফিরিয়ে আনা।”',
    metricsEn: '12 verticals · Billions in value created',
    metricsBn: '১২টি খাত · শত কোটি টাকার ভ্যালু ক্রিয়েশন',
    relatedRoute: 'work',
    ctaTextEn: 'Explore Enterprise Work',
    ctaTextBn: 'বাণিজ্যিক রূপান্তর দেখুন',
  },
  {
    id: 'trunk-lyric-craft',
    type: 'trunk',
    level: 1,
    titleEn: 'Lyrical Craft & Cultural Storytelling',
    titleBn: 'বাংলা আধুনিক গীতিকবিতা ও সুরসাধনা',
    subtitleEn: '42+ years distilling human vulnerability into song',
    subtitleBn: '৪২ বছর ধরে মানুষের অনুভূতির নিভৃত সুরভাষ্য',
    categoryEn: 'Core Skill 02 · Creative Soul',
    categoryBn: 'মূল দক্ষতা ০২ · সৃজনশীল সত্তা',
    yearOrEraEn: '42+ Years Craft',
    yearOrEraBn: '৪২+ বছরের সাধনা',
    icon: Music,
    color: 'amber',
    descriptionEn:
      'Strictly dedicated as a poet-lyricist (never performing singer or composer). With over 1,000 recorded songs across genres—from heavy rock ballads with James and Souls to delicate modern melodies—his lyrics bridge romantic tenderness with philosophical longing.',
    descriptionBn:
      'একনিষ্ঠ গীতিকবি হিসেবে ৪২ বছরের সাধনা। জেমস ও সোলসের রক ব্যালাড থেকে শুরু করে আধুনিক মেলোডি—এক হাজারেরও বেশি রেকর্ডকৃত গানে বাংলা ভাষার সমৃদ্ধ প্রকাশ।',
    quoteEn: '“Lyrics are emotions given shelter inside the architecture of rhythm.”',
    quoteBn: '“গীতিকবিতা হলো ছন্দের আশ্রয়ে মানুষের অব্যক্ত অনুভূতির চিরস্থায়ী বাসা।”',
    metricsEn: '1,000+ recorded works',
    metricsBn: '১,০০০+ রেকর্ডকৃত গান',
    relatedRoute: 'music',
    ctaTextEn: 'Listen to Archive',
    ctaTextBn: 'গানের আর্কাইভ শুনুন',
  },
  {
    id: 'trunk-social-craft',
    type: 'trunk',
    level: 1,
    titleEn: 'Artisan Revival & Ethical Economics',
    titleBn: 'ঐতিহ্যবাহী তাঁত ও টেকসই সামাজিক উদ্যোগ',
    subtitleEn: 'Reviving Jamdani, Khadi & indigenous handlooms',
    subtitleBn: 'জামদানি, খাদি ও দেশীয় কারুশিল্পীদের স্বাবলম্বীকরণ',
    categoryEn: 'Core Skill 03 · Social Craft',
    categoryBn: 'মূল দক্ষতা ০৩ · সামাজিক অর্থনীতি',
    yearOrEraEn: 'Heritage Enterprise',
    yearOrEraBn: 'ঐতিহ্য সংরক্ষণ উদ্যোগ',
    icon: Users,
    color: 'emerald',
    descriptionEn:
      'Through ASIX, Asif connected traditional rural artisans directly with modern domestic and global markets, bypassing exploitative middlemen. Elevating handloom weaving from fading folklore into a proud, economically viable contemporary fashion statement.',
    descriptionBn:
      'মধ্যস্বত্বভোগীদের দৌরাত্ম্য দূর করে প্রান্তিক তাঁতশিল্পী ও কারিগরদের সরাসরি জাতীয় ও আন্তর্জাতিক বাজারের সাথে যুক্ত করা। বিলুপ্তপ্রায় হস্তশিল্পকে একটি আধুনিক ও টেকসই পেশায় রূপান্তর।',
    quoteEn: '“A nation’s true wealth resides in the hands that preserve its threads of heritage.”',
    quoteBn: '“জাতির প্রকৃত সম্পদ লুকিয়ে থাকে ঐতিহ্যবাহী কারুশিল্পীদের সুনিপুণ হাতে।”',
    metricsEn: '900+ women artisans empowered',
    metricsBn: '৯০০+ নারী কারুশিল্পীর স্থায়ী জীবিকা',
    relatedRoute: 'work',
    ctaTextEn: 'View ASIX Venture',
    ctaTextBn: 'এসিক্স উদ্যোগ দেখুন',
  },
  {
    id: 'trunk-pedagogy-mentorship',
    type: 'trunk',
    level: 1,
    titleEn: 'Academic Pedagogy & Cognitive Mentorship',
    titleBn: 'বিশ্ববিদ্যালয় শিক্ষকতা ও প্রজ্ঞাময় মেন্টরিং',
    subtitleEn: 'Adjunct faculty at IBA, University of Dhaka & author',
    subtitleBn: 'আইবিএ ঢাকা বিশ্ববিদ্যালয়ে শিক্ষকতা ও সিদ্ধান্ত গ্রহণের বই',
    categoryEn: 'Core Skill 04 · Thought Leadership',
    categoryBn: 'মূল দক্ষতা ০৪ · চিন্তাশীল নেতৃত্ব',
    yearOrEraEn: 'Decades of Teaching',
    yearOrEraBn: 'কয়েক দশকের শিক্ষকতা',
    icon: GraduationCap,
    color: 'cyan',
    descriptionEn:
      'Bridging boardroom pragmatism with rigorous academic frameworks. Mentoring thousands of graduate students at the Institute of Business Administration (IBA), Dhaka University, and authoring seminal management books on decision-making under pressure and focused execution.',
    descriptionBn:
      'বোর্ডরুমের বাস্তব অভিজ্ঞতাকে বিশ্ববিদ্যালয়ের শ্রেণিকক্ষে শিক্ষার্থীদের মধ্যে ছড়িয়ে দেওয়া। ঢাকা বিশ্ববিদ্যালয় আইবিএ-তে শিক্ষকতা ও সিদ্ধান্ত গ্রহণের মনস্তত্ত্ব নিয়ে গবেষণাধর্মী গ্রন্থ রচনা।',
    quoteEn: '“Teaching is not filling an empty vessel; it is kindling an internal flame of disciplined curiosity.”',
    quoteBn: '“শিক্ষকতা কেবল তথ্য দেওয়া নয়; শিক্ষার্থীর ভেতর চিন্তার আগুন জ্বালিয়ে দেওয়া।”',
    metricsEn: 'Thousands of corporate leaders trained',
    metricsBn: 'হাজারো ভবিষ্যৎ করপোরেট লিডার',
    relatedRoute: 'ideas',
    ctaTextEn: 'Read Books & Models',
    ctaTextBn: 'বই ও মডেলসমূহ দেখুন',
  },

  // --- BRANCHES (Key Career Milestones & Flagship Ventures) ---
  {
    id: 'branch-1988-anonna',
    type: 'branch',
    level: 2,
    titleEn: '1988 Breakthrough: "Anonna" with James',
    titleBn: '১৯৮৮ ঐতিহাসিক অভিষেক: জেমসের সাথে ‘অনন্যা’',
    subtitleEn: 'Redefining the landscape of modern Bengali rock ballad',
    subtitleBn: 'বাংলা আধুনিক ব্যান্ড সংগীতে কালজয়ী মোড় পরিবর্তন',
    categoryEn: 'Milestone 01 · Music History',
    categoryBn: 'মাইলফলক ০১ · সংগীত ইতিহাস',
    yearOrEraEn: '1988',
    yearOrEraBn: '১৯৮৮',
    icon: Music,
    color: 'amber',
    descriptionEn:
      'In 1988, Asif Iqbal collaborated with iconic frontman James to create "Anonna" (অনন্যা). The song exploded across Bangladesh and the Bengali diaspora, cementing a new genre of introspective, poetic rock ballad that resonates across four generations.',
    descriptionBn:
      '১৯৮৮ সালে জেমসের কণ্ঠে আসিফ ইকবালের লেখা ‘অনন্যা’ গানটি বাংলা সংগীতে এক নতুন দিগন্ত উন্মোচন করে। এরপর সোলস, পার্থ বড়ুয়া, বাপ্পা মজুমদার ও সাম্প্রতিক শিল্পীদের সাথে কালজয়ী সৃষ্টির ধারা অব্যাহত থাকে।',
    quoteEn: '“Anonna wasn’t just a hit song; it was a voice given to young heartbreaks everywhere.”',
    quoteBn: '“‘অনন্যা’ কেবল একটি গান ছিল না; তা ছিল এক প্রজন্মের অব্যক্ত বেদনার প্রকাশ।”',
    metricsEn: 'Multi-generational timeless classic',
    metricsBn: 'চার প্রজন্মের কালজয়ী সুর',
    relatedRoute: 'music',
  },
  {
    id: 'branch-unilever-era',
    type: 'branch',
    level: 2,
    titleEn: 'Unilever Bangladesh Leadership Era',
    titleBn: 'ইউনিলিভার বাংলাদেশ নেতৃত্বকাল',
    subtitleEn: 'Mastering multinational brand architecture & operational discipline',
    subtitleBn: 'বহুজাতিক ব্র্যান্ড গঠন ও সাপ্লাই চেইনের নিখুঁত শৃঙ্খলা',
    categoryEn: 'Milestone 02 · Corporate Foundation',
    categoryBn: 'মাইলফলক ০২ · করপোরেট ভিত্তি',
    yearOrEraEn: '1995 — 2011',
    yearOrEraBn: '১৯৯৫ — ২০১১',
    icon: TrendingUp,
    color: 'teal',
    descriptionEn:
      'Sixteen years of leadership inside one of the world’s most demanding multinational environments. Asif led top consumer brand categories, built national distribution footprints, and mastered the science of consumer psychology and market positioning.',
    descriptionBn:
      '১৬ বছর ধরে শীর্ষস্থানীয় বহুজাতিক প্রতিষ্ঠানে ব্র্যান্ড ডিরেকশন ও অপারেশনাল নেতৃত্ব। ভোক্তা আচরণ বোঝা, জাতীয় সরবরাহ নেটওয়ার্ক গঠন এবং আন্তর্জাতিক মানের কর্মপদ্ধতি আত্মস্থ করা।',
    metricsEn: '16 Years of MNC Excellence',
    metricsBn: '১৬ বছরের বহুজাতিক অভিজ্ঞতা',
    relatedRoute: 'work',
  },
  {
    id: 'branch-meghna-turnaround',
    type: 'branch',
    level: 2,
    titleEn: 'Meghna Group of Industries (MGI) Transformation',
    titleBn: 'মেঘনা গ্রুপ অফ ইন্ডাস্ট্রিজ (MGI) রূপান্তর',
    subtitleEn: 'Scaling national conglomerate to multi-billion consumer footprint',
    subtitleBn: 'শীর্ষ দেশীয় শিল্পগোষ্ঠীর বিশাল ব্র্যান্ড পুনর্গঠন',
    categoryEn: 'Milestone 03 · Industrial Turnaround',
    categoryBn: 'মাইলফলক ০৩ · বৃহৎ শিল্প সংস্কার',
    yearOrEraEn: '2011 — 2020',
    yearOrEraBn: '২০১১ — ২০২০',
    icon: Briefcase,
    color: 'teal',
    descriptionEn:
      'As Executive Director of MGI, Asif orchestrated one of the most comprehensive brand turnarounds in Bangladeshi industrial history. He unified fragmented industrial product lines into household powerhouses (Fresh, etc.), expanding market reach across the country.',
    descriptionBn:
      'এমজিআই-এর এক্সিকিউটিভ ডিরেক্টর হিসেবে পণ্যের ব্র্যান্ডিং, প্যাকেজিং ও ডিস্ট্রিবিউশনে যুগান্তকারী সংস্কার সাধন। দেশীয় ব্র্যান্ড ‘ফ্রেশ’-কে শীর্ষস্থানীয় জনপ্রিয়তায় অধিষ্ঠিত করা।',
    quoteEn: '“Scale without emotional resonance is fragile; we gave industrial products human relevance.”',
    quoteBn: '“আবেগ ছাড়া শুধু পণ্যের বিস্তার ক্ষণস্থায়ী; আমরা পণ্যের সাথে মানুষের আস্থা জুড়ে দিয়েছি।”',
    metricsEn: 'Dominant FMCG market leadership',
    metricsBn: 'এফএমসিজি বাজারে শীর্ষ অবস্থান',
    relatedRoute: 'work',
  },
  {
    id: 'branch-gaanchill-platform',
    type: 'branch',
    level: 2,
    titleEn: 'Founding of GaanChill Music & Intellectual Property',
    titleBn: 'গানচিল মিউজিক প্রতিষ্ঠা ও মেধার অধিকার',
    subtitleEn: 'Pioneering ethical royalty and modern music production in Dhaka',
    subtitleBn: 'শিল্পী-গীতিকারদের রয়্যালটি সুরক্ষা ও সুস্থ ধারার সংগীত',
    categoryEn: 'Milestone 04 · Creative Ecosystem',
    categoryBn: 'মাইলফলক ০৪ · সংগীত বিপ্লব',
    yearOrEraEn: '2007 — Present',
    yearOrEraBn: '২০০৭ — বর্তমান',
    icon: Sparkles,
    color: 'amber',
    descriptionEn:
      'Disturbed by the rampant piracy and disregard for artists’ rights in the early 2000s, Asif founded GaanChill Music. The platform became an intellectual property safe haven, producing legendary acoustic and orchestral albums while guaranteeing rightful compensation to lyricists and composers.',
    descriptionBn:
      'পাইরেসি ও মেধার অবমূল্যায়নের বিরুদ্ধে দাঁড়িয়ে গানচিল মিউজিকের প্রতিষ্ঠা। গীতিকার, সুরকার ও তরুণ প্রতিভাদের ন্যায্য রয়্যালটি নিশ্চিত করে বাংলা আধুনিক গানের এক সমৃদ্ধ মঞ্চ।',
    metricsEn: 'Pioneered digital IP rights in Bangladesh',
    metricsBn: 'ডিজিটাল মেধাস্বত্বে অগ্রগামী ভূমিকা',
    relatedRoute: 'music',
  },
  {
    id: 'branch-achieve-consulting',
    type: 'branch',
    level: 2,
    titleEn: 'Founding Achieve Consulting & ACIS',
    titleBn: 'অ্যাচিভ কনসাল্টিং ও এসিআইএস প্রতিষ্ঠা',
    subtitleEn: 'High-stake strategic advisory for South Asian enterprises',
    subtitleBn: 'দক্ষিণ এশিয়ার শীর্ষ প্রতিষ্ঠানের কৌশলগত রূপান্তর উপদেষ্টা',
    categoryEn: 'Milestone 05 · Boutique Advisory',
    categoryBn: 'মাইলফলক ০৫ · কৌশলগত পরামর্শ',
    yearOrEraEn: '2021 — Present',
    yearOrEraBn: '২০২১ — বর্তমান',
    icon: Globe2,
    color: 'emerald',
    descriptionEn:
      'Leveraging three decades of CEO and turnaround wisdom, Asif created Achieve Consulting. Working directly with founders, boards, and executive leadership to solve growth plateaus, supply chain bottlenecks, and generational leadership succession.',
    descriptionBn:
      'প্রতিষ্ঠাতা ও পরিচালনা পর্ষদের সাথে সরাসরি কাজ করে ব্যবসার প্রবৃদ্ধি নিশ্চিত করা। নতুন নেতৃত্ব তৈরি, বাজার সম্প্রসারণ এবং কর্পোরেট সুশাসন প্রতিষ্ঠায় পরামর্শ প্রদান।',
    metricsEn: 'Advising premier national corporations',
    metricsBn: 'শীর্ষ কর্পোরেট গ্রুপের উপদেষ্টা',
    relatedRoute: 'work',
  },

  // --- FRUITS (Enduring Legacy & Cumulative Impact) ---
  {
    id: 'fruit-songs-anthology',
    type: 'fruit',
    level: 3,
    titleEn: '1,000+ Recorded Bengali Songs',
    titleBn: '১,০০০+ কালজয়ী রেকর্ডকৃত গান',
    subtitleEn: 'An indelible imprint upon Bengali cultural consciousness',
    subtitleBn: 'বাঙালির সাংস্কৃতিক জীবনে চিরন্তন সুর ও কথা',
    categoryEn: 'Fruit 01 · Cultural Harvest',
    categoryBn: 'সুফল ০১ · সাংস্কৃতিক অবদান',
    yearOrEraEn: 'Living Archive',
    yearOrEraBn: 'চিরন্তন আর্কাইভ',
    icon: Award,
    color: 'amber',
    descriptionEn:
      'Over 1,000 published works recorded by South Asia’s finest voices. Songs that played at university farewells, wedding celebrations, national sports victories, and quiet midnight reflections.',
    descriptionBn:
      'চার দশকের সাধনায় এক সহস্রাধিক গান যা বাঙালির আনন্দ, বিরহ ও জাতীয় উদযাপনের অংশ হয়ে রয়েছে।',
    metricsEn: '1,000+ Songs · National Recognition',
    metricsBn: '১,০০০+ গান · জাতীয় স্বীকৃতি',
    relatedRoute: 'music',
  },
  {
    id: 'fruit-artisan-families',
    type: 'fruit',
    level: 3,
    titleEn: '900+ Handloom Artisan Families Sustained',
    titleBn: '৯০০+ তাঁতশিল্পী পরিবারের স্থায়ী স্বাবলম্বীকরণ',
    subtitleEn: 'Decent work, fair wages, and heritage preservation',
    subtitleBn: 'ন্যায্য পারিশ্রমিক ও হারিয়ে যাওয়া ঐতিহ্য সংরক্ষণ',
    categoryEn: 'Fruit 02 · Social Impact',
    categoryBn: 'সুফল ০২ · সামাজিক প্রভাব',
    yearOrEraEn: 'Empowerment',
    yearOrEraBn: 'অর্থনৈতিক সচ্ছলতা',
    icon: Users,
    color: 'emerald',
    descriptionEn:
      'Rural women in handloom clusters now earn sustainable, independent household incomes, educating their daughters and keeping heritage textile traditions alive on world stages.',
    descriptionBn:
      'গ্রামীণ নারী কারুশিল্পীদের পরিবারে অর্থনৈতিক সচ্ছলতা ও নারীর ক্ষমতায়ন। জামদানি ও দেশীয় সুতা রপ্তানি করে স্বনির্ভরতা।',
    metricsEn: '900+ Households · Global Distribution',
    metricsBn: '৯০০+ পরিবার · আন্তর্জাতিক বাজার',
    relatedRoute: 'work',
  },
  {
    id: 'fruit-turnaround-scale',
    type: 'fruit',
    level: 3,
    titleEn: '30+ Years of Enterprise Economic Value',
    titleBn: '৩০ বছরের শীর্ষ কর্পোরেট সম্পদ ও কর্মসংস্থান',
    subtitleEn: 'Turnaround leadership across Shwapno, City Group, Meghna, Unilever',
    subtitleBn: 'স্বপ্ন, সিটি গ্রুপ, মেঘনা ও ইউনিলিভারে বিশাল কর্মসংস্থান সৃষ্টি',
    categoryEn: 'Fruit 03 · Economic Impact',
    categoryBn: 'সুফল ০৩ · অর্থনৈতিক অবদান',
    yearOrEraEn: 'Enterprise Record',
    yearOrEraBn: 'বাণিজ্যিক সাফল্য',
    icon: TrendingUp,
    color: 'teal',
    descriptionEn:
      'Creating thousands of direct formal employment opportunities, revitalizing national supply chains, and driving billions of BDT in annual enterprise revenue across Bangladesh.',
    descriptionBn:
      'হাজার হাজার মানুষের কর্মসংস্থান সৃষ্টি, দেশীয় শিল্প সক্ষমতা বৃদ্ধি এবং জাতীয় অর্থনীতিতে প্রত্যক্ষ অবদান।',
    metricsEn: 'Tens of thousands of jobs nurtured',
    metricsBn: 'বিশাল কর্মসংস্থান ও বাণিজ্য প্রবৃদ্ধি',
    relatedRoute: 'work',
  },
  {
    id: 'fruit-published-wisdom',
    type: 'fruit',
    level: 3,
    titleEn: 'Books & "সাফল্যের পথ নক্সা" Models',
    titleBn: 'প্রকাশিত বই ও ‘সাফল্যের পথ নক্সা’ ফ্রেমওয়ার্ক',
    subtitleEn: 'Mindset books and cognitive frameworks for the next generation',
    subtitleBn: 'তরুণদের মানসিক বিকাশ ও সিদ্ধান্ত গ্রহণের পথপ্রদর্শক',
    categoryEn: 'Fruit 04 · Intellectual Legacy',
    categoryBn: 'সুফল ০৪ · মননশীল উত্তরাধিকার',
    yearOrEraEn: 'Publications',
    yearOrEraBn: 'প্রকাশনা ও দর্শন',
    icon: GraduationCap,
    color: 'cyan',
    descriptionEn:
      'Published books translating lived leadership experience into cognitive models. Equipping the next generation of Asian professionals with tools to overcome emotional and organizational hurdles.',
    descriptionBn:
      'বাস্তব জীবনের অভিজ্ঞতার আলোকে রচিত জনপ্রিয় মোটিভেশনাল ও স্ট্র্যাটেজিক বইসমূহ, যা তরুণদের অনুপ্রাণিত করছে।',
    metricsEn: 'Widely referenced in university cohorts',
    metricsBn: 'বিশ্ববিদ্যালয় ও তরুণদের মাঝে সমাদৃত',
    relatedRoute: 'ideas',
  },
];

export const CareerTreeDiagram: React.FC<CareerTreeDiagramProps> = ({
  language,
  onNavigate,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('trunk-corporate-turnaround');
  const [filterLevel, setFilterLevel] = useState<'all' | 'roots' | 'trunk' | 'branches' | 'fruits'>('all');

  const selectedNode = TREE_NODES.find((n) => n.id === selectedNodeId) || TREE_NODES[0];

  const filteredNodes = TREE_NODES.filter((n) => {
    if (filterLevel === 'all') return true;
    if (filterLevel === 'roots') return n.type === 'root';
    if (filterLevel === 'trunk') return n.type === 'trunk';
    if (filterLevel === 'branches') return n.type === 'branch';
    if (filterLevel === 'fruits') return n.type === 'fruit';
    return true;
  });

  const roots = TREE_NODES.filter((n) => n.type === 'root');
  const trunk = TREE_NODES.filter((n) => n.type === 'trunk');
  const branches = TREE_NODES.filter((n) => n.type === 'branch');
  const fruits = TREE_NODES.filter((n) => n.type === 'fruit');

  const getNodeColorClass = (color: TreeNode['color'], isActive: boolean) => {
    if (isActive) {
      return 'bg-amber-400/15 border-amber-400 text-amber-200 ring-1 ring-amber-400/40 shadow-lg shadow-amber-500/10';
    }
    return 'bg-white/[0.04] border-white/10 text-slate-300 hover:border-amber-400/40 hover:bg-white/[0.08] hover:text-white transition-all';
  };

  return (
    <div className="rounded-3xl bg-[#0D1520] text-white p-6 sm:p-10 lg:p-12 border border-white/10 shadow-xl relative overflow-hidden space-y-8">
      {/* Header and Metaphor Presentation */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold uppercase tracking-wider">
            <TreePine className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {language === 'en'
                ? 'Leadership & Skills Architecture'
                : '‘বৃক্ষ তোমার নাম কী?’ জীবন ও দক্ষতার মহীরূহ'}
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {language === 'en'
              ? 'The Polymath Tree of Growth'
              : 'আসিফ ইকবালের কর্মযাত্রার মহীরূহ'}
          </h2>

          <p className="font-editorial italic text-base sm:text-lg text-slate-300 leading-relaxed">
            {language === 'en'
              ? '“বৃক্ষ তোমার নাম কী? ফলে পরিচয়” — From moral roots and core capacities to the enduring fruits of an extraordinary four-decade polymath journey.'
              : '“বৃক্ষ তোমার নাম কী? ফলে পরিচয়” — মুক্তিযুদ্ধের চেতনা ও পারিবারিক শিকড় থেকে চার দশকের সৃষ্টিশীল কর্মের শাখা-প্রশাখা।'}
          </p>
        </div>

        {/* Level Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1.5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md overflow-x-auto">
          {[
            { id: 'all' as const, labelEn: 'All Growth', labelBn: 'পূর্ণ মহীরূহ' },
            { id: 'roots' as const, labelEn: 'Roots', labelBn: 'শিকড়' },
            { id: 'trunk' as const, labelEn: 'Core Skills', labelBn: 'মূল দক্ষতা' },
            { id: 'branches' as const, labelEn: 'Milestones', labelBn: 'মাইলফলক' },
            { id: 'fruits' as const, labelEn: 'Legacy / Impact', labelBn: 'সুফল ও প্রভাব' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterLevel(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                filterLevel === tab.id
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {language === 'en' ? tab.labelEn : tab.labelBn}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Split Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Interactive Tree Diagram Visualization (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-mono text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
              <span>{language === 'en' ? 'Select any milestone to view details' : 'বিস্তারিত দেখতে যে কোনো নোড নির্বাচন করুন'}</span>
            </span>
            <span className="text-slate-400">
              {language === 'en' ? 'Bottom: Roots → Top: Fruits' : 'নিচে: শিকড় → উপরে: সুফল'}
            </span>
          </div>

          {/* Tree Diagram Container with Animated Connecting Stems */}
          <div className="relative rounded-2xl bg-black/40 border border-white/10 p-6 sm:p-8 space-y-8 backdrop-blur-md overflow-hidden">
            {/* Ambient Vertical Tree Trunk Centerline */}
            <div className="absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-amber-400/40 via-teal-400/40 to-teal-800/40 pointer-events-none" />

            {/* LEVEL 4: THE FRUITS (Enduring Legacy & Cumulative Impact) */}
            {(filterLevel === 'all' || filterLevel === 'fruits') && (
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <span className="h-px w-8 bg-amber-400/30" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-semibold px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30">
                    {language === 'en' ? 'Level 4 · The Enduring Fruits (ফলে পরিচয়)' : 'চতুর্থ স্তর · মহীরূহের সুফল ও প্রভাব'}
                  </span>
                  <span className="h-px w-8 bg-amber-400/30" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {fruits.map((node) => {
                    const Icon = node.icon;
                    const isActive = node.id === selectedNodeId;
                    return (
                      <motion.button
                        key={node.id}
                        onClick={() => setSelectedNodeId(node.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${getNodeColorClass(
                          node.color,
                          isActive
                        )}`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`p-2 rounded-lg ${isActive ? 'bg-amber-400 text-slate-950' : 'bg-white/5'}`}>
                            <Icon className="w-4 h-4 shrink-0" />
                          </div>
                          <div className="truncate">
                            <div className="font-display text-sm font-bold text-white truncate">
                              {language === 'en' ? node.titleEn : node.titleBn}
                            </div>
                            <div className="text-[11px] opacity-80 truncate">
                              {language === 'en' ? node.subtitleEn : node.subtitleBn}
                            </div>
                          </div>
                        </div>
                        {isActive && (
                          <span className="relative flex h-2 w-2 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* LEVEL 3: THE BRANCHES (Career Milestones & Turnaround Eras) */}
            {(filterLevel === 'all' || filterLevel === 'branches') && (
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <span className="h-px w-8 bg-teal-400/30" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-teal-300 font-semibold px-2 py-0.5 rounded bg-teal-950/60 border border-teal-500/30">
                    {language === 'en' ? 'Level 3 · The Branches (Milestones & Eras)' : 'তৃতীয় স্তর · ডালপালা ও মাইলফলকসমূহ'}
                  </span>
                  <span className="h-px w-8 bg-teal-400/30" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {branches.map((node) => {
                    const Icon = node.icon;
                    const isActive = node.id === selectedNodeId;
                    return (
                      <motion.button
                        key={node.id}
                        onClick={() => setSelectedNodeId(node.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${getNodeColorClass(
                          node.color,
                          isActive
                        )}`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`p-2 rounded-lg ${isActive ? 'bg-teal-400 text-slate-950' : 'bg-white/5'}`}>
                            <Icon className="w-4 h-4 shrink-0" />
                          </div>
                          <div className="truncate">
                            <div className="font-display text-sm font-bold text-white truncate">
                              {language === 'en' ? node.titleEn : node.titleBn}
                            </div>
                            <div className="text-[11px] opacity-80 truncate">
                              {language === 'en' ? node.yearOrEraEn : node.yearOrEraBn} · {language === 'en' ? node.categoryEn.split('·')[1] : node.categoryBn.split('·')[1]}
                            </div>
                          </div>
                        </div>
                        {isActive && (
                          <span className="relative flex h-2 w-2 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* LEVEL 2: THE TRUNK (Core Polymath Skills & Disciplines) */}
            {(filterLevel === 'all' || filterLevel === 'trunk') && (
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <span className="h-px w-8 bg-emerald-400/30" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-300 font-semibold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
                    {language === 'en' ? 'Level 2 · The Polymath Trunk (Core Skills)' : 'দ্বিতীয় স্তর · কাণ্ড ও মূল দক্ষতাসমূহ'}
                  </span>
                  <span className="h-px w-8 bg-emerald-400/30" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {trunk.map((node) => {
                    const Icon = node.icon;
                    const isActive = node.id === selectedNodeId;
                    return (
                      <motion.button
                        key={node.id}
                        onClick={() => setSelectedNodeId(node.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${getNodeColorClass(
                          node.color,
                          isActive
                        )}`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`p-2 rounded-lg ${isActive ? 'bg-emerald-400 text-slate-950' : 'bg-white/5'}`}>
                            <Icon className="w-4 h-4 shrink-0" />
                          </div>
                          <div className="truncate">
                            <div className="font-display text-sm font-bold text-white truncate">
                              {language === 'en' ? node.titleEn : node.titleBn}
                            </div>
                            <div className="text-[11px] opacity-80 truncate">
                              {language === 'en' ? node.subtitleEn : node.subtitleBn}
                            </div>
                          </div>
                        </div>
                        {isActive && (
                          <span className="relative flex h-2 w-2 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* LEVEL 1: THE ROOTS (Moral Roots & Early Turning Points) */}
            {(filterLevel === 'all' || filterLevel === 'roots') && (
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <span className="h-px w-8 bg-teal-700/40" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-slate-300 font-semibold px-2 py-0.5 rounded bg-slate-900 border border-slate-700">
                    {language === 'en' ? 'Level 1 · The Deep Roots (Origins & Foundations)' : 'প্রথম স্তর · মাটির গভীরে শিকড় ও উৎস'}
                  </span>
                  <span className="h-px w-8 bg-teal-700/40" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {roots.map((node) => {
                    const Icon = node.icon;
                    const isActive = node.id === selectedNodeId;
                    return (
                      <motion.button
                        key={node.id}
                        onClick={() => setSelectedNodeId(node.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2 ${getNodeColorClass(
                          node.color,
                          isActive
                        )}`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5 shrink-0" />
                          <span className="text-[10px] font-mono uppercase text-slate-400">
                            {language === 'en' ? node.yearOrEraEn : node.yearOrEraBn}
                          </span>
                        </div>
                        <div className="font-display text-xs font-bold text-white leading-tight">
                          {language === 'en' ? node.titleEn : node.titleBn}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Dynamic Node Inspector Panel with Framer Motion (5 cols) */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-xl shadow-2xl space-y-6 sticky top-24"
            >
              {/* Node Badge & Meta */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  {language === 'en' ? selectedNode.categoryEn : selectedNode.categoryBn}
                </span>
                <span className="text-xs text-amber-400 font-mono font-medium">
                  {language === 'en' ? selectedNode.yearOrEraEn : selectedNode.yearOrEraBn}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-2">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                  {language === 'en' ? selectedNode.titleEn : selectedNode.titleBn}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-teal-400">
                  {language === 'en' ? selectedNode.subtitleEn : selectedNode.subtitleBn}
                </p>
              </div>

              {/* Detailed Narrative */}
              <p className="text-sm text-slate-300 leading-relaxed font-body">
                {language === 'en' ? selectedNode.descriptionEn : selectedNode.descriptionBn}
              </p>

              {/* Philosophical Quote if Available */}
              {selectedNode.quoteEn && (
                <div className="p-4 rounded-xl bg-white/[0.03] border-l-2 border-amber-400 border-y border-r border-white/5 font-editorial italic text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                  {language === 'en' ? selectedNode.quoteEn : selectedNode.quoteBn}
                </div>
              )}

              {/* Impact Key Metric */}
              {selectedNode.metricsEn && (
                <div className="p-3.5 rounded-xl bg-teal-950/40 border border-teal-500/30 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">
                    {language === 'en' ? 'Cumulative Impact' : 'অর্জিত সুফল'}
                  </span>
                  <span className="font-bold text-teal-300 font-display">
                    {language === 'en' ? selectedNode.metricsEn : selectedNode.metricsBn}
                  </span>
                </div>
              )}

              {/* Interactive Navigation Link if Route exists */}
              {selectedNode.relatedRoute && onNavigate && (
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate(selectedNode.relatedRoute!)}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-teal-500/20 group"
                  >
                    <span>
                      {selectedNode.ctaTextEn
                        ? language === 'en'
                          ? selectedNode.ctaTextEn
                          : selectedNode.ctaTextBn
                        : language === 'en'
                        ? 'Explore this Chapter'
                        : 'এই অধ্যায় বিস্তারিত দেখুন'}
                    </span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
