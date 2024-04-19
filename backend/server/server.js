const app = require("../index");
const mongoConnect = require("../config/db");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cluster = require("cluster");
const clPlus = require("os").cpus().length;
// const {fork}=require("child_process")

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} running`);
  for (var i = 0; i < clPlus; i++) {
    cluster.fork();
  }
} else {
    var accessLogStream = fs.createWriteStream(path.join(__dirname, '..//','access.log'), { flags: 'a' })

  require("dotenv").config();

  const PORT = process.env.PORT || 8000;

  app.use(morgan('combined', { stream: accessLogStream }))

  app.listen(PORT, async () => {
    await mongoConnect();
    console.log(`server listening on ${PORT}`);
  });
}
