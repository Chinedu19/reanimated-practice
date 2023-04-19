import { SafeAreaView, Platform, Text, StyleSheet, View } from "react-native";
import Contants from "expo-constants";
import "react-native-reanimated";
import "react-native-gesture-handler";
import CardList from "./components/CardList";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  TapGestureHandler,
  PanGestureHandler,
} from "react-native-gesture-handler";
export default function App() {
  const startingPoint = 100;
  const pressed = useSharedValue(false);

  const ball1x = useSharedValue(startingPoint);
  const ball1y = useSharedValue(startingPoint);

  const ball1EventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      pressed.value = true;
      (ctx.x = ball1x.value), (ctx.y = ball1y.value);
    },
    onActive: (event, ctx) => {
      ball1x.value = ctx.x + event.translationX;
      ball1y.value = ctx.y + event.translationY;
    },
    onEnd: (event, ctx) => {
      pressed.value = false;
      // x.value = withSpring(startingPoint);
      // y.value = withSpring(startingPoint);
    },
  });
  const ballAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value ? "yellow" : "blue",
      transform: [
        // {
        //   scale: withSpring(pressed.value ? 1.2 : 1),
        // },
        { translateX: ball1x.value },
        { translateY: ball1y.value },
      ],
    };
  });
  const ball2Animation = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withSpring(ball1x.value - 50) },
        { translateY: withSpring(ball1y.value - 150) },
      ],
    };
  });
  const ball3Animation = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withSpring(ball1x.value - 50) },
        { translateY: withSpring(ball1y.value - 140) },
      ],
    };
  });
  return (
    <GestureHandlerRootView>
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? Contants.statusBarHeight : 0,
        }}
      >
        {/* <CardList /> */}
        <Text>Smooth</Text>

        <PanGestureHandler
          numberOfTaps={1}
          maxDurationMs={1000}
          maxDeltaX={50}
          maxDeltaY={50}
          minPointers={1}
          maxPointers={1}
          onGestureEvent={ball1EventHandler}
        >
          <Animated.View style={[styles.ball, ballAnimatedStyle]} />
        </PanGestureHandler>

        <Animated.View style={[styles.ball, ball2Animation]} />
        <Animated.View style={[styles.ball, ball3Animation]} />
        {/* <Animated.View style={[styles.ball, ballAnimatedStyle]} /> */}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  ball: {
    height: 200,
    width: 200,
    borderRadius: 100,
    backgroundColor: "blue",
  },
});
