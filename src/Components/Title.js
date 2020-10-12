import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import SimpleMenu from './SimpleMenu';

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'flex',
    justifyContent: 'space-around',
    border: '1px solid black',
    backgroundColor: theme.palette.primary.light,
    height: 44,
    color: theme.palette.common.white
  }
}));

const Title = ({ title }) => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.removeItem('user');
  };
  return (
    <div className={classes.title}>
      <SimpleMenu />
      <div>{title}</div>
      <div className={classes.avatar} onClick={logout} aria-hidden="true">
        <Avatar image={user.avatar} alt="logout" component={Link} to="/" />
      </div>
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string
};

Title.defaultProps = {
  title: 'Страница'
};

export default Title;
