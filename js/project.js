function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
 $(document).ready(function() {
     getApi();
     $('#recipe').on('change', function() {
         var rcipeId = $('#recipe').val();
         eachRecipe(rcipeId);
     })
 });

 function getApi() {
     $.ajax({
         dataType: 'json',
         url: getUrl(),
         success: (data) => chooseRecipe(data.recipes), // bos jea array
         error: () => console.log('Cannot get data'),
     });
 }
var allData = [];
 function chooseRecipe(recipe) {
     allData = recipe;
     var option = "";
     recipe.forEach(item => {
         option += `<option value="${item.id}">${item.name}</option>`;
     });
     $('#recipe').append(option);
 }

 function eachRecipe(id) {
     allData.forEach(item => {
         if(item.id == id) {
 // Each Recipe
            // showRecipe
            showRecipe(item.name, item.iconUrl);
            // showIngredient
            showIngredient(item.ingredients);
            // showStep
         }
     });
 }
 
// showRecipe
 function showRecipe(name, img) {
    var result = "";
    result += `<img src="${img}" width="100">
    <h2>${name}</h2>
    `;
    $('#recipe_project').html(result);
 }

 // get ingrediant
 function showIngredient(ing) {
     var ingredient = "";
     ing.forEach(item => {
        ingredient += `
        <tr>
            <td><img src="${item.iconUrl}" width="25" class="img-fluid"></td>
            <td>${item.quantity}</td>
            <td>${item.unit[0]}</td>
            <td>${item.name}</td>
        </tr>
        `;
     });
     $('#ingradiants').html(ingredient);
 }