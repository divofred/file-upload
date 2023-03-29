const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Files");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage })

app.use(express.static("public/Files"));
app.set("view engine", "ejs");

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.redirect('/upload')
});
app.post('/upload', upload.single('photo'), (req,res)=>{
  fs.readdir("public/Files", function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    res.render("upload", { data });
  });
})
app.get('/upload', (req,res)=>{
  fs.readdir("public/Files", function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    res.render("upload", { data });
  });
})
app.listen(PORT, () => {
  console.log("app started at port ", PORT);
});
