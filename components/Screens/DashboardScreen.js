import {
  ImageBackground,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../utility/Colors";
import StepsComponent from "../ui/StepsComponent";
import { useRoutine } from "../../utility/context/RoutineContext";

function DashboardScreen({ navigation }) {
  const [days, setDays] = useState([]);
  const { selectedRoutine } = useRoutine();
  useEffect(() => {
    const today = new Date();
    const daysArray = [];
    for (let i = 0; i < 6; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);
      daysArray.push({
        date: day,
        isToday: day.toDateString() === today.toDateString(),
      });
    }
    setDays(daysArray);
  }, []);
  const getExerciseForDay = (day) => {
    if (!selectedRoutine) return "No hay rutina programada";
    const formattedDay = day.charAt(0).toUpperCase() + day.slice(1);
    if (!selectedRoutine || !selectedRoutine[formattedDay]) return "Descanso";
    return selectedRoutine[formattedDay];
  };
  const renderItem = ({ item }) => {
    const dayOfWeek = item.date.toLocaleDateString("es-ES", {
      weekday: "long",
    });
    const monthName = item.date.toLocaleDateString("es-ES", { month: "long" });
    const exerciseForDay = getExerciseForDay(dayOfWeek.toLowerCase());
    return (
      <View style={styles.dateContainer}>
        <View>
          <Text style={[styles.dayText, item.isToday && styles.todayText]}>
            {dayOfWeek}
          </Text>
          <Text style={[styles.monthText, item.isToday && styles.todayText]}>
            {item.date.getDate()} {monthName}
          </Text>
        </View>
        <View style={styles.routineContainer}>
          <Text style={[styles.routineText, item.isToday && styles.todayText]}>
            {exerciseForDay}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imgStyle}
        source={require("../../assets/fondoDashboard.png")}
      >
        <StepsComponent></StepsComponent>
      </ImageBackground>

      <View style={styles.calendarContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={days}
          renderItem={renderItem}
          keyExtractor={(item) => item.date.toISOString()}
        />
      </View>
    </SafeAreaView>
  );
}
export default DashboardScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
  },
  routineContainer: {
    width: 150,
    alignItems: "center",
  },
  imgStyle: {
    paddingTop: 16,
    flex: 2,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  backgroundContainer: {
    flex: 5,
  },
  calendarContainer: {
    width: "75%",
    height: "35%",
    marginVertical: 20,
    backgroundColor: Colors.white,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowOffset: 50,
    elevation: 5,
    alignSelf: "center",
    paddingLeft: 20,
  },
  routineText: {
    marginHorizontal: 10,
    flexWrap: "wrap",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  dayText: {
    fontSize: 16,
  },
  monthText: {
    fontSize: 25,
  },
  todayText: {
    fontWeight: "bold",
    color: Colors.purple,
  },
});
