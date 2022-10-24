import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'Screen/homePage.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or press Run > Flutter Hot Reload in a Flutter IDE). Notice that the
        // counter didn't reset back to zero; the application is not restarted.
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(),
    );
  }
}

// class MyHomePage extends StatefulWidget {
//   const MyHomePage({
//     Key? key,
//     required this.title,
//     required this.bookDao,
//   }) : super(key: key);

//   final String title;
//   final BookDao bookDao;

//   @override
//   State<MyHomePage> createState() => _MyHomePageState();
// }

// class _MyHomePageState extends State<MyHomePage> {
//   static const platform = MethodChannel('pavel/flutter');

//   String _nameModule = "";

//   final myController = TextEditingController();
//   @override
//   void initState() {
//     platform.setMethodCallHandler((call) async {
//       if (call.method == 'setModule') {
//         setState(() {
//           _nameModule = call.arguments as String;
//         });
//       }
//     });

//     super.initState();
//   }

//   @override
//   void dispose() {
//     myController.dispose();
//     super.dispose();
//   }

//   void _callback() {
//     platform.invokeMethod('callBack', {'data': 'Callback'});
//   }

//   void _addBook(String title) async {
//     List<Book> _listBooks = await widget.bookDao.findAll();
//     int id = _listBooks.isNotEmpty ? _listBooks.last.id : 0;
//     Book _book = Book(id: id + 1, title: title);
//     widget.bookDao.save(_book);
//   }

//   void _showNames() async {
//     List<Book> listBook = await widget.bookDao.findAll();
//     String names = listBook.join(',');
//     print(names);
//     showDialog(
//         context: context,
//         builder: (context) {
//           return AlertDialog(
//             content: Text(names),
//           );
//         });
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: Text(widget.title),
//         leading: IconButton(
//           icon: const Icon(Icons.arrow_back, color: Colors.black),
//           onPressed: () {
//             platform.invokeMethod('closeFlutterScreen');
//             SystemNavigator.pop();
//           },
//         ),
//       ),
//       body: Padding(
//         padding: const EdgeInsets.all(16.0),
//         child: TextField(
//           controller: myController,
//         ),
//       ),
//       floatingActionButton: FloatingActionButton(
//         onPressed: () {
//           _addBook(myController.text);
//           _showNames();
//         },
//         tooltip: 'ADD BOOK',
//         child: const Icon(Icons.add),
//       ),
//     );
//   }
// }
