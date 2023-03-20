const {getAll, getName} =require ("../controllers/getRecipesControllers");
const {getById} = require ("../controllers/getRecipeById")

const getRecipesHandler = async (req, res) => {
    const { title } = req.query;
  
    const results = title ? await getName(title) : await getAll();
  
    res.status(200).json(results);
  };

  const getRecipesIdHandler = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api";
    try {
      const recipe = await getById(id, source);
      res.status(200).json(recipe);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  


module.exports={
    getRecipesHandler,
    getRecipesIdHandler
}