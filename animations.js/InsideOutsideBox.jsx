import React from "react";

const center = 90;
const CIRCLE_RADIUS = center * 2;

const InsideOutsideBox = () => {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);
  const outside = useSharedValue(true);
  const [isOutside, setIsOutside] = useState();
  const handleUpdateExternalComponent = (bool) => {
    // Update the state of the external component
    setIsOutside(bool);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, context) => {
      scale.value = withSpring(1.2);
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
      if (
        Math.abs(translateX.value) <= CIRCLE_RADIUS &&
        Math.abs(translateY.value) <= CIRCLE_RADIUS
      ) {
        outside.value = false;
        runOnJS(handleUpdateExternalComponent)(false);
      } else {
        outside.value = true;
        runOnJS(handleUpdateExternalComponent)(true);
      }
    },
    onEnd: () => {
      scale.value = withSpring(1);
      console.log(Math.abs(translateX.value), "--X");
      console.log(Math.abs(translateY.value), "--Y");
      if (
        Math.abs(translateX.value) <= CIRCLE_RADIUS &&
        Math.abs(translateY.value) <= CIRCLE_RADIUS
      ) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        runOnJS(handleUpdateExternalComponent)(false);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));
  const textAnimatedStyle = useAnimatedStyle(() => ({
    color: outside.value ? "red" : "tomato",
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
        <View style={styles.largeCircle}>
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.curvedBall, animatedStyle]} />
          </PanGestureHandler>
        </View>
        <Animated.Text style={[styles.text, textAnimatedStyle]}>
          {isOutside ? "OUTSIDE 😡" : "INSIDE 😊"}
        </Animated.Text>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  curvedBall: {
    height: center,
    width: center,
    borderRadius: 20,
    backgroundColor: "tomato",
    zIndex: 100,
  },
  largeCircle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    borderColor: "tomato",
  },
  text: {
    fontWeight: "800",
    fontSize: 40,
    textAlign: "center",
  },
});

export default InsideOutsideBox;
