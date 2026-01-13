import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const years = [
  { year_date: 1992, year_edit: 1 },
  { year_date: 1993, year_edit: 2 },
  { year_date: 1994, year_edit: 3},
  { year_date: 1995, year_edit: 4},
  { year_date: 1996, year_edit: 5 },
  { year_date: 1997, year_edit: 6 },
  { year_date: 1998, year_edit: 7 },
  { year_date: 1999, year_edit: 8 },
]

const country = "Colombia";

export default function ColombiaScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Colección Colombia</Text>
      <ScrollView>
        <View >
          <View style={styles.grid}>
            {years.map((year, index) => (
              <Link key={index} href={{ pathname: "/colombia/covers/covers", params: { year: year.year_edit, country: country} }} asChild>
                <Pressable style={styles.card}>
                  <Text style={styles.text}>Año {year.year_edit}</Text>
                  <Text style={styles.text}>({year.year_date})</Text>
                </Pressable>
              </Link>
            ))}
            <Link href={{ pathname: "/colombia/covers/covers",  params: {country: country} }} asChild>
                <Pressable style={styles.card}>
                  <Text style={styles.text}>Especiales</Text>
                </Pressable>
              </Link>
          </View>
          <View style={styles.note}>
            <Text style={styles.noteText}>NOTA: A partir del año 2000, la colección de Colombia tuvo distribución importada de las ediciones de otras zonas (México, Chile y Centroamérica).</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Link href="/" style={styles.link}>Volver al Inicio</Link>
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
    marginBottom: 30,
    color: "#9a9a03"
    // position: "fixed",
    // top: 0,
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
    borderColor: "#9a9a03"
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
