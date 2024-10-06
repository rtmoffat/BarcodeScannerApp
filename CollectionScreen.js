import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CollectionScreen = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      // Retrieve items from storage
      const keys = await AsyncStorage.getAllKeys();
      const itemsArray = await AsyncStorage.multiGet(keys);
      setItems(itemsArray.map(item => JSON.parse(item[1])));
    };

    fetchItems();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>My Collection</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.barcode}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CollectionScreen;
