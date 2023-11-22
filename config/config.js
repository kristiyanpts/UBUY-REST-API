const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    port: process.env.PORT || 3000,
    dbURL:
      "mongodb+srv://kristiqn3456:5JUmCOBlcKTc5eJs@ubuy-softuni-react.tvde8lf.mongodb.net/?retryWrites=true&w=majority",
    origin: ["http://localhost:5173"],
  },
  production: {
    port: process.env.PORT || 3000,
    dbURL: process.env.DB_URL_CREDENTIALS,
    origin: [],
  },
};

module.exports = config[env];
