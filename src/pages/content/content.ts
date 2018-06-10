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
  public toggled: boolean = false;
  public loadedRecipeList:Array<any>;
  constructor(public navCtrl: NavController, public recipeProvider: RecipeProvider) {
    this.toggled = false;
  }
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
      this.loadedRecipeList = this.recipeList;
    });
  }
  toggle(): void {
    this.toggled = !this.toggled;
  }
  initializeItems(): void {
    this.recipeList = this.loadedRecipeList;
  }
  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.recipeList = this.recipeList.filter((v) => {
      if(v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.recipeList.length);

  }
}
