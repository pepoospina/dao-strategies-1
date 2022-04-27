require("dotenv").config();

console.log("ENV", process.env.PORT);

export const port = process.env.PORT || 3100;
