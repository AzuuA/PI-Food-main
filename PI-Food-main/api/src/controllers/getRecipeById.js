const {Recipe, TypeDiet} = require ("../db")
const axios = require("axios");
const { API_KEY } = process.env;


const getById = async (id, source) => {
  let recipe;

  if (source === "api") {
    const apiRecipesResponse = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );

    const apiRecipe = apiRecipesResponse.data;

    recipe = {
      id: apiRecipe.id,
      title: apiRecipe.title,
      summary: apiRecipe.summary?.replace(/<[^>]*>?/gm, ""),
      healthscore: apiRecipe.healthScore,
      image: apiRecipe.image,
      steps: apiRecipe.analyzedInstructions?.[0]?.steps?.map(
        (step) => step.step
      ),
      TypeDiets: apiRecipe.diets,
      created: false,
    };
  } else {
    recipe = await Recipe.findByPk(id, {
      include: {
        model: TypeDiet,
        attributes: ["id", "name"],
      },
    });
  }

  console.log(recipe);
  return recipe;

  };



module.exports={getById}