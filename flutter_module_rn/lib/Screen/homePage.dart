import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'book/addPage.dart';
import 'book/listPage.dart';

class MyHomePage extends StatefulWidget {
  MyHomePage({
    Key? key,
  }) : super(key: key);

  final String title = 'Flutter Demo';

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  static const platform = MethodChannel('pavel/flutter');

  String _nameModule = "";
  String _messageStorage = "";
  final myController = TextEditingController();

  Future<void> _teste() async {
    //await _setStorage('flutter', 'TESTE shared preference Flutter');
    await _getStorage('flutter');
  }

  Future<void> _setStorage(String key, String value) async {
    print('_setStorage');
    final prefs = await SharedPreferences.getInstance();
    prefs.setString(key, value);
  }

  Future<void> _getStorage(String key) async {
    print('_getStorage');
    final prefs = await SharedPreferences.getInstance();
    String? message = prefs.getString(key);
    if (message == null) {
      return;
    }
    print(message);
    setState(() {
      _messageStorage = message;
    });
  }

  void _openModule(String nameModule) {
    switch (nameModule) {
      case 'ADD':
        _openAddBook();
        break;
      case 'LIST':
        _openListBook();
        break;
      default:
    }
  }

  void _callback(String value) {
    platform.invokeMethod('callBack', {'data': value});
  }

  void _closeSystem() {
    platform.invokeMethod('closeFlutterScreen');
    SystemNavigator.pop();
  }

  void _openAddBook() {
    _callback("Open add book");
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => AddBookPage()),
    );
  }

  void _openListBook() {
    _callback("Open list book");
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => ListBookPage()),
    );
  }

  @override
  void initState() {
    platform.setMethodCallHandler((call) async {
      if (call.method == 'setModule') {
        setState(() {
          _nameModule = call.arguments as String;
        });
        WidgetsBinding.instance
            .addPostFrameCallback((timeStamp) => _openModule(_nameModule));
      }
    });
    _teste();
    super.initState();
  }

  @override
  void dispose() {
    myController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.black),
          onPressed: () => _closeSystem(),
        ),
      ),
      body: Center(
          child: ListView(
        children: <Widget>[
          Text(_messageStorage),
          ElevatedButton(
            child: const Text("ADD BOOK"),
            onPressed: () => _openAddBook(),
          ),
          ElevatedButton(
            child: const Text("LIST BOOK"),
            onPressed: () => _openListBook(),
          ),
        ],
      )),
    );
  }
}
