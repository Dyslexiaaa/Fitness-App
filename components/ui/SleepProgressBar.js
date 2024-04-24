import React from "react";
import { View, Text, Platform, StyleSheet } from "react-native";
import Colors from "../../utility/Colors";
import * as Progress from "react-native-progress";
export default function SleepProgressBar({ hoursSlept }) {
  const maxHours = 8; // Límite máximo de horas de sueño
  const progress = hoursSlept / maxHours; // Calcular el progreso en función de las horas dormidas

  return (
    <View style={styles.container}>
      <Progress.Bar
        style={styles.progressBar}
        width={200}
        progress={progress}
        color={Colors.pink}
      />
      <Text style={styles.progressText}>
        {hoursSlept} / {maxHours}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  progressText: {
    marginTop: 5,
    color: Colors.light,
  },
  progressBar: {
    marginTop: 10,
  },
});
