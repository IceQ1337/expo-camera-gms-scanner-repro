import { CameraView } from 'expo-camera';
import { useIsFocused } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

export function useQrCodeScanner() {
  const isFocused = useIsFocused();
  const [scannerError, setScannerError] = useState<string | null>(null);
  const [scannedData, setScannedData] = useState<string | null>(null);

  const isModernBarcodeScannerAvailable =
    CameraView.isModernBarcodeScannerAvailable;

  const startScanning = useCallback(async () => {
    setScannerError(null);

    console.log('isModernBarcodeScannerAvailable:', isModernBarcodeScannerAvailable);

    try {
      await CameraView.launchScanner({ barcodeTypes: ['qr'] });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      if (message.includes('cancelled')) {
        console.log('Scanner dismissed by user');
        return;
      }

      console.error('launchScanner failed:', message);
      setScannerError(message);
    }
  }, [isModernBarcodeScannerAvailable]);

  useEffect(() => {
    // Only the focused screen should handle scan events.
    if (!isFocused) return;

    const subscription = CameraView.onModernBarcodeScanned(event => {
      console.log('QR code scanned:', event.data);
      setScannedData(event.data);
    });

    return () => subscription.remove();
  }, [isFocused]);

  return {
    startScanning,
    scannerError,
    scannedData,
    isModernBarcodeScannerAvailable,
  };
}
