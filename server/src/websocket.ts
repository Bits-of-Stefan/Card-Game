import crypto from 'crypto';
import { Socket } from 'net';

// Perform WebSocket handshake
export function handleHandshake(data: Buffer, socket: Socket) {
  const request = data.toString();
  const match = request.match(/Sec-WebSocket-Key: (.+)/);
  if (!match) {
    socket.end();
    return false;
  }

  const key = match[1].trim();
  const acceptKey = generateAcceptValue(key);

  const response =
    'HTTP/1.1 101 Switching Protocols\r\n' +
    'Upgrade: websocket\r\n' +
    'Connection: Upgrade\r\n' +
    `Sec-WebSocket-Accept: ${acceptKey}\r\n` +
    '\r\n';

  socket.write(response);
  return true;
}

// Compute the Sec-WebSocket-Accept
function generateAcceptValue(key: string): string {
  return crypto
    .createHash('sha1')
    .update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11', 'binary')
    .digest('base64');
}

// Decode WebSocket frame to string
export function decodeFrame(buffer: Buffer): string {
  const isMasked = (buffer[1] & 0x80) === 0x80;
  let payloadLen = buffer[1] & 0x7f;
  let offset = 2;

  if (payloadLen === 126) {
    payloadLen = buffer.readUInt16BE(offset);
    offset += 2;
  } else if (payloadLen === 127) {
    payloadLen = Number(buffer.readBigUInt64BE(offset));
    offset += 8;
  }

  let maskingKey: Buffer | undefined;
  if (isMasked) {
    maskingKey = buffer.slice(offset, offset + 4);
    offset += 4;
  }

  let data = buffer.slice(offset, offset + payloadLen);

  if (isMasked && maskingKey) {
    for (let i = 0; i < data.length; i++) {
      data[i] ^= maskingKey[i % 4];
    }
  }

  return data.toString();
}

// Encode string as WebSocket frame
export function encodeFrame(data: string): Buffer {
  const payload = Buffer.from(data);
  const len = payload.length;
  let header: Buffer;

  if (len < 126) {
    header = Buffer.alloc(2);
    header[1] = len;
  } else if (len < 65536) {
    header = Buffer.alloc(4);
    header[1] = 126;
    header.writeUInt16BE(len, 2);
  } else {
    header = Buffer.alloc(10);
    header[1] = 127;
    header.writeBigUInt64BE(BigInt(len), 2);
  }

  header[0] = 0x81; // FIN + text frame

  return Buffer.concat([header, payload]);
}
