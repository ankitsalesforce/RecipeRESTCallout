public class RESTApiSpoonacular {
    
    private static final String SPOONACULAR_API = 'https://api.spoonacular.com';
    private static final string API_KEY = '711c6c275da54c9e897f85cf7c389f6e';
    
    //getRandomRecipeInfo
    @AuraEnabled
    public static string getRandomRecipe(){
        
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(SPOONACULAR_API+'/recipes/random?apiKey='+API_KEY);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        
        system.debug('RequestCode => '+response.getStatusCode());
        // If the request is successful, parse the JSON response.
        if(response.getStatusCode() == 200) {
            system.debug('Response >> ' +response.getBody().length());
            return response.getBody();
        }
        return '';
    }
    
    //getRecipeInfo
    @AuraEnabled
    public static string getRecipe(string recipeId){
        
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(SPOONACULAR_API+'/recipes/'+recipeId+'/information?apiKey='+API_KEY);
        //https://api.spoonacular.com/recipes/{id}/information
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        
        system.debug('RequestCode => '+response.getStatusCode());
        // If the request is successful, parse the JSON response.
        if(response.getStatusCode() == 200) {
            system.debug('Response >> ' +response.getBody());
            return response.getBody();
        }
        return '';
    }
    
    //GetRecipeByIngradient 
    @AuraEnabled
    public static string getRecipeByIngradient(string ingradient){
        
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(SPOONACULAR_API+'/recipes//findByIngredients?apiKey='+API_KEY+'&ingredients='+ingradient);
        //https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        
        system.debug('RequestCode => '+response.getStatusCode());
        // If the request is successful, parse the JSON response.
        if(response.getStatusCode() == 200) {
            system.debug('Response >> ' +response.getBody());
            return response.getBody();
        }
        return '';
    }

}