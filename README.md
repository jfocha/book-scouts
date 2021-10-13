# book-scouts
##  Description
This is an online library management app where users can rent books for a specific time .
This will have 2 interfaces.
	* User Inerface
	* Admin Interface
Users registered for this application can :
  - browse books from the library
	- filter them based on category, author, publcations etc..
	- Pay & Rent them for a specific duration
	- Like/Review them (Future Enchancement)
Admin of this application can:
  - List/manage books
  - Track rented books and thier availability
	- Send notifications via email to users once lease expires
This app combine all four technologies of the MERN stack (MongoDB, Express.js, React, and Node.js).

 <p align="left">
    <img src="https://img.shields.io/github/repo-size/deeparkrish/book-search-engine" />
    <img src="https://img.shields.io/github/issues/deeparkrish/book-search-engine" />
    <img src="https://img.shields.io/github/last-commit/deeparkrish/book-search-engine" >       
  </p>
  <p align="left"> 
     <img src="https://img.shields.io/github/languages/top/deeparkrish/book-search-engine"/>
    <img src="https://img.shields.io/badge/React.js-blue"  />
    <img src="https://img.shields.io/badge/-Node.js-green" />
    <img src="https://img.shields.io/badge/-Express-red" >
    <img src="https://img.shields.io/badge/-JWT-orange"/>
    <img src="https://img.shields.io/badge/-Concurrently-lightgreen"/>
    <img src="https://img.shields.io/badge/-Mongoose -pink"/>
    <img src="https://img.shields.io/badge/-ApolloServer-yellow"/>
     <img src="https://img.shields.io/badge/-jwtdecode-lightblue"/>
     <img src="https://img.shields.io/badge/-Graphql-purple"/>
</p>
   
   [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)<br />




## Table of Contents 
  * [Description](#description)
  * [Technologies](#technologies)
  * [License](#license)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Process](#process)
  * [MockUp](#mockup)
  * [Deployment](#deployment)
  * [Contribution](#contribution)
 
  
##  Technologies:
#### The MERN Stack
  * MongoDB - Document database - to store data as JSON
  * Express.js - Back-end web application framework running on top of Node.js
  * React - Front-end web app framework used
  * Node.js - JavaScript runtime environment
#### Middleware
 * JSON Web Token (JWT) authentication middleware
 * Mongoose - ODM for MongoDB
#### Others
 * GraphQL is a query language for APIs and a runtime for fulfilling queries with the existing data, giving clients the power to ask for exactly what they need    and nothing more. 
 * Apollo Server is an open-source, spec-compliant GraphQL server that's compatible with any GraphQL client, including Apollo Client, the client will use in      their MERN application. The apollo-server-express  is used package to integrate GraphQL into Express.js server, and the @apollo/client package to make requests from the React front end to the GraphQL API.
 * React Router is a collection of navigational components that compose declaratively with the application, allowing you to make a single-page React applications behave more like multi-page applications. 
 * Concurrently npm package allows you to run multiple processes, or servers, from a single command-line interface. Rather than opening multiple terminals to start the multiple servers, you can run them both at the same time. It also allows you to keep track of different outputs in one place, and will stop all of the processes if even one of them fails.
 * jwt-decode is an npm package that helps decode JWTs from their Base64Url encoding. You’ll use it to extract non-sensitive data such as the token’s expiration date to see if it’s expired before making a request to the server.
 * The faker is a npm package allows you to generate massive amounts of fake data in the development environment of  Node.js applications.
 * The nodemon package simplifies the development environment by automatically restarting Node.js applications when file changes in the directory are detected.


## License 
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)<br />
  This app is covered under MIT license.
  
## Installation 
   #### Server Side 
   From the project root, cd to "server" directory:
       
       npm i apollo-server-express graphql mongoose jsonwebtoken express bcrypt
       npm i -D nodemon
   
   Modify package.json:
   
       "start": "node server.js",
       "watch": "nodemon server.js"
         
   #### Client Side 
   From the project root, cd to "client" directory and 

        cd client
        create-react-app .
        cd ..
        
        npm i graphql-tag jwt-decode react-router-dom boostrap apollo-boost 
   Modify package.json in "scripts":
   
       "start": "react-scripts start",
       "build": "react-scripts build"
   #### Database 
   Create an account on MongoDB cloud Atlas, thereafter, creating a database on it and get your MongoURI exported from a file keys.js in a folder config.
   Modify server.js to get connected to the database, using the MongoURI and also add PORT data.

## Usage 
   #### Start Server 
   In "server" directory run :
       
       npm run watch
       
   #### Start Client 
   In "client" directory run :
       
       npm start
       
   #### App 
   To run client and server concurrently,go to the root directory of the project and  : 
   
      npm run develop
  

##  Process
To Accomplish our goal, We:

	- Integrated the Apollo Server GraphQL library to handle data requests to our API.
	- Built both query type definitions and resolvers for retrieving data from our MongoDB database.
	- Used the GraphQL Playground interface to thoroughly test our GraphQL queries.
	- Ran a back-end server to host our database and API, and we need a separate server for React development
	- The backend server uses Mongoose for all of its MongoDB data handling, but instead of connecting to the database right from server.js, 
	it's actually handling the connection in the config/connection.js file. From there, the mongoose.connection object is exported. 
	In server.js, we import that connection. Then when we run our server, we listen for that connection to be made with db.open(). 
	Upon a 	successfulconnection, we start the server.
	- handled user password hashing using the bcrypt library.
	- used The library Faker.js is used here to help generate dummy data for us to use. 
	On the Client side we ,
	- used React components to render a single page application 
	- used Apollo react hooks to render queries and mutations 
	-  Material UI  to style the pages 

## MockUp
   <img src ="https://github.com/jfocha/book-scouts/blob/main/client/src/assets/images/Screenshot1.png"> </img>
   <img src ="https://github.com/jfocha/book-scouts/blob/main/client/src/assets/images/Screenshot2.png"> </img>
   <img src ="https://github.com/jfocha/book-scouts/blob/main/client/src/assets/images/Screenshot3.png"> </img>
   <img src ="https://github.com/jfocha/book-scouts/blob/main/client/src/assets/images/Screenshot4.png"> </img>

 
## Deployment 
https://obscure-dusk-46095.herokuapp.com/

## Contribution 
By Deepa Krishnan, Joseph Focha, Richard Steavens and Sindhu Pillai  ©2021 All Rights Reserved.
