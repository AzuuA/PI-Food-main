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

    healthscore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {min: 0, max: 100}
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false

    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
    
    
  },
  { timestamps: false }
  );
};
