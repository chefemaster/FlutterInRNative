/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getDBConnection, getBooks } from '../database';
const Colors = {
  white: '#fff',
  black: '#000',
  light: '#ddd',
  dark: '#333',
  lighter: '#eee',
  darker: '#111',
};
const styles = StyleSheet.create({
  todoContainer: {
    marginTop: 10,
    paddingHorizontal: 24,
    backgroundColor: 'deepskyblue',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  todoTextContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '400',
  },
  backgroundStyle: {
    backgroundColor: Colors.lighter,
    flex: 1,
  },
});
import RootStackParamList from '../components/rootStackParamList';
import { Book } from '../models/book';

export default function ListBookScreen({}: NativeStackScreenProps<RootStackParamList, 'ListBook'>) {
  const [books, setBooks] = useState<Book[]>([]);
  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      const _books = await getBooks(db);
      setBooks(_books);
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);
  return (
    <View style={styles.backgroundStyle}>
      {books.map((book) => {
        return (
          <View style={styles.todoContainer}>
            <View style={styles.todoTextContainer}>
              <Text
                style={styles.sectionTitle}>
                {book.title}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
