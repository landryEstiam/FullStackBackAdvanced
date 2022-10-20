"use strict";
import express from "express" 
import morgan from "morgan" 
import router from "./router/router.js"
import { openDatabase } from './model/database.js'
const app = express();
const port = 3002;

app.set("view engine", "pug");

// App middlewares
app.use(morgan("dev"));
app.use("/static", express.static("./static"));

// App routes
app.use("/", router);


// App initialisation

// Démarrage de l'application Node.js

openDatabase().then(e => {
  console.log('connected')
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
})