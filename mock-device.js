const WebSocket = require("ws");
const ws = new WebSocket("ws://localhost:8080/ws");

ws.on("open", () => {
  console.log("Mock device connected");
});

ws.on("message", (data) => {
  const cmd = JSON.parse(data);
  console.log(`Device ${cmd.device_id} received command: ${cmd.command}`);
});