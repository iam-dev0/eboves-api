import errorHandler from "errorhandler";
import app from "./app";
import config from "./config";
import httpStatus from "http-status";
/**
 * Error Handler. Provides full stack - remove for production
 */
if (process.env.NODE_ENV === "development") {
  // only use in development
  app.use(errorHandler({ log: true })); //Look into this one later
} else {
  app.use(
    errorHandler({
      log: (err, str, req, res) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
      },
    })
  );
}

/**
 * Start Express server.
 */
const server = app.listen(config.port, () => {
  console.log(
    " App is running at http://localhost:%d in %s mode",
    config.port,
    config.env
  );
  console.log(" Press CTRL-C to stop\n");
});

export default server;
