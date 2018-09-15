module.exports = {
  apps : [{
    name        : "eso-assistant",
    script      : "./eso.js",
    watch       : false,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
       "NODE_ENV": "production"
    }
  }]
}