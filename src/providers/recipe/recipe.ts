import { Injectable } from '@angular/core';
import { Reference } from '@firebase/database-types';
import firebase from 'firebase';

/*
  Generated class for the RecipeProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RecipeProvider {
  public recipeListRef: Reference;
  constructor() {
        this.recipeListRef = firebase
          .database().ref(`/recipes`);
  }
  getRecipeList(): Reference {
    return this.recipeListRef;
  }
  getRecipeDetail(recipeId: string): Reference {
    return this.recipeListRef.child(recipeId);
  }

}
