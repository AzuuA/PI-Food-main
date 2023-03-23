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

        const formattedDbRecipes = dbRecipes.map(recipe => {
          const typeDietNames = recipe.TypeDiets.map(typeDiet => typeDiet.name);
          return {
            ...recipe.toJSON(),
            TypeDiets: typeDietNames,
          };
        });
        const apiRecipesUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`;
        const apiRecipesResponse = await axios.get(apiRecipesUrl);
        const apiRecipes = apiRecipesResponse.data.results?.map((recipe) => {
          return {
            id: recipe.id,
            title: recipe.title,
            summary: recipe.summary?.replace(/<[^>]*>?/gm, ''),/* Sirve para que solo quede teto y no elementos HTML como por ejemplo <h1></h1>*/
            healthscore: recipe.healthScore,
            image: recipe.image,
            steps: recipe.analyzedInstructions?.[0]?.steps?.map((step) => step.step),
            /*El mapeo toma cada objeto "step" del arreglo y devuelve su propiedad "step", que es un texto que describe cada paso de la receta. Al final, devuelve un arreglo con todos los textos de los pasos de la receta en el primer conjunto de instrucciones analizadas*/
            TypeDiets: recipe.diets,
            created: false
          };
        });
    
        const allRecipes = [...formattedDbRecipes, ...apiRecipes];
    
        return allRecipes;
      } catch (error) {
        console.error(error);
        return error;
      } 
}


const getName = async (title) => {
  try {
    const allRecipes = await getAll();
    const filteredRecipes = allRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(title.toLowerCase())
    );
    if (filteredRecipes.length ===  0) {
      return "No se encontraron recetas con ese nombre.";
    }
    return filteredRecipes;
  } catch (error) {
    console.log(error);
    return "Hubo un error al buscar las recetas.";
  }
};




module.exports={getAll,getName}