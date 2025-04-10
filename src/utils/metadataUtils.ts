/**
 * Tiện ích để quản lý metadata SEO
 */

/**
 * Cập nhật tiêu đề và các thẻ meta của trang
 * @param metadata Thông tin metadata cần cập nhật
 */
export const updatePageMetadata = (metadata: {
  title: string;
  description: string;
  keywords?: string;
  openGraph: {
    title: string;
    description: string;
    image: string;
    url: string;
    type: string;
  };
  canonical: string;
}) => {
  // Cập nhật tiêu đề
  document.title = metadata.title;

  // Cập nhật meta description
  updateMetaTag("name", "description", metadata.description);

  // Cập nhật meta keywords nếu có
  if (metadata.keywords) {
    updateMetaTag("name", "keywords", metadata.keywords);
  }

  // Cập nhật OpenGraph tags
  updateMetaTag("property", "og:title", metadata.openGraph.title);
  updateMetaTag("property", "og:description", metadata.openGraph.description);
  updateMetaTag("property", "og:image", metadata.openGraph.image);
  updateMetaTag("property", "og:url", metadata.openGraph.url);
  updateMetaTag("property", "og:type", metadata.openGraph.type || "website");

  // Cập nhật canonical link
  updateCanonicalLink(metadata.canonical);
};

/**
 * Cập nhật một thẻ meta
 */
export const updateMetaTag = (attributeName: string, attributeValue: string, content: string) => {
  let metaTag = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (metaTag) {
    metaTag.setAttribute("content", content);
  } else {
    metaTag = document.createElement("meta");
    metaTag.setAttribute(attributeName, attributeValue);
    metaTag.setAttribute("content", content);
    document.head.appendChild(metaTag);
  }
};

/**
 * Cập nhật liên kết canonical
 */
export const updateCanonicalLink = (href: string) => {
  let linkTag = document.querySelector('link[rel="canonical"]');
  if (linkTag) {
    linkTag.setAttribute("href", href);
  } else {
    linkTag = document.createElement("link");
    linkTag.setAttribute("rel", "canonical");
    linkTag.setAttribute("href", href);
    document.head.appendChild(linkTag);
  }
};
