class Book {
  final int id;
  final String title;

  Book({
    required this.id,
    required this.title,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'title': title,
    };
  }

  @override
  String toString() {
    return 'Dog {id: $id, title: $title}';
  }
}
