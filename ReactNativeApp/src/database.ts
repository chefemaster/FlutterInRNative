/* eslint-disable prettier/prettier */

import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { Book } from './models/book';

enablePromise(true);
const tableName = 'Book';

export const getDBConnection = async () => {
  return openDatabase({ name: 'flutter.db', location: 'default' });
};
export const createTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}( id INTEGER PRIMARY KEY, title text );`;
  await db.executeSql(query);
};
export const getBooks = async (db: SQLiteDatabase): Promise<Book[]> =>{
    try {
        const todoItems: Book[] = [];
        const query = await db.executeSql(`SELECT id, title FROM ${tableName}`);

        query.forEach((results: { rows: { length: number; item: (arg0: number) => Book; }; }) => {
            for (let index = 0; index < results.rows.length; index++) {
                todoItems.push(results.rows.item(index));
            }
        });
        return todoItems;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get todoItems !!!');
    }
};
export const saveBook = async (db: SQLiteDatabase, book: Book) => {
    const insertQuery =
        `INSERT OR REPLACE INTO ${tableName}(id, title) values` +
        `(${book.id}, '${book.title}')`;
    return db.executeSql(insertQuery);
};
export const deleteBook = async (db: SQLiteDatabase, id: number) => {
    const deleteQuery = `DELETE from ${tableName} where id = ${id}`;
    await db.executeSql(deleteQuery);
};
export const dropTable = async (db: SQLiteDatabase) => {
    const query = `drop table ${tableName}`;
    await db.executeSql(query);
};