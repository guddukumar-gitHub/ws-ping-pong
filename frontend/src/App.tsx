import { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const socketRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function sendMessage() {
    if (!socketRef.current || !inputRef.current) {
      return;
    }

    const message = inputRef.current.value;
    socketRef.current.send(message);
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    socketRef.current = ws;

    ws.onmessage = (e: MessageEvent) => {
      alert(e.data);
    };

    return () => {
      socketRef.current = null;
      ws.close();
    };
  }, []);

  return (
    <div>
      <h1>A simple ping-pong app</h1>
      <p>You send me ping, I&apos;ll send you pong...</p>
      <br />
      <div>
        <input type="text" placeholder="Write ping..." ref={inputRef} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
