import express from "express";
import compression from "compression"; // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import lusca from "lusca";
import cors from "cors";
import "./db/db";
import routes from "./routes/controllPanel.routes";
import websiteRoutes from "./routes/website.routes";
import path from "path";

// import passport from "passport";

// API keys and Passport configuration
// import * as passportConfig from "./util/passport";

// Create Express server
const app = express();

// Express configuration
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "config.secret",
  })
);
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

app.use(express.static("public"));

/**
 * API routes.
 */

app.use(routes);
app.use("/api", websiteRoutes);
export default app;
