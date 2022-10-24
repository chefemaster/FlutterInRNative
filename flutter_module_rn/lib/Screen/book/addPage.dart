import 'package:flutter/material.dart';
import 'package:flutter_module_rn/Shared/DAO/BookDao.dart';
import 'package:flutter_module_rn/Shared/Models/Book.dart';

class AddBookPage extends StatefulWidget {
  AddBookPage({
    Key? key,
  }) : super(key: key);

  final String title = 'ADD BOOK';
  final BookDao bookDao = BookDao();
  @override
  State<AddBookPage> createState() => _AddBookPageState();
}

class _AddBookPageState extends State<AddBookPage> {
  final myController = TextEditingController();
  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    myController.dispose();
    super.dispose();
  }

  void _addBook(String title) async {
    List<Book> _listBooks = await widget.bookDao.findAll();
    int id = _listBooks.isNotEmpty ? _listBooks.last.id : 0;
    Book _book = Book(id: id + 1, title: title);
    widget.bookDao.save(_book);
    Navigator.pop(context);
  }

  // void _showNames() async {
  //   List<Book> listBook = await widget.bookDao.findAll();
  //   String names = listBook.join(',');
  //   print(names);
  //   showDialog(
  //       context: context,
  //       builder: (context) {
  //         return AlertDialog(
  //           content: Text(names),
  //         );
  //       });
  // }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView(
          children: <Widget>[
            const Text("BOOK"),
            TextField(
              controller: myController,
            ),
            ElevatedButton(
              child: const Text("Save"),
              onPressed: () => {_addBook(myController.text)},
            )
          ],
        ),
      ),
    );
  }
}
