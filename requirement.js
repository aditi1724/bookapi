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
    - to get all books
    - to get specific books
    - to get a list of all books based on category
    - to get a list of all books based on author

 -POST
    - to add new book
 
 -PUT
    - to update book details
    - to update/add new author
 
 -DELETE
    - delete a book
    - delete an author from the book

AUTHORS
 -GET
   -to get all authors
   -to get specific authors
   -to get a list of all authors based on book
 
 -POST
   - to add new book
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
   - to add new publication

 -PUT
   -update publication details
   - to update /add new book

 -DELETE
   - delete a book from publications 
   - delete a publication
*/