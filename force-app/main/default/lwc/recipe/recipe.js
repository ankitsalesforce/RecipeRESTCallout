import { LightningElement,api,wire } from 'lwc';
import getRecipe from '@salesforce/apex/RESTApiSpoonacular.getRecipe';

export default class Recipe extends LightningElement {

    @api image;
    @api title;
    @api price;
    @api time;
    @api summary;
    @api recipeId;
    dietList
    dishTypeList
    
   
    fetchDetails(){
            console.log('recipeId ' ,this.recipeId)
        getRecipe({recipeId:this.recipeId})
        .then((data)=>{
            console.log('data',data)
            
            const recipe = JSON.parse(data)
            if(recipe){
                this.image = recipe.image;
                this.title = recipe.title;
                this.price = recipe.pricePerServing;
                this.time = recipe.readyInMinutes;
                this.dishTypeList = recipe.dishTypes && recipe.dishTypes.join();
                this.dietList = recipe.diets && recipe.diets.join();
                this.summary = recipe.summary;
            }
        }).catch(error=>{
            console.error(error)
        })
    
        }
        
    
    @api 
    set dishType(data){
        this.dishTypeList = data && data.join(); 
    }

    get dishType(){
        return this.dishTypeList;
    }

    @api
    set diets(data){
        this.dietList = data && data.join();
    }
    get diets(){
        return this.dietList;
    }

    get hasDetails() {
        return this.summary ? true : false;
      }
    
}