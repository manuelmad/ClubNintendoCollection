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
    <View  style={styles.container}>
      <Image style={styles.backgroundImage} source={require("@/assets/images/background.png")}></Image>
      <View style={styles.titleContainer}>
        <Image style={styles.Mis} source={require("@/assets/images/Mis.png")}></Image>
        <Image style={styles.Colecciones} source={require("@/assets/images/Colecciones.png")}></Image>
      </View>

      {/* <Text style={styles.title}>Mis Colecciones</Text> */}
      <View style={styles.grid}>
        {flags.map((flag, index) => (
          <Link key={index} href={flag.route} asChild>
            <Pressable style={styles.card}>
              <Image source={flag.image} style={styles.image} resizeMode="contain" />
            </Pressable>
          </Link>
        ))}
      </View>
      <Text style={styles.credits}>Desarrollado por:</Text>
      <Text style={styles.developer}>Manuel Araujo</Text>
      <Text style={styles.group}>ScanClubNintendo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: -50,
    left: 0,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    opacity: 0.5,
  },
  titleContainer: {
    position: "absolute",
    top: 60,
    width: "100%",
    // height: 50,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Mis: {
    // position: "absolute",
    // top: 50,
    // left: 80,
    width: "25%",
    resizeMode: "contain",
  },
  Colecciones: {
    // position: "absolute",
    // top: 100,
    // left: 20,
    width: "80%",
    resizeMode: "contain",
  },
  // title: {
  //   fontSize: 30,
  //   color: "#fff",
  //   fontWeight: "bold",
  //   marginBottom: 30,
  // },
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
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  image: {
    width: "90%",
    height: "90%",
  },
  credits: {
    color: "#fff",
    marginTop: 40,
    fontSize: 16,
    textAlign: "center",
  },
    developer: {
    color: "#5c5b5bff",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
    group: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  }
});
