# Welcome to JWT Auth Demo!

This project is a demo of JWT auth using jsonwebtoken npm package. 
User can register, login and logout. 
User can go to protected route which shows user information only if he is authenticated and authorized.
This project uses cookie to transfer JWT

## Steps to install locally

Before installing npm modules and run the project, create '.env' file to the project with following entries: 

	-MONGO_DB_URI="add value"
	-JWT_SECRET="add value"
	-JWT_ALGORITHM="add value"
	-JWT_LIFE="add value"
	-PORT="add value" (optional, default is 5000)


Now, add following commands to the project:
>npm install &&
>npm install nodemon -D &&
>npm start

App runs on the port 5000 or else provide port value in .env file
