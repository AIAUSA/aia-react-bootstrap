import app from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyA6KrMZnc2VKcLrYj1pOLhVFo0wHxBzphg",
    authDomain: "aia-opps.firebaseapp.com",
    databaseURL: "https://aia-opps.firebaseio.com",
};


class Firebase {
    constructor() {
      app.initializeApp(config);

      this.auth = app.auth();
      this.db = app.database();

      this.googleProvider = new app.auth.GoogleAuthProvider();
      
    }

    


    doSignInWithGoogle = () =>
        this.auth.signInWithPopup(this.googleProvider);

    doSignOut = () => this.auth.signOut();
    
    // *** Merge Auth and DB User API *** //

    onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();
            
            // default empty roles
            if (dbUser !== null) 
            {
              if (!dbUser.roles) {
                dbUser.roles = {};
              }
            }

      
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API *** DO NOT MODIFY
  username = () => this.auth.currentUser.email;
  user = uid => this.db.ref(`admin/users/${uid}`);
  users = () => this.db.ref('admin/users');
  checkRole = email => this.db.ref(`admin/roles/${email}`);
}
 
export default Firebase;
  