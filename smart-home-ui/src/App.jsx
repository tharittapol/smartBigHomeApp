import React, { useState } from "react";
import axios from "axios";

function App() {
  const [deviceId, setDeviceId] = useState("frontRoomLight");
  const [command, setCommand] = useState("ON");
  const [message, setMessage] = useState("");

  // const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
  const BASE_URL = "https://smartbighomeapp-production.up.railway.app:8080" || "http://localhost:8080";
  
  const sendCommand = async () => {
    try {
      await axios.post(`${BASE_URL}/api/device/control`, {
        device_id: deviceId,
        command: command,
      });
      setMessage("✅ Command sent successfully");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to send command");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Smart Home Control</h1>

        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">Device:</label>
          <select
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
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
          <label className="block mb-1 font-semibold text-gray-700">Command:</label>
          <select
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
          >
            <option value="ON">ON</option>
            <option value="OFF">OFF</option>
          </select>
        </div>

        <button
          onClick={sendCommand}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition duration-300"
        >
          Send Command
        </button>

        {message && (
          <p className="text-center mt-4 text-sm font-medium text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}

export default App;
