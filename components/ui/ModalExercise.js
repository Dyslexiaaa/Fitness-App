import React, { useState, useEffect } from "react";
import { Modal, Text, View, TextInput } from "react-native";
import PrimaryButton from "../ui/PrimaryButton";
import { StyleSheet } from "react-native";
import Colors from "../../utility/Colors";
import RNPickerSelect from "react-native-picker-select";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../utility/supabase/Supabase";

export default function ModalExercise({ visible, onClose, onSave }) {
  useEffect(() => {
    if (!visible) {
      // Restablecer valores cuando el modal se cierra
      setRoutineName("");
      setSelectedExercises({
        Lunes: "",
        Martes: "",
        Miércoles: "",
        Jueves: "",
        Viernes: "",
        Sábado: "",
        Domingo: "",
      });
    }
  }, [visible]);
  const optsExercise = [
    { id: 1, name: "Pecho y Espalda" },
    { id: 2, name: "Bicep, Tricep, y Hombro" },
    { id: 3, name: "Pierna" },
  ];
  const [routineName, setRoutineName] = useState("");
  const [selectedExercises, setSelectedExercises] = useState({
    Lunes: "",
    Martes: "",
    Miércoles: "",
    Jueves: "",
    Viernes: "",
    Sábado: "",
    Domingo: "",
  });
  const handleExerciseChange = (day, value) => {
    setSelectedExercises((prev) => {
      const updatedExercises = { ...prev, [day]: value };
      return updatedExercises;
    });
  };
  async function insertRountine(routineName, selectedExercises) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase.from("routines").insert([
      {
        name: routineName,
        Lunes: selectedExercises.Lunes,
        Martes: selectedExercises.Martes,
        Miércoles: selectedExercises.Miércoles,
        Jueves: selectedExercises.Jueves,
        Viernes: selectedExercises.Viernes,
        Sábado: selectedExercises.Sábado,
        Domingo: selectedExercises.Domingo,
        user_id: user.id,
      },
    ]);
    if (error) {
      console.error("Error al insertar la rutina: ", error);
    } else {
      console.log("Rutina insertada con exito", data);
    }
  }
  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <SafeAreaView style={styles.modalContainer}>
        <Text style={styles.title}>CREA UNA NUEVA RUTINA</Text>
        <Text>Elige los ejercicios para cada día</Text>
        <TextInput
          style={styles.input}
          value={routineName}
          onChangeText={setRoutineName}
          placeholder="Nombra tu rutina"
        />
        {Object.keys(selectedExercises).map((day) => (
          <View key={day} style={styles.pickerContainer}>
            <View style={styles.block}>
              <Text style={styles.days}>{day}</Text>
            </View>
            <View style={styles.pickerItem}></View>
            <RNPickerSelect
              onValueChange={(value) => handleExerciseChange(day, value)}
              items={optsExercise.map((exercise) => ({
                label: exercise.name,
                value: exercise.name,
              }))}
              placeholder={{ label: "Ninguno", value: "" }}
              style={pickerSelectStyles}
            />
          </View>
        ))}
        <View style={styles.buttonsContainer}>
          <PrimaryButton
            pressHandler={() => {
              onSave(routineName, selectedExercises);
              insertRountine(routineName, selectedExercises);
            }}
          >
            Guardar
          </PrimaryButton>
          <PrimaryButton pressHandler={onClose}>Cancelar</PrimaryButton>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
const styles = StyleSheet.create({
  block: {
    flex: 2,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.light,
  },
  pickerItem: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  input: {
    textAlign: "center",
    width: "50%",
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 15,
  },
  text: {
    fontSize: 15,
    fontWeight: "300",
    marginBottom: 10,
  },
  days: {
    fontSize: 20,
    fontWeight: "bold",
  },
  pickerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  picker: {
    alignSelf: "center",
    height: 250,
    width: "80%",
    marginVertical: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "purple",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // Para acomodar el ícono de flecha
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // Para acomodar el ícono de flecha
  },
});
