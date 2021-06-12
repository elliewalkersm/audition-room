import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../views/Home';
import Projects from '../views/Projects';
import Actors from '../views/Actors';
import NotFound from '../views/NotFound';
import SingleProject from '../views/SingleProject';

function Routes({ user }) {
  const PrivateRoute = ({ component: Component, ...rest }) => {
    // when we call this function in the return, it is looking for an argument. `props` here is taco.
    const routeChecker = (taco) => (user
      ? (<Component {...taco} user={user} />)
      : (<Redirect to={{ pathname: '/', state: { from: taco.location } }} />));
      // this render method is one we can use instead of component. Since the components are being dynamically created, we use render. Read the docs for more info: https://reactrouter.com/web/api/Route/render-func
    // Just like in the routes if we want the dynamically rendered component to have access to the Router props, we have to pass `props` as an argument.
    return <Route {...rest} render={(props) => routeChecker(props)} />;
  };

  return (
    <div className='content-containter'>
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <PrivateRoute exact path="/projects" user={user} component={() => <Projects user={user}/>} />
        <PrivateRoute exact path="/actors" user={user} component={() => <Actors user={user} />} />
        <PrivateRoute exact path="/projects/:firebaseKey" user={user} component={() => <SingleProject user={user}/>} />
        <PrivateRoute exact path="*" component={() => <NotFound />} />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  component: PropTypes.func,
  projects: PropTypes.array,
  setProjects: PropTypes.func,
  user: PropTypes.any
};

export default Routes;
