const { Router } = require("express");
const { getDietHandler,getDietIdHandler} = require("../handlers/dietsHandlers")
const routerDiets = Router();

routerDiets.get("/name",getDietHandler);
routerDiets.get("/:idRecipe",getDietIdHandler);
module.exports=routerDiets 