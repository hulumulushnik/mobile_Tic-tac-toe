import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function StatisticsScreen() {
  // Реактивна статистика з Convex — оновлюється миттєво при зміні даних на бекенді
  const stats = useQuery(api.stats.getStats);
  const resetStats = useMutation(api.stats.resetStats);

  const handleResetStats = () => {
    resetStats();
  };

  if (stats === undefined) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Статистика ігор</Text>

        <View style={styles.grid}>
          {/* Картка 1: Загальна кількість */}
          <View style={[styles.card, styles.cardTotal]}>
            <MaterialIcons name="videogame-asset" size={32} color="#4b5563" />
            <Text style={styles.cardNumber}>{stats.totalGames}</Text>
            <Text style={styles.cardLabel}>Зіграно партій</Text>
          </View>

          {/* Картка 2: Перемоги X */}
          <View style={[styles.card, styles.cardX]}>
            <Text style={styles.playerBadgeX}>X</Text>
            <Text style={styles.cardNumber}>{stats.winsX}</Text>
            <Text style={styles.cardLabel}>Перемог X</Text>
          </View>

          {/* Картка 3: Перемоги O */}
          <View style={[styles.card, styles.cardO]}>
            <Text style={styles.playerBadgeO}>O</Text>
            <Text style={styles.cardNumber}>{stats.winsO}</Text>
            <Text style={styles.cardLabel}>Перемог O</Text>
          </View>

          {/* Картка 4: Нічиї */}
          <View style={[styles.card, styles.cardDraw]}>
            <MaterialIcons name="handshake" size={32} color="#f59e0b" />
            <Text style={styles.cardNumber}>{stats.draws}</Text>
            <Text style={styles.cardLabel}>Нічиїх</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetStats}
          activeOpacity={0.8}
        >
          <MaterialIcons name="delete-outline" size={20} color="#ffffff" />
          <Text style={styles.resetText}>Очистити статистику</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    marginBottom: 24,
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },
  grid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  card: {
    width: "48%",
    minHeight: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    padding: 16,
  },
  cardTotal: {
    backgroundColor: "#e5e7eb",
  },
  cardX: {
    backgroundColor: "#dbeafe",
  },
  cardO: {
    backgroundColor: "#fce7f3",
  },
  cardDraw: {
    backgroundColor: "#fef3c7",
  },
  cardNumber: {
    marginTop: 8,
    fontSize: 32,
    fontWeight: "700",
    color: "#111827",
  },
  cardLabel: {
    marginTop: 4,
    fontSize: 14,
    color: "#4b5563",
  },
  playerBadgeX: {
    fontSize: 32,
    fontWeight: "700",
    color: "#2563eb",
  },
  playerBadgeO: {
    fontSize: 32,
    fontWeight: "700",
    color: "#db2777",
  },
  resetButton: {
    width: "100%",
    marginTop: 24,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 10,
    backgroundColor: "#dc2626",
  },
  resetText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
