$(document).ready(function () {
    getApi();
    $('#recipe').on('change', function () {
        var rcipeId = $('#recipe').val();
        eachRecipe(rcipeId);

    });
});

// function click on icon plus
$("#add").on('click', function () {
    var member = $("#member_project").val();
    add(member);
    var seclect = $('#recipe').val();
    updateRecipe(seclect,member);
});

// function click on icon minus
$("#minus").on('click', function () {
    var member = $("#member_project").val();
    minus(member);
    var seclect = $('#recipe').val();
    updateRecipe(seclect,member);
});

function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}

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
$('#action').hide();
$('#num').hide();
$('#card').hide();

// function for loop data from array variable
var oldGuests;
function eachRecipe(id) {
    allData.forEach(item => {
        if (item.id == id) {
            recipeimage(item.name,item.iconUrl);

            //step
            getStep(item.instructions);

            // showIngredient
            showIngredient(item.ingredients);
            $('#action').show();
            $('#member_project').val(item.nbGuests);

            // oldGuest
            oldGuests = $('#member_project').val();
        }
    });
    $('#num').show();
}

// updateRecipe
function updateRecipe(seclect,member) {
    allData.forEach(item => {
        if (item.id == seclect) {
            recipeimage(item.name,item.iconUrl);

            //step
            getStep(item.instructions);

            // showIngredient
            updateIngredient(item.ingredients,member);
            $('#action').show();
        }
    });
}

//recipeimage
function recipeimage(name, image){

    var recipe = "";
    recipe += `
    ${name}
    <img src="${image}" width = "100" class = "rounded-circle">
    `;
    $('#recipes').html(recipe);
}

//step
function getStep(step) {
    var cutStep = step.split("<step>");
    // showScutSteptep
    result = "";
    for (var i = 1; i < cutStep.length; i++) {
        result += `
        <p class="text-primary">Step ${i}</p>
        <p>${cutStep[i]}</p>
    `;
        $("#instruction_project").html(result);
    }
}

// get ingrediant
function showIngredient(ing) {
    var ingredient = "";
    ing.forEach(item => {
        ingredient += `
        <table class="striped">
        <tr>
            <td><img src="${item.iconUrl}" width="50" class ="rounded-circle"></td>
            <td>${item.quantity}</td>
            <td>${item.unit[0]}</td>
            <td>${item.name}</td>
        </tr>
        </table>
        `;
    });
    $('#ingradiants_project').html(ingredient);
    $('#card').show();
}

// updateIngredient
function updateIngredient(ing,member) {
    var ingredient = "";
    ing.forEach(item => {
        var update = item.quantity * parseInt(member) / oldGuests;
        ingredient += `
        <tr>
            <td><img src="${item.iconUrl}" width="50" class ="rounded-circle"></td>
            <td>${update}</td>
            <td>${item.unit[0]}</td>
            <td>${item.name}</td>
        </tr>
        `;
    });
    $('#ingradiants_project').html(ingredient);
}

// increase value when click on icon add
function add(num) {
    var numAdd = parseInt(num) + 1;
    if (numAdd <= 15) {
        $("#member_project").val(numAdd);
    }
}

// decrease value when click on icon minus
function minus(num) {
    var minus = parseInt(num) - 1;
    if (minus >= 0) {
        $("#member_project").val(minus);
    }
}