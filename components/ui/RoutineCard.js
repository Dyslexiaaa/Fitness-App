import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../../utility/Colors";
import { useRoutine } from "../../utility/context/RoutineContext.js";
import PressIcon from "./PressIcon.js";

function RoutineCard({ routine, id, onDelete }) {
  const pick = (obj, arr) =>
    Object.fromEntries(Object.entries(obj).filter(([k]) => arr.includes(k)));
  const { name, ...daysExercises } = pick(routine, [
    "name",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ]);

  const { selectedRoutine, setSelectedRoutine } = useRoutine();

  const isSelected = selectedRoutine && selectedRoutine.name === name;

  const getExerciseIcon = (exercise) => {
    switch (exercise) {
      case "Pecho y Espalda":
        return "weight-lifter";
      case "Pierna":
        return "seat-recline-extra";
      case "Bicep, Tricep, y Hombro":
        return "arm-flex";
      default:
        return "sleep";
    }
  };

  const handleCardPress = () => {
    if (isSelected) {
      setSelectedRoutine(null); // Deselect the card
    } else {
      setSelectedRoutine({ id, ...routine }); // Select the card
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={handleCardPress}
    >
      <View style={styles.headerSection}>
        <View>
          <Text style={styles.title}>{name}</Text>
        </View>
        <View>
          <PressIcon
            name="delete"
            size={30}
            color={Colors.light}
            pressedColor={Colors.pink}
            pressedFunc={() => onDelete(routine.id)}
          />
        </View>
      </View>
      <View style={styles.daysList}>
        {Object.entries(daysExercises).map(([day, exercise], index) => (
          <View key={index} style={styles.day}>
            <Text style={styles.text}>{day.charAt(0)}</Text>
            <Icon
              name={getExerciseIcon(exercise)}
              size={20}
              color={Colors.light}
              style={styles.icon}
            />
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

export default RoutineCard;

const styles = StyleSheet.create({
  selectedContainer: {
    ...Platform.select({
      ios: {
        shadowColor: Colors.darkpurple,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
    backgroundColor: Colors.darkpurple,
  },
  icon: {
    paddingRight: 10,
  },
  headerSection: {
    width: 325,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "space-around",
    justifyContent: "space-between",
  },
  container: {
    backgroundColor: Colors.navyblue,
    padding: 10,
    margin: 1,
    borderRadius: 25,
    alignItems: "center",
  },
  daysList: {
    flexDirection: "row",
    marginVertical: 10,
  },
  day: {
    alignSelf: "center",
    marginHorizontal: 10,
  },
  title: {
    color: Colors.light,
    fontSize: 35,
    alignSelf: "auto",
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    color: Colors.light,
  },
});
