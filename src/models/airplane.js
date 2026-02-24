'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /* In Sequelize, associations should be defined on both models. Airplane - Flights, Airplane - Seats. This will allow us to easily query related data from either side of the association.
      Each flight and seat will store airplaneId as a foreign key
      If the airplane is deleted, delete all related flights and seats.
      */
      this.hasMany(models.Flight, {
        foreignKey: 'airplaneId',
        onDelete: 'CASCADE'
      });
      this.hasMany(models.Seat, {
        foreignKey: 'airplaneId',
        onDelete: 'CASCADE'
      });
    }
  }
  Airplane.init({
    modelNumber: {
      type: DataTypes.STRING,
      allowedNull: false,
      validate: {
        isAlphanumeric: true
      }
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowedNull: false,
      validate: {
        isNumeric: true,
        max: 1000
      }
    }
  }, {
    sequelize,
    modelName: 'Airplane',
  });
  return Airplane;
};