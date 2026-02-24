const { CityRepository } = require('../repositories');
const { StatusCodes } = require("http-status-codes")
const cityRepository = new CityRepository();
const AppError = require("../utils/errors/app-error.js")

async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        console.log(city);
        return city;
    } catch (error) {
        if (error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError") {
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create a new city object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function destroyCity(id) {
    try {
        const response = await cityRepository.destroy(id);
        return response;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND)
            throw new AppError(`The City with ID as ${id} to delete is not present`, StatusCodes.NOT_FOUND);
        throw new AppError(`Cannot fetch data of the City with ${id}`, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateCity(id, data) {
    try {
        const response = await cityRepository.update(id, data);
        console.log(response);
        return response;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND)
            throw new AppError(`The City with ID as ${id} to updated is not present`, StatusCodes.NOT_FOUND);
        throw new AppError(`Cannot fetch data of the City with ${id}`, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createCity, destroyCity, updateCity
}