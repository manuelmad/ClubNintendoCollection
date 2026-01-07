import { Link } from "expo-router";
import { StyleSheet, Text, View } from 'react-native';

export default function ColombiaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Colombia screen</Text>
      <Link href="/">Volver al Inicio</Link>
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
  },
});
