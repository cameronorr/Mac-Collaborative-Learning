import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import QuestionState from './context/question/QuestionState';
import AuthState from './context/auth/AuthState';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
// import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import QuestionForm from './components/questions/QuestionForm';

const App = () => {
  return (
    <div className='App'>
      <AuthState>
        <QuestionState>
          <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Switch>
                  <Route exact path='/' component={Home} />
                  {/** <Route exact path='/about' component={About} /> */}
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/questionForm' component={QuestionForm} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </QuestionState>
      </AuthState>
    </div>
  );
};

export default App;
