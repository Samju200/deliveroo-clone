import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { urlFor } from "../client";
import {
  MinusCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
} from "../features/basketSlice";

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);
  const disptach = useDispatch();
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const addItemsToBasket = () => {
    disptach(addToBasket({ id, name, description, price, image }));
  };
  const removeItemsFromBasket = () => {
    if (!items.length > 0) return;
    disptach(removeFromBasket({ id }));
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white border p-4 border-gray-200 ${
          isPressed && "border-b-0"
        }`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400"> {description}</Text>
            <Text className="text-gray-400 mt-2">
              {price.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
              })}
            </Text>
          </View>
          <View>
            <Image
              styles={{ borderWidth: 1, borderColour: "#F3F3F4" }}
              source={{ uri: urlFor(image).url() }}
              className="h-20 w-20 bg-gray-300 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity onPress={removeItemsFromBasket}>
              <MinusCircleIcon
                size={40}
                color={items.length > 0 ? "#00CCBB" : "gray"}
              />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemsToBasket}>
              <PlusCircleIcon size={40} color="#00CCBB" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
