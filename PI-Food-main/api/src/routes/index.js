const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const getRecipesRoute = require("./getRecipes.js");
const getDietRoute = require("./getDiet.js");
const postRecipeRoute = require ("./postRecipe.js");
//const deleteRecipeRoute = require ("./deleteRecipe.js");
//const putRecipeRoute = require ("./putRecipes");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipe", getRecipesRoute);
router.use("/recipe", postRecipeRoute);
router.use("/diet", getDietRoute);
//router.use("/recipe",deleteRecipeRoute);
//router.use("/recipe",putRecipeRoute);



module.exports = router;