const autorestart = true
const watch = false
const maxMemoryRestart = '256M'

module.exports = {
  apps : [
    {
      name: "sound-dev",
      instances: 1,
      autorestart,
      watch,
      max_memory_restart: maxMemoryRestart,
      script: "./node_modules/nuxt/bin/nuxt.js",
      args: "dev",
      env: {
         PORT: 3001
      }
    },
    {
      name: "sound-prod",
     instances: 1,
      autorestart,
      watch,
      max_memory_restart: maxMemoryRestart,
      script: "./node_modules/nuxt/bin/nuxt.js",
      args: "start",
      env: {
         PORT: 3001
      }
    }
  ]
}

