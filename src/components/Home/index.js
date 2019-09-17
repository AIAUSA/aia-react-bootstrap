import React, {Component} from 'react';
import { compose } from 'recompose';
import { withAuthorization } from '../Session'
import { withFirebase } from '../Firebase';

class Home extends Component {


  componentDidMount() {
    // var email = 'andygarrettathletesinactionorg'
    // this.props.firebase.checkRole(email).on('value', snapshot => {
    //   const roles = snapshot.val();
    //   console.log(roles.role);
    // })
  }

  render() {

    return (
      <div>
        <h1>Home</h1>
        <p>Every authenticated user can see this page!</p>
      </div>
    )
  }
}

const condition = authUser => !!authUser && authUser.roles;

export default compose(withAuthorization(condition), withFirebase)(Home);