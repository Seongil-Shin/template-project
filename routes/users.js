const express = require("express");
const router = express.Router();
const db = require("../dbconnection");
const crypto = require("crypto");
const flash = require("connect-flash");
router.use(flash());

const passport = require("../lib/passport")(router);
/* flash connect */

router.post(
   "/api/login",
   passport.authenticate("local", {
      successRedirect: "/users/api/login-success",
      failureRedirect: "/users/api/login-fail",
      failureFlash: true,
   })
);

router.get("/api/login-success", (req, res) => {
   res.send({ authenticated: true });
});

router.get("/api/login-fail", (req, res) => {
   const message = req.flash();
   if (message.error[0] === "Invalid id") {
      res.send({ idNotMatch: true });
   } else {
      res.send({ pwNotMatch: true });
   }
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

//router.post("/api/logout", (req, res) => {});

module.exports = router;
