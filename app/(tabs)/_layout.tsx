import React from 'react';
import { Tabs } from 'expo-router';
import TabBar from '@/components/TabBar';
import { CartProvider } from '@/components/productContext';

const _layout = () => {
  return (
    <CartProvider>
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Products',
            headerStyle: { backgroundColor: '#000' },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Cart',
            headerStyle: { backgroundColor: '#000' },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
      </Tabs>
    </CartProvider>
  );
};

export default _layout;
