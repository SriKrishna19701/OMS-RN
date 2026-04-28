const QRCode = require('qrcode');

async function generateQrCode(payload) {
  const data = typeof payload === 'string' ? payload : JSON.stringify(payload);
  return QRCode.toDataURL(data);
}

module.exports = {
  generateQrCode
};
