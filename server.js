const mongoose = require("mongoose");
const express = require("express");
//var session = require("express-session");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./models/data");
const path = require("path");
const User = require("./models/user");
require("dotenv").config();


// process.env.PORT deja que Heroku decida el puerto manualmente
const API_PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb+srv://onerving:yZS*GGQYT8V5Au@careflix-myqzq.mongodb.net/test?retryWrites=true";

// connects our back end code with the database
mongoose.connect(
    dbRoute,
    { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// this is our get method
// this method fetches all available data in our database
router.get("/getData", (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
    const { id, update } = req.body;
    Data.findByIdAndUpdate(id, update, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
    const { id } = req.body;
    console.log(id);
    Data.findByIdAndDelete(id, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

// this is our create method
// this method adds new data in our database
router.post("/putData", (req, res) => {
    let data = new Data();

    const { id, message } = req.body;

    if ((!id && id !== 0) || !message) {
        return res.json({
            success: false,
            error: "INVALID INPUTS"
        });
    }
    data.message = message;
    data.id = id;
    data.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// Para la creación de un nuevo usuario
router.post("/createUser", (req, res) =>{
    if (req.body.license &&
        req.body.firstName &&
        req.body.lastName &&
        req.body.specialty &&
        req.body.password) {
        const userData = {
            license: req.body.license,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            specialty: req.body.specialty,
            password: req.body.password
        };
        //use schema.create to insert data into the db
        User.create(userData, function (err, user) {
            if (err) {
                // Verificamos que el usuario no esté ya en la base de datos.
                if (err.name === 'MongoError' && err.code === 11000){
                    return res.status(500).send({success: false, message: 'El usuario ya existe!'});
                }
                return res.status(500).send(err);
            }
            return res.json({ success: true });
        });
    }

});

// append /api for our http requests
app.use("/api", router);

// para usar node.js como router a react
app.use(express.static(path.join(__dirname, "client", "build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

/*
app.use(session({
    secret: 'shhh dont tell anyone',
    resave: true,
    saveUninitialized: false,
}));
 */

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));