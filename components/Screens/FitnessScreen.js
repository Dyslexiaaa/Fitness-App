import { useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../../utility/Colors";
import PressIcon from "../ui/PressIcon";
import ModalExercise from "../ui/ModalExercise";
import RoutineCard from "../ui/RoutineCard";
import { supabase } from "../../utility/supabase/Supabase";
export default function FitnessScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [routines, setRoutines] = useState([]);
  const [daysExercises, setDaysExercises] = useState([]);
  useEffect(() => {
    const fetchRoutines = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("routines")
          .select("*")
          .eq("user_id", user.id);

        if (error) {
          console.error("Error al obtener las rutinas: ", error);
        } else {
          setRoutines(data);
          console.log(routines);
        }
      }
    };
    fetchRoutines();
  }, []);
  const handleDelete = async (routineId) => {
    const { error } = await supabase
      .from("routines")
      .delete()
      .eq("id", routineId);

    if (error) {
      console.error("Error al eliminar la rutina", error);
    } else {
      setRoutines((prevRoutines) =>
        prevRoutines.filter((routine) => routine.id !== routineId),
      );
    }
  };
  const handleSave = (name, routine) => {
    const routineName = { name: name, ...routine };
    setRoutines((prevRoutine) => [...prevRoutine, routineName]);
    setModalVisible(false);
  };
  const handleClose = () => {
    setModalVisible(false);
  };
  return (
    <SafeAreaView style={styles.fitContainer}>
      <Text style={styles.title}>Tus Rutinas.</Text>
      <View style={styles.funcBarContainer}>
        <Text>Crea una nueva rutina!</Text>
        <PressIcon
          name="add-box"
          size={20}
          color="black"
          pressedColor={Colors.purple}
          pressedFunc={() => setModalVisible(true)}
        />
      </View>
      <View style={styles.horLine}></View>
      <View style={styles.workoutsContainer}>
        <ScrollView>
          {routines.length > 0 ? (
            routines.map((routine, index) => (
              <RoutineCard
                key={index}
                id={index}
                routine={routine}
                onDelete={() => handleDelete(routine.id)}
              />
            ))
          ) : (
            <Text>No hay rutinas creadas por el momento.</Text>
          )}
        </ScrollView>
        <ModalExercise
          visible={modalVisible}
          onSave={handleSave}
          onClose={handleClose}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  fitContainer: {
    flex: 1,
  },
  title: {
    paddingVertical: 25,
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  horLine: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    width: "85%",
    alignSelf: "center",
  },
  funcBarContainer: {
    marginHorizontal: 30,
    marginBottom: 5,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  workoutsContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
});
