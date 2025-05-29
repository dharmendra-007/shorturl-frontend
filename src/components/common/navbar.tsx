"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { LinkIcon, Menu, User, LogOut, BarChart3, FolderOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ThemeToggle } from "./theme-toggle"
import { useAuth } from "@/hooks/useAuth"
import { NavbarSkeleton } from "./navbar-skeleton"
import { useRouter } from "next/navigation"

export function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      setIsAuthenticated(true)
    } else if (!loading && !user) {
      setIsAuthenticated(false)
    }
  }, [user, loading]);

  if (loading) return <NavbarSkeleton />

  const handleLogout = async () => {
    try {
      logout()
      router.push('/')
    } catch (error) {
      console.error("Logout failed : ", error)
    }
  }

  const UnauthenticatedNav = () => (
    <>
      <nav className="hidden md:flex gap-6">
        <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
          Features
        </Link>
        <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
          How It Works
        </Link>
        <Link href="#faq" className="text-sm font-medium hover:underline underline-offset-4">
          FAQ
        </Link>
      </nav>
      <div className="hidden md:flex items-center gap-2">
        <ThemeToggle />
        <Link href="/login">
          <Button variant="ghost" className="text-sm font-medium">
            Login
          </Button>
        </Link>
        <Link href="/signup">
          <Button>Sign Up Free</Button>
        </Link>
      </div>
    </>
  )

  const AuthenticatedNav = () => (
    <>
      <nav className="hidden md:flex gap-6">
        <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
          Dashboard
        </Link>
        <Link href="/links" className="text-sm font-medium hover:underline underline-offset-4">
          My Links
        </Link>
        <Link href="/analytics" className="text-sm font-medium hover:underline underline-offset-4">
          Analytics
        </Link>
      </nav>
      <div className="hidden md:flex items-center gap-2">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mt-4">
            {/* <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-600">
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )

  const MobileNav = () => (
    <div className="flex md:hidden items-center gap-2">
      <ThemeToggle />
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm"></div>
          <DrawerHeader>
            <DrawerTitle className="mt-3 text-2xl text-green-500 font-bold flex justify-center items-center gap-2 w-full">
              <LinkIcon className="h-4 w-4 text-primary" />
              ShortUrl</DrawerTitle>
            <DrawerDescription className="text-xs pb-4 w-[80%] mx-auto">An ultimate url shortner site you will ever need.</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-4 mt-4">
            {isAuthenticated ? (
              <>
                <div className="flex flex-col items-center gap-2">
                  <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium bg-accent py-3 px-4 rounded-lg w-[80%] justify-center">
                    <BarChart3 className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link href="/links" className="flex items-center gap-2 text-sm font-medium bg-accent py-3 px-4 rounded-lg w-[80%] justify-center">
                    <FolderOpen className="h-4 w-4" />
                    My Links
                  </Link>
                  <Link href="/analytics" className="flex items-center gap-2 text-sm font-medium bg-accent py-3 px-4 rounded-lg w-[80%] justify-center">
                    <BarChart3 className="h-4 w-4" />
                    Analytics
                  </Link>
                  {/* <Link href="/profile" className="flex items-center gap-2 text-sm font-medium bg-accent py-3 px-4 rounded-lg w-[80%] justify-center">
                    <User className="h-4 w-4" />
                    Profile
                  </Link> */}
                  <Button variant="ghost" onClick={handleLogout} className="justify-start gap-2 text-red-600 mb-4">
                    <LogOut className="h-6 w-6" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center gap-4">
                  <Link href="#features" className="flex items-center gap-2 text-sm font-medium bg-accent py-3 px-4 rounded-lg w-[80%] justify-center">
                    Features
                  </Link>
                  <Link href="#how-it-works" className="flex items-center gap-2 text-sm font-medium bg-accent py-3 px-4 rounded-lg w-[80%] justify-center">
                    How It Works
                  </Link>
                  <Link href="#faq" className="flex items-center gap-2 text-sm font-medium bg-accent py-3 px-4 rounded-lg w-[80%] justify-center">
                    FAQ
                  </Link>
                </div>
                <div className="border-t pt-4 mb-4">
                  <div className="flex flex-col gap-3">
                    <Link href="/login" className="flex justify-center">
                      <Button variant="ghost" className="gap-2 text-sm font-medium bg-accent py-3 px-4 rounded-lg w-[80%]">
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup" className="flex justify-center">
                      <Button className="gap-2 text-sm font-medium py-3 px-4 rounded-lg w-[80%]">Sign Up Free</Button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <LinkIcon className="h-6 w-6" />
          <span className="text-xl font-bold">ShortUrl</span>
        </Link>

        {isAuthenticated ? <AuthenticatedNav /> : <UnauthenticatedNav />}

        <MobileNav />
      </div>
    </header>
  )
}
