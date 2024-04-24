import { Pressable, View, Image, StyleSheet } from "react-native";
function PressImg({ source, pressHandler }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={pressHandler}>
        <Image source={source} />
      </Pressable>
    </View>
  );
}
export default PressImg;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
