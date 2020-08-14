var productsArray = [];

function showProductsList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let products = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + products.imgSrc + `" alt="` + products.desc + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        
                        <h4 class="mb-1">`+ products.name +`</h4>
                        <small class="text-muted">` + products.soldCount + ` artículos</small>
                    </div>
                    <div>` + products.description + `</div>
                    <br>
                    <div class="price"> ` + products.cost + ' ' + products.currency + ` </div>
                </div>
            </div>
        </div>
        `
        document.getElementById("producto").innerHTML = htmlContentToAppend;
    }
}
document.addEventListener("DOMContentLoaded", function (e) {


            getJSONData(PRODUCTS_URL).then(function(resultObj) {
                if (resultObj.status === "ok" )
                {
                productsArray = resultObj.data,
                showProductsList(productsArray);
            }

            })
        })