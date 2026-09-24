import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MiniBoard } from "@/components/MiniBoard";
import type { Id } from "@/convex/_generated/dataModel";

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function resultLabel(winner: "X" | "O" | "DRAW"): string {
  if (winner === "DRAW") return "Нічия";
  return `Переміг ${winner}`;
}

export default function HistoryScreen() {
  const history = useQuery(api.gameHistory.getHistory);
  const deleteHistory = useMutation(api.gameHistory.deleteHistory);
  const clearHistory = useMutation(api.gameHistory.clearHistory);

  const handleDelete = (id: Id<"gameHistory">) => {
    deleteHistory({ id });
  };

  const handleClearAll = () => {
    Alert.alert("Очистити історію", "Видалити всі записи про зіграні партії?", [
      { text: "Скасувати", style: "cancel" },
      {
        text: "Видалити все",
        style: "destructive",
        onPress: () => clearHistory(),
      },
    ]);
  };

  if (history === undefined) {
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
      <View style={styles.header}>
        <Text style={styles.title}>Історія партій</Text>
        {history.length > 0 && (
          <TouchableOpacity onPress={handleClearAll} activeOpacity={0.7}>
            <MaterialIcons name="delete-sweep" size={26} color="#dc2626" />
          </TouchableOpacity>
        )}
      </View>

      {history.length === 0 ? (
        <View style={styles.centerContainer}>
          <MaterialIcons name="history" size={48} color="#9ca3af" />
          <Text style={styles.emptyText}>Ще немає зіграних партій</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <MiniBoard
                board={item.board}
                winningCombination={item.winnerCombination}
              />
              <View style={styles.rowInfo}>
                <Text
                  style={[
                    styles.resultText,
                    item.winner === "X" && styles.resultX,
                    item.winner === "O" && styles.resultO,
                  ]}
                >
                  {resultLabel(item.winner)}
                </Text>
                <Text style={styles.dateText}>
                  {formatDate(item.createdAt)}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handleDelete(item._id)}
                style={styles.deleteButton}
                activeOpacity={0.7}
              >
                <MaterialIcons
                  name="delete-outline"
                  size={22}
                  color="#9ca3af"
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
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
    gap: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },
  emptyText: {
    fontSize: 15,
    color: "#9ca3af",
  },
  list: {
    padding: 16,
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  rowInfo: {
    flex: 1,
    gap: 4,
  },
  resultText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  resultX: {
    color: "#e74c3c",
  },
  resultO: {
    color: "#007bff",
  },
  dateText: {
    fontSize: 12,
    color: "#9ca3af",
  },
  deleteButton: {
    padding: 6,
  },
});
