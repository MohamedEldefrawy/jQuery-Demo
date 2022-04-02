$(document).ready(function () {

    let productsArea = $('#Products');
    let cartArea = $('#Cart');

    $.ajax({
        type: "GET",
        url: "http://localhost:3000/items",
        success: function (response) {
            for (const datum of response.data) {
                let mealElement = `
                            <section class="card">
                                <div class="card-image-container">
                                    <img class="card-img" src="${datum.image}" alt="card-image">
                                </div>
                    
                                <h1 class="card-title">
                                   ${datum.name}
                                </h1>
                    
                                <div class="card-info">
                                    ${datum.description}
                                </div>
                    
                                <div class="card-price-info">
                                    ${datum.price}
                                </div>
                    </div>`;
                console.log(datum.image);
                productsArea.append(mealElement);

            }
        },
        error: function (error) {
            console.log(error);

        },
        complete: function () {
            $(".card").draggable({
                helper: "clone",
                revert: 'invalid',
                cursorAt: {left: 0},
                axis: "x",
                containment: "#GridContainer",
                cursor: "move",
            });

            $('#Cart').droppable({
                accept: ".card",
                drop: function (event, target) {
                    let droppedItem = $(target.draggable).clone();
                    $(this).append(droppedItem);
                }
            })
        }
    });


});