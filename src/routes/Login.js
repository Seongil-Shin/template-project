import React, { useState } from "react";
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

const LoginContainer = styled.div`
   padding: 70px 0px;
   height: 80vh;
`;
const ErrorMessege = styled.div`
   padding: 5px 0px 20px 10px;
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

export default function SignIn({ history }) {
   const classes = useStyles();
   const [id, setId] = useState("");
   const [password, setPassword] = useState("");
   const [idNotMatch, setIdNotMatch] = useState(false);
   const [pwNotMatch, setPwNotMatch] = useState(false);

   const onIdChange = (e) => {
      setId(e.target.value);
   };
   const onPasswordChange = (e) => {
      setPassword(e.target.value);
   };

   const onSubmit = async (e) => {
      e.preventDefault();
      try {
         await axios
            .post("/users/api/login", {
               uid: `${id}`,
               pw: `${password}`,
            })
            .then((res) => {
               if (res.data.idNotMatch) {
                  setIdNotMatch(true);
                  setPwNotMatch(false);
               } else if (res.data.match) {
                  history.goBack();
               } else if (res.data.pwNotMatch) {
                  setPwNotMatch(true);
                  setIdNotMatch(false);
               } else {
                  alert("알 수 없는 에러가 발생했습니다. 다시 시도해주세요.");
               }
            });
      } catch (e) {
         console.log(e);
      }
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
                  {idNotMatch && (
                     <ErrorMessege>일치하는 아이디가 없습니다.</ErrorMessege>
                  )}
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
                  {pwNotMatch && (
                     <ErrorMessege>비밀번호가 일치하지 않습니다.</ErrorMessege>
                  )}
                  <FormControlLabel
                     control={<Checkbox value="remember" color="primary" />}
                     label="아이디 저장"
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
