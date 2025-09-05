import { ScrapedData, ScrapingError } from '../types/scraper';

// Mock scraping service since we can't actually scrape external sites in browser
export const mockScrapedData: ScrapedData[] = [
  {
    id: '1',
    title: 'Example Website - Home',
    url: 'https://example.com',
    headingsCount: 8,
    linksCount: 15,
    scrapedAt: '2025-01-08T10:30:00Z',
    rawData: {
      title: 'Example Website - Home',
      headings: ['Welcome to Example', 'Our Services', 'About Us', 'Contact Info', 'Latest News', 'Testimonials', 'FAQ', 'Get Started'],
      links: [
        { text: 'Home', href: '/' },
        { text: 'About', href: '/about' },
        { text: 'Services', href: '/services' },
        { text: 'Contact', href: '/contact' },
        { text: 'Blog', href: '/blog' },
        { text: 'Privacy Policy', href: '/privacy' },
        { text: 'Terms', href: '/terms' },
        { text: 'Support', href: '/support' },
        { text: 'FAQ', href: '/faq' },
        { text: 'Downloads', href: '/downloads' },
        { text: 'Newsletter', href: '/newsletter' },
        { text: 'Partners', href: '/partners' },
        { text: 'Careers', href: '/careers' },
        { text: 'Press', href: '/press' },
        { text: 'Sitemap', href: '/sitemap' }
      ],
      meta: {
        description: 'Welcome to Example.com - your trusted partner for innovative solutions',
        keywords: 'example, website, solutions, services'
      }
    }
  },
  {
    id: '2',
    title: 'News Portal - Breaking News',
    url: 'https://newsportal.com',
    headingsCount: 12,
    linksCount: 28,
    scrapedAt: '2025-01-08T09:15:00Z',
    rawData: {
      title: 'News Portal - Breaking News',
      headings: ['Breaking News', 'World News', 'Politics', 'Technology', 'Sports', 'Entertainment', 'Business', 'Health', 'Science', 'Opinion', 'Weather', 'Local News'],
      links: [
        { text: 'World', href: '/world' },
        { text: 'Politics', href: '/politics' },
        { text: 'Technology', href: '/tech' },
        { text: 'Sports', href: '/sports' },
        { text: 'Entertainment', href: '/entertainment' },
        { text: 'Business', href: '/business' },
        { text: 'Health', href: '/health' },
        { text: 'Science', href: '/science' },
        { text: 'Opinion', href: '/opinion' },
        { text: 'Weather', href: '/weather' },
        { text: 'Local', href: '/local' },
        { text: 'Breaking', href: '/breaking' },
        { text: 'Live Updates', href: '/live' },
        { text: 'Video News', href: '/video' },
        { text: 'Photo Gallery', href: '/photos' },
        { text: 'Newsletters', href: '/newsletters' },
        { text: 'Podcasts', href: '/podcasts' },
        { text: 'RSS Feeds', href: '/rss' },
        { text: 'Mobile App', href: '/mobile' },
        { text: 'Subscribe', href: '/subscribe' },
        { text: 'Advertise', href: '/advertise' },
        { text: 'Contact Us', href: '/contact' },
        { text: 'About Us', href: '/about' },
        { text: 'Privacy', href: '/privacy' },
        { text: 'Terms', href: '/terms' },
        { text: 'Help', href: '/help' },
        { text: 'Sitemap', href: '/sitemap' },
        { text: 'Archive', href: '/archive' }
      ],
      meta: {
        description: 'Latest breaking news and updates from around the world',
        keywords: 'news, breaking news, world news, politics, sports'
      }
    }
  }
];

export async function scrapeWebsite(url: string): Promise<ScrapedData> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Validate URL format
  try {
    new URL(url);
  } catch {
    throw new Error('Invalid URL format');
  }

  // Simulate potential scraping errors
  if (Math.random() < 0.1) {
    throw new Error('Failed to scrape website: Connection timeout');
  }

  // Generate mock scraped data
  const domain = new URL(url).hostname;
  const titles = [
    `${domain} - Home Page`,
    `${domain} - Welcome`,
    `${domain} - Official Website`,
    `${domain} - Main Site`
  ];
  
  const headings = [
    'Welcome', 'About Us', 'Our Services', 'Contact', 'News', 'Blog', 
    'Products', 'Support', 'FAQ', 'Privacy Policy', 'Terms of Service'
  ];
  
  const links = [
    { text: 'Home', href: '/' },
    { text: 'About', href: '/about' },
    { text: 'Services', href: '/services' },
    { text: 'Contact', href: '/contact' },
    { text: 'Blog', href: '/blog' },
    { text: 'Support', href: '/support' },
    { text: 'Privacy', href: '/privacy' },
    { text: 'Terms', href: '/terms' }
  ];

  const headingsCount = Math.floor(Math.random() * 15) + 3;
  const linksCount = Math.floor(Math.random() * 25) + 5;
  
  const selectedHeadings = headings.slice(0, headingsCount);
  const selectedLinks = links.slice(0, linksCount);

  return {
    id: Date.now().toString(),
    title: titles[Math.floor(Math.random() * titles.length)],
    url,
    headingsCount,
    linksCount,
    scrapedAt: new Date().toISOString(),
    rawData: {
      title: titles[Math.floor(Math.random() * titles.length)],
      headings: selectedHeadings,
      links: selectedLinks,
      meta: {
        description: `Official website for ${domain}`,
        keywords: `${domain}, website, official`
      }
    }
  };
}