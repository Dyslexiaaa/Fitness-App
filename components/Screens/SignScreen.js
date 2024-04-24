import { Text, View, Image, ScrollView, Alert, AppState } from "react-native";
import Colors from "../../utility/Colors";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import InputComponent from "../ui/InputComponent";
import { StyleSheet } from "react-native";
import PrimaryButton from "../ui/PrimaryButton";
import Background from "../ui/Background";
import { supabase } from "../../utility/supabase/Supabase";
import PressImg from "../ui/PressImg";
import { useEffect, useState } from "react";
import { Linking } from "react-native";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
function SignScreen({ navigation }) {
  //Inicializamos todas las variables para poder crear un usuario
  const [name, setName] = useState("");
  const [last_Name, setLast_Name] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  //Haciendo un use effect para que se ejecute cada vez que la aplciacion renderiza
  useEffect(() => {
    const handleOpenURL = async (event) => {
      const { url } = event;

      // Intenta crear una sesión a partir de la URL
      const sessionurl = await createSessionFromUrl(url);

      // Si hay una sesión existente, eso significa que el usuario está logueado
      // y puede entrar al dashboard de la aplicación
      if (sessionurl) {
        // Aquí puedes insertar los datos del usuario en la base de datos
        const user = sessionurl.user;
        if (user && user.email_confirmed_at) {
          console.log(name, last_Name, age, username);
          const data = {
            id: user.id,
            name: name,
            surname: last_Name,
            age: age,
            username: username,
            // Otros datos del usuario
          };

          const { data: insertData, error: insertError } = await supabase
            .from("user_profiles")
            .insert([data]);

          if (insertError) {
            Alert.alert(
              "Error insertando datos del usuario",
              insertError.message,
            );
          } else {
            Alert.alert("Datos del usuario insertados con éxito");
            // Navega al dashboard después de insertar los datos del usuario
            navigation.navigate("Dashboard");
          }
        }
      }
    };

    // Crea el listener del evento para manejar la URL
    const subscription = Linking.addEventListener("url", handleOpenURL);

    // Maneja la URL inicial si la aplicación fue abierta con una URL
    Linking.getInitialURL().then((url) => {
      if (url) handleOpenURL({ url });
    });

    // Elimina el listener cuando el componente se desmonta
    return () => {
      subscription.remove();
    };
  }, []);
  //Hacemos una funcion para que cada vez que se abra el URL se cree una sesion
  const createSessionFromUrl = async (url) => {
    //Obtenemos el Url con QueryParams
    const { params, errorCode } = QueryParams.getQueryParams(url);
    //Si hay un error se pedira que se despliegue este error
    if (errorCode) throw new Error(errorCode);
    //Si no hay error, que obtenga de los params, access_token, y refresh_token
    //Todo esto se crea a partir de que el usuario se registre
    const { access_token, refresh_token } = params;
    //Si no tiene token de acceso, significa que no hay autenticacion por ende no se hace nada
    if (!access_token) return;
    // Si tiene acceso creamos una sesion con los tokens que obtuvimos de la url
    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    //Si hubo un error en este proceso que se despliegue este mismo error
    if (error) throw error;

    //Se retorna la sesion con el usuario y los datos de la sesion

    return data.session;
  };
  //Se hace una funcion para navegar a la pantalla de login en caso de que el usuario quiera
  function returnHome() {
    navigation.navigate("Login");
  }
  //Se hace una funcion para registrarse
  async function signUpWithEmail() {
    setLoading(true);
    try {
      //obtenemos el error de la funcion supabase en caso de que no se registre un usuario correctamente
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          //Aqui lo redirecciono al dashboard despues de su confirmacion en el correo
          emailRedirectTo: "dyslexia.com://Dashboard",
        },
      });
      //si hay error que lo despliegue
      if (error) {
        Alert.alert(error.message);
        setLoading(false);
        return;
      } else {
        // Si la inserción es exitosa, muestra una alerta de éxito y navega al Dashboard
        Alert.alert("Verifica tu correo electronico.");
      }
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Background
      source={require("../../assets/christopher-burns-Kj2SaNHG-hg-unsplash.jpg")}
    >
      <ScrollView style={styles.scroll_view}>
        <PressImg
          source={require("../../assets/home-svgrepo-com 1.png")}
          pressHandler={returnHome}
        ></PressImg>
        <View style={styles.login_container}>
          <Text style={styles.text}>Crea tu cuenta</Text>
          <View style={styles.input_container}>
            <InputComponent
              isPassword={false}
              value={name}
              onChangeHandler={(text) => setName(text)}
              placeholder={"Inserta tu nombre"}
            ></InputComponent>
            <InputComponent
              isPassword={false}
              value={last_Name}
              onChangeHandler={(text) => setLast_Name(text)}
              placeholder={"Inserta tu apellido"}
            ></InputComponent>
            <InputComponent
              isPassword={false}
              value={age}
              onChangeHandler={(text) => setAge(text)}
              placeholder={"Inserta tu edad"}
            ></InputComponent>
            <InputComponent
              isPassword={false}
              value={email}
              onChangeHandler={(text) => setEmail(text)}
              placeholder={"Inserta tu correo"}
            ></InputComponent>
            <InputComponent
              isPassword={false}
              value={username}
              onChangeHandler={(text) => setUsername(text)}
              placeholder={"Crea un nombre de usuario"}
            ></InputComponent>
            <InputComponent
              isPassword={true}
              value={password}
              onChangeHandler={(text) => setPassword(text)}
              placeholder={"Crea tu contraseña"}
            ></InputComponent>

            <View style={styles.button_container}>
              <PrimaryButton loading={loading} pressHandler={signUpWithEmail}>
                Registrate
              </PrimaryButton>
            </View>
          </View>
        </View>
      </ScrollView>
    </Background>
  );
}
export default SignScreen;

const styles = StyleSheet.create({
  login_container: {
    alignItems: "center",
    JustifyContent: "center",
  },
  scroll_view: {
    marginHorizontal: 12,
    marginVertical: 30,
  },
  text: {
    color: Colors.light,
    fontSize: 30,
    marginHorizontal: 15,
    marginBottom: 35,
    textAlign: "center",
  },
  input_container: {
    width: "80%",
    alignItems: "center",
    backgroundColor: Colors.navyblue,
    borderRadius: 25,
  },
  button_container: {
    marginHorizontal: "25%",
    marginVertical: "20%",
  },
});
