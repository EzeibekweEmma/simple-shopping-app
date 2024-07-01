import { View, Text, Image, ActivityIndicator, Pressable } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

export default function Index() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    // Add more fonts if needed
  });

  // Image source
  const cartBG = require('@/assets/images/cartImage.jpg');
  const router = useRouter();

  if (!fontsLoaded) {
    // Show a loading spinner or some placeholder content while fonts are loading
    return <ActivityIndicator size="large" color="#ff0000" />;
  }

  return (
    <View className="flex-1 flex justify-end">
      <Image className="h-full w-full absolute" source={cartBG} />
      <View className="absolute bg-red-900/10 h-full w-full" />
      <Animated.View
        entering={FadeInDown.delay(300).springify()}
        className="items-center"
      >
        <Text className="text-white text-5xl py-2 font-[SpaceMono]">
          Ready To Start
        </Text>
        <Text className="text-5xl text-red-500 py-2 font-[SpaceMono]">
          Shopping
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInLeft.delay(500).springify()}>
        <Pressable
          className="bg-red-500 p-4 font-[SpaceMono] rounded-full border border-white mx-10 my-10 items-center"
          onPress={() => router.push('home')}
        >
          <Text className="text-white text-xl tracking-widest">
            Get Started
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
