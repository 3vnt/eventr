# eventr
  Eventr is a web app that makes planning events a breeze. Scheduling, voting, payments, and notifying friends are easy as entering the right information and the app will handle the rest for you. Being a participant is just as easy with the app being a one stop shop for payments, voting for events, and event communication.
  
##Technology Stack

  Database - MySQL
  Server - Node/Express
  Overlay on Server - Socket (for simultaneous users)
  Front-End - Angular 1.5


##Features Completed
  - Create an Event
  - Event Polling
  - Poll Results Rendering
  - Voting Functionality
  - Notification Broadcasts
  - Authentication with Tokens
  

##Features Pending
  - chat client
  - payments handling
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
  - Scrum Master - Thomas Ingalls
  - Product Manager - Genevieve Sublette
  - Team Member - Jonathen Chen
  - Team Member - Haoming Huang


