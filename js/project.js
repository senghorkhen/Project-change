function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(function () {
    getApi();
    $('#recipe').on('change', function () {
        var rcipeId = $('#recipe').val();
        eachRecipe(rcipeId);
    });
});

// gteApi
function getApi() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
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
        if (item.id == id) {
            var step = item.instructions;
            var cutStep = step.split("<step>");
             // showScutSteptep
            result = "";
            for(var i = 1;i<cutStep.length;i++){
                result += `
                <p class="text-primary">Step ${i}</p>
                <p>${cutStep[i]}</p>
            `;
            $("#instruction_project").html(result);
            }   

            // showRecipe
            showRecipe(item.name, item.iconUrl, item.nbGuests);

            // showIngredient
            showIngredient(item.ingredients);  
        }
    });
}

// showRecipe
function showRecipe(name, img) {
    var result = "";
    result += `
    <div class="row">
    <div class="col-3"></div>
    <div class="col-3"><h3>${name}</h3></div>
    <div class="col-3"><img src="${img}"width="100"></div>
    <div class="col-3"></div>
    </div>
    
    <div class="container mt-5">
    <div class="row">
        <div class="col-2"></div>
        <div class="col-4">
            <h5>Number of persons</h5>
        </div>
        <div class="col-4">
        <div class="input-group mb-3">
        <div class="input-group-prepend">
            <button class="btn btn-primary" type="button" id="minus">&minus;</button>
        </div>
        <input type="number" class="form-control text-center" value="0" disabled id="member_project" max="15"
            min="0">
        <div class="input-group-append">
            <button class="btn btn-success" type="button" id="add">&#x2b;</button>
        </div>
        </div>
        <div class="col-2"></div>
    </div>
</div>

    <div class="container mt-5">
    <div class="row">
        <div class="col-2"></div>
        <div class="col-4">
            <h5 class="text-center">Ingredients</h5></div>
        <div class="col-4">
            <h5>Instructions</h5>
        </div>
        <div class="col-2"></div>
    </div>
    </div>
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
    $('#ingradiants_project').html(ingredient);
}

//  // get number of person 
//  function numberOfPerson(Guests) {
//     const{nbGuests} = Guests;
//     var person = "";
//     person += `
//     <div class="col-2 mb-3"></div>
//     <div class="col-4">
//         <h4>Number of Person</h4>
//     </div>
//     <div class="col-4">
//         <div class="input-group">
//             <div class="input-group-prepend">
//                 <button id="minus" type="button"
//                     class="btn btn-primary">&nbsp&nbsp&nbsp&nbsp-&nbsp&nbsp&nbsp&nbsp</button>
//             </div>
//             <input type="text" id="input" style="width:115px" class="text-center" value="${nbGuests}" disabled>
//             <div class="input-group-prepend">
//                 <button type="button" id="sum"
//                     class="btn btn-success">&nbsp&nbsp&nbsp&nbsp+&nbsp&nbsp&nbsp&nbsp</button>
//             </div>
//         </div>
//     </div>
//     <div class="col-2"></div><br><br><br>
// `;
// // diplay number of person in value input
// $("#people").html(person);

// // function click on icon sum
// $("#sum").on('click', function () {
//     var number = parseInt($("#input").val());
//     sum(number);
// });
// // function click on icon minus
// $("#minus").on('click', function () {
//     var number = parseInt($("#input").val());
//     minus(number);
// });
// }