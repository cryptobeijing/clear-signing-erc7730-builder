import * as QRCode from "qrcode";
import type { QRCodeToDataURLOptions } from "qrcode";
import { useEffect, useState } from "react";
import Image from "next/image";

const QRCodeDisplay = ({
  text,
  size = 128,
}: {
  text: string;
  size?: number;
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  useEffect(() => {
    if (!text) return;

    const generateQR = async () => {
      try {
        const options: QRCodeToDataURLOptions = {
          width: size,
          margin: 1,
          errorCorrectionLevel: "M",
        };
        const dataUrl = await QRCode.toDataURL(text, options);
        setQrDataUrl(dataUrl);
      } catch (err) {
        console.error("QR Code generation error:", err);
      }
    };

    void generateQR();
  }, [text, size]);

  if (!qrDataUrl) return <div className="h-[128px] w-[128px] bg-gray-200" />;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <Image
        src={qrDataUrl}
        alt={`QR code for: ${text}`}
        fill
        sizes={`${size}px`}
        style={{ objectFit: "contain" }}
        priority
      />
    </div>
  );
};

export default QRCodeDisplay;
