import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import axios from "axios";
import { connect } from "react-redux";
import { logined } from "../stores/loginState";
import { useCookies } from "react-cookie";

const LoginContainer = styled.div`
   padding: 70px 0px;
   height: 80vh;
`;
const ErrorMessege = styled.div`
   padding-left: 10px;
   color: red;
`;
function Copyright() {
   return (
      <Typography variant="body2" color="textSecondary" align="center">
         {"Copyright © "}
         <Link color="inherit" href="https://material-ui.com/">
            IZONE
         </Link>{" "}
         {new Date().getFullYear()}
         {"."}
      </Typography>
   );
}

const useStyles = makeStyles((theme) => ({
   paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
   },
   avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
   },
   form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
}));

function SignIn({ history, onLogined }) {
   const classes = useStyles();
   const [id, setId] = useState("");
   const [password, setPassword] = useState("");
   const [pwErrMsg, setPwErrMsg] = useState("");
   const [idErrMsg, setIdErrMsg] = useState("");
   const [rememberMe, setRememberMe] = useState(false);
   const [rememberId, setRememberId] = useState(false);
   const [cookies, setCookies, removeCookies] = useCookies(["uid"]);

   useEffect(() => {
      if (cookies.uid) {
         setId(cookies.uid);
         setRememberId(true);
      }
   }, [cookies.uid]);

   const onIdChange = (e) => {
      const {
         target: { value },
      } = e;
      if (/\W/.exec(value)) {
         setIdErrMsg("아이디는 영소대문자 또는 숫자의 조합으로만 가능합니다.");
      } else {
         if (value.length > 20) {
            setIdErrMsg("아이디는 최대 20자까지 가능합니다.");
         } else {
            setIdErrMsg("");
            setId(value);
         }
      }
   };
   const onPasswordChange = (e) => {
      setPassword(e.target.value);
   };
   const onSubmit = (e) => {
      e.preventDefault();

      const login = async () => {
         await axios
            .post("/users/api/login", {
               uid: `${id}`,
               pw: `${password}`,
               rememberMe: rememberMe,
            })
            .then((res) => {
               if (res.data.idNotMatch) {
                  setIdErrMsg("존재하지 않은 아이디입니다.");
                  setPwErrMsg("");
               } else if (res.data.authenticated) {
                  onLogined();
                  if (rememberId) {
                     setCookies("uid", id, { maxAge: 123154131 });
                  } else {
                     removeCookies("uid");
                  }
                  if (
                     history.location.state.prev &&
                     history.location.state.prev !== "/join"
                  ) {
                     history.goBack();
                  } else {
                     history.push("/");
                  }
               } else if (res.data.pwNotMatch) {
                  setPwErrMsg("비밀번호가 일치하지 않습니다.");
                  setIdErrMsg("");
               } else {
                  setPwErrMsg("아이디 또는 비밀번호가 일치하지 않습니다.");
                  setIdErrMsg("");
               }
            })
            .catch((err) => {
               console.log(err);
               alert(
                  "데이터베이스에 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
               );
            });
      };
      login();
   };

   return (
      <LoginContainer>
         <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
               <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
               </Avatar>
               <Typography component="h1" variant="h5">
                  로그인
               </Typography>
               <form className={classes.form} onSubmit={onSubmit}>
                  <TextField
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     id="id"
                     label="아이디"
                     name="id"
                     onChange={onIdChange}
                     value={id}
                     autoFocus
                  />
                  <ErrorMessege>{idErrMsg}</ErrorMessege>
                  <TextField
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     name="password"
                     label="비밀번호"
                     type="password"
                     id="password"
                     value={password}
                     onChange={onPasswordChange}
                     autoComplete="current-password"
                  />
                  <ErrorMessege>{pwErrMsg}</ErrorMessege>
                  <FormControlLabel
                     control={<Checkbox value={rememberId} color="primary" />}
                     label="아이디 저장"
                     checked={rememberId}
                     onChange={() => setRememberId((prev) => !prev)}
                  />
                  <FormControlLabel
                     control={<Checkbox value={rememberMe} color="primary" />}
                     label="자동로그인"
                     onChange={() => setRememberMe((prev) => !prev)}
                  />
                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     color="primary"
                     className={classes.submit}
                  >
                     로그인
                  </Button>
                  <Grid container>
                     <Grid item xs>
                        <Link href="#" variant="body2">
                           비밀번호 찾기
                        </Link>
                     </Grid>
                     <Grid item>
                        <Link href="#/join" variant="body2">
                           가입하기
                        </Link>
                     </Grid>
                  </Grid>
               </form>
            </div>
            <Box mt={8}>
               <Copyright />
            </Box>
         </Container>
      </LoginContainer>
   );
}

function mapDispatchToProps(dispatch) {
   return {
      onLogined: () => dispatch(logined()),
   };
}

export default connect(null, mapDispatchToProps)(SignIn);
