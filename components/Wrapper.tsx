import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import React from 'react';

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <ExpoStatusBar backgroundColor="rgba(0, 0, 0, 0.6)" translucent={false} />
      {children}
    </SafeAreaView>
  );
}
