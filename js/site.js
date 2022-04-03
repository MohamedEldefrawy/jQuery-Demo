$(document).ready(function () {

    let productsArea = $('#Products');
    let cart = [];
    let totalPrice = 0;
    let totalBill = 0;


    function prepareCartItem(droppedItem) {
        droppedItem.find('.btn-remove').addClass('d-inline-block');
        droppedItem.find('.btn-remove').removeClass('d-none');
        droppedItem.find('.btn-add').addClass('d-none');
        droppedItem.find('.btn-add').removeClass('d-block');
        droppedItem.find('.card-price-info').removeClass('d-none');
        droppedItem.find('.card-price-info').addClass('d-block');
        droppedItem.find('.card-count').addClass('d-block');
        droppedItem.find('.card-count').removeClass('d-none');
    }

    function removeItem(parent) {
        parent.childNodes[13].addEventListener('click', (target) => {
            if (cart.findIndex(value => {
                return value.id === parent.id;
            }) > -1) {
                let index = cart.findIndex(value => {
                    return value.id === parent.id;
                });
                if (cart[index].count > 1) {
                    cart[index].count--;
                    $("#Cart" + ' #' + cart[index].id + " .card-count")[0].lastChild.textContent = cart[index].count;
                    console.log("removing");

                    let price = $("#" + cart[index].id + " .card-price-info")[0].innerText.split("$")[1];
                    totalPrice -= parseFloat(price);
                    totalBill = totalPrice + (totalPrice * 0.14);
                    $("#Price")[0].lastChild.textContent = totalPrice;
                    $("#Total")[0].lastChild.textContent = totalBill;

                } else {
                    let price = $("#" + cart[index].id + " .card-price-info")[0].innerText.split("$")[1];
                    totalPrice -= parseFloat(price);
                    totalBill = totalPrice + (totalPrice * 0.14);
                    $("#Price")[0].lastChild.textContent = totalPrice;
                    $("#Total")[0].lastChild.textContent = totalBill;
                    cart.pop({id: parent.id, count: 1});
                    parent.remove();
                }
            }
        });
    }

    function AddingToCart(cart) {
        $('#Cart').droppable({
            accept: ".card", drop: function (event, target) {
                let droppedItem = $(target.draggable).clone(true);

                let price = $("#" + droppedItem[0].id + " .card-price-info")[0].innerText.split("$")[1];
                totalPrice += parseFloat(price);
                totalBill = totalPrice + (totalPrice * 0.14) + 20;
                $("#Price")[0].lastChild.textContent = totalPrice;
                $("#Total")[0].lastChild.textContent = totalBill;

                removeItem(droppedItem[0]);

                prepareCartItem(droppedItem);

                if (cart.findIndex(value => {
                    return value.id === droppedItem[0].id;
                }) > -1) {
                    let index = cart.findIndex(value => {
                        return value.id === droppedItem[0].id;
                    })
                    cart[index].count++;
                    $("#Cart" + ' #' + cart[index].id + " .card-count")[0].lastChild.textContent = cart[index].count;

                } else {
                    cart.push({id: droppedItem[0].id, count: 1});
                    droppedItem.appendTo($(this));
                }
            }
        });
    }


    $.ajax({
        type: "GET", url: "http://localhost:3000/items", success: function (response) {
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
                                <div class="card-count d-none">
                                    <span style="font-size: 1rem">X</span>1
                                </div>
                                
                                <input type="button" value="Add" class="btn btn-add">
                                <input type="button" value="Remove" class="btn btn-remove d-none">
                    </div>`;
                productsArea.append(mealElement);

            }
        }, error: function (error) {
            console.log(error);

        }, complete: function () {
            $(".card").draggable({
                helper: "clone", revert: 'invalid', cursorAt: {left: 0}, containment: "#GridContainer", cursor: "move",
            });

            AddingToCart(cart);

            $('.card').on("click", ".btn-add", function (target) {

                let clone = target.currentTarget.parentElement.cloneNode(true);
                clone.childNodes[13].classList.remove('d-none');
                clone.childNodes[13].classList.add('d-inline-block');
                clone.childNodes[11].classList.add('d-none');
                clone.childNodes[9].classList.add('d-block');
                clone.childNodes[9].classList.remove('d-none');

                let price = $("#" + clone.id + " .card-price-info")[0].innerText.split("$")[1];
                totalPrice += parseFloat(price);
                totalBill = totalPrice + (totalPrice * 0.14) + 20;
                $("#Price")[0].lastChild.textContent = totalPrice;
                console.log($("#Price")[0].lastChild.textContent);

                $("#Total")[0].lastChild.textContent = totalBill;
                removeItem(clone);
                if (cart.findIndex(value => {
                    return value.id === clone.id;
                }) > -1) {
                    let index = cart.findIndex(value => {
                        return value.id === clone.id;
                    })
                    cart[index].count++;
                    $("#Cart" + ' #' + cart[index].id + " .card-count")[0].lastChild.textContent = cart[index].count;

                } else {
                    cart.push({id: clone.id, count: 1});
                    $("#Cart").append(clone);
                }
            });

        }
    });

});