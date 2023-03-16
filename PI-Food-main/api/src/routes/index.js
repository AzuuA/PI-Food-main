const { Router } = require('express');
const routerRecipes = require('./recipes');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const routerDiets = require('./diets');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
 router.use("/recipes",routerRecipes);
 router.use("/diets",routerDiets);

module.exports = router;
