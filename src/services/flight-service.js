const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');
const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');


const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        if (error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query) {
    let customFilter = {};
    let sortFilter = [];

    // trips=MUM-DEL
    if (query.trips) {

        const [departureAirportId, arrivalAirportId] = query.trips.split("-");
        if (departureAirportId === arrivalAirportId) {
            throw new AppError("Departure and Arrival cannot be same", StatusCodes.BAD_REQUEST);
        }
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }
    if (query.price) {
        const [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minPrice, maxPrice || Number.MAX_SAFE_INTEGER]
        }
    }
    if (query.travellers) {
        customFilter.totalSeats = {
            [Op.gte]: Number(query.travellers)
        }
    }
    if (query.tripDate) {
        const start = new Date(query.tripDate);
        const end = new Date(query.tripDate + "T23:59:59");
        customFilter.departureTime = {
            [Op.between]: [start, end]
        }
    }
    if (query.sort) {
        //sort=price_ASC,duration_DESC
        const params = query.sort.split(',');
        const sortFilters = params.map((param) => param.split('_'));
        sortFilter = sortFilters
        //[
        // ['price', 'ASC'],
        // ['duration', 'DESC']
        //]
    }
    console.log(customFilter, sortFilter);
    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id) {
    try {
        const flight = await flightRepository.get(id);
        return flight;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The flight you requested is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of the flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateSeats(data) {
    try {
        const response = await flightRepository.updateRemainingSeats(data.flightId, data.seats, data.dec);
        return response;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot update data of the flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
}