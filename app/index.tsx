import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

// Asegúrate de que los nombres de archivo coincidan con los que tienes en assets/images/flags
const flags = [
  { image: require("@/assets/images/flags/mexico.png"), route: "/mexico/mexico" },
  { image: require("@/assets/images/flags/venezuela.webp"), route: "/venezuela/venezuela" },
  { image: require("@/assets/images/flags/colombia.webp"), route: "/colombia/colombia" },
  { image: require("@/assets/images/flags/chile.png"), route: "/chile/chile" },
  { image: require("@/assets/images/flags/argentina.png"), route: "/argentina/argentina" },
  { image: require("@/assets/images/flags/central-america-map.png"), route: "/central-america/central-america" },
];

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Colecciones</Text>
      <View style={styles.grid}>
        {flags.map((flag, index) => (
          <Link key={index} href={flag.route} asChild>
            <Pressable style={styles.card}>
              <Image source={flag.image} style={styles.image} resizeMode="contain" />
            </Pressable>
          </Link>
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
