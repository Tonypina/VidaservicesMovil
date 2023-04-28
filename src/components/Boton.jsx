import { TouchableOpacity } from "react-native";
import { StyleSheet, Text } from "react-native";

const Boton = () => (
  <TouchableOpacity style={styles.boton}>
    <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
      Entrar
    </Text>
  </TouchableOpacity>
);
export default Boton;

const styles = StyleSheet.create({
  boton: {
    backgroundColor: "#284D95",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: 200,
    alignItems: "center",
    marginTop: 30,
  },
});