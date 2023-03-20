const { Router } = require("express");
const {getRecipesHandler,getRecipesIdHandler}=require("../handlers/getRecipeHandler")
const getRecipesRoute = Router();

getRecipesRoute.get("/name",getRecipesHandler);
//getRecipesRoute.get("/:idRecipe",getRecipesIdHandler);
module.exports=getRecipesRoute