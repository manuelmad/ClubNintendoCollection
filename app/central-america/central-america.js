import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const years = [
  { year_date: 2000, year_edit: 9 },
  { year_date: 2001, year_edit: 10},
  { year_date: 2002, year_edit: 11},
  { year_date: 2003, year_edit: 12},
  { year_date: 2004, year_edit: 13},
  { year_date: 2005, year_edit: 14},
  { year_date: 2006, year_edit: 15},
  { year_date: 2007, year_edit: 16},
  { year_date: 2008, year_edit: 17},
  { year_date: 2009, year_edit: 18},
  { year_date: 2010, year_edit: 19},
  { year_date: 2011, year_edit: 20},
  { year_date: 2012, year_edit: 21},
  { year_date: 2013, year_edit: 22},
  { year_date: 2014, year_edit: 23},
  { year_date: 2015, year_edit: 24}
]

const country = "Centroamérica";

export default function CentralAmericaScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Colección Centroamérica</Text>
      <ScrollView>
        <View >
          <View style={styles.grid}>
            {years.map((year, index) => (
              <Link key={index} href={{ pathname: "/central-america/covers/covers", params: { year: year.year_edit, country: country} }} asChild>
                <Pressable style={styles.card}>
                  <Text style={styles.text}>Año {year.year_edit}</Text>
                  <Text style={styles.text}>({year.year_date})</Text>
                </Pressable>
              </Link>
            ))}
            {/* <Link href={{ pathname: "/central-america/covers/covers",  params: {country: country} }} asChild>
                <Pressable style={styles.card}>
                  <Text style={styles.text}>Especiales</Text>
                </Pressable>
              </Link> */}
          </View>
          <View style={styles.note}>
            <Text>NOTA: Desde 1992 hasta 1999, la colección de Centroamérica tuvo distribución compartida con Venezuela (o en su defecto Colombia).</Text>
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
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
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
    backgroundColor: "#2a00fe",
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
  note: {
    maxWidth: 300,
    marginTop: 20,
  },
  footer: {
    padding: 20,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  link: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});


