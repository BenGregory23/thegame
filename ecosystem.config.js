module.exports = {
  apps: [
    {
      name: "theGamo",
      port: "3000",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
    },
  ],
};
