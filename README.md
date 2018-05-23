## (Loc)als - Final Bootcamp Project

(Loc)als is an app that allows destinations (restaurants, museums, hiking trails, tourist areas, etc.) to post information in a profile about their business as a way to advertise to potential clients. Users are then able to create profiles in the app and validate which area they live in. User will then get a list of destinations' profiles near them and have the opportunity to compose a short "blog" about their interaction with the destination including a rating. Tourists can go on to search for cities and see different destination profiles with the ratings from the blogs from the users.

Our app will be useful because it will make planning for vacations fun and easy. It's common to feel lost both physically and culturally when visiting new countries, but our app will provide the users with information shared by locals. This will not only help our users to find the best attractions and sights to see, it'll also guide them to the hidden gems that are not as well known to tourists. Our app will also create a platform in which bloggers can write and share about places they love. They can also share helpful tips and information about different cultures and practices. Anybody looking to research a place they would like to vacation to will only have to visit our app and find everything they need without the hassle of having to look up everything separately.
APIs/Packages
Google Maps
Passportjs


## Project Structure
```
|-- server/
|  |-- server.js                            // The entry point for running the backend server locally, and main server for production
|  |-- passport/                    // Configuration files used to connect to different machines or set settings
|     |-- index.js                  // Overloads the passport object and defines serialize and deserialize
|     |-- localStrategy.js          // Defines a local strategy
|     |-- googleStrategy.js         // Defines google OAuth stratgey
|     ....
|  |-- db/                             
|     |-- index.js                  // Configures the connection to the database
|     |-- models/                   // represents data from our database, and defines schemas for each collection
|        |-- user.js                // Schema for the User collection
|        |-- business.js            // Schema for the Business collection
|        |-- blog.js                // Schema for the Blog collection
| -- src/                           // Entry for the React client side application
```
## Routes

A RESTful CRUD api was developed using Express-Restify-Mongoose @ (https://florianholzapfel.github.io/express-restify-mongoose/). 

To Create a user: do a `PUT` on route `/api/v1/User`
To Create a business: do a `PUT` on route `/api/v1/Business/:userId`
To Create a (blog) post: do a `PUT` on route `/api/v1/Blog/:businessId`

To Update a user: do a `PUT` on route `/api/v1/User/:user`
To Update a business: do a `PUT` on route `/api/v1/Business/:businessId`
To Update a (blog) post: do a `PUT` on route `/api/v1/Blog/:blogId`

To Remove a user: do a `DELETE` on route `/api/v1/User/:userId`
To Remove a business: do a `DELETE` on route `/api/v1/Business/:businessId`
To Remove a (blog) post: do a `DELETE` on route `/api/v1/Blog/:blogId`

To search for a business with the search input city: do a `GET` with route `api/v1/Business?query={"city":{"$regex":"^(Atl)"}}`
    **In this search the example, "Atl" as the search city parameter was used. 

For relationships the following should be set:

business.user (user is the user_Id)

blog.author
blog.business

Example of how to get a business associated with a user: 
```
    POST http://localhost:8080/api/v1/Business
        req.body (from client):
        '{"busName": "Acme, Inc.",
          "address": {"city": "Atlanta", "state": "GA", "zip": "30317"},
          // Associate the new business with the user w/ user._id = 5b04d016d6b44e148558c334
          "user": "5b04d016d6b44e148558c334" } `
```

Example get user's businesses:
`GET 'http://localhost:8080/api/v1/Business?query={"user": "5b04d016d6b44e148558c334"}' `
The idea is that you query for businesses that have a matching user field

## Note
* In order to set the google authentication up, you must register your app @ [https://console.developers.google.com](https://console.developers.google.com) & set `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` as environmental variables
* In development mode (i.e. `npm run dev`), OAuth google callback is not being proxied to the google servers. Therefore in order to test the google OAuth on your local machine do the following:
1) `npm run build`
2) `npm run prod`
