# Locer Web App
An e-commerce platform for the **local marketplace**. We aim to *digitize* and *organize* the entire local market **improving reach, sales and modernize the process of buying and selling**. 

## Features for customers:
- [X] View all the shops and their products in your location right on your phone
- [X] Place order online without going out or making a call and save time
- [X] Get them delivered at your doorstep quickly and from trusted sellers near you
- [X] Automate your orders and analyse your spending so, that you can focus on what truly matters

## Features for sellers:
- [X] Add your inventory to the website easily and fast to start selling 
- [X] Increase customer reach in your area and thus, your sales and revenue
- [X] Automate your workflow so, that you can focus on what truly matters


# Development

## API link for development: 
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/9d43dcd9272c1d327a6c)

## [Click](https://locerappdemo.herokuapp.com) to view project progress.

## Technologies we're using:
* React-JS
* MongoDB
* Node.js

## Setting up locally:

* Clone the repo to your system
* Installing dependencies:
  * Run `npm i` at the root directory
  * Change directory to the client folder `cd client` and run `npm i` again.
* Mail to: <a href='mailto:satyamsundaram01@gmail.com'>satyamsundaram01@gmail.com</a> for environment variables to add in the root directory in a `.env` file.
* At the root level, run `npm run dev` to setup both `server` at **port 5000** and `client` at **port 3000**.
* If the above command throws error, try installing concurrently `npm i concurrently --save` and re-run `npm run dev` both at the root level.
* If none of the above method works, you can start the **server** with `npm run server` and **client** with `npm run client` both at the root level.

#### **Note**: You do not need to run `npm run build` at the client level to create a development build. You can directly deploy your changes with `git push heroku <branch>` and this code will automatically build and deploy for you. 
