/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import SharedPreferences from 'react-native-shared-preferences';
import { createTable, getDBConnection } from './src/database';
import RootStackParamList from './src/components/rootStackParamList';
import AddBookScreen from './src/page/addBook';
import ListBookScreen from './src/page/listBook';
import FlutterScreenWrapper from './src/page/flutterScreenWrapper';

const Colors = {
  white: '#fff',
  black: '#000',
  light: '#ddd',
  dark: '#333',
  lighter: '#eee',
  darker: '#111',
};
const Stack = createNativeStackNavigator();
const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: Colors.lighter,
    flex: 1,
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '400',
  },
});

function HomeScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  const [shared, setShared] = useState<String>('');
  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);
      //configStoreData();
      saveStoreData('flutter', 'Teste de shared preferences');
      getStoreData('flutter', setShared);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);
  const configStoreData = () => {
    SharedPreferences.setName('@FlutterApp');
  };
  const saveStoreData = (key: string, value: string) => {
    try {
      SharedPreferences.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  };
  const getStoreData = (key: string, state: (arg0: string) => void) => {
    try {
      return SharedPreferences.getItem(key, value => {
        state(value as string);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const openAddBook = async () => {
    navigation.navigate({ name: 'AddBook', params: {} });
  };
  const openListBook = async () => {
    navigation.navigate({ name: 'ListBook', params: {} });
  };
  const openFlutter = async () => {
    navigation.navigate({
      name: 'Flutter',
      params: { startModuleValue: '' },
      merge: true,
    });
  };
  const openFlutterADD = async () => {
    navigation.navigate({
      name: 'Flutter',
      params: { startModuleValue: 'ADD' },
      merge: true,
    });
  };
  const openFlutterLIST = async () => {
    navigation.navigate({
      name: 'Flutter',
      params: { startModuleValue: 'LIST' },
      merge: true,
    });
  };
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}>
        <Text style={styles.sectionTitle}>Shared Preferences</Text>
        <Text>{shared}</Text>
        <View style={styles.line} />
        <Text style={styles.sectionTitle}>Callback</Text>
        <Text>{route.params ? route.params.data : ''}</Text>
        <View style={styles.line} />
        <Button title={'Start Flutter Screen'} onPress={openFlutter} />
        <Button title={'Start Flutter Screen ADD'} onPress={openFlutterADD} />
        <Button title={'Start Flutter Screen LIST'} onPress={openFlutterLIST} />
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginVertical: 10,
          }}
        />
        <Button
          title={'ADD BOOK'}
          onPress={openAddBook}
          accessibilityLabel="ADD BOOK"
        />
        <Button
          title={'LIST BOOK'}
          onPress={openListBook}
          accessibilityLabel="LIST BOOK"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddBook" component={AddBookScreen} />
        <Stack.Screen name="ListBook" component={ListBookScreen} />
        <Stack.Screen name="Flutter" component={FlutterScreenWrapper} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
