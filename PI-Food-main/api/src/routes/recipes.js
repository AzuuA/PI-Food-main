const { Router } = require("express");
const { getRecipesHandler,postRecipesHandler,putRecipesHandler,getRecipesIdHandler,deleteRecipesHandler } = require("../handlers/recipesHandlers");
const routerRecipes = Router();


routerRecipes.get("/name",getRecipesHandler);
routerRecipes.get("/:idRecipe",getRecipesIdHandler);
routerRecipes.post("/create",postRecipesHandler);
routerRecipes.put("/",putRecipesHandler);
routerRecipes.delete("/",deleteRecipesHandler)
module.exports=routerRecipes