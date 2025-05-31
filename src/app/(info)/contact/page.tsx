"use client"
import { Mail, Github, Linkedin, Star, GitFork, Users, X } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "sonner"

interface GitHubStats {
  public_repos: number
  followers: number
  following: number
}

interface Repository {
  stargazers_count: number
  forks_count: number
}

export default function ContactPage() {
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null)
  const [totalStars, setTotalStars] = useState<number>(0)
  const [totalForks, setTotalForks] = useState<number>(0)
  const [loading, setLoading] = useState(true)

useEffect(() => {
  const fetchGitHubStats = async () => {
    try {
      const [userResponse, reposResponse] = await Promise.all([
        axios.get("https://api.github.com/users/dharmendra-007"),
        axios.get("https://api.github.com/users/dharmendra-007/repos?per_page=100"),
      ])

      const userData: GitHubStats = userResponse.data
      const reposData: Repository[] = reposResponse.data

      setGithubStats(userData)

      const stars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0)
      const forks = reposData.reduce((acc, repo) => acc + repo.forks_count, 0)

      setTotalStars(stars)
      setTotalForks(forks)
    } catch (error) {
      toast.error(`Error fetching GitHub stats: ${String(error)}`)
    } finally {
      setLoading(false)
    }
  }

  fetchGitHubStats()
}, [])

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Get In Touch</h1>
        <p className="text-muted-foreground text-lg">Let&apos;s connect and build something amazing together</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <Mail className="h-5 w-5" />
                <div className="flex-1">
                  <p className="font-medium">Email</p>
                  <Link
                    href="mailto:dev.dharmendra.m@gmail.com"
                    className="text-sm text-muted-foreground hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  >
                    dev.dharmendra.m@gmail.com
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <Github className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                <div className="flex-1">
                  <p className="font-medium">GitHub</p>
                  <Link
                    href="https://github.com/dharmendra-007"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  >
                    github.com/dharmendra-007
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <Linkedin className="h-5 w-5" />
                <div className="flex-1">
                  <p className="font-medium">LinkedIn</p>
                  <Link
                    href="https://www.linkedin.com/in/dharmendra-mahanta-29bb47206/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  >
                    Dharmendra Mahanta
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <X className="h-5 w-5 text-gray-900 dark:text-white" />
                <div className="flex-1">
                  <p className="font-medium">X (Twitter)</p>
                  <Link
                    href="https://x.com/Dharmen80496076"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    @Dharmen80496076
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* GitHub Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="h-5 w-5" />
              GitHub Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* GitHub Stats Cards */}
            <div className="space-y-4">
              <img
                src="https://github-readme-stats.vercel.app/api?username=dharmendra-007&show_icons=true&theme=default&hide_border=true&bg_color=00000000&title_color=000000&text_color=000000&icon_color=0969da"
                alt="GitHub Stats"
                className="w-full rounded-lg block dark:hidden"
              />
              <img
                src="https://github-readme-stats.vercel.app/api?username=dharmendra-007&show_icons=true&theme=dark&hide_border=true&bg_color=00000000&title_color=ffffff&text_color=ffffff&icon_color=58a6ff"
                alt="GitHub Stats"
                className="w-full rounded-lg hidden dark:block"
              />

              <img
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=dharmendra-007&layout=compact&theme=default&hide_border=true&bg_color=00000000&title_color=000000&text_color=000000"
                alt="Top Languages"
                className="w-full rounded-lg block dark:hidden"
              />
              <img
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=dharmendra-007&layout=compact&theme=dark&hide_border=true&bg_color=00000000&title_color=ffffff&text_color=ffffff"
                alt="Top Languages"
                className="w-full rounded-lg hidden dark:block"
              />
            </div>

            {/* Live GitHub Stats */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-3 w-3" />
                  <span>Stars</span>
                </div>
                <p className="font-semibold">
                  {loading ? <span className="animate-pulse">...</span> : totalStars.toLocaleString()}
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <GitFork className="h-3 w-3" />
                  <span>Forks</span>
                </div>
                <p className="font-semibold">
                  {loading ? <span className="animate-pulse">...</span> : totalForks.toLocaleString()}
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span>Followers</span>
                </div>
                <p className="font-semibold">
                  {loading ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    githubStats?.followers.toLocaleString() || "0"
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* GitHub Contribution Graph */}
      <Card>
        <CardHeader>
          <CardTitle>Contribution Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <img
            src="https://github-readme-activity-graph.vercel.app/graph?username=dharmendra-007&theme=minimal&hide_border=true&bg_color=ffffff&color=000000&line=0969da&point=0969da"
            alt="GitHub Activity Graph"
            className="w-full rounded-lg block dark:hidden"
          />
          <img
            src="https://github-readme-activity-graph.vercel.app/graph?username=dharmendra-007&theme=github-dark&hide_border=true&bg_color=0d1117&color=ffffff&line=58a6ff&point=58a6ff"
            alt="GitHub Activity Graph"
            className="w-full rounded-lg hidden dark:block"
          />
        </CardContent>
      </Card>

      {/* Call to Action */}
      {/* <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Ready to collaborate?</h3>
          <p className="text-muted-foreground mb-4">
            I'm always open to discussing new opportunities and interesting projects.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              React
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
              Node.js
            </Badge>
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
            >
              TypeScript
            </Badge>
            <Badge
              variant="secondary"
              className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
            >
              Next.js
            </Badge>
          </div>
        </CardContent>
      </Card> */}
    </div>
  )
}