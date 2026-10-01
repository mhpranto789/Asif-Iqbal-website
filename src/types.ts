export type Language = 'en' | 'bn';

export type RoutePath = 'home' | 'story' | 'work' | 'music' | 'ideas' | 'speaking' | 'blog' | 'contact';

export interface BlogArticle {
  id: string;
  slug: string;
  titleEn: string;
  titleBn: string;
  subtitleEn: string;
  subtitleBn: string;
  categoryEn: string;
  categoryBn: string;
  publishDateEn: string;
  publishDateBn: string;
  excerptEn: string;
  excerptBn: string;
  paragraphsEn: string[];
  paragraphsBn: string[];
}

export interface VentureItem {
  id: string;
  name: string;
  nameBn: string;
  taglineEn: string;
  taglineBn: string;
  relationshipEn: string;
  relationshipBn: string;
  descriptionEn: string;
  descriptionBn: string;
  operatingModelEn: string;
  operatingModelBn: string;
  keyHighlightsEn: string[];
  keyHighlightsBn: string[];
  officialUrl?: string;
  enquiryType: EnquiryCategory;
}

export interface CareerMilestone {
  id: string;
  organisation: string;
  organisationBn: string;
  periodOrRoleEn: string;
  periodOrRoleBn: string;
  contextEn: string;
  contextBn: string;
  contributionEn: string;
  contributionBn: string;
  reportedOutcomeEn: string;
  reportedOutcomeBn: string;
  isHistoricalNote?: boolean;
}

export interface SongItem {
  id: string;
  titleEn: string;
  titleBn: string;
  artistCredit: string;
  roleEn: string;
  roleBn: string;
  year?: number;
  yearText?: string;
  contextEn: string;
  contextBn: string;
  youtubeId?: string;
  externalLink?: string;
}

export interface BookItem {
  id: string;
  titleEn: string;
  titleBn: string;
  subtitleEn: string;
  subtitleBn: string;
  type: 'published' | 'manuscript';
  statusEn: string;
  statusBn: string;
  themeEn: string;
  themeBn: string;
  descriptionEn: string;
  descriptionBn: string;
  keyTakeawaysEn: string[];
  keyTakeawaysBn: string[];
}

export interface FrameworkStep {
  stepNumber: number;
  labelEn: string;
  labelBn: string;
  summaryEn: string;
  summaryBn: string;
  reflectionPromptEn: string;
  reflectionPromptBn: string;
}

export interface SpeakingTheme {
  id: string;
  titleEn: string;
  titleBn: string;
  audienceEn: string;
  audienceBn: string;
  summaryEn: string;
  summaryBn: string;
  takeawaysEn: string[];
  takeawaysBn: string[];
}

export type EnquiryCategory = 'business' | 'speaking' | 'creative' | 'media' | 'other';

export interface ContactFormData {
  name: string;
  email: string;
  organisation: string;
  enquiryType: EnquiryCategory;
  message: string;
}
