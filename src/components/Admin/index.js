import React, { Component } from 'react';

import { compose } from 'recompose';

import * as ROLES from '../../constants/roles';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Table, Row, Input } from 'reactstrap';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
      newUser: ''
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  deleteUser = (uid, evt) => {
    console.log("Trashed " + uid);
    this.props.firebase.user(uid).remove();
  }

  addUser = () => {
    var email = this.state.newUser.replace("@", "").replace(/\./g,"");
    this.props.firebase.checkRole(email).set({ role: 'ADMIN' });
    this.setState({newUser: '' });
  }

  handleInputChange = event => {
    this.setState({newUser: event.target.value });
  }

  render() {
    const { users, loading } = this.state;
    return (
      <div>
        <Row>
          <h2>User Administration</h2>
          {loading && <div>Loading ...</div>}
        </Row>
        <Row>
          <div className="col mb-2">
            <div className="float-right">
              <input type="email" value={this.state.newUser} onChange={this.handleInputChange} />
              <button onClick={(evt) => this.addUser("Test")}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        </Row>
        <UserList users={users} deleteUser={this.deleteUser}/>
      </div>
    );
  }
}

const UserList = ({ users, deleteUser }) => (
  <Row>
    <Table striped={true}>
      <thead>
        <tr>
          <th>User Name</th>
          <th>Email</th>
          <th>Roles</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
            <tr key={user.uid}>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.roles}</td>
              <td>
                {user.roles !== ROLES.SUPERADMIN &&
                  <button onClick={(evt) => deleteUser(user.uid, evt)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Row>
);

const condition = authUser => authUser && authUser.roles.length > 0 && (!!authUser.roles.includes(ROLES.ADMIN) || !!authUser.roles.includes(ROLES.SUPERADMIN));

export default compose(withAuthorization(condition), withFirebase)(AdminPage);