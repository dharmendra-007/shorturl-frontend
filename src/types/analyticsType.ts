export interface VisitHistoryDataType {
  timestamp: number,
  ip: string,
  deviceType: string,
  source: string,
  _id: string
}

export interface DeviceInfoDataType {
  deviceType: string,
  count: number,
  percentage: number
}

export interface SourceInfoDataType {
  source: string,
  count: number,
  percentage: number
}

export interface DailyClickDataType {
  date: string,
  clicks: number
}

export interface UrlType {
  _id: string,
  shortId: string,
  redirectUrl: string,
  visitHistory: VisitHistoryDataType
  isActive: boolean,
  createdBy: string,
  createdAt: string,
  updatedAt: string,
  __v: number,
  clicks: number,
  clickPercent: string
}

export interface HourlyClicksDataType {
  hour: string,
  clicks: number
}

export type AnalyticsType = {
  totalClicks: number,
  clicksCurrentPeriod: number,
  clickChangePercentage: number,
  uniqueVisitors: number,
  currentUniqueVisitors: number,
  changeUniqueVisitors: number,
  todaysClicks: number,
  clicksChangeFromYesterday: number,
  conversionRate: string,
  currentConversionRate: string,
  changeConversionRate: number,
  topFiveUrlsWithPercentage: UrlType[],
  DeviceInfoWithPercentage: {
    data: DeviceInfoDataType[]
  }[],
  SourceInfoWithPercentage: {
    data: SourceInfoDataType[]
  }[],
  dailyClicksData: DailyClickDataType[],
  hourlyClicksData: HourlyClicksDataType[]
}