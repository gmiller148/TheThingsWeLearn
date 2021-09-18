require("dotenv").config();
const conn = require("./db/conn");
const server = require("./server");
const PORT = process.env.PORT || 5000;

conn.connect().then(() => {
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
