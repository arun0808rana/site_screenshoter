const express = require("express");
const app = express();
const PORT = 9915;
const takeSS = require("./utils");
const path = require('node:path');
let filename;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("downloads"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.post("/upload", (req, res) => {
  const { url, fileType } = req.body;
  takeSS(url, fileType)
    .then((file) => {
      filename = file;
      res.send({success: true})
    })
    .catch((error) => {
      res.send({ success: false, error });
    });
});

app.get('/download', (req, res)=>{
    res.download(filename)
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
