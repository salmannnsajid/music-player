import React from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import { AudioPlayer } from "./Components/AudioPlayer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AudioListScreen } from "./Components/AudioListScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AudioList">
          <Stack.Screen
            name="AudioList"
            component={AudioListScreen}
            options={{ title: "Songs" }}
          />
          <Stack.Screen
            name="AudioDetail"
            component={AudioPlayer}
            options={{ title: "Audio Detail", headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
