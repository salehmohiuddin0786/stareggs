export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stareggs.in';

  const routes = [
    '',
    '/products',
    '/wholesale',
    '/distribution',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' || route === '/products' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/wholesale' ? 0.9 : 0.8,
  }));

  return routes;
}
