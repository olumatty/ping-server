const fetch = require('node-fetch');

const SERVERS = [
  'https://travelai-accomodation.onrender.com/api/v1/health', // Alice (fixed typo)
  'https://travelai-server.onrender.com/api/v1/health', // Mother server
  'https://travelai-com-v1-flight.onrender.com/api/v1/health', // Bob
  'https://travelai-sightseeing.onrender.com/api/v1/health', // Charlie
];
const INTERVAL = 60 * 1000; // 60 seconds in milliseconds

console.log(`Pinging ${SERVERS.join(', ')} every ${INTERVAL / 1000} seconds...`);

async function ping() {
  for (const url of SERVERS) {
    try {
      const response = await fetch(url, { method: 'GET' });
      const timestamp = new Date().toISOString();
      if (response.ok) {
        console.log(`[${timestamp}] Success: ${url} - HTTP ${response.status}`);
      } else {
        console.log(`[${timestamp}] Error: ${url} - HTTP ${response.status}`);
      }
    } catch (error) {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] Error: ${url} - ${error.message}`);
    }
  }
}

// Run immediately and then every INTERVAL
ping();
setInterval(ping, INTERVAL);