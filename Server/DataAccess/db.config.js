module.exports = {
    HOST: "us-cdbr-east-03.cleardb.com",
    USER: "b3c8ea8f6c54d0",
    PASSWORD: "e77b8117",
    DB: "heroku_e3d2a7ef64f5b0e",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };