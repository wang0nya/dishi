import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RecipeProvider } from "../../providers";
import { Api } from "../../providers";
import { Chart } from 'chart.js';

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
  @ViewChild('barCanvas') barCanvas;
  barChart: any;
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
    this.serving = encodeURIComponent(this.currentRecipe.serves);
    this.api.get(this.ingredients, this.serving)
      .then(data => {
        this.data = data;
        this.barChart = new Chart(this.barCanvas.nativeElement, {

          type: 'horizontalBar',
          data: {
            labels: ["Fat", "Carbs", "Fiber", "Protein", "Sugars"],
            datasets: [{
              label: 'Total Nutrients (g)',
              data: [
                this.data.totalNutrients.FAT.quantity,
                this.data.totalNutrients.CHOCDF.quantity,
                this.data.totalNutrients.FIBTG.quantity,
                this.data.totalNutrients.PROCNT.quantity,
                this.data.totalNutrients.SUGAR.quantity
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
                // 'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
                // 'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero:true
                }
              }]
            }
          }

        });
      });
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
