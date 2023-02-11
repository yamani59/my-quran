/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import {
  ColorSchemeName,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import { Text, View } from "../components/Themed";

import Colors, {
  tintColorLight,
  ThemeDark,
  SecondThemeDark,
} from "../constants/Colors";
import Icon from "../assets/icons/index";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import Beranda from "../screens/Beranda";
import PrayerTime from "../screens/PrayerTime";
import Chat from "../screens/Chat";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Beranda"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '900',
          letterSpacing: 1
        },
        headerStyle: {
          backgroundColor: ThemeDark,
          elevation: 0,
        },
        tabBarStyle: {
          position: "absolute",
          bottom: 5,
          backgroundColor: "#111e4e",
          marginHorizontal: 10,
          borderTopWidth: 0,
          height: 60,
          borderColor: "none",
          borderRadius: 10,
          shadowColor: "#000",
          shadowOpacity: 0,
          shadowOffset: {
            width: 0,
            height: 0,
          },
        },
      }}
    >
      <BottomTab.Screen
        name="PrayerTime"
        component={PrayerTime}
        options={{
          title: "Prayer Time",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="clock-o" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Beranda"
        component={Beranda}
        options={({ navigation }: RootTabScreenProps<"Beranda">) => ({
          title: "Quran App",
          headerTitleAlign: "center",
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity>
              <View
                style={{
                  marginBottom: 60,
                  width: 80,
                  height: 80,
                  backgroundColor: ThemeDark,
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={Icon.quranIcon}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                  }}
                />
              </View>
            </TouchableOpacity>
          ),
        })}
      />
      <BottomTab.Screen
        name="Chat"
        component={Chat}
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
