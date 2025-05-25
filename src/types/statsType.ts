export interface RankedUrlType {
  _id: string;
  shortId: string;
  originalUrl: string;
  clicks: number;
  createdAt: string;
  clickPercent: string;
}


  interface ConversionRateType {
    totalUniqueVisitors : number;
    totalConversions : number;
    conversionRate : number;
    totalUniqueVisitorsChange : number
    totalConversionsChange : number
    conversionRateChange : number
  }


export type statsType = {
  success: boolean;
  message: string;
  totalLinks: number;
  linksLastWeek: number;
  linksChange: string;
  activeLinks: number;
  totalClicks: number;
  clicksLastWeek: number;
  clicksChange: string;
  todaysClicks: number;
  yesterdaysClicks: number;
  todayClickChange: string;
  topPerformer: RankedUrlType;
  topFiveUrls: RankedUrlType[];
  lastFiveUrls: RankedUrlType[];
  conversionRate : ConversionRateType
};