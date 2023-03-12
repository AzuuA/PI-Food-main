const { Router } = require("express");
const { getUserHandler,postUserHandler,getUserIdHandler} = require("../handlers/usersHandler")
const routerUsers = Router();

routerUsers.get("/",getUserHandler);
routerUsers.get("/:idUser",getUserIdHandler);
routerUsers.post("/create",postUserHandler);

module.exports=routerUsers