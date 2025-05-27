"use client"

import { useEffect, useState } from "react"
import { CalendarDays, ExternalLink, Eye, Loader, LockKeyhole, LockKeyholeOpen, MoreHorizontal, Search, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CopyButton } from "@/components/common/copy-button"
import API from "@/lib/axios"
import Link from "next/link"
import { useStats } from "@/store/statsStore"
import { BASE_URL } from "@/constants"
import { useUrls } from "@/store/urlStore"

export default function LinksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const {urls , setUrls , deleteUrl , changeStatus} = useUrls()
  const { stats, setStats, updateActiveLinks } = useStats()
  const [dataLoading, setDataLoading] = useState<boolean>(true)
  const [statsLoading, setStatsLoading] = useState<boolean>(true)

  useEffect(() => {
    API.get('api/v1/url/getuserurl', {
      params: {
        limit: -1,
        search: searchTerm
      }
    })
      .then((res) => {
        setUrls(res.data.result)
      })
      .finally(() => {
        setDataLoading(false)
      })
  }, [searchTerm])

  useEffect(() => {
    API.get('api/v1/url/stats')
      .then((res) => {
        setStats(res.data)
      })
      .finally(() => {
        setStatsLoading(false)
      })
  }, [])

  const handleDeleteLink = async (id: string) => {
    await API.delete(`api/v1/url/deleteurl/${id}`)
    deleteUrl(id)
  }

  const handleChangeStatus = async (id: string) => {
    await API.patch(`api/v1/url/changestatus/${id}`)
      .then(() => {
        const delta = changeStatus(id)
        updateActiveLinks(delta)
      }
      )
  }

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
          <h1 className="text-3xl font-bold">My Links</h1>
          <p className="text-muted-foreground">Manage and track all your shortened links</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalLinks.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalClicks.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.activeLinks}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>All Links</CardTitle>
            <CardDescription>Search and manage your shortened links</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search links..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Links Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Short URL</TableHead>
                    <TableHead>Original URL</TableHead>
                    <TableHead>Clicks</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {urls?.map((link) => (
                    <TableRow key={link._id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{"short-url-backend-nine.vercel.app/" + link.shortId}</span>
                          <CopyButton text={`${BASE_URL}/${link.shortId}`} className="h-6 w-6" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[300px] truncate" title={link.redirectUrl}>
                          {link.redirectUrl}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          {link.visitHistory.length}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-4 w-4 text-muted-foreground" />
                          {link.createdAt.split("T")[0]}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={link.isActive ? "default" : "secondary"}>{link.isActive ? "active" : "inactive"}</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <Link href={`${BASE_URL}/${link.shortId}`} target="_blank">
                              <DropdownMenuItem>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Visit
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Analytics
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleChangeStatus(link._id)}>
                              {
                                link.isActive ? <LockKeyhole className="mr-2 h-4 w-4" /> : <LockKeyholeOpen className="mr-2 h-4 w-4" />
                              }
                              {
                                link.isActive !== undefined &&
                                <>
                                  {link.isActive ? "Disable" : "Enable"}
                                </>
                              }
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteLink(link._id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {urls?.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No links found matching your search.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div >
  )
}
