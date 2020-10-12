import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Page1 from './Components/Page1/index';
import Page2 from './Components/Page2/index';
import Page3 from './Components/Page3/index';
import SingForm from './Components/SingForm';

const Router = () => {
  return (
    <>
      <Route path="/" exact component={SingForm} />
      <Route path="/page_1" component={Page1} />
      <Route path="/page_2" component={Page2} />
      <Route path="/page_3" component={Page3} />
      <Redirect to="/" />
    </>
  );
};

export default Router;
