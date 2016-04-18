# eventr
  Eventr is a web app that makes planning events a breeze. Scheduling, voting, payments, and notifying friends are easy as entering the right information and the app will handle the rest for you. Being a participant is just as easy with the app being a one stop shop for payments, voting for events, authentication and communication about events
  
##Technology Stack

  Databse - MySQL
  Server - Node/Express
  Overlay on Server - Socket (for simultaneous users)
  Front-End - Angular 1.5


##Features Completed
  - Create Event
  - Event Question and Choices Rendering
  - Voting functionality
  - Notifiation Broadcast
  - Auth with tokens
  

##Features Pending
  - chat client
  - payments page and handling payments
  - email & calendar hookup
  - deployment
  - test suite
  - Encryption & salt for passwords
  

##Install & Getting Started
  1. Fork the Repo
  2. Bower Install
  3. Npm Install
  4. mysql.server start
  5. mysql -u root < server/database/3vnt_mysql_create.sql
  6. npm start
  7. open localhost:8080 on browser

##Database Design & Schema
  

##Bugs
  - minor mysql error where SELECT queries only pull one row of data
  - random redirects

##Team
  Scrum Master - Thomas Ingalls
  Product Manager - Genevieve Sublette
  Team Member - Jonathen Chen
  Team Member - Haoming Huang


