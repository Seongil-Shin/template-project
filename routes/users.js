const express = require("express");
const router = express.Router();
const db = require("../dbconnection");
const crypto = require("crypto");

router.get("/", (req, res) => {
   db.query("SELECT * FROM AUTH", (err, rows) => {
      if (err) {
         res.send(err);
      } else res.send(rows);
   });
});

router.post("/api/login", (req, res) => {
   const password = crypto
      .createHmac("sha256", process.env.SHA256_KEY)
      .update(req.body.pw)
      .digest("hex");

   db.query(
      `SELECT UID, PASSWORD FROM auth WHERE UID="${req.body.uid}";`,
      (err, row) => {
         if (err) {
            res.send({ err: true });
         } else {
            if (row.length === 0) {
               res.send({ idNotMatch: true });
            } else if (row[0].PASSWORD === password) {
               res.send({ match: true });
            } else {
               res.send({ pwNotMatch: true });
            }
         }
      }
   );
});
router.post("/api/join", (req, res) => {
   const password = crypto
      .createHmac("sha256", process.env.SHA256_KEY)
      .update(req.body.pw)
      .digest("hex");
   db.query(
      `INSERT INTO auth (UID, NAME, PASSWORD) VALUES ("${req.body.uid}", "${req.body.name}", "${password}");`,
      (err, ok) => {
         if (err) {
            if (err.code === "ER_DUP_ENTRY") {
               res.send({ isJoined: false, dupId: true });
            } else {
               res.send({ isJoined: false });
            }
         } else {
            res.send({ isJoined: true });
         }
      }
   );
});

module.exports = router;
