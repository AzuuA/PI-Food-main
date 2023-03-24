const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const getRecipesRoute = require("./getRecipes.js");
const getDietRoute = require("./getDiet.js");
const postRecipeRoute = require ("./postRecipe.js");
//const deleteRecipeRoute = require ("./deleteRecipe.js");
//const putRecipeRoute = require ("./putRecipes");

const router = Router();
const validate = (req,res,next)=>{
    const{title,steps,diets,summary}=req.body
    if(!title) return res.status(400).json({error:"Missing title"});
    if(!steps) return res.status(400).json({error:"Missing steps"});
    if(!diets) return res.status(400).json({error:"Missing diets"});
    if(!summary) return res.status(400).json({error:"Missing summary"});

    next()

}
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipe", getRecipesRoute);
router.use("/recipe",validate, postRecipeRoute);
router.use("/diet", getDietRoute);
//router.use("/recipe",deleteRecipeRoute);
//router.use("/recipe",putRecipeRoute);



module.exports = router;