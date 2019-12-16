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
    $('#css').hide();
}

function eachRecipe(id) {
    allData.forEach(item => {
        if (item.id == id) {
            var step = item.instructions;
            var cutStep = step.split("<step>");
            // showScutSteptep
            result = "";
            for (var i = 1; i < cutStep.length; i++) {
                result += `
                <p class="text-primary">Step ${i}</p>
                <p>${cutStep[i]}</p>
            `;
                $("#instruction_project").html(result);
                $('#css').show();
            }

            // showRecipe
            showRecipe(item.name, item.iconUrl, item.nbGuests);

            // showIngredient
            showIngredient(item.ingredients);
        }
    });
}

// showRecipe
function showRecipe(name, img, nbGuests) {
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
            <button type="button" id="minus">&minus;</button>
        </div>
        <input type="number" class="form-control text-center" value="${nbGuests}" disabled id="member_project" max="15"
            min="0">
        <div class="input-group-append">
            <button type="button" id="add">&#x2b;</button>
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

    // function click on icon plus
    $("#add").on('click', function () {
        var num = parseInt($("#member_project").val());
        add(num);
    });
    // function click on icon minus
    $("#minus").on('click', function () {
        var num = parseInt($("#member_project").val());
        minus(num);
    });
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


// increase value when click on icon sum
function add(num) {
    var numAdd = parseInt(num) +1;
    if(numAdd <= 15) {
        $("#member_project").val(numAdd);
        // getGuests($("#member_project").val());
    }
}
// decrease value when click on icon minus
function minus(num) {
    var minus = parseInt(num)-1;
    if(minus >= 1) {
        $("#member_project").val(minus);
        // getGuests($("#member_project").val());
    }
}