/*
Requirements

books 
 - ISBN                  -string
 - Title                 -string
 -Author                 -[Number]
 - Language              -string
 - Publications          -Number
 - NumOfpages            -Number
 - Categories            -[string]

Authors
 - id         - Number
 - name       - String
 - books      - [String]

Publications
 - id         - Number
 - name       - String
 - books      - [String]

------APIs----------
BOOKS
 - GET
    - to get all books        ..........................  (D)
    - to get specific books   ..........................  (D)
    - to get a list of all books based on category  ....  (D)
    - to get a list of all books based on author 

 -POST
    - to add new book         ..........................  (D)
 
 -PUT
    - to update book details      ..........................  (D)
    - to update/add new author
 
 -DELETE
    - delete a book
    - delete an author from the book

AUTHORS
 -GET
   -to get all authors      ..........................  (D)
   -to get specific authors 
   -to get a list of all authors based on book
 
 -POST
   - to add new author     ..........................  (D)
   - to update /add new book
 
 -PUT
   -update author details

 -DELETE 
   - delete an author

PUBLICATIONS
 -GET
   -to get all publication  
   - to get specific publication
   -to get a list of all publication based on book

 -POST
   - to add new publication    ..........................  (D)

 -PUT
   -update publication details
   - to update /add new book

 -DELETE
   - delete a book from publications 
   - delete a publication
*/