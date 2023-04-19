import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Animated, {
  FadeIn,
  Layout,
  RollInLeft,
  SlideInDown,
  SlideInUp,
  SlideOutRight,
} from "react-native-reanimated";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";

const FallBack = () => {
  const colorMode = "#fff";
  return (
    <MotiView
      transition={{
        type: "timing",
      }}
    >
      <Skeleton colorMode={colorMode} width={"60%"} height={25} />
      <View style={{ marginVertical: 10 }} />
      <Skeleton colorMode={colorMode} width={"90%"} height={50} />
      <View style={{ marginVertical: 15 }} />
      <Skeleton colorMode={colorMode} width={"100%"} height={350} />
    </MotiView>
  );
};

export default function Card(movie) {
  const { id, title, description, posterUrl } = movie;
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View
      style={styles.card}
      layout={Layout.stiffness()}
      entering={FadeIn}
      exiting={SlideOutRight}
    >
      {!show ? (
        <>
          <FallBack />
        </>
      ) : (
        <>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.body}>{description}</Text>
          <Image style={styles.poster} source={{ uri: posterUrl }} />
        </>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 28,
    padding: 16,
    marginVertical: 30,
    backgroundColor: "white",
    elevation: 8,
    shadowColor: "#000",
    shadowRadius: 6,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.1,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#383838",
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: "#575757",
  },
  poster: {
    height: 375,
    width: "100%",
    marginTop: 20,
    borderRadius: 14,
  },
});
