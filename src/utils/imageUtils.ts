/**
 * Utility to resolve cover URLs, converting Google Drive sharing links
 * to direct high-speed CDN URLs (lh3.googleusercontent.com).
 */
export function resolveCoverUrl(url: string | undefined): string {
  if (!url) return '';
  const trimmed = url.trim();
  // Check for Google Drive file link: /file/d/FILE_ID
  const driveFileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveFileMatch && driveFileMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveFileMatch[1]}`;
  }
  // Check for Google Drive URL parameter: id=FILE_ID
  const driveIdMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (driveIdMatch && driveIdMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveIdMatch[1]}`;
  }
  // Check for Google Drive path: /d/FILE_ID
  const drivePathMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (drivePathMatch && drivePathMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${drivePathMatch[1]}`;
  }
  return trimmed;
}
