module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : "CodeClass",
      script    : "server.js",
      env: {
        GITHUB_CLIENT_SECRET: "4c88faaad3e8962bd509e42a6678cdee2d588f34",
        GITHUB_CLIENT_ID: "774e1a299372552cc64d"
        DB_HOST: 'waffleio.cv2tfhzqgjzn.us-west-2.rds.amazonaws.com:5432',
        DB_USER: waffle,
        DB_PASS: waffleio,
        DB_NAME: waffleio
      },
      env_development : {
        SESSION_SECRET: "development",
        TOKEN_SECRET: "development"
      },
      env_production : {
        SESSION_SECRET: "wafflesio",
        TOKEN_SECRET: "wafflesio"
      }
    },
    {
      name      : "WEB",
      script    : "web.js"
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : "ubuntu",
      host : "35.163.216.237",
      ref  : "origin/Prod",
      repo : "git@github.com:tkg214/codeclass.git",
      path : "/var/www/production",
      "post-deploy" : "npm install && pm2 startOrRestart ecosystem.config.js --env production"
    },
    development : {
      user : "ubuntu",
      host : "35.163.216.237",
      ref  : "origin/master",
      repo : "git@github.com:tkg214/codeclass.git",
      path : "/var/www/development",
      "post-deploy" : "npm install && pm2 startOrRestart ecosystem.config.js --env dev",
      env  : {
        NODE_ENV: "development"
      }
    }
  }
}
