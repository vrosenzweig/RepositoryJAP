//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var products = undefined;



function showImagesGallery(array){

    let htmlContentToAppend = "";

    // Esta función que se ejecuta en el AddEventListener, recorre todo el array (condición array.length) que en este caso sería product.images, con un for
    // recorre todas las imagenes y las agrega a la variable, luego las concatena al string de htmlContentToAppend, y prosigue a agregarlas con
    // innerHTML, a la id "productImages" que será el div con esa id, donde aparecerán las imagenes. Se repetirá hasta que no haya más imagenes. 

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImages").innerHTML = htmlContentToAppend;
    }
}


function showRelatedProducts(array) {
    
    let htmlContentToAppend = "";
    let relatedProduct = array[1];  
    let relatedProduct2 = array[3]; 

    // Se definen las tres variables anteriores, el htmlContentToAppend para luego agregar al html el código proporcionado.
    // relatedProduct y relatedProduct2 extraerán del JSON dos productos, los cuales luego se usarán en el HTML las propiedades imgSrc y name, porque eran los datos requeridos.

        htmlContentToAppend += `
        <div style="display:flex;">
        <div style="width: 250px; margin-right: 0.5rem">
            ` + relatedProduct.name + `<br> <img class="img-fluid img-thumbnail" src="` + relatedProduct.imgSrc + `" alt=""></img>
        </div>
        <div style="width: 250px">
            ` + relatedProduct2.name + `<br> <img class="img-fluid img-thumbnail" width="100%" src="` + relatedProduct2.imgSrc + `" alt=""></img>
        </div>
        </div>
        `
        
    document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;

 }


 function showComments(array){

    let htmlContentToAppend = "";

    // A continuación un for que recorre el array de los comentarios, el cual va recolectando la información de los mismos
    // con el 2do y 3er for, se cuenta el score que tenga cada comentario para agregarle una estrella por cada punto que tenga, y le agregue una no pintada (vacía)
    // cuando tenga menos de 5 puntos de score.

    for(let i = 0; i < array.length; i++){
		let comment = array[i];  
		let stars = "";

		for (let i=0; i<comment.score; i++){
			stars += `
				<span class="fa fa-star checked"></span>
			`;
		}
		for (let i=comment.score; i<5; i++){
			stars += `
				<span class="fa fa-star"></span>
			`;
		}
        
        // Se agrega a la variable htmlContentToAppend, todo el código HTML que se deberá agregar finalmente con el document.getElementById, a la id
        // proporcionada: "comments-container". 

            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                    <i class="fas fa-user"></i>`+ " " + comment.user +`
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                        <small class="text-muted">` + comment.dateTime + ` </small>
                            <h5 class="mb-1">` + stars + `
                        </div>
                        <p class="mb-1">` + comment.description + `</p>
                    </div>
                </div>
            </div>
            `
        
        document.getElementById("comments-container").innerHTML = htmlContentToAppend;
    }
}


// Agrego el addEventListener con la data del JSON (PRODUCT_INFO_URL) para que obtenga los datos del producto a mostrar deseado (Chevrolet Onix)
// Se agrega a cada div llamándolo por ID del div, la información obtenida del JSON de la URL dada. Se agrega con innerHTML al div con id "productETC".
// con el .name, .description, .currency estamos eligiendo la información que queremos obtener.


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {product = resultObj.data;
            document.getElementById("productName").innerHTML = product.name;
            document.getElementById("productDesc").innerHTML = product.description;
            document.getElementById("productCost").innerHTML = product.currency + " " + product.cost;
            document.getElementById("productSoldCount").innerHTML = product.soldCount;
            document.getElementById("productCategory").innerHTML = product.category;
            showImagesGallery(product.images);
        }
    });
});

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            relatedProductsArray = resultObj.data;
            showRelatedProducts(relatedProductsArray);
        }
    });
});

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            currentCommentsArray = resultObj.data;
            showComments(currentCommentsArray);
        }
    });
});
