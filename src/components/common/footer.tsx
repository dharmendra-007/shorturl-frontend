import { LinkIcon } from "lucide-react";
import Link from "next/link";

function footer() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
        <div className="flex items-center gap-2">
          <LinkIcon className="h-6 w-6" />
          <span className="text-lg font-bold">ShortUrl</span>
        </div>
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} ShortUrl Inc. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            Terms
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            Privacy
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default footer