import { View, Text, Image, Pressable, FlatList } from 'react-native';
import React from 'react';
import Wrapper from '@/components/Wrapper';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import productData from '@/components/productData.json';

type productDataT = {
  id: number;
  name: string;
  price: number;
  image: string;
  isCart: boolean;
};

export default function Products() {
  const Card = ({ item }: { item: productDataT }) => (
    <View className="rounded-t-3xl rounded-b-md overflow-hidden w-44 bg-slate-600/30">
      <Image
        source={{
          uri: item.image,
        }}
        className="w-full h-48 object-center object-cover"
      />
      <View className="px-1 pb-1">
        <Text className="text-white text-lg mb-0.5" numberOfLines={1}>
          {item.name}
        </Text>
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center justify-center">
            <MaterialIcons name="attach-money" size={14} color="#fff" />
            <Text className="text-white">{item.price}</Text>
          </View>
          <Pressable
            className={`${
              item.isCart ? 'bg-red-500/30' : 'bg-red-500'
            } flex-row items-center justify-center space-x-1 py-1 px-2 rounded-md`}
          >
            <AntDesign name="shoppingcart" size={16} color={'#fff'} />
            <Text className="text-white text-lg">
              {item.isCart ? 'Remove' : 'Add to cart'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
  return (
    <Wrapper>
      <FlatList
        data={productData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListFooterComponent={<Text className="mb-12" />}
        renderItem={({ item }) => <Card item={item} />}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </Wrapper>
  );
}
