import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 24,
    marginTop: 8,
  },
  grid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 14,
    marginBottom: 24,
  },
  card: {
    width: "47%",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTotal: {
    borderTopWidth: 4,
    borderTopColor: "#4b5563",
  },
  cardX: {
    borderTopWidth: 4,
    borderTopColor: "#ef4444",
  },
  cardO: {
    borderTopWidth: 4,
    borderTopColor: "#3b82f6",
  },
  cardDraw: {
    borderTopWidth: 4,
    borderTopColor: "#f59e0b",
  },
  playerBadgeX: {
    fontSize: 26,
    fontWeight: "900",
    color: "#ef4444",
  },
  playerBadgeO: {
    fontSize: 26,
    fontWeight: "900",
    color: "#3b82f6",
  },
  cardNumber: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    marginVertical: 4,
  },
  cardLabel: {
    fontSize: 13,
    color: "#6b7280",
    fontWeight: "500",
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#dc2626",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
  },
  resetText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
});
