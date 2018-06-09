import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { Reference } from '@firebase/database-types';

export class User {
  public userListRef: Reference;
  constructor() {
    this.userListRef = firebase
      .database().ref(`/userProfiles`);
  }

  loginUser(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string): Promise<any> { return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password) .then(newUserCredential => {
      const [name] = email.split('@');
      firebase
        .database() .ref(`/userProfiles/${newUserCredential.user.uid}/userDetails`) .set({email, name});
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
