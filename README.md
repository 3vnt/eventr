# Eventr
  Eventr is a web app that makes planning events a breeze. Scheduling, voting, payments, and notifying friends are as easy as entering the right information; the app will handle the rest for you. Being a participant is just as easy with the app being a one stop shop to vote for events, submit payments, and communicate about events.
  
##Technology Stack

  - Front-End - Angular 1.5
  - Server - Node/Express
  - Database - MySQL
  - Overlay on Server - Socket (for simultaneous users)
  Socket.io enables real-time bidirectional event-based communication. It is useful for things like chat clients and simultaneous collaboration.

##Features Completed
  - Create an Event
  - Event Polling
  - Voting Functionality
  - Notification Broadcasts
  - Authentication with Tokens

##Features Pending
  - Chat Client
  - Payments Handling
  - Email & Calendar Hookup
  - Deployment
  - Test Suite
  - Encryption & Salt for Passwords

##Install & Getting Started
  1. Fork the repo
  2. bower install
  3. npm install
  4. mysql.server start
  5. mysql -u root < server/database/3vnt_mysql_create.sql
  6. npm start
  7. open localhost:8000 on browser

##Database Design & Schema
  ![](https://trello-attachments.s3.amazonaws.com/5706910238f37c2e5163dbaa/1139x828/0ebbaa4ad46092d3948c668ce2c8c1ca/upload_4_7_2016_at_3_28_00_PM.png)

##Bugs
  - minor MySQL error where SELECT queries only pull one row of data
  - random redirects

##Team
  - Scrum Master - Thomas Ingalls
  - Product Manager - Genevieve Sublette
  - Team Member - Jonathen Chen
  - Team Member - Haoming Huang
