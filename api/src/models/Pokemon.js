const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hp: {
      type: DataTypes.INTEGER
    },
    attack: {
      type: DataTypes.INTEGER
    },
    defense: {
      type: DataTypes.INTEGER
    },
    speed: {
      type: DataTypes.INTEGER
    },
    heigth: {
      type: DataTypes.FLOAT
    },
    weigth: {
      type: DataTypes.FLOAT
    },
    image: {
      type: DataTypes.STRING,
      // defaultValue: 'https://img2.freepng.es/20180415/jdw/kisspng-logo-silhouette-dog-bone-dog-5ad41d4b59e7d5.7560651515238505713683.jpg'
      validate: {
        isUrl: true
      }
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  },{
    timestamps: false
  });
};
