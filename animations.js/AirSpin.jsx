import React from "react";
import {
  SafeAreaView,
  Platform,
  Text,
  StyleSheet,
  View,
  Button,
  ImageBackground,
  Dimensions,
} from "react-native";
import Contants from "expo-constants";
import "react-native-reanimated";
import "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
  withRepeat,
  withDelay,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  TapGestureHandler,
  PanGestureHandler,
} from "react-native-gesture-handler";

export default function App() {
  // const height
  const startingPoint = 500;

  const rotate = useSharedValue(1);
  const ballPosition = useSharedValue(startingPoint);
  const transformPosition = useSharedValue(0);
  const scale = useSharedValue(1);

  const timingConfig = { duration: 5000 };
  const airSpin = () => {
    /** Comment below indicates how the Animated triggered individually */

    // third
    ballPosition.value = withTiming(startingPoint - 400, {}, (done) => {
      if (done) {
        rotate.value = withTiming(
          rotate.value + 360 * 3.5,
          { duration: 500 },
          (done) => {
            if (done) {
              ballPosition.value = withSpring(startingPoint);
            }
          }
        );
      }
    });

    // first
    // scale.value = withSequence(
    //   withSpring(1),
    //   withTiming(0.7),
    //   withSpring(0.5),
    //   withSpring(1)
    // );

    // second
    // rotate.value = withSequence(
    //   withTiming(360, {}, (done) => {
    //     rotate.value = withTiming(rotate.value - 360);
    //   })
    // );
    // rotate.value = withTiming(rotate.value * 360);
    // rotate.value = withRepeat(
    //   withTiming(rotate.value * 360, { duration: 100 }),
    //   4
    // );
  };
  const tAroundTheWorld = () => {
    // third
    transformPosition.value = withTiming(200, {}, (done) => {
      if (done) {
        rotate.value = withTiming(
          rotate.value + 360,
          { duration: 500 },
          (done) => {
            if (done) {
              transformPosition.value = withSpring(0);
            }
          }
        );
      }
    });
  };

  const ballAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateZ: `${rotate.value}deg` },
      { scale: scale.value },
      { translateY: transformPosition.value },
    ],
    top: ballPosition.value,
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? Contants.statusBarHeight : 0,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Animated.View style={[styles.ball, ballAnimatedStyle]}>
          <ImageBackground
            style={{
              flex: 1,
              width: "100%",
              backgroundColor: "red",
            }}
            source={{
              uri: "https://thumbs.dreamstime.com/b/rainbow-color-wheel-background-white-79014405.jpg",
            }}
          ></ImageBackground>
        </Animated.View>

        <Button title="Air Spin" onPress={() => airSpin()} />
        <Button title="T around the world" onPress={() => tAroundTheWorld()} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  ball: {
    height: 100,
    width: 100,
    borderRadius: 100,
    position: "absolute",
    // transform: [{ translateY: 50 }],
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});
