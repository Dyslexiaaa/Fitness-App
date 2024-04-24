import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import Colors from "../../utility/Colors";
function InputComponent({ placeholder, onChangeHandler, value, isPassword }) {
  return (
    <TextInput
      secureTextEntry={isPassword}
      value={value}
      placeholderTextColor={"#C8CEDF"}
      placeholder={placeholder}
      style={styles.input}
      clearTextOnFocus={true}
      onChangeText={onChangeHandler}
    />
  );
}
export default InputComponent;
const styles = StyleSheet.create({
  input: {
    height: 50,
    width: "75%",
    margin: 10,
    borderColor: Colors.light,
    paddingVertical: 10,
    borderBottomWidth: 1,
    textAlign: "center",
    color: Colors.lightpurple,
  },
});
