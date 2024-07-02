import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

export default function Index() {
  // Image source
  const cartBG = require('@/assets/images/cartImage.jpg');
  const router = useRouter();

  return (
    <View className="flex-1 flex justify-end">
      <Image className="h-full w-full absolute" source={cartBG} />
      <View className="absolute bg-green-900/10 h-full w-full" />
      <Animated.View
        entering={FadeInDown.delay(300).springify()}
        className="items-center"
      >
        <Text className="text-white text-5xl py-2">Ready To Start</Text>
        <Text className="text-5xl text-red-500 py-2">Shopping</Text>
      </Animated.View>

      <Animated.View entering={FadeInLeft.delay(500).springify()}>
        <Pressable
          className="bg-red-500 p-4 rounded-full border border-white mx-10 my-10 items-center"
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
