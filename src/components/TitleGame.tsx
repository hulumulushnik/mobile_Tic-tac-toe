import { StyleSheet, Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface TitleGameProps {
  title: string;
}

export function TitleGame({ title }: TitleGameProps) {
  return (
    <Text style={styles.title}>
      {title}
      <AntDesign name="alert" size={24} color="black" />
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#2c3e50",
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    textAlign: "center",
  },
});
