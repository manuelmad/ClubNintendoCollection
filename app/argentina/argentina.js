import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { inventory } from "./inventory";

const years = [
  { year_date: 1992, year_edit: 1 },
  { year_date: 1993, year_edit: 2 },
  { year_date: 1994, year_edit: 3 },
  { year_date: 1995, year_edit: 4 },
  { year_date: 1996, year_edit: 5 },
  { year_date: 1997, year_edit: 6 },
  { year_date: 1998, year_edit: 7 },
  { year_date: 1999, year_edit: 8 },
];

const country = "Argentina";

export default function ArgentinaScreen() {
  const [data, setData] = useState(inventory);

  useEffect(() => {
    const loadData = async () => {
      // Esta línea la uso para limpiar la base de datos almacenada en AsyncStorage durante las pruebas
      //await AsyncStorage.removeItem('argentinaDB')
      const storedDb = await AsyncStorage.getItem("argentinaDB");
      if (storedDb) {
        setData(JSON.parse(storedDb));
      }
    };
    loadData();
  }, []);

  const totalItems = Array.isArray(data) ? data.length : 0;
  const ownedCount = Array.isArray(data)
    ? data.filter((item) => item.OWNED === "YES").length
    : 0;
  const ownedPct = totalItems ? (ownedCount / totalItems) * 100 : 0;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Colección Argentina</Text>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBarInner, { width: `${ownedPct}%` }]} />
        <Text style={styles.progressText}>
          {ownedCount}/{totalItems}
        </Text>
      </View>
      <ScrollView>
        <View>
          <View style={styles.grid}>
            {years.map((year, index) => (
              <Link
                key={index}
                href={{
                  pathname: "/argentina/covers/covers",
                  params: { year: year.year_edit, country: country },
                }}
                asChild
              >
                <Pressable style={styles.card}>
                  <Text style={styles.text}>Año {year.year_edit}</Text>
                  <Text style={styles.text}>({year.year_date})</Text>
                </Pressable>
              </Link>
            ))}
            <Link
              href={{
                pathname: "/argentina/covers/covers",
                params: { country: country },
              }}
              asChild
            >
              <Pressable style={styles.card}>
                <Text style={styles.text}>Especiales</Text>
              </Pressable>
            </Link>
          </View>
          <View style={styles.note}>
            <Text style={styles.noteText}>
              NOTA: A partir del año 2000, la colección de Argentina tuvo
              distribución importada de las ediciones de otras zonas (México,
              Chile y Centroamérica).
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Link href="/" style={styles.link}>
          Volver al Inicio
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#181c23",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    backgroundColor: "#2e6e70",
    borderRadius: 5,
    padding: 8,
    // position: "fixed",
    // top: 0,
  },
  progressContainer: {
    width: 250,
    height: 20,
    backgroundColor: "#292e38",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  progressBarInner: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#2e6e70",
    zIndex: 1,
  },
  progressText: {
    color: "#fff",
    fontWeight: "bold",
    zIndex: 2,
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
    backgroundColor: "#292e38",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#2e6e70",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  note: {
    maxWidth: 300,
    marginTop: 20,
  },
  noteText: {
    color: "#bab8b8",
  },
  footer: {
    padding: 20,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginTop: 20,
  },
  link: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
