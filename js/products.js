function showProductsList(array){
    let contenido = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];

        contenido += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.desc + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +`</h4>
                        <small class="text-muted">` + product.soldCount + ` artículos</small>
                    </div>
                    <div>` + product.description + `</div>
                    <br>
                    <div class="price">  `+ product.currency + ' ' + product.cost + ` </div>
                </div>
            </div>
        </div>
        `
    }
    document.getElementById("producto").innerHTML = contenido;
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok" )
        {
        showProductsList(resultObj.data);
        }

    })
})

