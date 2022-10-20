import {
  getRestaurantByName,
  getBoroughs,
  getCuisines,
  getExploredRestaurant,
} from "../model/database.js";

/**
 * Déclaration des controlleurs de l'app
 */

/**
 * GET /
 * Page d'accueil
 */
export async function getHome(req, res) {
  res.render("index");
}

/**
 * GET /
 * Page resto
 */
export async function getResto(req, res) {
  console.log("-----");

  await getRestaurantByName(req.query.name)
    .then((results) => res.render("restos", { results }))
    .catch((err) => console.log(err));
}

/**
 * GET /
 * Page Explore
 */
export async function getExplore(req, res) {
  console.log("-----");
  const { borough, cuisine } = req.query;
  const boroughs = await getBoroughs();
  const cuisines = await getCuisines();
  const results = [];

  if (borough != null && cuisine != null) {
    await getExploredRestaurant(borough, cuisine)
      .then((restos) => {
        res.render("explore", { results: restos, boroughs, cuisines });
      })
      .catch((err) => console.log(err));
  }
  res.render("explore", { boroughs, cuisines, results });
}
