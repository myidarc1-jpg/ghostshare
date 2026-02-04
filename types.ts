export interface GhostLink {
  id: string;
  code: string;
  originalUrl: string;
  createdAt: string;
}

export interface LinkStats {
  code: string;
  humanClicks: number;
  privateShares: number;
  totalClicks: number;
  lastTrackedAt: string;
  trackingData: {
    sources: Record<string, number>;
    hourly: number[];
    daily: number[];
  };
}

export interface Database {
  links: Record<string, GhostLink>;
  stats: Record<string, LinkStats>;
}