"use strict";
const winston = require("winston");
const server_1 = require("./server");
const basePort = process.env.PORT || 3000;
server_1.default.listen(basePort, () => winston.info(`App Server is now listening on http://localhost:${basePort}`));
