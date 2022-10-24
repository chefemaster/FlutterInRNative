import 'package:flutter_module_rn/Shared/DAO/BookDao.dart';
import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';

//import 'dao/invite_dao.dart';

Future<Database> getDatabase() async {
  final String path = join(await getDatabasesPath(), 'flutter.db');
  return openDatabase(
    'flutter.db',
    onCreate: (db, version) {
      db.execute(BookDao.tableSql);
    },
    version: 1,
  );
}
