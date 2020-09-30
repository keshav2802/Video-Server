# Video Server

This is a web app made with React, Express and MongoDB in which a user can upload videos and at the same time other users can see them.

# Description

Every user needs to first sign up in the app to login into it. I have implemented user authentication. A user needs to first log in before uploading or seeing any videos. When we open the app, it shows options for login and signup. If we are already registered in the app we can directly login or else we need to signup first and then login. After a user logs in into the app the user is welcomed by the dashboard which has all the videos uploaded to the app till that moment. The user can also play the videos without downloading them. The app has drag and drop functionality with which we can just drag and drop a video inside the upload section of the app to upload it.

# Techs used

* React.js for frontend
* Node.js and Express.js for backend
* MongoDB as a database

# Steps to make the project:

I had divided the project into 7 parts:

1. Project initialization using npm and create-react-app.
2. Database connection using mongoose.
3. Sign in and Sign up using Express router
4. Video upload and thumbnail generation using multer and ffmpeg.
5. Token generation using JWT.
6. Fetching files from the server using axios.
7. Client side authentication using localStorage and Redirect components.

# How to start using this app

1. download the zip and extract it
2. cd Video-Server
3. cd server
4. sudo service mongod start
5. npm start
6. cd ../client
7. npm start
8. start exploring
