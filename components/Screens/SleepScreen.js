import { View, Text, StyleSheet, Image } from "react-native";
import { AppState } from "react-native";
import { supabase } from "../../utility/supabase/Supabase";
import Colors from "../../utility/Colors";
import SleepProgressBar from "../ui/SleepProgressBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

export default function SleepScreen() {
  const [hoursSlept, setHoursSlept] = useState(0);
  const [sleepStartTime, setSleepStartTime] = useState(null);

  useEffect(() => {
    // Escuchar cambios en el estado de la aplicación
    const appStateChangeListener = AppState.addEventListener(
      "change",
      handleAppStateChange,
    );

    // Cargar las horas de sueño almacenadas al iniciar la pantalla
    loadHoursSlept();

    // Retirar el listener del estado de la aplicación al desmontar el componente
    return () => {
      appStateChangeListener.remove();
    };
  }, []);

  // Función para manejar los cambios en el estado de la aplicación
  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === "inactive") {
      // La aplicación se está suspendiendo, almacenar la marca de tiempo
      setSleepStartTime(new Date());
    } else if (nextAppState === "active" && sleepStartTime) {
      // La aplicación volvió a estar en primer plano, calcular las horas de sueño
      calculateHoursSlept();
    }
  };
  // Función para calcular las horas de sueño
  const calculateHoursSlept = () => {
    if (sleepStartTime) {
      const sleepEndTime = new Date();
      const sleepDuration = sleepEndTime - sleepStartTime;
      const hoursSlept = sleepDuration / (1000 * 60 * 60); // Convertir milisegundos a horas

      // Obtener la hora actual y comprobar si está dentro del período de sueño nocturno (por ejemplo, de 10 p.m. a 6 a.m.)
      const currentHour = sleepEndTime.getHours();
      const isNightTime = currentHour >= 22 || currentHour < 6;

      if (isNightTime) {
        setHoursSlept((prevHours) => prevHours + hoursSlept);
        saveHoursSlept(hoursSlept);
      }

      setSleepStartTime(null); // Reiniciar la marca de tiempo
    }
  };
  // Función para guardar las horas de sueño
  const saveHoursSlept = async (hours) => {
    try {
      const user = supabase.auth.getUser();
      if (!user) {
        console.error("No hay usuario autenticado");
        return;
      }
      const { data, error } = await supabase
        .from("sleep_hours")
        .insert([{ user_id: user.id, hours_slept: hours }]);
      if (error) {
        console.error("Error al guardar las horas de sueño", error);
      }
    } catch (error) {
      console.error("Error al guardar las horas de sueño:", error.message);
    }
  };
  // Función para cargar las horas de sueño almacenadas
  const loadHoursSlept = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        console.error("No hay usuario autenticado");
      }
      console.log(user);

      const { data, error } = await supabase
        .from("sleep_hours")
        .select("hours_slept")
        .eq("user_id", user.id);
      if (error) {
        console.error("Error al guardar las horas de sueño", error);
        return null;
      }
      return data?.hours_slept ?? null;
    } catch (error) {
      console.error("Error al cargar las horas de sueño:", error);
      return null;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.imgStyle}
        source={require("../../assets/moon-dreamy-svgrepo-com 1.png")}
      />
      <Text style={styles.dreamText}>Estadisticas del sueño.</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>Hoy</Text>
        <Text style={styles.hourText}>{hoursSlept} horas</Text>
        <SleepProgressBar hoursSlept={hoursSlept} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.light,
  },
  imgStyle: {
    height: 250,
    width: 250,
  },
  dreamText: {
    color: Colors.light,
    fontSize: 20,
    fontWeight: "300",
    marginVertical: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.navyblue,
    paddingVertical: 30,
  },
  hourText: {
    color: Colors.lightpurple,
    fontSize: 40,
    alignSelf: "center",
    fontWeight: "bold",
  },
  infoContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: `rgba(153, 102, 255, 0.1)`,
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 50,
  },
});
