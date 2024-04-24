import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Pressable } from "react-native";
function PressIcon({ size, name, color, pressedColor, pressedFunc }) {
  return (
    <Pressable onPress={pressedFunc}>
      {({ pressed }) => (
        <MaterialIcons
          name={name}
          size={size}
          color={pressed ? pressedColor : color}
        />
      )}
    </Pressable>
  );
}
export default PressIcon;
