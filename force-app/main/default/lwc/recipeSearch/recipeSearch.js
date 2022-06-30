import { LightningElement,api, wire } from 'lwc';
import getRandomRecipe from "@salesforce/apex/RESTApiSpoonacular.getRandomRecipe";
import getRecipeByIngredients from "@salesforce/apex/RESTApiSpoonacular.getRecipeByIngradient";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RecipeSearch extends LightningElement {

    recipes=[]
    isRecipeFound=false
    timer
    serachKey
    
    fetchRandomRecipe(){
        getRandomRecipe()
        .then((data)=>{
            this.recipes = JSON.parse(data)  && JSON.parse(data).recipes ? JSON.parse(data).recipes : [];
            console.log('recipe >> ' ,this.recipes)
           
        }).catch(error=>{
            console.error(error)
        })
    }

    fetchRecipesByIngredients(){
        const ingradient = this.template.querySelector(".ingredient-input").value;
        
        if(ingradient){
            getRecipeByIngredients({ingradient})
            .then((data)=>{
                this.recipes = JSON.parse(data) 
                console.log('recipe by ingradient >> ' ,this.recipes)
            }).catch(error=>{
                console.error(error)
            })
        }else{
            console.log('please add your search')
            this.recipes = []
            this.showToast('Info','Please add your search','info')
        }
    }


    fetchIngradient(event){
        const {value} = event.target
       
        window.clearTimeout(this.timer)
        if(value){
            window.setTimeout(()=>{
                this.serachKey= value
            },500)
        }else{
            this.serachKey = ''
        }
        // const ingradientSearch = this.template.querySelector('.ingredient-input');
         console.log('ingradient keyword ' ,this.serachKey)
    }

    showToast(title,message,variant) {
        const event = new ShowToastEvent({
            title,message,variant
         });
        this.dispatchEvent(event);
    }
}