import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, StyleSheet } from "react-native";
import Colors from "../../utility/Colors";
function Background({ source, children }) {
  return (
    <LinearGradient
      colors={[Colors.purple, Colors.navyblue]}
      style={styles.container}
    >
      <ImageBackground
        style={styles.imgStyle}
        source={source}
        imageStyle={styles.backgroundImg}
      >
        {children}
      </ImageBackground>
    </LinearGradient>
  );
}
export default Background;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImg: {
    opacity: 0.03,
  },
  imgStyle: {
    width: "100%",
    height: "100%",
  },
});
