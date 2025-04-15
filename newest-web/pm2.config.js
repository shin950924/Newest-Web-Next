module.exports = {
  apps: [
    {
      name: "next-app",
      script: "npm",
      args: "start",
      exec_mode: "cluster",
      instances: "max",
      autorestart: true,
    },
  ],
};