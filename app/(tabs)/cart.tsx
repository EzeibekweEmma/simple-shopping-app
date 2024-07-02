import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, { useContext, useState } from 'react';
import Wrapper from '@/components/Wrapper';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import CartContext from '@/components/productContext';

type productDataT = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function Cart() {
  const [isCheckOut, setIsCheckOut] = useState(false);
  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce(
    (acc: number, item: { price: any }) => acc + item.price,
    0
  );

  const Card = ({ item }: { item: productDataT }) => (
    <View className="rounded-3xl flex-row overflow-hidden w-full bg-slate-600/30 items-end justify-center">
      <Image
        source={{ uri: item.image }}
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
        <Pressable
          onPress={() => removeFromCart(item.id)}
          className="bg-red-500 flex-row items-center justify-center space-x-1 py-1 px-2 rounded-md"
        >
          <AntDesign name="shoppingcart" size={16} color={'#fff'} />
          <Text className="text-white text-lg">Remove from cart</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <Wrapper>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View className="h-full items-center justify-center">
            <Text className="text-3xl text-white">No items found</Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListFooterComponent={<Text className="mb-28" />}
        renderItem={({ item }) => <Card item={item} />}
      />
      <TouchableOpacity
        disabled={cart.length === 0}
        className={`${
          cart.length === 0 ? 'bg-red-200/40' : 'bg-red-500'
        } absolute right-5 bottom-20 items-center justify-center py-1.5 px-3 rounded-full`}
        onPress={() => setIsCheckOut(true)}
      >
        <Text className="text-white text-xl">CheckOut ${total.toFixed(2)}</Text>
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
