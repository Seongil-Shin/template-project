const db = require("../dbconnection");
const crypto = require("crypto");

module.exports = (app) => {
   const passport = require("passport");
   const LocalStrategy = require("passport-local").Strategy;

   app.use(passport.initialize());
   app.use(passport.session());

   //로그인 성공했을때 한번 실행
   //done엔 첫번째는 null, 두번째는 식별자를 넣음
   //실행시 세션과 쿠키가 만들어지고, 세션엔 식별자가 저장됨
   passport.serializeUser((user, done) => {
      done(null, user.UID);
   });

   //페이지에 방문할때마다, 이 함수가 실행됨.
   //그리고 사용자의 식별자를 가지고, 정보를 가져오는 작업을 하면 된다.
   //이때 가져온 정보는 done의 두번째에 넣는데, 이거는 그 페이지의 req.user로 들어간다.
   passport.deserializeUser((id, done) => {
      db.query(
         `SELECT UID, PASSWORD FROM auth WHERE UID="${id}";`,
         (err, row) => {
            if (err) {
               // 데이터베이스 에러
               // res.send({ err: true });
            } else {
               if (row.length === 0) {
                  // 아이디 검색이 안되는 상태
                  //res.send({ idNotMatch: true });
               } else {
                  done(null, row[0]);
               }
            }
         }
      );
   });

   passport.use(
      new LocalStrategy(
         {
            usernameField: "uid",
            passwordField: "pw",
         },
         function (username, password, done) {
            password = crypto
               .createHmac("sha256", process.env.SHA256_KEY)
               .update(password)
               .digest("hex");

            db.query(
               `SELECT UID, PASSWORD FROM auth WHERE UID="${username}";`,
               (err, row) => {
                  if (err) {
                     return done(err);
                  } else {
                     // 아이디 못찾음
                     if (row.length === 0) {
                        return done(null, false, { message: "Invalid id" });
                     } else if (row[0].PASSWORD === password) {
                        return done(null, row[0]);
                     } else {
                        return done(null, false, { message: "Invalid pw" });
                     }
                  }
               }
            );
         }
      )
   );
   return passport;
};
