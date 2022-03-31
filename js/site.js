$(document).ready(function () {

    let productsArea = $('#Products');
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/items",
        success: function (response) {
            console.log(response.data)
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
                                    ${datum.price.toString()}$
                                </div>
                    </div>`;
                console.log(datum.image);
                productsArea.append(mealElement);

            }
        },
        error: function (error) {
            console.log(error);

        }
    });
});