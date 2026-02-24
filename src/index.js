const express = require("express");
const app = express();
// index.js is automatically imported no need to mention it here
const { ServerConfig, Logger } = require("./config");
const apiRoutes = require("./routes");
const { StatusCodes } = require("http-status-codes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// app.post("/api/v1/airplanes",(req,res)=>{
//     console.log(req.body);
//     res.status(StatusCodes.OK).json("body value printed");
// })
app.use("/api", apiRoutes);
app.listen(ServerConfig.PORT, async () => {
    console.log(
        `Successfully started the server on PORT : ${ServerConfig.PORT}`
    );

    /* const { City, Airport } = require("./models");

        You’re importing Sequelize models that are associated like this:
        City.hasMany(Airport, { foreignKey: "cityId" });
        Airport.belongsTo(City, { foreignKey: "cityId" });
        
        This creates association helper methods like:
            city.createAirport() - to create a new Airport associated with the City
            city.getAirports() - to retrieve all Airports associated with the City
            city.removeAirport(airport) - to disassociate an Airport from the City (sets cityId to null)

    */

    /* const bengaluru = await City.findByPk(2);
        console.log(bengaluru);
        This fetches a City record with primary key = 2.
        bengaluru is now a Sequelize instance representing that city
    */

    /* const airport = await Airport.create({
        name: "Kempegowda Airport", code: 'BLR', cityId: 1
    });
    Here you're manually creating an airport and assigning cityId.
    */

    /* const KMPAirport = await bengaluru.createAirport({ name: 'Kempegowda Airport', code: 'BLR' });
        console.log(KMPAirport);
        const HubliAirport = await bengaluru.createAirport({ name: 'Bengaluru International Airport', code: 'HBL' });

        Here you're using the association helper method createAirport to create a new Airport associated with the bengaluru city.
        
        const airportsInBlr = await bengaluru.getAirports();
        console.log(airportsInBlr);
        
        This works because of the hasMany relationship.
    */

    /*
    const hblAirport = await Airport.findByPk(3);
    console.log(hblAirport);
    await bengaluru.removeAirport(hblAirport);
        It does NOT delete the airport. It only removes the association.
        This Errors out as Airport.cityId cannot be null
        It tries to update cityId to null that gives error both on javascript level and database level.
    */
    // const city = await City.findByPk(5);
    // await city.createAirport({ name: 'Indore Airport', code: 'IND' })
    // await City.destroy({
    //     where: {
    //         id: 4
    //     }
    // })

    // Logger.info,Logger.error,Logger.warning
    Logger.info("Sucessfully started server", {});
});
