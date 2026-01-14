import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

// Asegúrate de que los nombres de archivo coincidan con los que tienes en assets/images/flags
const flags = [
  { image: require("@/assets/images/flags/mexico.png"), route: "/mexico/mexico", name: "México" },
  { image: require("@/assets/images/flags/venezuela.webp"), route: "/venezuela/venezuela", name: "Venezuela" },
  { image: require("@/assets/images/flags/colombia.webp"), route: "/colombia/colombia", name: "Colombia" },
  { image: require("@/assets/images/flags/chile.png"), route: "/chile/chile", name: "Chile" },
  { image: require("@/assets/images/flags/argentina.png"), route: "/argentina/argentina", name: "Argentina" },
  { image: require("@/assets/images/flags/central-america-map.png"), route: "/central-america/central-america", name: "Centroamérica" },
];

export default function Index() {
  return (
    <View  style={styles.container}>
      <Image style={styles.titleLogo} source={require("@/assets/images/titleLogo.png")}></Image>

      <View style={styles.grid}>
        {flags.map((flag, index) => (

          <Link key={index} href={flag.route} asChild>
            <Pressable style={styles.card}>
              <Image source={flag.image} style={styles.image} resizeMode="contain" />
              <Text style={styles.flagName}>{flag.name}</Text>
            </Pressable>
            
          </Link>

        ))}
      </View>
      <Text style={styles.credits}>Diseño y Desarrollo por:</Text>
      <Text style={styles.developer}>Manuel Araujo</Text>
      <Text style={styles.group}>Datos e imágenes por:</Text>
      <Text style={styles.developer}>ScanClubNintendo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#181c23",
  },
  titleLogo: {
    position: "absolute",
    top: -90,
    width: "50%",
    height: "50%",
    resizeMode: "contain",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
    maxWidth: 300, // Restringe el ancho para forzar 2 columnas (aprox 120*2 + gap)
    marginTop: 120,
  },
  card: {
    width: 120,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#292e38",
    borderRadius: 10,
  },
  image: {
    width: "60%",
    height: "60%",
    borderRadius: 10,
  },
  flagName: {
    color: "#rgb(164, 163, 163)",
    padding: 4,
  },
  credits: {
    color: "#rgb(164, 163, 163)",
    marginTop: 40,
    fontSize: 12,
    textAlign: "center",
  },
    developer: {
    color: "#0460cf",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
  },
    group: {
    color: "#rgb(164, 163, 163)",
    fontSize: 12,
    textAlign: "center",
  }
});
