import { Stack } from "expo-router";

export default function RootLayout() {
   return (
    <Stack>
      <Stack.Screen name="inicio" options={{ title: 'Inicio' }} />
      <Stack.Screen name="mexico" options={{ title: 'México' }} />
      <Stack.Screen name="venezuela" options={{ title: 'Venezuela' }} />
      <Stack.Screen name="colombia" options={{ title: 'Colombia' }} />
      <Stack.Screen name="chile" options={{ title: 'Chile' }} />
      <Stack.Screen name="argentina" options={{ title: 'Argentina' }} />
      <Stack.Screen name="central-america" options={{ title: 'Centro América' }} />
    </Stack>
  );
}
