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
      type: DataTypes.STRING(80),
      allowNull: false, // require *
      validate: {        
        len: [6, 150]
      } 
    },

    image: {
      type: DataTypes.STRING,
      defaultValue: "https://i.postimg.cc/t4F6nM5b/324.png",
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
    }
  },
  { timestamps: false }
  );
};
