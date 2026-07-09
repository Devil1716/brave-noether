const { createCanvas } = require('canvas');
const fs = require('fs');

function generateIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, size, size);

    // Text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `${size * 0.6}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('A', size / 2, size / 2);

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`public/icon-${size}x${size}.png`, buffer);
}

generateIcon(192);
generateIcon(512);
