import React, { useEffect, useRef, useState } from 'react'
import { BrowserQRCodeReader } from '@zxing/browser'
import { styles } from './QRCodeScanner.styled'

interface QRCodeScannerProps {
  open: boolean
  onClose: () => void
  onScan: (token: string) => void
}

export const QRCodeScanner: React.FC<QRCodeScannerProps> = ({
  open,
  onClose,
  onScan,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const scannedRef = useRef(false)

  const [error, setError] = useState<string | null>(null)
  const [starting, setStarting] = useState(false)

  useEffect(() => {
    if (!open || !videoRef.current) {
      return
    }

    let isCancelled = false
    let controls: { stop: () => void } | undefined

    const reader = new BrowserQRCodeReader()

    const startScanner = async () => {
      try {
        setError(null)
        setStarting(true)
        scannedRef.current = false

        const scannerControls = await reader.decodeFromVideoDevice(
          undefined,
          videoRef.current!,
          (result) => {
            if (!result || scannedRef.current || isCancelled) {
              return
            }

            scannedRef.current = true
            onScan(result.getText())
          },
        )

        controls = scannerControls

        if (isCancelled) {
          controls.stop()
        }
      } catch {
        if (!isCancelled) {
          setError(
            'Unable to access the camera. Please check your camera permissions.',
          )
        }
      } finally {
        if (!isCancelled) {
          setStarting(false)
        }
      }
    }

    void startScanner()

    return () => {
      isCancelled = true
      controls?.stop()
    }
  }, [open, onScan])

  if (!open) {
    return null
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Scan QR Code</h2>
            <p className={styles.subtitle}>
              Position the member&apos;s QR code in front of the camera.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close QR scanner"
          >
            ×
          </button>
        </div>

        <div className={styles.scanner}>
          <video ref={videoRef} className={styles.video} muted playsInline />

          <div className={styles.scanFrame} />
        </div>

        {starting && <p className={styles.message}>Starting camera...</p>}

        {error && <p className={styles.error}>{error}</p>}

        {!error && !starting && (
          <p className={styles.message}>Camera is active. Ready to scan.</p>
        )}

        <div className={styles.actions}>
          <button
            type="button"
            onClick={onClose}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
