const ORDER_ASC_BY_COST = "$ Asc";
const ORDER_DESC_BY_COST = "$ Desc";
const ORDER_DESC_BY_RELEV = "Rel.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var products = undefined;
var searchCriteria;

function sortProducts(criteria, array){
    let result = [];
    let productos = [...array];

    switch(criteria) {
        case ORDER_ASC_BY_COST:
            // Ordenar por costo ascendente
            result = productos.sort(function(a, b) {
                if ( a.cost < b.cost ){ return -1; }
                if ( a.cost > b.cost ){ return 1; }
                return 0;
            });
            showProductsList(result);
            break;
        case ORDER_DESC_BY_COST:
            // Ordenar por costo descendente
            result = productos.sort(function(a, b) {
                if ( a.cost > b.cost ){ return -1; }
                if ( a.cost < b.cost ){ return 1; }
                return 0;
            });
            showProductsList(result);
            break;
        case ORDER_DESC_BY_RELEV:
            // Ordenar por relevancia (cantidad de vendidos)
            result = productos.sort(function(a, b) {
                if (a.soldCount > b.soldCount) {
                    return -1;
                }
                if (a.soldCount < b.soldCount) {
                    return 1;
                }
                return 0;
            });
            showProductsList(result);
            break;
    }

    return result;
}

function showProductsList(array) {
    let contenido = "";

    for(let i = 0; i < array.length; i++){
        let product = array[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
        ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount)) &&
        (((typeof searchCriteria === 'undefined') || searchCriteria === "") || (product.name.toLowerCase().indexOf(searchCriteria) !== -1 || product.description.toLowerCase().indexOf(searchCriteria) !== -1))) {
            contenido += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
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
    }
    document.getElementById("productitos").innerHTML = contenido;
}


function sortAndShowProducts(sortCriteria, productsArray){
    sortProducts(sortCriteria, productsArray);
}

//Función que se ejecuta una vez que se haya lanzado el evento dfe
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok" ) {
            products = resultObj.data;   // Esto se usa para guardar toda la data del JSON en una variable "products"
            showProductsList(products);
        }
    });

    // Evento onclick del boton sortAsc
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST, products);
    });

    // Evento onclick del boton sortDesc
    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST, products);
    });

    // Evento onclick del boton sortByCount
    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_RELEV, products);
    });

    // Evento onclick del boton Limpiar
    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        // Limpiar todas las clases de previo marcado
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
        document.getElementById("searchInput").value = "";
        document.getElementById("sortAsc").classList.remove("active");
        document.getElementById("sortAsc").classList.remove("focus");
        document.getElementById("sortDesc").classList.remove("active");
        document.getElementById("sortDesc").classList.remove("focus");
        document.getElementById("sortByCount").classList.remove("active");
        document.getElementById("sortByCount").classList.remove("focus");
        document.getElementById("searchInput").classList.remove("active");
        document.getElementById("searchInput").classList.remove("focus");

        // Reiniciar valores de maxCount, minCount, y searchCriteria
        minCount = undefined;
        maxCount = undefined;
        searchCriteria = undefined;

        // Volvemos a mostrar la lista sin los filtros
        showProductsList(products);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        // En caso de que minCount y maxCount no esten definidos o esten vacios, no ejecutar nada.
        if ((typeof minCount === 'undefined' || minCount === "") || typeof maxCount === 'undefined' || maxCount === "") {
            return;
        }

        if (typeof minCount !== 'undefined' && minCount !== "" && parseInt(minCount) >= 0) {
            minCount = parseInt(minCount);
        }

        if (typeof maxCount !== 'undefined' && maxCount !== "" && parseInt(maxCount) >= 0) {
            maxCount = parseInt(maxCount);
        }

        showProductsList(products);
    });

    // Evento onclick del search input
    document.getElementById("searchInput").addEventListener('keyup', function(event) {
        // Transformamos el valor del input a lowercase para que nuestra busqueda no sea case sensitive
        searchCriteria = event.target.value.toLowerCase();
        showProductsList(products);
    })
});
