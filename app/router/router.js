import express from "express";
import { getHome, getResto, getExplore } from "../controller/controller.js";
const router = new express.Router();

/**
 * Déclaration des routes de l'app
 */

router.get("/", getHome);
router.get("/restos", getResto);
router.get("/explore", getExplore);

// Exporte le routeur pour le fichier principal
export default router;
