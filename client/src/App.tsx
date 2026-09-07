import { useState } from "react";
import { checkBackend } from "./services/api";

function App() {
  const [status, setStatus] = useState("Not connected");

  async function testBackend() {
    try {
      const data = await checkBackend();
      setStatus(data.message);
    } catch (error) {
      console.error(error);
      setStatus("Backend connection failed");
    }
  }

  return (
    <main>
      <h1>AI Workspace</h1>

      <p>Frontend is running.</p>

      <button onClick={testBackend}>
        Test Backend
      </button>

      <p>{status}</p>
    </main>
  );
}

export default App;