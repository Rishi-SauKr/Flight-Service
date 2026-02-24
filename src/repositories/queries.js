// Row-level locks are released only when the transaction commits or rolls back, not after decrement(), increment(), findByPk(), the query execution, or when the function ends.
function addRowLockOnFlights(flightId) {
    return `SELECT * from Flights WHERE Flights.id = ${flightId} FOR UPDATE;`
}

module.exports = {
    addRowLockOnFlights
}