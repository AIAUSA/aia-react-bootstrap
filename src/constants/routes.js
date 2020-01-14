import React from 'react';

const Dashboard = React.lazy(() => import('../components/Home/'));
const Account = React.lazy(() => import('../components/Account/'));
const Admin = React.lazy(() => import('../components/.shared/Admin/'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/admin', name:'Admin', component: Admin },
  { path: '/account', name:'Account', component: Account },
];

export default routes;
