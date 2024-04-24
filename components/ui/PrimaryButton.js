import { View, Text, Pressable, StyleSheet, Animated } from "react-native";
import React, { useRef } from "react";
import Colors from "../../utility/Colors";
function PrimaryButton({ children, pressHandler, loading }) {
  return (
    <View style={styles.container_out}>
      <Pressable
        disabled={loading}
        onPress={pressHandler}
        style={({ pressed }) =>
          pressed ? [styles.container, styles.pressed] : styles.container
        }
        android_ripple={Colors.darkpurple}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
}
export default PrimaryButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.purple,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  container_out: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  text: {
    color: Colors.lightpurple,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
