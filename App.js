import React, { useState } from "react";
import {
  SafeAreaView,
  Platform,
  Text,
  StyleSheet,
  View,
  Button,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Contants from "expo-constants";
import "react-native-reanimated";
// import "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
  withRepeat,
  withDelay,
  runOnJS,
  useDerivedValue,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  TapGestureHandler,
  PanGestureHandler,
} from "react-native-gesture-handler";

const WORDS = ["What's", "Up", "Mobile", "Devs?"];

export default function App() {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    const xOffest = event.contentOffset.x;
    translateX.value = xOffest;
  });
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
        <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          horizontal
          pagingEnabled
        >
          {WORDS.map((item, index) => (
            <Page
              title={item}
              index={index}
              translateX={translateX}
              key={index.toString()}
            />
          ))}
        </Animated.ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const { width, height } = Dimensions.get("window");

const SIZE = width * 0.7;

const Page = ({ title, index, translateX }) => {
  // console.log(index + 1, "--page");
  // console.log((index - 1) * width, "--min");
  // console.log(index * width, "--median");
  // console.log((index + 1) * width, "--max");

  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale }],
      borderRadius: borderRadius,
    };
  });

  const textReanimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP
    );

    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY: translateY }],
    };
  });
  return (
    <View
      style={[
        styles.pageContainer,
        { backgroundColor: `rgba(0,0,255, 0.${index + 2})` },
      ]}
    >
      <Animated.View style={[styles.square, rStyle]} />
      <Animated.View style={[styles.textView, textReanimatedStyle]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    height,
    width,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "rgba(0,0,255, 0.4)",
  },
  textView: {
    position: "absolute",
  },
  text: {
    fontWeight: "700",
    fontSize: 50,
    color: "#fff",
    textAlign: "center",
  },
});
