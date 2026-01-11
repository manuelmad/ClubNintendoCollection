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
  { year_date: 2015, year_edit: 24},
  { year_date: 2016, year_edit: 25},
  { year_date: 2017, year_edit: 26},
  { year_date: 2018, year_edit: 27},
  { year_date: 2019, year_edit: 28}
]

const country = "Chile";

export default function ChileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Colección Chile</Text>
      <ScrollView>
        <View >
        <View style={styles.grid}>
            {years.map((year, index) => (
              <Link key={index} href={{ pathname: "/chile/covers/covers", params: { year: year.year_edit, country: country} }} asChild>
                <Pressable style={styles.card}>
                  <Text style={styles.text}>Año {year.year_edit}</Text>
                  <Text style={styles.text}>({year.year_date})</Text>
                </Pressable>
              </Link>
            ))}
            <Link href={{ pathname: "/chile/covers/covers",  params: {country: country} }} asChild>
                <Pressable style={styles.card}>
                  <Text style={styles.text}>Especiales</Text>
                </Pressable>
              </Link>
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
    backgroundColor: "#fe0000",
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
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

