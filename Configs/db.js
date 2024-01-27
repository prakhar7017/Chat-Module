import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

var database = process.env.Dev_PG_DATABASE;
var username = process.env.Dev_PG_USERNAME;
var password = process.env.Dev_PG_PASSWORD;
var host = process.env.Dev_PG_HOST;
var port = process.env.Dev_PG_PORT;

if (process.env.NODE_ENV === "production") {
  database = process.env.PG_USERNAME;
  username = process.env.PG_USERNAME;
  password = process.env.PG_PASSWORD;
  host = process.env.PG_HOST;
  port = process.env.PG_PORT;
}

export const sequelize = new Sequelize(database, username, password, {
  logging: false,
  host,
  port,
  dialect: "postgres",
});
// await sequelize.authenticate();

// export const sequelize = new Sequelize(
//   process.env.PG_DATABASE,
//   process.env.PG_USERNAME,
//   process.env.PG_PASSWORD,
//   {
//     logging: false,
//     host: process.env.PG_HOST,
//     port: process.env.PG_PORT,
//     dialect: "postgres",
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//   }
// );

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}


//
// import dotenv from "dotenv";
// dotenv.config();

// import { Sequelize } from "sequelize";

// var database = process.env.PG_DATABASE;
// var username = process.env.PG_USERNAME;
// var password = process.env.PG_PASSWORD;
// var host = process.env.PG_HOST;
// var port = process.env.PG_PORT;

// export const sequelize = new Sequelize(
//   database,
//   username,
//   password,
//   {
//     logging: false,
//     host,
//     port,
//     dialect: "postgres",
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       }
//     },
//   }
// );

// try {
//   await sequelize.authenticate();
//   console.log("Connection has been established successfully.");
// } catch (error) {
//   console.error("Unable to connect to the database:", error);
// }
