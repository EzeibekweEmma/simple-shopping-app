import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';

interface TabBarProps {
  state: TabNavigationState<ParamListBase>;
  descriptors: any;
  navigation: NavigationHelpers<ParamListBase, any>;
}

function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const icons: { [key: string]: (props: any) => JSX.Element } = {
    home: (props) => (
      <AntDesign name="home" size={20} color={'#fff'} {...props} />
    ),
    cart: (props) => (
      <AntDesign name="shoppingcart" size={20} color={'#fff'} {...props} />
    ),
  };

  return (
    <View className="flex-row py-2 absolute bottom-0 mx-10 mb-1 rounded-full bg-red-300/20">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (['_sitemap', '+not-found', 'index'].includes(route.name))
          return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 items-center"
          >
            {icons[route.name]({
              color: isFocused ? '#de5d5d' : '#fff',
            })}
            <Text style={{ color: isFocused ? '#de5d5d' : '#fff' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default TabBar;
