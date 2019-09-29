const moment = require("moment");

const dt = moment("2020/10/20 15:00", "YYYY-MM-DD HH:mm:ss").diff(moment());
console.log(dt);
