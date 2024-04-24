import { Text, View, Image, Alert } from "react-native";
import InputComponent from "../ui/InputComponent";
import { StyleSheet } from "react-native";
import { supabase } from "../../utility/supabase/Supabase.js";
import PrimaryButton from "../ui/PrimaryButton";
import Background from "../ui/Background";
import HyperLink from "../ui/HyperLink.js";
import Colors from "../../utility/Colors.js";
import { useState } from "react";
import { useFonts } from "expo-font";

function LoginScreen({ navigation }) {
  //Creamos las variables para el inicio de sesion
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //Inicializamos las fuentes
  const [fontsLoaded] = useFonts({
    Inter: require("../../assets/fonts/Inter-VariableFont_slnt,wght.ttf"),
  });
  //Condicional que checa que las fuentes carguen
  if (!fontsLoaded) return null;
  //funciont para un navegar a la pantalla de signIn
  function signInHandler() {
    navigation.navigate("Sign");
  }
  //Aqui tenemos una funcion con supabase para iniciar la sesion
  async function signInWithUsername() {
    setLoading(true);
    //Tenemos creamos una variable booleana en caso de que salga un error
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    //Si sale un error, que muestre el error
    if (error) {
      Alert.alert(error.message);
    } else {
      //Si no sale ningun error esto significa que la sesion fue creada y que podemos ir al dashboard
      navigation.navigate("Dashboard");
    }
    setLoading(false);
  }

  return (
    <Background
      source={require("../../assets/christopher-burns-Kj2SaNHG-hg-unsplash.jpg")}
    >
      <View style={styles.login_container}>
        <Text style={styles.text}>Bienvenido a tu FitnessApp</Text>
        <Image source={require("../../assets/fitness-gym-svgrepo-com 1.png")} />
        <View style={styles.input_container}>
          <InputComponent
            isPassword={false}
            onChangeHandler={(text) => setEmail(text)}
            value={email}
            placeholder={"Ingresa tu correo"}
          ></InputComponent>
          <InputComponent
            isPassword={true}
            onChangeHandler={(text) => setPassword(text)}
            value={password}
            placeholder={"Ingresa tu contraseña"}
          ></InputComponent>
        </View>
        <HyperLink pressHandler={signInHandler}>
          No tienes cuenta? Registrate ya!
        </HyperLink>
      </View>

      <View style={styles.button_container}>
        <PrimaryButton loading={loading} pressHandler={signInWithUsername}>
          Inicia Sesión
        </PrimaryButton>
      </View>
    </Background>
  );
}
export default LoginScreen;
const styles = StyleSheet.create({
  login_container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10%",
    marginTop: "15%",
  },
  text: {
    fontFamily: "Inter",
    fontWeight: "bold",
    color: Colors.light,
    fontSize: 30,
    margin: 15,
    marginBottom: 35,
    textAlign: "center",
  },
  input_container: {
    width: "80%",
    height: 100,
    marginBottom: "15%",
    marginTop: "15%",
    alignItems: "center",
  },
  button_container: {
    marginHorizontal: "25%",
    marginBottom: "20%",
  },
});
