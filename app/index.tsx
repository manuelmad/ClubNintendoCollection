import { Image, StyleSheet, Text, View } from "react-native";

// Asegúrate de que los nombres de archivo coincidan con los que tienes en assets/images/flags
const flags = [
  require("@/assets/images/flags/mexico.png"),
  require("@/assets/images/flags/venezuela.webp"),
  require("@/assets/images/flags/colombia.webp"),
  require("@/assets/images/flags/chile.png"),
  require("@/assets/images/flags/argentina.png"),
  require("@/assets/images/flags/central-america-map.png"),
];

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Colecciones</Text>
      <View style={styles.grid}>
        {flags.map((flag, index) => (
          <View key={index} style={styles.card}>
            <Image source={flag} style={styles.image} resizeMode="contain" />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
    maxWidth: 300, // Restringe el ancho para forzar 2 columnas (aprox 120*2 + gap)
  },
  card: {
    width: 120,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  image: {
    width: "80%",
    height: "80%",
  },
});
