
config = {
  development:{
        HOST: "localhost",
        USER: "rdcarr",
        PASSWORD: "Mong00se!",
        DB: "inventory",
        dialect: "mysql",
        dialectOptions: { decimalNumbers: true },
        pool: {
          max: 2,
          min: 0,
          idle: 10000
        }
  },
  production:{
    HOST: "localhost",
    USER: "rdcarr",
    PASSWORD: "Mong00se!",
    DB: "inventory",
    dialect: "mysql",
    dialectOptions: { decimalNumbers: true },
    pool: {
      max: 2,
      min: 0,
      idle: 10000
    }
  },
  production2:{
      HOST: "us-cdbr-east-03.cleardb.com",
      USER: "b3c8ea8f6c54d0",
      PASSWORD: "e77b8117",
      DB: "heroku_e3d2a7ef64f5b0e",
      dialect: "mysql",
      dialectOptions: { decimalNumbers: true },
      pool: {
        max: 2,
        min: 0,
        idle: 10000
      }
  }
}

  module.exports = config[process.env.NODE_ENV] || config['production'];
