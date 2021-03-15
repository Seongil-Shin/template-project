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
   const [idErrMsg, setIdErrMsg] = useState("");
   const [nameErrMsg, setNameErrMsg] = useState("");

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
   const onNameChange = (e) => {
      const {
         target: { value },
      } = e;

      if (value.length > 20) {
         setNameErrMsg("이름은 최대 20자까지 가능합니다.");
      } else {
         setNameErrMsg("");
         setName(value);
      }
   };
   const onSubmit = async (e) => {
      e.preventDefault();

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
               setIdErrMsg("이미 사용 중인 아이디입니다.");
            } else {
               alert("오류가 발생했습니다. 다시 시도해주세요.");
            }
         })
         .catch((e) => {
            alert("오류가 발생했습니다. 다시 시도해주세요.");
         });
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
                           value={name}
                        />
                     </Grid>
                     <ErrorMessege>{nameErrMsg}</ErrorMessege>
                     <Grid item xs={12}>
                        <TextField
                           variant="outlined"
                           required
                           fullWidth
                           id="id"
                           label="아이디"
                           name="id"
                           onChange={onIdChange}
                           value={id}
                        />
                     </Grid>
                     <ErrorMessege>{idErrMsg}</ErrorMessege>
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
