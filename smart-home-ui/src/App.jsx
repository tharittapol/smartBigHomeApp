import React, { useState } from "react";
import axios from "axios";

function App() {
  const [deviceId, setDeviceId] = useState("lamp1");
  const [command, setCommand] = useState("ON");

  const sendCommand = async () => {
    try {
      await axios.post("http://localhost:8080/api/device/control", {
        device_id: deviceId,
        command: command,
      });
      alert("Command sent successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to send command");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Smart Home Controller</h1>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Select Device:</label>
          <select
            className="w-full border rounded-md p-2"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
          >
            <option value="frontRoomLight">Front Room Light</option>
            <option value="backRoomLight">Back Room Light</option>
            <option value="kitchenLight">Kitchen Light</option>
            <option value="bathroomLight">Bathroom Light</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Command:</label>
          <select
            className="w-full border rounded-md p-2"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
          >
            <option value="ON">ON</option>
            <option value="OFF">OFF</option>
          </select>
        </div>
        <button
          onClick={sendCommand}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Send Command
        </button>
      </div>
    </div>
  );
}

export default App;
