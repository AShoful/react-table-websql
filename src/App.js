import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import Router from './Router';

import './App.css';
import themeObject from './utills/themes';

const theme = createMuiTheme(themeObject);

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Router />
      </MuiThemeProvider>
    </div>
  );
}

export default App;
