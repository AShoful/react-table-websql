import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';

import { openDb, readTable, deleteRow } from '../apiDb';

const mydb = openDb('myDb');

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginTop: 20,
      overflow: 'auto'
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    icon: {
      marginRight: 5,
      cursor: 'pointer'
    },
    divider: {
      height: 14,
      marginLeft: 0,
      marginBottom: 14,
      marginTop: 14,
      marginRight: 0
    },
    thead: {
      fontSize: 20,
      backgroundColor: theme.palette.divider,
      padding: 3
    },
    table: {
      borderCollapse: 'collapse',
      width: '100%',
      fontSize: 16
    },
    td: {
      paddingLeft: 5,
      border: '1px solid lightgray'
    }
  };
});

function ContactBook({ setContact, setValue }) {
  const [rows, setRows] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const classes = useStyles();

  React.useEffect(() => {
    const res = readTable(mydb);
    res.then((result) => {
      if (Array.isArray(result)) {
        setRows(result);
      }
    });
  }, []);

  const handleDelete = (filter) => {
    const isBoss = global.confirm('Ты здесь главный?');
    if (isBoss) {
      setRows((prev) => {
        return prev.filter((i) => i.id !== filter);
      });
      deleteRow(mydb, filter);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleEdit = (e, item) => {
    setContact(item);
    setValue(e, '1');
  };

  const searchResult = rows.filter((i) =>
    i.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={classes.root}>
      <Paper component="form" className={classes.root}>
        <SearchIcon fontSize="small" />
        <InputBase
          className={classes.input}
          placeholder="Search Contact Book"
          onChange={(e) => handleSearch(e)}
          value={search}
        />
        <Divider className={classes.divider} />
      </Paper>
      <table className={classes.table}>
        <thead className={classes.thead}>
          <tr>
            <td
              style={{ width: '45%', textAlign: 'center' }}
              className={classes.td}
            >
              ФИО
            </td>
            <td
              style={{ width: '40%', textAlign: 'center' }}
              className={classes.td}
            >
              Телефоны
            </td>
            <td
              style={{ width: '15%', textAlign: 'center' }}
              className={classes.td}
            >
              Actions
            </td>
          </tr>
        </thead>
        <tbody>
          {searchResult.map((item) => (
            <tr key={item.id}>
              <td className={classes.td}>{item.fullName}</td>
              <td className={classes.td}>{item.phone}</td>
              <td className={classes.td}>
                <DeleteIcon
                  className={classes.icon}
                  fontSize="small"
                  onClick={() => handleDelete(item.id)}
                />
                <EditIcon
                  className={classes.icon}
                  fontSize="small"
                  onClick={(e) => handleEdit(e, item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

ContactBook.propTypes = {
  setContact: PropTypes.func,
  setValue: PropTypes.func
};

ContactBook.defaultProps = {
  setContact: () => {},
  setValue: () => {}
};

export default ContactBook;
