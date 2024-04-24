import { Pressable, Text, StyleSheet } from "react-native";
import { useState } from "react";
import Colors from "../../utility/Colors";

function HyperLink({ children, pressHandler }) {
  const [textColor, setTextColor] = useState(Colors.lightpurple);

  function changeTextColor() {
    setTextColor(Colors.purple);
  }
  function normalColor() {
    setTextColor(Colors.lightpurple);
  }
  return (
    <Pressable
      onPress={pressHandler}
      onPressIn={changeTextColor}
      onPressOut={normalColor}
    >
      <Text style={[styles.text_format, { color: textColor }]}>{children}</Text>
    </Pressable>
  );
}
export default HyperLink;

const styles = StyleSheet.create({
  text_format: {
    fontSize: 15,
    textAlign: "center",
    margin: 5,
    textDecorationLine: "underline",
  },
});
