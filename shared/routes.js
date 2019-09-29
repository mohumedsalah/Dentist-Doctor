const userRouter = require("../components/users/userRouter");
const reserveRouter = require("../components/reserve/reserveRouter");

module.exports = app => {
  app.use("/api/user", userRouter.router);
  app.use("/api/reservation", reserveRouter.router);
};
