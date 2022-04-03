$(document).ready(function () {

    let productsArea = $('#Products');
    let cart = [];

    $.ajax({
        type: "GET",
        url: "http://localhost:3000/items",
        success: function (response) {
            for (const datum of response.data) {
                let mealElement = `
                            <section id="${datum.id}" class="card">
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
                                    $${datum.price}
                                </div>
                                <div class="card-count">
                                    <span style="font-size: 1rem">X</span>1
                                </div>
                                
                                <input type="button" value="Add" class="btn btn-add">
                                <input type="button" value="Remove" class="btn btn-remove d-none">
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
                containment: "#GridContainer",
                cursor: "move",
            });

            $('#Cart').droppable({
                accept: ".card",
                drop: function (event, target) {
                    let droppedItem = $(target.draggable).clone();

                    if (cart.findIndex(value => {
                            return value.id === droppedItem[0].id;
                        }
                    ) > -1) {
                        let index = cart.findIndex(value => {
                                return value.id === droppedItem[0].id;
                            }
                        )
                        cart[index].count++;
                        // console.log($("#Cart" + ' #' + cart[index].id + " .card-count")[0].lastChild);
                        $("#Cart" + ' #' + cart[index].id + " .card-count")[0].lastChild.textContent = cart[index].count;

                    } else {
                        // console.log(droppedItem);
                        cart.push({id: droppedItem[0].id, count: 1});
                        console.log(cart);
                        $(this).append(droppedItem);
                    }
                }
            });

            $(".card").on("click", ".btn-add", function () {
                console.log("Fired");
            });
        }
    });
});