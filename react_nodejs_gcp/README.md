### crud webapp with react fe, nodejs be, deployed to gcp
how to create a crud web application with react frontend and nodejs backend, deployed to gcp

#### Prerequisites
Before we start, make sure you have the following:
- A Google Cloud Platform account.
- Node.js and NPM installed on your local machine.
#### Step 1: Create a new React app
1. Open a terminal and run the following command to create a new React app:
   ```
    npx create-react-app my-app
    cd my-app
    npm start
   ```
   This will open your app in your default web browser at http://localhost:3000/
#### Step 2: Create a Node.js backend
1. In the same directory as your React app, create a new directory for your Node.js backend:
   ```
   mkdir server
   cd server
   npm init -y
   npm install express body-parser cors dotenv mongoose --save
   ```
2. Create a new file called server.js in your server directory and add the following code:
   ```js
    const express = require("express");
    const bodyParser = require("body-parser");
    const cors = require("cors");
    const mongoose = require("mongoose");
    require("dotenv").config();
    
    const app = express();
    const port = process.env.PORT || 5000;
    
    app.use(cors());
    app.use(bodyParser.json());
    
    const uri = process.env.ATLAS_URI;
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    
    const connection = mongoose.connection;
    connection.once("open", () => {
      console.log("MongoDB database connection established successfully");
    });
    
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });   
   ```
   This sets up a basic Express server with a connection to a MongoDB database.
#### Step 3: Create a CRUD API
1. In the same server.js file, add the following code to create a CRUD API for your app:
   ```
    const productRouter = require("./routes/product");
    
    app.use("/product", productRouter);   
   ```
2. Create a new file called product.js in your routes directory and add the following code:
   ```js
    const router = require("express").Router();
    let Product = require("../models/product.model");
    
    router.route("/").get((req, res) => {
    Product.find()
      .then((products) => res.json(products))
      .catch((err) => res.status(400).json(`Error: ${err}`));
    });
    
    router.route("/:id").get((req, res) => {
      Product.findById(req.params.id)
        .then((product) => res.json(product))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    });
    
    router.route("/add").post((req, res) => {
      const name = req.body.name;
      const description = req.body.description;
      const price = Number(req.body.price);
    
      const newProduct = new Product({
        name,
        description,
        price,
      });
    
      newProduct
        .save()
        .then(() => res.json("Product added!"))
        .catch((err) => res.status(400).json(`Error: ${err}`));
      });
    
    router.route("/update/:id").post((req, res) => {
        Product.findById(req.params.id)
           .then((product) => {
             product.name = req.body.name;
             product.description = req.body.description;
             product.price = Number(req.body.price);
    
             product
               .save()
               .then(() => res.json("Product updated!"))
               .catch((err) => res.status(400).json(`Error: ${err}`));
           })
           .catch((err) => res.status(400).json(`Error: ${err}`));
    });
    
    router.route("/:id").delete((req, res) => {
      Product.findByIdAndDelete(req.params.id)
        .then(() => res.json("Product deleted."))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    });
    
    module.exports = router;   
   ```
    This code defines the REST API routes for the CRUD operations on our Product model. The routes are defined using the Express router, and they use Mongoose methods to interact with the MongoDB database.
####  Step 4: Create a MongoDB Atlas account
1. Go to https://www.mongodb.com/cloud/atlas and create an account or log in.
2. Once you're logged in, create a new cluster by clicking the "Build a Cluster" button.
3. Follow the instructions to create your cluster. Make sure to select a region and cluster tier that fit your needs.
#### Step 5: Connect your Node.js backend to your MongoDB Atlas cluster
1. In your MongoDB Atlas dashboard, click the "Connect" button for your cluster.
2. Follow the instructions to create a new MongoDB user and password.
3. Click "Choose a connection method" and select "Connect your application".
4. Copy the connection string.
5. In your server directory, create a new file called .env.
6. Add the following line to your .env file:
   ```
   ATLAS_URI=<your-mongodb-uri>
   ```
   Replace <your-mongodb-uri> with the connection string you copied from your MongoDB Atlas dashboard.
#### Step 6: Deploy your app to Google Cloud Platform
1. Go to https://cloud.google.com/ and create an account or log in.
2. Create a new project by clicking the "Select a project" dropdown in the top navigation bar and clicking "New Project".
3. Give your project a name and click "Create".
4. Install the Google Cloud SDK on your local machine.
5. Open a terminal and run the following command to initialize your project:
   ```
   gcloud init
   ```
   Follow the instructions to authenticate and set up your project. 
6. In your my-app directory, run the following command to build your React app:
   ```
   npm run build
   ```
7. In your server directory, create a new file called app.yaml.
8. Add the following code to your app.yaml file:
      ```yaml
      runtime: nodejs14

      env_variables:
        ATLAS_URI: <your-mongodb-uri>

      handlers:
        - url: /product.*
          script: auto

          - url: /(.*\.(js|css|png|jpg))$
            static_files: build/\1
            upload: build/.*\.(js|css|png|jpg)$

          - url: /.*
            static_files: build/index.html
            upload: build/index.html
      ```
9. Replace <your-mongodb-uri> with the connection string for your MongoDB Atlas cluster in the db.js file. This file is located in the backend/config folder. You can find the connection string by going to your MongoDB Atlas dashboard, selecting your cluster, clicking "Connect", and then choosing "Connect your application". Make sure to replace <password> with your actual password.
10. In the terminal, navigate to the backend folder and run the following command to start the Node.js server:
    ```
    npm start
    ```
11. Open a new terminal window and navigate to the frontend folder. Install the dependencies by running the following command:
    ```
    npm install
    npm start
    ```
12. Open a web browser and go to http://localhost:3000. You should see the React app running.
13. Test the CRUD functionality by adding, updating, and deleting products using the form on the website.
14. To deploy the app to GCP, first create a new project on the Google Cloud Console.
15. In the GCP Console, go to the App Engine section and create a new App Engine application.
16. In the terminal, navigate to the frontend folder and run the following command to build the React app for production:    
    ```
    npm run build
    ```
17. Copy the contents of the frontend/build folder to the backend/public folder.
18. In the terminal, navigate to the backend folder and run the following command to deploy the app to GCP:
    ```
    gcloud app deploy
    ```
19. Follow the prompts to select your project and App Engine application.
20. Wait for the deployment to finish. Once it's done, you can access the app at https://<your-project-id>.appspot.com.
21. That's it! You have now deployed a React app with a Node.js backend to GCP App Engine.

_fredrik (at) conva se_