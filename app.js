// Entry point required by cPanel "Setup Node.js App" (Passenger) and `npm start`.
const app = require('./src/server');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`ĐẠI CÁT HOLDINGS website running on port ${PORT}`);
});
