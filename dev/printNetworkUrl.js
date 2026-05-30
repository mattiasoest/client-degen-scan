const os = require("os");

const port = process.env.PORT || 3000;

const ip = Object.values(os.networkInterfaces())
  .flat()
  .find((iface) => iface.family === "IPv4" && !iface.internal)?.address;

if (ip) {
  console.log(`\n  \x1b[1m\x1b[36mNetwork:\x1b[0m  http://${ip}:${port}\n`);
}
