import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { RecipeProvider } from "../../providers";
import {RecipeDetailsPage} from "../recipe-details/recipe-details";

@IonicPage()
@Component({
  selector: 'page-content',
  templateUrl: 'content.html'
})
export class ContentPage {
  public recipeList: Array<any>;
  constructor(public navCtrl: NavController, public recipeProvider: RecipeProvider) { }
  goToRecipeDetails(recipeId):void{
    this.navCtrl.push('RecipeDetailsPage', {recipeId: recipeId});
  }
  ionViewDidLoad() {
    this.recipeProvider.getRecipeList().on("value", recipeListSnapshot => {
      this.recipeList = []; recipeListSnapshot.forEach(snap => {
        this.recipeList.push({
          id: snap.key,
          name: snap.val().name, ingredients: snap.val().ingredients, description: snap.val().description,
          method: snap.val().method, likes_count: snap.val().likes_count, imgurl: snap.val().imgurl
        });
        return false;
      });
    });
  }
}
