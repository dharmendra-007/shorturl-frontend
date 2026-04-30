"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import QRCode from "qrcode"
import { Button } from "@/components/ui/button"
import { Download, QrCode } from "lucide-react"

type QrCodePreviewProps = {
  shortUrl: string
}

export function QrCodePreview({ shortUrl }: QrCodePreviewProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("")

  useEffect(() => {
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

  const downloadQrCode = () => {
    if (!qrCodeDataUrl) return

    const link = document.createElement("a")
    link.href = qrCodeDataUrl
    link.download = `${shortUrl.replace(/^https?:\/\//, "").replace(/[^\w.-]/g, "_")}-qr.png`
    link.click()
  }

  return (
    <div className="mt-4 rounded-xl border bg-muted/40 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <QrCode className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-semibold">QR code</p>
            <p className="text-xs text-muted-foreground">Scan or download this code for the short link.</p>
          </div>
        </div>
        <Button type="button" variant="outline" size="sm" className="gap-2" onClick={downloadQrCode}>
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>

      {qrCodeDataUrl ? (
        <div className="mt-4 flex flex-col items-center gap-3">
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <Image
              src={qrCodeDataUrl}
              alt={`QR code for ${shortUrl}`}
              width={192}
              height={192}
              unoptimized
              className="h-48 w-48 object-contain"
            />
          </div>
          <p className="break-all text-center text-xs text-muted-foreground">{shortUrl}</p>
        </div>
      ) : (
        <div className="mt-4 rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
          Generating QR code...
        </div>
      )}
    </div>
  )
}
