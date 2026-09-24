import { StyleSheet, Text, View } from "react-native";

interface MiniBoardProps {
  board: (string | null)[];
  winningCombination?: number[];
}

export function MiniBoard({ board, winningCombination = [] }: MiniBoardProps) {
  return (
    <View style={styles.boardContainer}>
      {board.map((cellValue, index) => {
        const isWinCell = winningCombination.includes(index);

        return (
          <View
            key={index}
            style={[styles.cell, isWinCell && styles.cellWinner]}
          >
            {cellValue ? (
              <Text
                style={[
                  styles.cellText,
                  cellValue === "X" && styles.cellTextX,
                  cellValue === "O" && styles.cellTextO,
                  isWinCell && styles.cellTextWinner,
                ]}
              >
                {cellValue}
              </Text>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  boardContainer: {
    width: 68,
    height: 68,
    padding: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "space-between",
    gap: 3,
  },
  cell: {
    width: 18,
    height: 18,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
    backgroundColor: "#f9fafb",
    alignItems: "center",
    justifyContent: "center",
  },
  cellWinner: {
    backgroundColor: "#2ecc71",
    borderColor: "#27ae60",
  },
  cellText: {
    fontSize: 10,
    fontWeight: "900",
    lineHeight: 12,
  },
  cellTextX: {
    color: "#e74c3c",
  },
  cellTextO: {
    color: "#007bff",
  },
  cellTextWinner: {
    color: "#FFFFFF",
  },
});
