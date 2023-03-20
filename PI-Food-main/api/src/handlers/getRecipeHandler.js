const {getAll, getName} =require ("../controllers/getRecipesControllers");


const getRecipesHandler = async (req, res) => {
    const { title } = req.query;
  
    const results = title ? await getName(title) : await getAll();
  
    res.status(200).json(results);
  };



module.exports={
    getRecipesHandler,
    //getRecipesIdHandler
}