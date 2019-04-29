const mongoose = require("mongoose");
const express = require("express");
var session = require("express-session");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
const User = require("./models/user");
const Video = require("./models/video");
const Specialty = require("./models/specialty");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const withAuth = require('./middleware');
require("dotenv").config();


const secret = "yambletPrueba";
// process.env.PORT deja que Heroku decida el puerto manualmente
const API_PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(cookieParser());

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
app.use(session({
    secret: 'pruebaYamblet',
    resave: true,
    saveUninitialized: false,
}));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});



// Para la creación de un nuevo usuario
app.post("/api/createUser", (req, res) =>{
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
                console.log(err);
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

app.post("/api/loginUser", (req, res) =>{
    const {license, password} = req.body;

    if (license &&
        password) {
        User.authenticate(license, password, function(error, user){
            if(error || !user){
                res.status(401).send({success: false, message: 'Licencia o contraseña incorrecta'});
            } else {
                const payload = {license};

                const token = jwt.sign(payload, secret, {
                    expiresIn: '1h'
                });
                res.cookie('token', token, {httpOnly: true}).sendStatus(200);
            }
        })
    }
});


app.get('/api/getSpecialties', function(req, res) {
    Specialty.find((err, specialties) => {
        if (err) res.json({ success: false, error: err });
        res.json({ success: true, specialties: specialties });
    });
});

app.get('/api/checkToken', withAuth, function(req, res) {
    res.status(200).json({license: req.license});
});

app.get('/api/getSpecialtyWithLicense', withAuth, function(req,res) {
    let license = parseInt(req.query.license);
    User.findOne({license: license}, 'specialty', (err, user) => res.json({specialty: user.specialty}));
});

app.get("/api/get/videos", withAuth, (req, res) => {
    const category = req.query.category;
    Video.find({category: category}, (err, data) => {
        if (err) res.json({ success: false, error: err });
        res.json({ success: true, videos: data });
    });
});

app.get("/api/getVideo", withAuth, (req, res) => {
    const videoId = req.query.videoId;
    Video.findById(videoId, (err, data) => {
        if (err) res.json({ success: false, error: err });
        res.json({ success: true, video: data });
    });
});

// para usar node.js como router a react
app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});



// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));