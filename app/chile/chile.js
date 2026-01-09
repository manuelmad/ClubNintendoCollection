import { Link } from "expo-router";
import { StyleSheet, Text, View } from 'react-native';

export default function VenezuelaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Colección Chile</Text>
      <Text style={styles.text}>(Próximamente)</Text>
      <Link style={styles.link} href="/">Volver al Inicio</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  link:{
    marginTop: 20,
    color: '#1e90ff',
    fontSize: 18,
  }
});
