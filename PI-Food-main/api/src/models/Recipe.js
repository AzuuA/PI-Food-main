const {  DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
      id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {        
        len: [4, 150]
      } 
    },

    image: {
      type: DataTypes.STRING,
      defaultValue: "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg",
      validate: {isUrl: true}
    },

    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {min: 0, max: 100}
    },

    steps: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    diet:{
      type: DataTypes.STRING
    }
  },
  { timestamps: false }
  );
};
