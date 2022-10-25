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
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { FlutterScreen } from 'flutter-module-rn';
import {
  createTable,
  getDBConnection,
  getBooks,
  saveBook,
} from './src/database';
const Colors = {
  white: '#fff',
  black: '#000',
  light: '#ddd',
  dark: '#333',
  lighter: '#eee',
  darker: '#111',
};

const Stack = createNativeStackNavigator();

type RootStackParamList = {
  Home: { data: string };
  Flutter: { startModuleValue: string };
};

function HomeScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  const [newBook, setNewBook] = useState('');
  const [startModuleValue] = useState<string>('ADD');
  const backgroundStyle = {
    backgroundColor: Colors.lighter,
    flex: 1,
  };
  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);
  const addBook = async () => {
    if (!newBook.trim()) {
      return;
    }
    try {
      const db = await getDBConnection();
      const _books = await getBooks(db);
      const newBooks = [
        ..._books,
        {
          id:
            (_books.length > 0
              ? _books.reduce((acc, cur) => {
                  return cur.id > acc.id ? cur : acc;
                }).id
              : 0) + 1,
          title: newBook,
        },
      ];
      const book = newBooks[newBooks.length - 1];
      console.log(newBooks);
      await saveBook(db, book);
      setNewBook('');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Button
          title={'Start Flutter Screen'}
          onPress={() =>
            navigation.navigate({
              name: 'Flutter',
              params: { startModuleValue },
              merge: true,
            })
          }
        />
        <View style={{ alignSelf: 'center', marginTop: 10 }}>
          <Text>ADD BOOK</Text>
          <Text>{route.params.data}</Text>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            value={newBook}
            onChangeText={text => setNewBook(text)}
          />
          <Button
            onPress={addBook}
            title="ADD BOOK"
            color="#841584"
            accessibilityLabel="ADD BOOK"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FlutterScreenWrapper({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'Flutter'>) {
  const [data, setData] = useState<string>('');
  const onCallback = (value: string) => {
    console.log(`onCallback: ${value}`);
    setData(value);
  };
  const onScreenClose = useCallback(() => {
    console.log(`onScreenClose: ${data}`);
    navigation.navigate({ name: 'Home', params: { data }, merge: true });
  }, [data, navigation]);
  return (
    <FlutterScreen
      startModuleValue={route.params.startModuleValue}
      onCallback={onCallback}
      onScreenClose={onScreenClose}
    />
  );
}

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ counter: 0 }}
        />
        <Stack.Screen
          name="Flutter"
          component={FlutterScreenWrapper}
          initialParams={{ initialCounterValue: 0 }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  appTitleView: {
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  appTitleText: {
    fontSize: 24,
    fontWeight: '800',
  },
  textInputContainer: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'flex-end',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    margin: 10,
    backgroundColor: 'pink',
  },
});

export default App;
