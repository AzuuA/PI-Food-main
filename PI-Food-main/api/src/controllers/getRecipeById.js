const {Recipe, TypeDiet} = require ("../db")
const axios = require("axios");
const { API_KEY } = process.env;


const getById = async (id, source) => {
    const recipe =
      source === "api"
        ? (await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`))
        .data
        
        : await Recipe.findByPk(id, {
            include: {
              model: TypeDiet,
              attributes: ["id", "name"],     
            },
            
          }
          )
          ;
          console.log(recipe); 
    return recipe;
  };



module.exports={getById}