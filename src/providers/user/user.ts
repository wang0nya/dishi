import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export class User {

  constructor() { }

  loginUser(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string): Promise<any> { return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password) .then(newUserCredential => {
      firebase
        .database() .ref(`/userProfile/${newUserCredential.user.uid}/email`) .set(email);
    })
    .catch(error => { console.error(error); throw new Error(error);
    }); }

  resetPassword(email:string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    const userId: string = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`/userProfile/${userId}`)
      .off();
    return firebase.auth().signOut();
  }
}
