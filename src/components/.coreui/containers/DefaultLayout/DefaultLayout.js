import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';

import { compose } from 'recompose';
import * as ROLES from '../../../../constants/roles';
import { withFirebase } from '../../../.app-core/Firebase';
import { AuthUserContext, withAuthorization } from '../../../.app-core/Session';


import {
  AppFooter,
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
} from '@coreui/react';
// routes config
import routes from '../../../../constants/routes';

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router}/>
            <Container fixed>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

const condition = authUser => authUser && authUser.roles.length > 0 && (!!authUser.roles.includes(ROLES.ADMIN)|| !!authUser.roles.includes(ROLES.SUPERADMIN));
export default compose(withAuthorization(condition), withFirebase)(DefaultLayout);
