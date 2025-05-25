"use client"

import { useState } from "react"
import { BarChart3, Calendar, Globe, Monitor, Smartphone, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data
const analyticsData = {
  overview: {
    totalClicks: 1247,
    uniqueVisitors: 892,
    clicksToday: 89,
    conversionRate: 12.5,
  },
  topLinks: [
    { shortUrl: "shorturl.com/abc123", clicks: 245, percentage: 19.6 },
    { shortUrl: "shorturl.com/shop99", clicks: 312, percentage: 25.0 },
    { shortUrl: "shorturl.com/docs789", clicks: 156, percentage: 12.5 },
    { shortUrl: "shorturl.com/gh456", clicks: 89, percentage: 7.1 },
    { shortUrl: "shorturl.com/blog001", clicks: 78, percentage: 6.3 },
  ],
  countries: [
    { country: "United States", clicks: 456, percentage: 36.6 },
    { country: "United Kingdom", clicks: 234, percentage: 18.8 },
    { country: "Germany", clicks: 189, percentage: 15.2 },
    { country: "Canada", clicks: 123, percentage: 9.9 },
    { country: "Australia", clicks: 98, percentage: 7.9 },
  ],
  devices: [
    { device: "Desktop", clicks: 687, percentage: 55.1 },
    { device: "Mobile", clicks: 423, percentage: 33.9 },
    { device: "Tablet", clicks: 137, percentage: 11.0 },
  ],
  referrers: [
    { source: "Direct", clicks: 498, percentage: 39.9 },
    { source: "Social Media", clicks: 312, percentage: 25.0 },
    { source: "Email", clicks: 187, percentage: 15.0 },
    { source: "Search Engines", clicks: 156, percentage: 12.5 },
    { source: "Other", clicks: 94, percentage: 7.5 },
  ],
  dailyClicks: [
    { date: "2024-01-08", clicks: 45 },
    { date: "2024-01-09", clicks: 67 },
    { date: "2024-01-10", clicks: 89 },
    { date: "2024-01-11", clicks: 123 },
    { date: "2024-01-12", clicks: 98 },
    { date: "2024-01-13", clicks: 156 },
    { date: "2024-01-14", clicks: 134 },
  ],
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">Track the performance of your shortened links</p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.totalClicks.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.uniqueVisitors.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% from last period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clicks Today</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.clicksToday}</div>
              <p className="text-xs text-muted-foreground">+5% from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.conversionRate}%</div>
              <p className="text-xs text-muted-foreground">+2.1% from last period</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Top Performing Links */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Links</CardTitle>
              <CardDescription>Your most clicked short links</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topLinks.map((link, index) => (
                  <div key={link.shortUrl} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{link.shortUrl}</p>
                        <p className="text-xs text-muted-foreground">{link.clicks} clicks</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{link.percentage}%</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Geographic Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Geographic Distribution
              </CardTitle>
              <CardDescription>Clicks by country</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.countries.map((country) => (
                  <div key={country.country} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{country.country}</p>
                      <p className="text-xs text-muted-foreground">{country.clicks} clicks</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${country.percentage}%` }} />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{country.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Device Types */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Device Types
              </CardTitle>
              <CardDescription>Clicks by device category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.devices.map((device) => (
                  <div key={device.device} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        {device.device === "Desktop" && <Monitor className="h-4 w-4" />}
                        {device.device === "Mobile" && <Smartphone className="h-4 w-4" />}
                        {device.device === "Tablet" && <Monitor className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{device.device}</p>
                        <p className="text-xs text-muted-foreground">{device.clicks} clicks</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{device.percentage}%</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your clicks are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.referrers.map((referrer) => (
                  <div key={referrer.source} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{referrer.source}</p>
                      <p className="text-xs text-muted-foreground">{referrer.clicks} clicks</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${referrer.percentage}%` }} />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{referrer.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Clicks Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Clicks</CardTitle>
            <CardDescription>Click trends over the selected time period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {analyticsData.dailyClicks.map((day) => (
                <div key={day.date} className="flex flex-col items-center gap-2 flex-1">
                  <div
                    className="w-full bg-primary rounded-t-sm min-h-[4px] transition-all hover:bg-primary/80"
                    style={{
                      height: `${(day.clicks / Math.max(...analyticsData.dailyClicks.map((d) => d.clicks))) * 200}px`,
                    }}
                    title={`${day.date}: ${day.clicks} clicks`}
                  />
                  <div className="text-xs text-muted-foreground text-center">
                    {new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
