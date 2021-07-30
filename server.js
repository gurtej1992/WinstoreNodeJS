const http = require("http");
const app = require("./app");
const server = http.createServer(app);
require("./database/db"); //import the database
const port =  9000;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

