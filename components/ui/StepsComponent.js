import { StyleSheet, View, Text, Image } from "react-native";
import { useState, useEffect, useRef } from "react";
import { BackgroundImage } from "react-native-elements/dist/config";
import Colors from "../../utility/Colors";
import { Constants } from "expo-constants";
import { Accelerometer } from "expo-sensors";

function StepsComponent({ children }) {
  const [steps, setSteps] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [lastStamps, setLastStamps] = useState(0);

  useEffect(() => {
    let subscription;
    Accelerometer.isAvailableAsync().then((result) => {
      if (result) {
        subscription = Accelerometer.addListener((accelerometerData) => {
          const { y } = accelerometerData;
          const threshold = 0.1;
          const timestamp = new Date().getTime();

          if (
            Math.abs(y - lastY) > threshold &&
            !isCounting &&
            timestamp - lastStamps > 800
          ) {
            setIsCounting(true);
            setLastY(y);
            setLastStamps(timestamp);
            setSteps((prevSteps) => prevSteps + 1);
            setTimeout(() => {
              setIsCounting(false);
            }, 1200);
          }
        });
      } else {
        console.log("Accelerometer not available in this device");
      }
    });
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [isCounting, lastY, lastStamps]);

  const resetSteps = () => {
    setSteps(0);
  };

  return (
    <BackgroundImage
      source={require("../../assets/Ellipse 1.png")}
      style={styles.imgSize}
    >
      <Text style={styles.textStyle}>{steps}</Text>
      <Image
        source={require("../../assets/Goal.png")}
        style={styles.goalContainer}
      />
    </BackgroundImage>
  );
}
export default StepsComponent;
const styles = StyleSheet.create({
  imgSize: {
    width: 210,
    height: 210,
    alignItems: "center",
    marginTop: 20,
  },
  textStyle: {
    color: Colors.light,
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 50,
  },
  goalContainer: {
    width: 35,
    height: 35,
    marginBottom: 25,
    marginTop: 25,
  },
});
