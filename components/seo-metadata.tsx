import Head from "next/head"

interface SeoMetadataProps {
  title: string
  description: string
  canonicalUrl?: string
  ogImage?: string
  ogType?: "website" | "article"
  twitterCard?: "summary" | "summary_large_image"
}

export function SeoMetadata({
  title,
  description,
  canonicalUrl,
  ogImage = "/og-image.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
}: SeoMetadataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://delistme.com"
  const fullCanonicalUrl = canonicalUrl ? (canonicalUrl.startsWith("http") ? canonicalUrl : `${siteUrl}${canonicalUrl}`) : siteUrl
  const fullOgImage = ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`

  const fullTitle = `${title} | DelistMe`

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content="DelistMe" />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
    </>
  )
}
