import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { RoutineProvider } from "./utility/context/RoutineContext.js";
import { createStackNavigator } from "@react-navigation/stack";
import SignScreen from "./components/Screens/SignScreen.js";
import LoginScreen from "./components/Screens/LoginScreen.js";
import DashboardScreen from "./components/Screens/DashboardScreen.js";
import { supabase } from "./utility/supabase/Supabase.js";
import React, { useState, useEffect } from "react";
import * as Linking from "expo-linking";
import FitnessScreen from "./components/Screens/FitnessScreen.js";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRoute } from "@react-navigation/native";
import Colors from "./utility/Colors.js";
import SleepScreen from "./components/Screens/SleepScreen.js";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const linking = {
  prefixes: Linking.createURL("/"),
  config: {
    screens: {
      DashboardScreen: "signup_callback",
    },
  },
};
const theme = {
  colors: {
    background: "transparent",
  },
};
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.darkpurple,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "transparent",
          elevation: 0,
          shadowOpacity: 0,
        },
        sceneContainerStyle: {
          backgroundColor: "transparent",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Fitness") {
            iconName = focused ? "fitness-center" : "fitness-center";
          } else if (route.name === "Sleep") {
            iconName = focused ? "bedtime" : "bedtime";
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Fitness" component={FitnessScreen} />
      <Tab.Screen name="Sleep" component={SleepScreen} />
    </Tab.Navigator>
  );
}
function DashboardWithTabNavigator() {
  const route = useRoute();
  return route.name === "Dashboard" ? <TabNavigator /> : <DashboardScreen />;
}
export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const currentSession = supabase.auth.session;
    setSession(currentSession);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      },
    );

    return () => {
      authListener.unsubscribe;
    };
  }, []);

  return (
    <RoutineProvider>
      <NavigationContainer theme={theme} linking={linking}>
        <Stack.Navigator
          initialRouteName={session ? "Dashboard" : "Login"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="Dashboard"
            component={DashboardWithTabNavigator}
          />
          <Stack.Screen name="Sign" component={SignScreen} />
          <Stack.Screen name="Fitness" component={FitnessScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="Sleep" component={SleepScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </RoutineProvider>
  );
}
