## LIBRARYWEB

## Description
Platform for a comunity of book readers that want to engage with other people that love reading too. Libraryweb allows the user to search a book from a Google's Book DB API ( by the way, thanks Google for your documentation) and check its details, such as title, authors, description. The user can add books, to his personal collections (Pending, Reading and Read), and manage the reading status of them. The user is also allowed to search other users by their names and check the books they have on their collections as their status.

## User stories
- 404 - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- 500 - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.
- login-signup - As a user I want to see a welcome page that gives me the option to either log in as an existing user, or sign up with a new account.
- homepage - As a user I want to have an overall view of the paltform funcionalities, go to my profile or find other users.
- book-search-results - As a user I want to search books by their title, their authors or by both. Also, to go back to the home page if I don't want to see that search anymore.
- book-details - As a user I want to see the description of the book found, and also add it to any of my collections.
- book-status - As a user I want to modify the reading status of any book, and move it automatically to the corresponding collection.
- book-delete - As a user I want to get a confirmation alert when removing a book from my collections to avoid deleting an item accidentally.
- profile-pic - As a user I want to add a profile picture that makes possible to identify me among other users with same username.
- delete-user - As a user I want to get a confirmation alert when deleting my profile account to avoid doing it accidentally.
- user-search - As a user I want to search other people and be able of have a look at their collections, and also the status of the books.

## Models
- BookModel new Schema ({apiISBN: String, title: String, ownerID: { type: mongoose.Schema.Types.ObjectId, ref: "User"}, status: {type: String, enum: ["Pending", "Reading", "Read"]}, review: String,})   
- UserModel new Schema({username: {type: String, required: true}, email: {type: String, unique: true, required: true}, password: {type: String, required: true}, profilePic: {type: String}}, {timestamps: true,});


## Backlog
- User profile
    * Add more fields to theuser profile, and give to the user the chance of modify them.

- Reviews
    * Offer to the users the chance of write a review to any book, and also read other users reviews.

- Rating
    A Offer the users the chance of rate any book and the the book ranking by the average of their rates.


## Links
### Trello
link here
### Git
link here
### Slides
link here





