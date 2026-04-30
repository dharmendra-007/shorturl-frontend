"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import QRCode from "qrcode"
import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type QrCodeDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  shortUrl: string
}

export function QrCodeDialog({
  open,
  onOpenChange,
  shortUrl,
}: QrCodeDialogProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("")

  useEffect(() => {
    if (!shortUrl) {
      setQrCodeDataUrl("")
      return
    }

    let isMounted = true

    QRCode.toDataURL(shortUrl, {
      errorCorrectionLevel: "M",
      margin: 1,
      width: 512,
    })
      .then((dataUrl) => {
        if (isMounted) {
          setQrCodeDataUrl(dataUrl)
        }
      })
      .catch(() => {
        if (isMounted) {
          setQrCodeDataUrl("")
        }
      })

    return () => {
      isMounted = false
    }
  }, [shortUrl])

  const handleDownload = () => {
    if (!qrCodeDataUrl) return

    const link = document.createElement("a")
    link.href = qrCodeDataUrl
    link.download = `${shortUrl.replace(/^https?:\/\//, "").replace(/[^\w.-]/g, "_")}-qr.png`
    link.click()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QR code</DialogTitle>
          <DialogDescription>
            Scan or download the QR code for this shortened link.
          </DialogDescription>
        </DialogHeader>

        {qrCodeDataUrl ? (
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-border">
              <Image
                src={qrCodeDataUrl}
                alt={`QR code for ${shortUrl}`}
                width={224}
                height={224}
                unoptimized
                className="h-56 w-56 object-contain"
              />
            </div>

            <div className="w-full rounded-lg border bg-muted/40 p-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Short URL
              </p>
              <p className="break-all text-sm font-medium">{shortUrl}</p>
            </div>

            <Button type="button" className="w-full gap-2" onClick={handleDownload}>
              <Download className="h-4 w-4" />
              Download PNG
            </Button>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
            Generating QR code...
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
