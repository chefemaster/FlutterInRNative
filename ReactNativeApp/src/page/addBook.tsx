/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getDBConnection, getBooks, saveBook } from '../database';
const Colors = {
  white: '#fff',
  black: '#000',
  light: '#ddd',
  dark: '#333',
  lighter: '#eee',
  darker: '#111',
};
const styles = StyleSheet.create({
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
  backgroundStyle: {
    backgroundColor: Colors.lighter,
    flex: 1,
  },
  textTitle:{
    alignSelf: 'center',
    marginTop: 10,
   },
});
import RootStackParamList from '../components/rootStackParamList';

export default function AddBookScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'AddBook'>) {
  const [newBook, setNewBook] = useState('');
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
      navigation.pop();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.backgroundStyle}>
      <View style={styles.textTitle}>
        <Text>ADD BOOK</Text>
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
    </View>
  );
}
