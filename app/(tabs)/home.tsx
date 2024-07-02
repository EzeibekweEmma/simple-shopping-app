import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import Wrapper from '@/components/Wrapper';
import CartContext from '@/components/productContext';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import products from '@/components/productData.json';

type productDataT = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function Products() {
  const [productData, setProductData] = useState<productDataT[]>([]);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    setProductData(products);
  }, []);

  const handleAddToCart = (product: productDataT) => {
    const isInCart = cart.some(
      (cartItem: { id: number }) => cartItem.id === product.id
    );
    if (isInCart) removeFromCart(product.id);
    else addToCart(product);
  };

  const Card = ({ item }: { item: productDataT }) => {
    const isInCart = cart.some(
      (cartItem: { id: number }) => cartItem.id === item.id
    );

    return (
      <View className="rounded-t-3xl rounded-b-md overflow-hidden w-44 bg-slate-600/30">
        <Image
          source={{ uri: item.image }}
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
            <TouchableOpacity
              onPress={() => handleAddToCart(item)}
              className={`${
                isInCart ? 'bg-red-500/30' : 'bg-red-500'
              } flex-row items-center justify-center space-x-1 py-1 px-2 rounded-md`}
            >
              <AntDesign name="shoppingcart" size={16} color={'#fff'} />
              <Text className="text-white">
                {isInCart ? 'Remove' : 'Add to cart'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Wrapper>
      <FlatList
        data={productData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListEmptyComponent={
          <View className="h-full items-center justify-center">
            <Text className="text-3xl text-white">No items found</Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListFooterComponent={<Text className="mb-12" />}
        renderItem={({ item }) => <Card item={item} />}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </Wrapper>
  );
}
