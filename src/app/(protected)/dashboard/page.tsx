"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { BarChart3, ExternalLink, Eye, Link2, Loader, Plus, TrendingUp, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CopyButton } from "@/components/common/copy-button"
import API from "@/lib/axios"
import ShortLinkCard from "@/components/dashboard/shortUrlForm"
import { urlType } from "@/types/urlType"
import { statsType } from "@/types/statsType"

export default function DashboardPage() {
  const [data, setData] = useState<urlType[]>([])
  const [stats, setStats] = useState<statsType | null>(null)
  const [dataLoading, setDataLoading] = useState<boolean>(true)
  const [statsLoading, setStatsLoading] = useState<boolean>(true)

  useEffect(() => {
    API.get("/api/v1/url/getuserurl", {
      params: {
        limit: 5
      }
    })
      .then((res) => {
        setData(res.data.result)
      })
      .finally(() => {
        setDataLoading(false)
      })
  }, [])

  useEffect(() => {
    API.get('api/v1/url/stats')
      .then((res) => {
        setStats(res.data)
      })
      .finally(() => {
        setStatsLoading(false)
      })
  }, [])


  if (dataLoading || statsLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader className="h-8 w-8 text-green-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your shortened links.</p>
        </div>

        {/* Quick URL Shortener */}
        <ShortLinkCard />

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Links</CardTitle>
              <Link2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div className="text-2xl font-bold">{stats?.totalLinks}</div>
              <p className="text-xs text-muted-foreground">
                {stats?.linksChange !== undefined && (
                  <>
                    {`${parseInt(stats.linksChange) > 0 ? "+" : ""}${stats.linksChange} from last week`}
                  </>
                )}
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div className="text-2xl font-bold">{stats?.totalClicks.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {stats?.clicksChange !== undefined && (
                  <>
                    {`${parseInt(stats.clicksChange) > 0 ? "+" : ""}${stats.clicksChange}% from last week`}
                  </>
                )}
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clicks Today</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div className="text-2xl font-bold">{stats?.todaysClicks}</div>
              <p className="text-xs text-muted-foreground">
                {stats?.todayClickChange !== undefined && (
                  <>
                    {`${parseInt(stats.todayClickChange) > 0 ? "+" : ""}${stats.todayClickChange}% from yesterday`}
                  </>
                )}
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="text-sm font-bold truncate">
                { stats?.topPerformer !== undefined &&
                  "short-url-backend-nine.vercel.app/" + stats?.topPerformer?.shortId
                }
              </div>
              <p className="text-xs text-muted-foreground">
                {stats?.topPerformer !== undefined &&
                stats?.topPerformer?.clicks + " clicks"
                }
                </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Links */}
        <Card className="border-primary">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Links</CardTitle>
              <CardDescription>Your most recently created short links</CardDescription>
            </div>
            <Button asChild variant="outline">
              <Link href="/links">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.map((link) => (
                <div key={link._id} className="flex items-center justify-between p-4 border rounded-lg border-primary">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{'short-url-backend-nine.vercel.app/' + link.shortId}</span>
                      <Badge variant="secondary">{link.visitHistory.length} clicks</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{link.redirectUrl}</p>
                    <p className="text-xs text-muted-foreground mt-1">Created {link.createdAt.split("T")[0]}</p>
                  </div>
                  <div className="flex items-center gap-1 ml-4">
                    <CopyButton text={'https://short-url-backend-nine.vercel.app/' + link.shortId} className="h-8 w-8" />
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
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
