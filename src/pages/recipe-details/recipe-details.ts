import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { RecipeProvider } from "../../providers";
import marked from 'marked';

/**
 * Generated class for the RecipeDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({
  segment: "recipe-detail/:recipeId"
})
@Component({
  selector: 'page-recipe-details',
  templateUrl: 'recipe-details.html',
})
export class RecipeDetailsPage {
  @ViewChild(Content) content: Content;
  public currentRecipe: any = {};
  public markdownText: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public recipeProvider: RecipeProvider) {
  }

  ionViewDidLoad() {
    this.recipeProvider
      .getRecipeDetail(this.navParams.get("recipeId")) .on("value", recipeSnapshot => {
      this.currentRecipe = recipeSnapshot.val();
      this.currentRecipe.id = recipeSnapshot.key;
      this.markdownText = marked(recipeSnapshot.val().method.toString());
      this.content = this.markdownText
      });
    console.log('ionViewDidLoad RecipeDetailsPage');
  }

}
