import React from 'react';

import { withAuthorization } from '../Session'

const Home = () => (
  <div>
    <h1>Home</h1>
    <p>Every authenticated user can see this page!</p>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);