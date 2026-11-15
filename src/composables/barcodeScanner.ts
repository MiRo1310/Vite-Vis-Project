import { type BarcodeDetector as BarcodeDetectorType } from "barcode-detector/ponyfill";
import { pickValidEan } from "@/lib/product.ts";

/** Formate auf Lebensmitteln */
const FORMATS = ["ean_13", "ean_8", "upc_a", "upc_e"] as const;

/** Große Handyfotos vor dem Erkennen verkleinern – schneller und meist zuverlässiger */
const MAX_IMAGE_SIZE = 1600;

let detectorPromise: Promise<BarcodeDetectorType> | null = null;

/**
 * Lädt den Barcode-Scanner erst bei Bedarf (eigenes Chunk, ~1 MB WebAssembly).
 * Nutzt den eingebauten `BarcodeDetector` des Browsers, wo vorhanden, sonst ZXing als WebAssembly.
 * Die `.wasm`-Datei kommt aus dem eigenen Build, nicht von einem CDN.
 */
export const loadBarcodeDetector = (): Promise<BarcodeDetectorType> => {
  detectorPromise ??= (async () => {
    const [{ BarcodeDetector, prepareZXingModule }, { default: wasmUrl }] = await Promise.all([
      import("barcode-detector/ponyfill"),
      import("zxing-wasm/reader/zxing_reader.wasm?url"),
    ]);
    prepareZXingModule({
      overrides: { locateFile: (path: string, prefix: string) => (path.endsWith(".wasm") ? wasmUrl : prefix + path) },
    });
    return new BarcodeDetector({ formats: [...FORMATS] });
  })().catch((error: unknown) => {
    detectorPromise = null;
    throw error;
  });
  return detectorPromise;
};

/**
 * Live-Scan mit der Kamera ist nur in einem sicheren Kontext möglich (HTTPS oder localhost).
 * Über `http://<IP>` bleibt nur das Foto.
 */
// `navigator.mediaDevices` existiert in unsicheren Kontexten gar nicht, daher die `in`-Prüfung
export const canLiveScan = (): boolean => window.isSecureContext && "mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices;

const scaledCanvas = (bitmap: ImageBitmap): HTMLCanvasElement | null => {
  const scale = MAX_IMAGE_SIZE / Math.max(bitmap.width, bitmap.height);
  if (scale >= 1) {
    return null;
  }
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas;
};

/**
 * Sucht in einem Foto nach einem gültigen EAN/UPC – erst verkleinert, dann in voller Auflösung.
 *
 * @param file - Foto aus der Kamera bzw. Galerie.
 * @returns Die EAN oder `null`, wenn keiner erkannt wurde.
 */
export const detectEanInImage = async (file: Blob): Promise<string | null> => {
  const detector = await loadBarcodeDetector();
  const bitmap = await createImageBitmap(file);
  try {
    const sources = [scaledCanvas(bitmap), bitmap].filter((source): source is HTMLCanvasElement | ImageBitmap => source !== null);
    for (const source of sources) {
      const results = await detector.detect(source);
      const ean = pickValidEan(results.map((result) => result.rawValue));
      if (ean) {
        return ean;
      }
    }
    return null;
  } finally {
    bitmap.close();
  }
};

/**
 * Sucht im aktuellen Videobild nach einem gültigen EAN/UPC (für den Live-Scan).
 *
 * @param video - Laufendes Kamerabild.
 * @returns Die EAN oder `null`.
 */
export const detectEanInVideo = async (video: HTMLVideoElement): Promise<string | null> => {
  if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
    return null;
  }
  const detector = await loadBarcodeDetector();
  const results = await detector.detect(video);
  return pickValidEan(results.map((result) => result.rawValue));
};

/** Kurzes haptisches Feedback nach einem Treffer (wo unterstützt, iOS ignoriert es). */
export const vibrateOnScan = () => {
  if (typeof navigator.vibrate === "function") {
    navigator.vibrate(60);
  }
};
