// ignore_for_file: unused_import

import 'package:flutter_module_rn/Shared/database.dart';
import 'package:flutter_module_rn/Shared/Models/Book.dart';
import 'package:sqflite/sqlite_api.dart';

class BookDao {
  static const String tableSql = 'CREATE TABLE $_tableName('
      '$_id INTEGER PRIMARY KEY, '
      '$_title TEXT)';

  static const String _tableName = 'Book';
  static const String _id = 'id';
  static const String _title = 'title';

  Future<int> save(Book book) async {
    final Database db = await getDatabase();
    Map<String, dynamic> inviteMap = book.toMap();
    return db.insert(
      _tableName,
      inviteMap,
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<int> delete(int id) async {
    final Database db = await getDatabase();
    return db.delete(
      _tableName,
      where: '$_id = ?',
      whereArgs: [id],
    );
  }

  Future<List<Book>> findAll() async {
    final Database db = await getDatabase();
    final List<Map<String, dynamic>> result =
        await db.query(_tableName, orderBy: _id);
    List<Book> contacts = _toList(result);
    return contacts;
  }

  List<Book> _toList(List<Map<String, dynamic>> result) {
    final List<Book> invites = List<Book>.empty(growable: true);
    for (Map<String, dynamic> row in result) {
      final Book book = Book(
        id: row[_id],
        title: row[_title],
      );
      invites.add(book);
    }
    return invites;
  }
}
