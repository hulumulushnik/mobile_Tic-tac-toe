import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Cell } from "@/components/Cell";
import { Status } from "@/components/Status";
import { TitleGame } from "@/components/TitleGame";
import type { BoardState, Player } from "@/types";
import { checkWinner } from "@/utils/";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Index() {
  const [cells, setCells] = useState<BoardState>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");

  const recordGameResult = useMutation(api.stats.recordGameResult);
  const recordHistory = useMutation(api.gameHistory.recordHistory);

  const gameRecordedRef = useRef(false);

  const winnerResult = checkWinner(cells);
  const winner = winnerResult ? winnerResult.winner : null;
  const winnerCombination = winnerResult ? winnerResult.combination : [];
  const isDraw = !winner && cells.every((cell) => cell != null);

  useEffect(() => {
    if (winner && !gameRecordedRef.current) {
      recordGameResult({ result: winner });
      recordHistory({
        winner,
        board: cells,
        winningCombination: winnerCombination,
      });
      gameRecordedRef.current = true;
    } else if (isDraw && !gameRecordedRef.current) {
      recordGameResult({ result: "DRAW" });
      recordHistory({ winner: "DRAW", board: cells });
      gameRecordedRef.current = true;
    }
  }, [winner, isDraw]);

  const handleCellClick = (index: number): void => {
    if (cells[index] || winner || isDraw) {
      return;
    }

    const newCells = [...cells];
    newCells[index] = currentPlayer;
    setCells(newCells);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const handleReset = () => {
    setCells(Array(9).fill(null));
    if (winner) {
      setCurrentPlayer(winner === "X" ? "O" : "X");
    }
    gameRecordedRef.current = false;
  };

  return (
    <View style={styles.game}>
      <TitleGame title="Гра хрестики нулики" />
      <Status player={currentPlayer} winner={winner} isDraw={isDraw} />
      <View style={styles.board}>
        {cells.map((cell, index) => (
          <Cell
            value={cell}
            key={index}
            onCellClick={() => handleCellClick(index)}
            isWinner={winnerCombination.includes(index)}
          />
        ))}
      </View>
      <TouchableOpacity
        style={styles.resetButton}
        onPress={handleReset}
        activeOpacity={0.8}
      >
        <Text style={styles.resetText}>Скинути гру</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  game: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  board: {
    width: 290,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    marginVertical: 10,
  },
  resetButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#007bff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resetText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
