const {Recipe,TypeDiet} = require ("../db")
const axios = require("axios");
const { API_KEY } = process.env

const getAll = async()=>{
    try {
        const dbRecipes = await Recipe.findAll({
          include: {
            model: TypeDiet,
            attributes: ['name'],
            through: {
              attributes: [],
            },
          },
        });

    
        const apiRecipesUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`;
        const apiRecipesResponse = await axios.get(apiRecipesUrl);
        const apiRecipes = apiRecipesResponse.data.results?.map((recipe) => {
          return {
            id: recipe.id,
            name: recipe.title,
            summary: recipe.summary?.replace(/<[^>]*>?/gm, ''),/* Sirve para que solo quede teto y no elementos HTML como por ejemplo <h1></h1>*/
            healthScore: recipe.healthScore,
            image: recipe.image,
            steps: recipe.analyzedInstructions?.[0]?.steps?.map((step) => step.step),
            /*la función de mapeo toma cada objeto "step" del arreglo y devuelve su propiedad "step", que es un texto que describe cada paso de la receta. Al final, devuelve un arreglo con todos los textos de los pasos de la receta en el primer conjunto de instrucciones analizadas*/
            diets: recipe.diets,
          };
        });
    
        const allRecipes = [...dbRecipes, ...apiRecipes];
    
        return allRecipes;
      } catch (error) {
        console.error(error);
        return error;
      }
}


const getName = async (name) => {
  try {
    const allRecipes = await getAll();
    const filteredRecipes = allRecipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(name.toLowerCase())
    );
    if (filteredRecipes.length === 0) {
      return "No se encontraron recetas con ese nombre.";
    }
    return filteredRecipes;
  } catch (error) {
    console.log(error);
    return "Hubo un error al buscar las recetas.";
  }
};




module.exports={getAll,getName}