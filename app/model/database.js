// Connexion persistente à la base MongoDB
import { MongoClient } from "mongodb";

const DB_NAME = "ny";

// Déclaration de la connectionString
const CONNECTION_STRING = "mongodb://root:example@mongo:27017"; // Avec Docker
// const CONNECTION_STRING = 'mongodb://localhost:27017'; // Installation locale de MongoDB

// collection name
const COLLECTION_NAME = "restaurants";

// Initialise une connexion à la base MongoDB
const client = new MongoClient(CONNECTION_STRING);
let db;

export function openDatabase() {
  return client.connect().then(() => {
    db = client.db(DB_NAME);
    return db;
  });
}

export async function listOfRestaurants() {
  db = await client.db(DB_NAME);
  const restaurants = await db.collection(COLLECTION_NAME);

  const resto = await restaurants.distinct("");

  return resto;
}

export async function getRestaurantByName(name) {
  db = await client.db(DB_NAME);
  const restaurants = await db.collection(COLLECTION_NAME);

  const restos = await restaurants
    .find({ name: name }, { name: 1, cuisine: 1, address: 1 })
    .toArray();

  return restos;
}

export async function getRestaurantName() {
  db = await client.db(DB_NAME);
  const restaurants = await db.collection(COLLECTION_NAME);

  const restos = await restaurants.find({}, { name: 1 }).toArray();

  return restos;
}

export async function getBoroughs() {
  const db = await client.db(DB_NAME);
  const restaurants = await db.collection(COLLECTION_NAME);
  const boroughs = await restaurants.distinct("borough");

  return boroughs;
}

export async function getCuisines() {
  const db = await client.db(DB_NAME);
  const restaurants = await db.collection(COLLECTION_NAME);
  const cuisines = await restaurants.distinct("cuisine");

  return cuisines;
}

export async function getExploredRestaurant(borough, cuisine) {
  db = await client.db(DB_NAME);
  const restaurants = await db.collection(COLLECTION_NAME);

  const restos = await restaurants
    .find({ cuisine, borough }, { name: 1, cuisine: 1, address: 1 })
    .toArray();

  console.log(restos);
  return restos;
}
