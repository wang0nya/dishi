import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
import { Reference } from '@firebase/database-types';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {
  public userProfile: firebase.database.Reference;
  public currentUser: User;
  public savedRecipeListRef: Reference;
  constructor(public http: HttpClient) {
    firebase.auth().onAuthStateChanged( user => {
      if(user){
        this.currentUser = user;
        this.userProfile = firebase.database().ref(`/userProfiles/${user.uid}/userDetails/`);
        this.savedRecipeListRef = firebase
          .database().ref(`/userProfiles/${user.uid}/saves`);
      }
    });
    console.log('Hello ProfileProvider Provider');
  }

  getUserProfile(): firebase.database.Reference {
    return this.userProfile;
  }

  getSavedRecipeList(): Reference {
    return this.savedRecipeListRef;
  }
}
