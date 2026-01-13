import { Stack } from "expo-router";

export default function RootLayout() {
   return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'ClubNintendoCollection' }}/>

      <Stack.Screen name="mexico/mexico" options={{ title: 'México' }} />
      <Stack.Screen name="venezuela/venezuela" options={{ title: 'Venezuela' }} />
      <Stack.Screen name="colombia/colombia" options={{ title: 'Colombia' }} />
      <Stack.Screen name="chile/chile" options={{ title: 'Chile' }} />
      <Stack.Screen name="argentina/argentina" options={{ title: 'Argentina' }} />
      <Stack.Screen name="central-america/central-america" options={{ title: 'Centroamérica' }} />

      <Stack.Screen name="mexico/covers/covers" options={{ title: 'Revistas México' }} />
      <Stack.Screen name="venezuela/covers/covers" options={{ title: 'Revistas Venezuela' }} />
      <Stack.Screen name="colombia/covers/covers" options={{ title: 'Revistas Colombia' }} />
      <Stack.Screen name="chile/covers/covers" options={{ title: 'Revistas Chile' }} />
      <Stack.Screen name="argentina/covers/covers" options={{ title: 'Revistas Argentina' }} />
      <Stack.Screen name="central-america/covers/covers" options={{ title: 'Revistas Centroamérica' }} />
    </Stack>
  );
}
