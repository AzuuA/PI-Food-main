const { Router } = require("express");
const {getRecipesHandler,getRecipesIdHandler}=require("../handlers/getRecipeHandler")
const getRecipesRoute = Router();

routerRecipes.get("/name",getRecipesHandler);
routerRecipes.get("/:idRecipe",getRecipesIdHandler);
module.exports=getRecipesRoute