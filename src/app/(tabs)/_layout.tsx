import { Icon, Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007bff", // Колір активної вкладки (синій)
        tabBarInactiveTintColor: "#8e8e93", // Колір неактивної вкладки (сірий)
        tabBarStyle: {
          backgroundColor: "#ffffff",
          height: 80,
          paddingTop: 8,
          paddingBottom: 10,
          borderTopWidth: 1,
          borderTopColor: "#e0e0e0",
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "600",
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Гра",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="fire" size={size} color="color" />
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: "статистика",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="folder" size={size} color="color" />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "історія",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="clock-circle" size={size} color="color" />
          ),
        }}
      />
    </Tabs>
  );
}
