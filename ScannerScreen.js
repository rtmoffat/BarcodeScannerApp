import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const ScannerScreen = ({ navigation }) => {
  const onSuccess = async (e) => {
    const barcodeData = e.data;
    // Simulate database lookup
    const product = await lookupProduct(barcodeData);
    Alert.alert(
      'Product Found',
      `Do you want to add ${product.name} to your collection?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Add', onPress: () => addProductToCollection(product) },
      ]
    );
  };

  const lookupProduct = async (barcode) => {
    // Replace this with an API call to fetch product info
    return { name: 'Sample Product', barcode: barcode };
  };

  const addProductToCollection = (product) => {
    // Store product in local storage (use SQLite, AsyncStorage, etc.)
    // Example: AsyncStorage.setItem(product.barcode, JSON.stringify(product))
  };

  return (
    <View style={{ flex: 1 }}>
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.auto}
        topContent={<Text>Scan the barcode to add an item</Text>}
      />
      <Button
        title="View My Collection"
        onPress={() => navigation.navigate('Collection')}
      />
    </View>
  );
};

export default ScannerScreen;
