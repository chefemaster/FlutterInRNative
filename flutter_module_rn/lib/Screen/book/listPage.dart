import 'package:flutter/material.dart';
import 'package:flutter_module_rn/Shared/DAO/BookDao.dart';
import 'package:flutter_module_rn/Shared/Models/Book.dart';

class ListBookPage extends StatefulWidget {
  ListBookPage({
    Key? key,
  }) : super(key: key);

  final String title = 'LIST BOOK';
  final BookDao bookDao = BookDao();
  @override
  State<ListBookPage> createState() => _ListBookPageState();
}

class _ListBookPageState extends State<ListBookPage> {
  Future<List<Book>> getBooks() => widget.bookDao.findAll();

  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(widget.title),
        ),
        body: FutureBuilder<List<Book>>(
          future: getBooks(),
          builder: (context, snapshot) {
            Widget children = const Text('');
            if (snapshot.hasData) {
              children = WidgetListBook(snapshot.data as List<Book>);
            }
            return children;
          },
        ));
  }

  ListView WidgetListBook(List<Book> snapshot) {
    return ListView.builder(
      itemCount: snapshot.length,
      itemBuilder: (context, index) {
        // ignore: unnecessary_new
        return new ListTile(
          title: Text(snapshot[index].title),
        );
      },
    );
  }
}
