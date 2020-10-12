import React from 'react';
import PropTypes from 'prop-types';
import validator from 'email-validator';
import AddIcon from '@material-ui/icons/Add';
import { Button, Grid, Container, TextField, Fab } from '@material-ui/core';
import { openDb, createTable, updateTable, insertIntoTable } from '../apiDb';

export default function TextFields({ contact }) {
  const [name, setName] = React.useState(contact.name);
  const [lastName, setLastName] = React.useState(contact.lastName);
  const [phone, setPhone] = React.useState(contact.phone);
  const [email, setEmail] = React.useState(contact.email);
  const [disabled, setDisabled] = React.useState(false);
  const mydb = openDb('myDb');

  React.useEffect(() => {
    if (contact && contact.fullName) {
      setName(contact.fullName.split(' ')[0]);
      setLastName(contact.fullName.split(' ')[1]);
      setDisabled(true);
    }
  }, [contact]);

  React.useEffect(() => {
    createTable(mydb);
  }, [mydb]);

  const handleUpdateField = (field, fieldName) => {
    const fullName = `${name} ${lastName}`;
    updateTable(mydb, field, fieldName, fullName);
  };

  const handleSubmit = ({ name, lastName, phone, email }, e) => {
    e.preventDefault();
    insertIntoTable(mydb, { name, lastName, phone, email });
    setName('');
    setLastName('');
    setPhone('');
    setEmail('');
  };

  return (
    <Container maxWidth="md">
      <form noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Фамилия"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              disabled={disabled}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <TextField
              variant="outlined"
              label="Телефон"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={1}>
            <Fab
              color="secondary"
              onClick={() => handleUpdateField(phone, 'phone')}
              disabled={!phone}
            >
              <AddIcon />
            </Fab>
          </Grid>
          <Grid item xs={10}>
            <TextField
              variant="outlined"
              label="Е-mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              fullWidth
              error={!!email && !validator.validate(email)}
              helperText={
                !!email && !validator.validate(email)
                  ? 'Введите корректно адрес электронной почты'
                  : null
              }
            />
          </Grid>
          <Grid item xs={1}>
            <Fab
              color="secondary"
              onClick={() => handleUpdateField(email, 'email')}
              disabled={!email}
            >
              <AddIcon />
            </Fab>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
              disabled={!name || !lastName || disabled}
              onClick={(e) => handleSubmit({ name, lastName, phone, email }, e)}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

TextFields.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string,
    lastName: PropTypes.string,
    fullName: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string
  })
};

TextFields.defaultProps = {
  contact: {
    fullName: '',
    name: '',
    lastName: '',
    phone: '',
    email: ''
  }
};
