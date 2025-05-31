"use client"

import { useEffect, useState } from "react"
import { BarChart3, Calendar, Monitor, Smartphone, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import API from "@/lib/axios"
import { BASE_URL } from "@/constants"
import { AnalyticsType } from "@/types/analyticsType"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { chartConfig } from "@/constants/barchart"
import React from "react"
import { AnalyticsSkeleton } from "@/components/analytics/analyticsSkeleton"

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("7")
  const [data, setData] = useState<AnalyticsType | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    API.get(`${BASE_URL}/api/v1/url/analytics`, {
      params: {
        period
      }
    })
      .then((res) => {
        setData(res.data.data)
        console.log(res.data.success)
      })
      .catch((err) => {
        console.log(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [period])

  if(loading){
    return <AnalyticsSkeleton/>
  }


  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">Track the performance of your shortened links</p>
          </div>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Today</SelectItem>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
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
              <div className="text-2xl font-bold">{data?.clickChangePercentage !== undefined ? data?.clicksCurrentPeriod : "0"}</div>
              <p className="text-xs text-muted-foreground">{
                data?.clickChangePercentage !== undefined ?
                  data?.clickChangePercentage > 0 ? `+${data?.clickChangePercentage}% from last period` : `${data?.clickChangePercentage}% from last period` : "0% from last period"
              }</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.currentUniqueVisitors !== undefined ? data?.currentUniqueVisitors : "0"}</div>
              <p className="text-xs text-muted-foreground">{
                data?.changeUniqueVisitors !== undefined ?
                  data?.changeUniqueVisitors > 0 ? `+${data?.changeUniqueVisitors}% from last period` : `${data?.changeUniqueVisitors}% from last period` : "0% from last period"
              }</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clicks Today</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.todaysClicks !== undefined ? data?.todaysClicks : "0"}</div>
              <p className="text-xs text-muted-foreground">{
                data?.clicksChangeFromYesterday !== undefined ?
                  data?.clicksChangeFromYesterday > 0 ? `+${data?.clicksChangeFromYesterday}% from yesterday` : `${data?.clicksChangeFromYesterday}% from yesterday` : "0% % from yesterday"
              }</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.currentConversionRate !== undefined ? data?.currentConversionRate : "0"}%</div>
              <p className="text-xs text-muted-foreground">{
                data?.changeConversionRate !== undefined ?
                  data?.changeConversionRate > 0 ? `+${data?.changeConversionRate}% from last period` : `${data?.changeConversionRate}% from last period` : "0% from last period"
              }</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Top Performing Links */}
          <Card className="max-w-full overflow-x-hidden">
            <CardHeader>
              <CardTitle>Top Performing Links</CardTitle>
              <CardDescription>Your most clicked short links</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data?.topFiveUrlsWithPercentage === undefined ? null :
                  data?.topFiveUrlsWithPercentage.map((link, index) => (
                    <div key={link.shortId} className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{`${BASE_URL.split("://")[1]}/${link.shortId}`}</p>
                          <p className="text-xs text-muted-foreground">{link.clicks} clicks</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{link.clickPercent}%</Badge>
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
                {data?.DeviceInfoWithPercentage[0]?.data === undefined ? null :
                  data?.DeviceInfoWithPercentage[0]["data"].map((device, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          {device.deviceType === "desktop" && <Monitor className="h-4 w-4" />}
                          {device.deviceType === "mobile" && <Smartphone className="h-4 w-4" />}
                          {device.deviceType.toUpperCase() === "tablet" && <Monitor className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{`${device.deviceType.charAt(0).toUpperCase()}${device.deviceType.slice(1)}`}</p>
                          <p className="text-xs text-muted-foreground">{device.count} clicks</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{device.percentage}%</Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your clicks are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {data?.SourceInfoWithPercentage[0]?.data === undefined ? null :
                  data?.SourceInfoWithPercentage[0]["data"].map((referrer) => (
                    <div key={referrer.source} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{referrer.source}</p>
                        <p className="text-xs text-muted-foreground">{referrer.count} clicks</p>
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
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={parseInt(period) == 1 ? data?.hourlyClicksData : data?.dailyClicksData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey={parseInt(period) == 1 ? "hour" : "date"}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[150px]"
                      nameKey="views"
                    />
                  }
                />
                <Bar dataKey={"clicks"} fill={`var(--color-${"clicks"})`} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
