import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RecipeProvider } from "../../providers";
import { Api } from "../../providers";

/**
 * Generated class for the AnalyzePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-analyze',
  templateUrl: 'analyze.html',
})
export class AnalyzePage {
  public currentRecipe: any = {};
  data: any;
  ingredients: any;
  serving: any;
  constructor(public navCtrl: NavController, public viewCtrl : ViewController ,public navParams: NavParams
    , public recipeProvider: RecipeProvider, public api: Api) {
    //
  }

  ionViewDidLoad() {
    this.recipeProvider
      .getRecipeDetail(this.navParams.get("recipeId")) .on("value", recipeSnapshot => {
      this.currentRecipe = recipeSnapshot.val();
      this.currentRecipe.id = recipeSnapshot.key;
    });
    this.getData();
    console.log('ionViewDidLoad AnalyzePage');
  }

  getData() {
    this.ingredients = encodeURIComponent(this.currentRecipe.ingredients);
    this.serving = encodeURIComponent(this.currentRecipe.serving);
    this.api.get(this.ingredients, this.serving)
      .then(data => {
        this.data = data;
        console.log('data ==>',this.data);
      });
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
