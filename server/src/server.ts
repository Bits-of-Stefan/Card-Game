import net from 'net';
import { decodeFrame, encodeFrame, handleHandshake } from './websocket';

const PORT = 8080;

const server = net.createServer((socket) => {
  let isHandshaked = false;

  socket.on('data', (data) => {
    if (!isHandshaked) {
      isHandshaked = handleHandshake(data, socket);
      return;
    }

    const message = decodeFrame(data);
    console.log('Received:', message);

    // Echo back
    const response = encodeFrame(`Echo: ${message}`);
    socket.write(response);
  });

  socket.on('close', () => console.log('Client disconnected'));
  socket.on('error', (err) => console.error('Socket error:', err));
});

server.listen(PORT, () => {
  console.log(`Custom WebSocket server running on ws://localhost:${PORT}`);
});
