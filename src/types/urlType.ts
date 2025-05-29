export type urlType = {
  _id: string;
  shortId: string;
  redirectUrl: string;
  isActive : boolean;
  visitHistory: { 
    timestamp: string ,
    ip: string,
    deviceType: string,
    source: string
  }[];
  createdAt: string;
}