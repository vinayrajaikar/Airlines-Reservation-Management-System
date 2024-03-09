const express = require('express');
const mysql = require('mysql');
const app = express();
const PORT = 5000;
const cors= require('cors');
app.use(express.json());
app.use(cors())

// MySQL database connection configuration
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Vinay2663",
    database: "airlines"
});

// Connect to MySQL database
con.connect(function(error) {
    if (error) throw error;
    console.log("Connected to MySQL database");
});

// Define a route to fetch flights data from the database
app.get('/Allflights', (req, res) => {
    // const date=req.query.date;
    // Query flights data from the database
    // con.query(`SELECT * FROM flights WHERE date="2024-03-10"`, function(error, results, fields) {

    const sql = `SELECT * FROM flightss `;
    con.query(sql, function (error, results, fields) {

        if (error) {
            console.log(error);
            res.status(500).send("Error fetching flights data from the database");
        } else {
            // Send the flights data as JSON response
            console.log(results);
            res.json(results);
        }
    });
}); 

app.get('/flights', (req, res) => {
    const date=req.query.date;
    // Query flights data from the database
    // con.query(`SELECT * FROM flights WHERE date="2024-03-10"`, function(error, results, fields) {

    const sql = `SELECT * FROM flightss WHERE DATE(date)=?`;
    con.query(sql, [date], function (error, results, fields) {

        if (error) {
            console.log(error);
            res.status(500).send("Error fetching flights data from the database");
        } else {
            // Send the flights data as JSON response
            console.log(results);
            res.json(results);
        }
    });
}); 



// --------------------------------------------------------------------
app.get('/checkbooking', (req, res) => {
    const Code = req.query.Code;
    const Name=req.query.Name;

    const sql = `SELECT * FROM bookingss b, flightss f WHERE Code=? and Name=? and f.flight_no=b.flight_no`;
    con.query(sql, [Code,Name], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send("Error fetching booking data from the database");
        } else {
            console.log(results);
            res.json(results);
        }
    });
});

// ------------------------------------------------------------------

// app.post('/Booking', (req, res) => {
//     // const { flightNumber, source, destination, departureTime, arrivalTime, date } = req.body;

//     // Construct the SQL query to insert values into the database
//     // const sql = "INSERT INTO flights (flightNumber, source, destination, departureTime, arrivalTime, date) VALUES (?, ?, ?, ?, ?, ?)";
//     // const values = [flightNumber, source, destination, departureTime, arrivalTime, date];
//     const sql = "INSERT INTO booking values('2','spicejet233','2024-3-10','Mexico','London','Vins24')";
//     // Execute the query
//     // con.query(sql, values, function(error, results, fields) {
//         con.query(sql, function(error, results, fields) {
//         if (error) {
//             console.log(error);
//             res.status(500).send("Error inserting flight data into the database");
//         } else {
//             console.log("Flight data inserted successfully");
//             res.status(201).send("Flight data inserted successfully");
//         }
//     });
// });

// POST route to insert data into the booking table
// ---------------------------------------------------------------------------
// app.post('/booking', (req, res) => {
//     const {id, Flight_name, date, source, destination, code } = req.body;

//     // Construct the SQL query to insert values into the database
//     const sql = "INSERT INTO booking (id,Flight_name, date, source, destination, code) VALUES (?,?, ?, ?, ?, ?)";
//     const values = [id,Flight_name, date, source, destination, code];

//     // Execute the query
//     con.query(sql, values, function (error, results, fields) {
//         if (error) {
//             console.log(error);
//             res.status(500).send("Error inserting data into the booking table");
//         } else {
//             console.log("Data inserted successfully");
//             res.status(201).send("Data inserted successfully");
//         }
//     });
// });
// // -----------------------------------------------------------------------------


app.post('/bookingss', (req, res) => {
    const {Name, No_of_Members, source, destination, date, flight_no, Code } = req.body;

    // Construct the SQL query to insert values into the database
    const sql = "INSERT INTO bookingss (Name,No_of_Members,source, destination, Date, flight_no, Code) VALUES (?,?, ?, ?, ?, ?,?)";
    const values = [Name,No_of_Members,source, destination, date, flight_no, Code];

    // Execute the query
    con.query(sql, values, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send("Error inserting data into the booking table");
        } else {
            console.log("Data inserted successfully");
            res.status(201).send("Data inserted successfully");
            // res.status().send("Hurray!. Your Booking is Done SuccessFully")
        }
    });
});



// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
