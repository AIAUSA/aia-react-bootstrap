import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'


class NoAccess extends Component {


  componentDidMount() {
    // var email = 'andygarrettathletesinactionorg'
    // this.props.firebase.checkRole(email).on('value', snapshot => {
    //   const roles = snapshot.val();
    //   console.log(roles.role);
    // })
  }

  render() {

    return (
      <div className="center-text form-base">
        <FontAwesomeIcon icon={faTimesCircle} size="10x" className="mt-3 mb-3" />
        <h1>Sorry!</h1>
        <p>You have insufficent rights to the page you are trying to access.</p>
      </div>
    )
  }
}

export default NoAccess;