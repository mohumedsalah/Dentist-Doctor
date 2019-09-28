const moment = require("moment");

const dt = moment("2010/10/20 15:00", "YYYY-MM-DD HH:mm:ss");
const dayName = dt.format("HH").toLowerCase();
console.log(dayName);
