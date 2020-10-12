import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import VirtualScroolList from './VirtualScrollList';
import { data } from '../function';
import Title from '../Title';

const useStyles = makeStyles((theme) => ({
  button: {
    height: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    position: 'absolute',
    border: '2px solid grey',
    borderRadius: 20,
    padding: 30,
    top: 50,
    left: 30,
    right: 30,
    backgroundColor: theme.palette.common.white,
    zIndex: theme.zIndex.modal
  },
  buttonGroup: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-around'
  }
}));

const Page1 = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Title title="Страница 1" />
      {!open && (
        <div className={classes.button}>
          <Button color="primary" variant="contained" onClick={handleOpen}>
            Открыть окно
          </Button>
        </div>
      )}
      {open && (
        <div className={classes.paper}>
          <VirtualScroolList data={data} rowHeight={40} visibleRows={6} />
          <ButtonGroup className={classes.buttonGroup} size="small">
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <Button color="primary" variant="contained" onClick={handleClose}>
              Ok
            </Button>
          </ButtonGroup>
        </div>
      )}
    </>
  );
};

export default Page1;
