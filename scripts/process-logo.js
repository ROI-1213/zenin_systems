const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../public/images/logo.jpg');
const buffer = fs.readFileSync(filePath);

let offset = 2;
while (offset < buffer.length) {
  if (buffer[offset] !== 0xFF) break;
  const marker = buffer[offset + 1];
  if (marker === 0xC0 || marker === 0xC2) {
    const height = buffer.readUInt16BE(offset + 5);
    const width = buffer.readUInt16BE(offset + 7);
    console.log(`Dimensions: ${width}x${height}`);
    break;
  } else {
    offset += 2 + buffer.readUInt16BE(offset + 2);
  }
}
