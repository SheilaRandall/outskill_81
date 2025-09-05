export interface ScrapedData {
  id: string;
  title: string;
  url: string;
  headingsCount: number;
  linksCount: number;
  scrapedAt: string;
  rawData: {
    title: string;
    headings: string[];
    links: { text: string; href: string }[];
    meta: {
      description?: string;
      keywords?: string;
    };
  };
}

export interface ScrapingError {
  message: string;
  url: string;
  timestamp: string;
}