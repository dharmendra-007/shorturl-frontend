export type urlType = {
  _id: string;
  shortId: string;
  redirectUrl: string;
  isActive : boolean;
  qrCodeDataUrl?: string;
  visitHistory: { 
    timestamp: string ,
    ip: string,
    deviceType: string,
    source: string
  }[];
  createdAt: string;
}
