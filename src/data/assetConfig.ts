/**
 * Central Configuration for Assets, Verified External URLs, and Contact Routing.
 * Edit this file to add approved photography, official social media handles,
 * or connect a production backend email API.
 */
export const assetConfig = {
  // Approved photography of Asif Iqbal:
  // Captured from the official keynote and leadership discourse series:
  heroPortraitUrl: "/images/asif-hero-poster.jpg",
  secondaryPortraitUrl: "/images/asif-hero-poster.jpg",
  heroVideoUrl: "/videos/hero-bg.mp4",
  heroVideoPosterUrl: "/videos/hero-bg-poster.jpg",
  heroVideoFlowSourceUrl: "https://flow.google.com/shared/video/d50b3a4f-45a5-450a-a878-bf2508a68821",
  heroVideoFallbackCdnUrl: "https://flow-content.google/video/93a1e182-e92a-4dc8-9680-04fdbb8e97f1?Expires=1790871587&KeyName=labs-flow-prod-cdn-key&Signature=MizXf04MUMWBQ-sux-PpSkKl9pE",

  // Production Domain for Canonical URLs & Social Sharing
  productionDomain: "https://asifiqbal.com",

  // Outbound Verified Links for Ventures (Leave empty if pending official verification)
  ventureLinks: {
    achieveConsulting: "", // e.g. "https://achievebd.com"
    acis: "",
    asix: "https://asixbd.com", // approved artisan craft venture
    gaanChill: "https://gaanchill.com", // GaanChill Music platform
  },

  // Approved Social Links (Only verified profiles)
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/asif-iqbal",
    youtube: "https://www.youtube.com/@GaanChillMusic",
    facebook: "",
    twitter: "",
  },

  // Contact Delivery Configuration
  contactEndpointUrl: "/api/contact",
  recipientEmail: "contact@asifiqbal.com",
};
