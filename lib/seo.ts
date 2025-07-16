import { Metadata } from 'next';
import { siteConfig } from './site-config';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

export function generateSEO({
  title,
  description = siteConfig.description,
  keywords = siteConfig.keywords,
  image = siteConfig.ogImage,
  url = siteConfig.url,
  type = 'website',
  publishedTime,
  modifiedTime,
}: SEOProps = {}): Metadata {
  const fullTitle = title 
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} - Desarrollo Web y Gestión de Redes Sociales`;

  const fullUrl = url.startsWith('http') ? url : `${siteConfig.url}${url}`;
  const fullImage = image.startsWith('http') ? image : `${siteConfig.url}${image}`;

  return {
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.creator,
    publisher: siteConfig.publisher,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: siteConfig.name,
      locale: 'es_AR',
      type,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: siteConfig.social.twitter,
      images: [fullImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateStructuredData(type: 'Organization' | 'WebSite' | 'Service', data?: any) {
  const baseUrl = siteConfig.url;
  
  switch (type) {
    case 'Organization':
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteConfig.name,
        url: baseUrl,
        logo: `${baseUrl}/placeholder-logo.png`,
        description: siteConfig.description,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: siteConfig.contact.phone,
          contactType: 'customer service',
          email: siteConfig.contact.email,
        },
        sameAs: [
          `https://twitter.com/${siteConfig.social.twitter.replace('@', '')}`,
          `https://facebook.com/${siteConfig.social.facebook}`,
          `https://instagram.com/${siteConfig.social.instagram}`,
        ],
      };

    case 'WebSite':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.name,
        url: baseUrl,
        description: siteConfig.description,
        publisher: {
          '@type': 'Organization',
          name: siteConfig.name,
        },
      };

    case 'Service':
      return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: data?.name || 'Desarrollo Web',
        description: data?.description || 'Servicios de desarrollo web profesional',
        provider: {
          '@type': 'Organization',
          name: siteConfig.name,
          url: baseUrl,
        },
        areaServed: 'Argentina',
        serviceType: 'Desarrollo Web',
      };

    default:
      return null;
  }
}