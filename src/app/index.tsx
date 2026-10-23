import { Stack } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useQrCodeScanner } from "@/hooks/useQrCodeScanner";

export default function IndexScreen() {
  const { startScanning, scannerError, scannedData, isModernBarcodeScannerAvailable } = useQrCodeScanner();

  return (
    <>
      <Stack.Screen options={{ title: "launchScanner repro" }} />
      <View style={styles.container}>
        <Text style={styles.title}>expo-camera launchScanner repro</Text>

        <Text style={styles.hint}>Tap the button to launch the QR scanner.</Text>

        <Text style={styles.hint} testID="scanner-availability">
          isModernBarcodeScannerAvailable: {String(isModernBarcodeScannerAvailable)}
        </Text>

        <Pressable
          accessibilityRole="button"
          onPress={startScanning}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          testID="open-scanner-button"
        >
          <Text style={styles.buttonLabel}>Open QR scanner</Text>
        </Pressable>

        {scannedData ? (
          <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>Scanned value</Text>
            <Text style={styles.resultValue} testID="scanned-data">
              {scannedData}
            </Text>
          </View>
        ) : null}

        {scannerError ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorTitle}>launchScanner failed</Text>
            <Text style={styles.errorMessage} testID="scanner-error">
              {scannerError}
            </Text>
          </View>
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  hint: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
  },
  button: {
    backgroundColor: "#0a7ea4",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  errorBox: {
    gap: 4,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fdecea",
  },
  errorTitle: {
    fontWeight: "600",
    color: "#b3261e",
  },
  errorMessage: {
    color: "#b3261e",
  },
  resultBox: {
    gap: 4,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#e6f4ea",
  },
  resultTitle: {
    fontWeight: "600",
    color: "#1e6f3b",
  },
  resultValue: {
    color: "#1e6f3b",
  },
});
