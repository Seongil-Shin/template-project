var express = require("express");
var router = express.Router();
var db = require("../dbconnection");
var crypto = require("crypto");
var flash = require("connect-flash");
var utils = require("../lib/utils");

var passport = require("../lib/passport")(router, db);
/* flash connect */
router.use(flash());

function saveRememberMe(uid) {
   var token = utils.randomString(64);
   db.query(
      `INSERT INTO login_token (token, uid) VALUES ("${token}", "${uid}");`
   );
   return token;
}

router.post(
   "/api/login",
   passport.authenticate("local", {
      failureRedirect: "/users/api/login-fail",
      failureFlash: true,
   }),
   (req, res) => {
      if (!req.body.rememberMe) {
         return res.redirect("/users/api/user");
      }
      var token = saveRememberMe(req.body.uid);
      res.cookie("remember_me", token, {
         httpOnly: true,
         maxAge: 60512312360000,
      });

      return res.redirect("/users/api/user");
   }
);
router.get("/api/login-fail", (req, res) => {
   var message = req.flash();
   if (!message.error) {
      return res.send({ pushFrequent: true });
   } else if (message.error[0] === "Invalid id") {
      return res.send({ idNotMatch: true });
   } else if (message.error[0] === "Invalid pw") {
      return res.send({ pwNotMatch: true });
   }
});

router.get("/api/remember-me", (req, res) => {
   if (req.cookies["remember_me"]) {
      db.query(
         `SELECT uid FROM login_token WHERE token="${req.cookies["remember_me"]}";`,
         (err, row) => {
            res.clearCookie("remember_me");
            db.query(
               `DELETE FROM login_token WHERE token="${req.cookies["remember_me"]}";`
            );

            if (err || row.length === 0) {
               res.writeHead(302, { authenticated: false });
               return res.end();
            }

            var uid = row[0].uid;
            var token = saveRememberMe(uid);
            res.cookie("remember_me", token, {
               httpOnly: true,
               maxAge: 60560002131230,
            });

            req.login({ UID: uid }, function (err) {
               if (err) {
                  return res.send({ authenticated: false });
               }
               return res.redirect("/users/api/user");
            });
         }
      );
   } else {
      return res.send({ authenticated: false });
   }
});

router.post("/api/join", (req, res) => {
   var password = crypto
      .createHmac("sha256", process.env.SHA256_KEY)
      .update(req.body.pw)
      .digest("hex");
   db.query(
      `INSERT INTO auth (UID, PASSWORD) VALUES ("${req.body.uid}", "${password}");`,
      (err, ok) => {
         if (err) {
            if (err.code === "ER_DUP_ENTRY") {
               res.send({ isJoined: false, dupId: true });
            } else {
               res.send({ isJoined: false });
            }
         } else {
            db.query(
               `INSERT INTO userinfo (uid, username) VALUES ("${req.body.uid}", "${req.body.name}");`,
               (err, ok) => {
                  res.send({ isJoined: true });
               }
            );
         }
      }
   );
});

router.post("/api/logout", (req, res) => {
   db.query(
      `DELETE FROM login_token WHERE token="${req.cookies["remember_me"]}";`
   );
   res.clearCookie("remember_me");
   req.logout();
   req.session.destroy(function (err) {
      res.send({ logout: true });
   });
});

router.get("/api/user", (req, res) => {
   if (req.isAuthenticated()) {
      db.query(
         `SELECT username FROM userinfo WHERE uid="${req.session.passport.user}";`,
         (err, row) => {
            if (err || !row[0]) {
               res.send({ authenticated: true });
            }
            if (row[0]) {
               res.send({ authenticated: true, username: row[0].username });
            }
         }
      );
   } else {
      res.send({ authenticated: false });
   }
});

module.exports = router;
