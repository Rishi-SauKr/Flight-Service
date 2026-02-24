const CrudRepository = require('./crud-repository');
// When your app starts:
// Sequelize does the following automatically:
// Reads all files in /models
// For each file, calls the exported function with (sequelize, DataTypes)
// Gets the model class (e.g. Airplane)
// Stores it as db.Airplane
// Calls any associate() methods to set up relationships (like hasMany, belongsTo, etc.)
// Exports everything as a single db object which you can destructure like below.
const { Airplane } = require("../models");


class AirplaneRepository extends CrudRepository {
    constructor() {
        super(Airplane);
    }
}
module.exports = AirplaneRepository;