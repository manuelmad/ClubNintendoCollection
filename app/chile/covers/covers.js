import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import inventory from "../inventory";

// Cargar dinámicamente todas las imágenes .jpg dentro de la carpeta images
// Esto funciona gracias a Metro (el bundler de React Native/Expo)
const images = require.context("../images", true, /\.jpg$/);

export default function CoversScreen() {
  const { year } = useLocalSearchParams();
  const { country } = useLocalSearchParams();
  const [data, setData] = useState(inventory);

  useEffect(() => {
    const loadData = async () => {
      // Esta línea la uso para limpiar la base de datos almacenada en AsyncStorage durante las pruebas
      //await AsyncStorage.removeItem('chileDB')
      const storedDb = await AsyncStorage.getItem("chileDB");
      if (storedDb) {
        const parsed = JSON.parse(storedDb);

        try {
          // Corrige el error conocido: el número OVERALL NUMBER para
          // { "YEAR EDIT": 27, "YEAR NUMBER": 2 } estaba como "303"
          // y debe ser "304". Si se corrige, incrementamos en +1
          // el "OVERALL NUMBER" de todos los objetos posteriores
          if (Array.isArray(parsed)) {
            const idx = parsed.findIndex(
              (it) =>
                String(it["YEAR EDIT"]) === "27" &&
                String(it["YEAR NUMBER"]) === "2",
            );

            if (idx !== -1) {
              const current = parsed[idx]["OVERALL NUMBER"];
              if (String(current) === "303") {
                // actualizar el elemento encontrado
                parsed[idx] = { ...parsed[idx], ["OVERALL NUMBER"]: "304" };

                // desplazar los OVERALL NUMBER posteriores (solo si son numéricos)
                for (let i = idx + 1; i < parsed.length; i++) {
                  const val = parsed[i]["OVERALL NUMBER"];
                  const valStr = String(val);
                  if (/^\d+$/.test(valStr)) {
                    parsed[i] = {
                      ...parsed[i],
                      ["OVERALL NUMBER"]: String(Number(valStr) + 1),
                    };
                  }
                }

                // persistir la migración en AsyncStorage
                try {
                  await AsyncStorage.setItem("chileDB", JSON.stringify(parsed));
                } catch (e) {
                  console.warn(
                    "No se pudo sobrescribir chileDB tras migración Year 27:",
                    e,
                  );
                }
              }
            }
          } else if (parsed && typeof parsed === "object") {
            // Caso improbable: chileDB es un objeto único
            if (
              String(parsed["YEAR EDIT"]) === "27" &&
              String(parsed["YEAR NUMBER"]) === "2" &&
              String(parsed["OVERALL NUMBER"]) === "303"
            ) {
              parsed["OVERALL NUMBER"] = "304";
              try {
                await AsyncStorage.setItem("chileDB", JSON.stringify(parsed));
              } catch (e) {
                console.warn(
                  "No se pudo sobrescribir chileDB tras migración Year 27:",
                  e,
                );
              }
            }
          }

          // Nueva migración: el número OVERALL NUMBER para
          // { "YEAR EDIT": 19, "YEAR NUMBER": 1 } estaba como "208" (duplicado)
          // y debe ser "209". Si se corrige, incrementamos en +1
          // el "OVERALL NUMBER" de todos los objetos posteriores.
          // Esto además desplaza el error previo del Year 27 al número 304 correcto.
          if (Array.isArray(parsed)) {
            const idx = parsed.findIndex(
              (it) =>
                String(it["YEAR EDIT"]) === "19" &&
                String(it["YEAR NUMBER"]) === "1",
            );

            if (idx !== -1) {
              const current = parsed[idx]["OVERALL NUMBER"];
              if (String(current) === "208") {
                // actualizar el elemento encontrado
                parsed[idx] = { ...parsed[idx], ["OVERALL NUMBER"]: "209" };

                // desplazar los OVERALL NUMBER posteriores (solo si son numéricos)
                for (let i = idx + 1; i < parsed.length; i++) {
                  const val = parsed[i]["OVERALL NUMBER"];
                  const valStr = String(val);
                  if (/^\d+$/.test(valStr)) {
                    parsed[i] = {
                      ...parsed[i],
                      ["OVERALL NUMBER"]: String(Number(valStr) + 1),
                    };
                  }
                }

                // persistir la migración en AsyncStorage
                try {
                  await AsyncStorage.setItem("chileDB", JSON.stringify(parsed));
                } catch (e) {
                  console.warn(
                    "No se pudo sobrescribir chileDB tras migración Year 19:",
                    e,
                  );
                }
              }
            }
          } else if (parsed && typeof parsed === "object") {
            if (
              String(parsed["YEAR EDIT"]) === "19" &&
              String(parsed["YEAR NUMBER"]) === "1" &&
              String(parsed["OVERALL NUMBER"]) === "208"
            ) {
              parsed["OVERALL NUMBER"] = "209";
              try {
                await AsyncStorage.setItem("chileDB", JSON.stringify(parsed));
              } catch (e) {
                console.warn(
                  "No se pudo sobrescribir chileDB tras migración Year 19:",
                  e,
                );
              }
            }
          }
        } catch (e) {
          console.warn("Error aplicando migración a chileDB:", e);
        }

        setData(parsed);

      }
    };
    loadData();
  }, []);

  // Filtrar el inventario por el año seleccionado
  const filteredData = data.filter(
    (item) =>
      item["YEAR EDIT"] == year &&
      item["OVERALL NUMBER"] !== "SPECIAL" &&
      item["OVERALL NUMBER"] !== "SPECIAL2",
  );

  // Filtrar el inventario por especiales
  const specialsFilteredData = data.filter(
    (item) =>
      item["OVERALL NUMBER"] == "SPECIAL" ||
      item["OVERALL NUMBER"] == "SPECIAL2",
  );

  const renderItem = ({ item, index }) => {
    // Asumimos que las imágenes están enumeradas 1.jpg, 2.jpg... coincidiendo con el orden del inventario filtrado
    const imageNumber = index + 1;
    let imageSource = null;

    try {
      // Construimos la ruta relativa para require.context: ./year_edit/number.jpg
      // Nota: require.context usa rutas relativas desde este archivo
      const imagePath = `./${year}/${imageNumber}.jpg`;
      imageSource = images(imagePath);
    } catch (error) {
      console.log(`Imagen no encontrada: ${year}/${imageNumber}.jpg`);
    }

    return (
      <View
        style={[
          styles.card,
          item.OWNED === "NO"
            ? { borderColor: "#f0394d" }
            : { borderColor: "#006845" },
        ]}
      >
        {imageSource ? (
          <Image
            source={imageSource}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <View style={[styles.image, styles.placeholder]}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
        <Text style={styles.coverText} numberOfLines={2}>
          #{item["OVERALL NUMBER"]}
        </Text>
        <Text style={styles.coverText} numberOfLines={2}>
          Año {item["YEAR EDIT"]} No. {item["YEAR NUMBER"]}
        </Text>
        <Text style={styles.coverText} numberOfLines={2}>
          {item.MONTH}-{item["YEAR DATE"]}
        </Text>
        <Text style={styles.coverText} numberOfLines={4}>
          Poster:{" "}
          {item["POSTER THEME"] == "-" ? "No incluye" : item["POSTER THEME"]}
        </Text>
        <Pressable
          style={[
            styles.button,
            item.OWNED === "NO"
              ? { backgroundColor: "#f0394d" }
              : { backgroundColor: "#006845" },
          ]}
          onPress={async () => {
            const newData = data.map((el) => {
              if (el["OVERALL NUMBER"] === item["OVERALL NUMBER"]) {
                return { ...el, OWNED: el.OWNED === "NO" ? "YES" : "NO" };
              }

              return el;
            });
            setData(newData);
            await AsyncStorage.setItem("chileDB", JSON.stringify(newData));
          }}
        >
          <Text style={styles.buttonText}>
            {item.OWNED === "NO" ? "NO" : "SÍ"}
          </Text>
        </Pressable>
      </View>
    );
  };

  const renderSpecialItem = ({ item }) => {
    // Asumimos que las imágenes están enumeradas 1.jpg, 2.jpg... coincidiendo con el orden del inventario filtrado
    const imageNumber =
      item["OVERALL NUMBER"] == "SPECIAL" ? "SPECIAL" : "SPECIAL2";
    let imageSource = null;

    try {
      // Construimos la ruta relativa para require.context: ./year_edit/number.jpg
      // Nota: require.context usa rutas relativas desde este archivo
      const imagePath = `./${item["YEAR EDIT"]}/${imageNumber}.jpg`;
      imageSource = images(imagePath);
    } catch (error) {
      console.log(
        `Imagen no encontrada: ${item["YEAR EDIT"]}/${imageNumber}.jpg`,
      );
    }

    return (
      <View
        style={[
          styles.specialCard,
          item.OWNED === "NO"
            ? { borderColor: "#f0394d" }
            : { borderColor: "#006845" },
        ]}
      >
        {imageSource ? (
          <Image
            source={imageSource}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <View style={[styles.image, styles.placeholder]}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
        <Text style={styles.coverText} numberOfLines={2}>
          {item.MONTH}-{item["YEAR DATE"]}
        </Text>
        <Text style={styles.coverText} numberOfLines={4}>
          Poster:{" "}
          {item["POSTER THEME"] == "-" ? "No incluye" : item["POSTER THEME"]}
        </Text>
        <Pressable
          style={[
            styles.button,
            item.OWNED === "NO"
              ? { backgroundColor: "#f0394d" }
              : { backgroundColor: "#006845" },
          ]}
          onPress={async () => {
            const newData = data.map((el) => {
              if (el.COVER === item.COVER) {
                return { ...el, OWNED: el.OWNED === "NO" ? "YES" : "NO" };
              }

              return el;
            });
            setData(newData);
            await AsyncStorage.setItem("chileDB", JSON.stringify(newData));
          }}
        >
          <Text style={styles.buttonText}>
            {item.OWNED === "NO" ? "NO" : "SÍ"}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Revistas {year ? `Año ${year}` : "Especiales"} {country}
        </Text>
      </View>
      {year ? (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
        />
      ) : (
        <FlatList
          data={specialsFilteredData}
          renderItem={renderSpecialItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
        />
      )}

      <View style={styles.footer}>
        <Link href="/chile/chile" style={styles.link}>
          Volver a Años
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181c23",
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#cf2e2e",
    borderRadius: 5,
    padding: 8,
  },
  grid: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-around",
    marginBottom: 15,
  },
  card: {
    width: 160,
    height: 370,
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: "#292e38",
    borderRadius: 10,
    padding: 10,
    // elevation: 2, // Sombra en Android
    // shadowColor: "#f0394d", // Sombra en iOS
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
  },
  specialCard: {
    width: 160,
    height: 350,
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: "#292e38",
    borderRadius: 10,
    padding: 10,
    // elevation: 2, // Sombra en Android
    // shadowColor: "#000", // Sombra en iOS
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
  },
  image: {
    width: 140,
    height: 200,
    marginBottom: 10,
  },
  placeholder: {
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#888",
  },
  coverText: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "600",
    color: "#rgb(164, 163, 163)",
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
  button: {
    width: 140,
    height: 30,
    marginTop: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 3,
    position: "absolute",
    bottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
