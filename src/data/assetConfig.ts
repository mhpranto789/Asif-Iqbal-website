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
  heroVideoFallbackCdnUrl: "",

  // Production Domain for Canonical URLs & Social Sharing
  productionDomain: "https://asifiqbal.com",

  // Outbound Verified Links for Ventures (Leave empty if pending official verification)
  ventureLinks: {
    achieveConsulting: "https://www.achieveconsultingbd.com/", // official corporate advisory portal
    acis: "",
    asix: "https://asixbd.com", // approved artisan craft venture
    gaanChill: "https://www.youtube.com/@GaanchillMusicOfficial", // GaanChill Music platform & official YouTube channel
  },

  // Approved Social Links (Only verified profiles)
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/asifiqbalctg?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    facebook: "https://www.facebook.com/asif.iqbal.asix",
    youtube: "https://www.youtube.com/@GaanchillMusicOfficial",
    twitter: "",
  },

  // Contact Delivery Configuration
  contactEndpointUrl: "/api/contact",
  recipientEmail: "contact@asifiqbal.com",
};
