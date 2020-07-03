import express from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import lusca from "lusca";
import cors from "cors";
import "./db/db";
import routes from "./routes";
// import config from "./config/config";
// import mongo from "connect-mongo";
// import path from "path";
// import mongoose from "mongoose";
// import passport from "passport";
// import bluebird from "bluebird";    // For mongoose promise replacement
// import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";

// const MongoStore = mongo(session);




// API keys and Passport configuration
// import * as passportConfig from "./util/passport";

// Create Express server
const app = express();

// // Connect to MongoDB
// const mongoUrl = MONGODB_URI;
// mongoose.Promise = bluebird;

// mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
//     () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
// ).catch(err => {
//     console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
//     // process.exit();
// });



// Express configuration
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "config.secret",
    // store: new MongoStore({
    //     url: mongoUrl,
    //     autoReconnect: true
    // })
}));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
// app.use((req, res, next) => {
//     res.locals.user = req.user;
//     next();
// });
// app.use((req, res, next) => {
//     // After successful login, redirect back to the intended page
//     if (!req.user &&
//     req.path !== "/login" &&
//     req.path !== "/signup" &&
//     !req.path.match(/^\/auth/) &&
//     !req.path.match(/\./)) {
//         req.session.returnTo = req.path;
//     } else if (req.user &&
//     req.path == "/account") {
//         req.session.returnTo = req.path;
//     }
//     next();
// });

// app.use(
//     express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
// );


/**
 * API routes.
 */

app.use(routes);

export default app;
