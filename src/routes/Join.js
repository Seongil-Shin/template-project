import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import axios from "axios";

const JoinContainer = styled.div`
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
      marginTop: theme.spacing(3),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
}));

export default function Join({ history }) {
   const classes = useStyles();
   const [name, setName] = useState("");
   const [id, setId] = useState("");
   const [password, setPassword] = useState("");
   const [isDupId, setIsDupId] = useState(false);

   const onIdChange = (e) => {
      setId(e.target.value);
   };
   const onPasswordChange = (e) => {
      setPassword(e.target.value);
   };
   const onNameChange = (e) => {
      setName(e.target.value);
   };
   const onSubmit = async (e) => {
      e.preventDefault();
      try {
         await axios
            .post("/users/api/join", {
               name: `${name}`,
               uid: `${id}`,
               pw: `${password}`,
            })
            .then((res) => {
               if (res.data.isJoined) {
                  history.push("/login");
               } else if (res.data.dupId) {
                  setIsDupId(true);
               } else {
                  alert("오류가 발생했습니다. 다시 시도해주세요.");
               }
            });
      } catch (e) {
         console.log(e);
      }
   };

   return (
      <JoinContainer>
         <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
               <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
               </Avatar>
               <Typography component="h1" variant="h5">
                  회원가입
               </Typography>
               <form className={classes.form} onSubmit={onSubmit}>
                  <Grid container spacing={2}>
                     <Grid item xs={12}>
                        <TextField
                           variant="outlined"
                           required
                           fullWidth
                           id="name"
                           label="성함"
                           name="name"
                           autoFocus
                           onChange={onNameChange}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           variant="outlined"
                           required
                           fullWidth
                           id="id"
                           label="아이디"
                           name="id"
                           onChange={onIdChange}
                        />
                     </Grid>
                     {isDupId && (
                        <ErrorMessege>이미 사용중인 아이디입니다.</ErrorMessege>
                     )}
                     <Grid item xs={12}>
                        <TextField
                           variant="outlined"
                           required
                           fullWidth
                           name="password"
                           label="비밀번호"
                           type="password"
                           id="password"
                           autoComplete="current-password"
                           onChange={onPasswordChange}
                        />
                     </Grid>
                  </Grid>
                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     color="primary"
                     className={classes.submit}
                  >
                     등록
                  </Button>
                  <Grid container justify="flex-end">
                     <Grid item>
                        <Link href="#/login" variant="body2">
                           로그인
                        </Link>
                     </Grid>
                  </Grid>
               </form>
            </div>
            <Box mt={5}>
               <Copyright />
            </Box>
         </Container>
      </JoinContainer>
   );
}
