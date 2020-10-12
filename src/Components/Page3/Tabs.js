import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import TextFields from './TextFields';
import ContactBook from './ContactBook';

const initialContact = {
  name: '',
  lastName: '',
  phone: '',
  email: ''
};

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginTop: 20
  },
  tabList: {
    maxWidth: 300,
    margin: '0 auto'
  }
}));

export default function LabTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState('1');
  const [contact, setContact] = React.useState(initialContact);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <TabContext value={value}>
        <TabList onChange={handleChange} className={classes.tabList}>
          <Tab
            label="Добавить"
            value="1"
            onClick={() => setContact(initialContact)}
          />
          <Tab label="Список" value="2" />
        </TabList>
        <TabPanel value="1">
          <TextFields contact={contact} />
        </TabPanel>
        <TabPanel value="2">
          <ContactBook setContact={setContact} setValue={handleChange} />
        </TabPanel>
      </TabContext>
    </div>
  );
}
