import React, { useState, useContext } from 'react';
import validator from 'email-validator';

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { users } from './const';
import { findUser } from './function';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2)
  }
}));

export default function SignForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touch, setTouch] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState(false);
  const context = useContext(UserContext);
  const classes = useStyles();

  const handleSubmit = (email, password, e) => {
    e.preventDefault();
    const filter = { password, email };
    const user = findUser(users, filter);
    if (!user) {
      setError(true);
    } else {
      setIsLogin(true);
      context.setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    }
    setEmail('');
    setPassword('');
    setTouch(false);
  };

  React.useEffect(() => {
    const storageUser = localStorage.getItem('user');
    if (storageUser) {
      setIsLogin(true);
    }
  }, []);

  if (isLogin) {
    return <Redirect to="/page_1" />;
  }

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sing In
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={!!email && !validator.validate(email)}
                helperText={
                  !!email && !validator.validate(email)
                    ? 'Введите корректно адрес электронной почты'
                    : null
                }
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setTouch(true);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setTouch(true);
                }}
              />
            </Grid>
          </Grid>
          {error && !touch ? (
            <Box p={1} color="secondary.main">
              Пароль или email неверны
              <br />
              email: admin@admin.com
              <br />
              пароль: admin
            </Box>
          ) : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!validator.validate(email) || !password}
            className={classes.submit}
            onClick={(e) => handleSubmit(email, password, e)}
          >
            Sing In
          </Button>
        </form>
      </div>
    </Container>
  );
}
