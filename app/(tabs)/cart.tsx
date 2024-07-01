import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  Modal,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import Wrapper from '@/components/Wrapper';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import productData from '@/components/productData.json';

type productDataT = {
  id: number;
  name: string;
  price: number;
  image: string;
  isCart: boolean;
};

export default function Cart() {
  const [isCheckOut, setIsCheckOut] = useState(false);
  let total = 0;
  productData.map((item) => (item.isCart ? (total += item.price) : null));

  const Card = ({ item }: { item: productDataT }) => (
    <View className="rounded-3xl flex-row overflow-hidden w-full bg-slate-600/30 items-end justify-center">
      <Image
        source={{
          uri: item.image,
        }}
        className="flex-[0.4] h-48 object-center object-cover"
      />
      <View className="mb-2 flex-[0.5]">
        <Text className="text-white text-2xl mb-0.5" numberOfLines={1}>
          {item.name}
        </Text>
        <View className="flex-row mb-2 items-center">
          <MaterialIcons name="attach-money" size={18} color="#fff" />
          <Text className="text-white text-lg">{item.price}</Text>
        </View>
        <Pressable className="bg-red-500 flex-row items-center justify-center space-x-1 py-1 px-2 rounded-md">
          <AntDesign name="shoppingcart" size={16} color={'#fff'} />
          <Text className="text-white text-lg">Remove from cart</Text>
        </Pressable>
      </View>
    </View>
  );
  return (
    <Wrapper>
      <FlatList
        data={productData}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListFooterComponent={<Text className="mb-28" />}
        renderItem={({ item }) => <Card item={item} />}
      />
      <TouchableOpacity
        className="absolute right-5 bottom-20 bg-red-500 items-center justify-center py-1.5 px-3 rounded-full"
        onPress={() => setIsCheckOut(true)}
      >
        <Text className="text-white text-xl">CheckOut ${total}</Text>
      </TouchableOpacity>
      <Modal
        visible={isCheckOut}
        onRequestClose={() => setIsCheckOut(false)}
        animationType="slide"
        presentationStyle="formSheet"
      >
        <View className="h-full justify-center items-center">
          <AntDesign name="checkcircleo" size={200} color="#22c55e" />
          <Text className="text-5xl text-green-500">Successful</Text>
          <Pressable
            className="absolute top-5 right-5"
            onPress={() => setIsCheckOut(false)}
          >
            <FontAwesome name="times" size={40} color="black" />
          </Pressable>
        </View>
      </Modal>
    </Wrapper>
  );
}
