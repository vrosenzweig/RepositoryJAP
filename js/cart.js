// Se crean variables globales
var articlesArray = [];
var costoTotal = 0;
var envio = 5;
var costoEnvio = 0;


function showCart(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.articles.length; i++) {
    var article = array.articles[i];
    // Se crea id autoincremental para el input de cantidad, para que se diferencien los input en el código.
    var countId = "count" + i; 

    htmlContentToAppend += `
            <tr>
              <td style="width:10%"><img width="100%" src="` + article.src + `"></td>
              <td>`+ article.name + `</td>
              <td>` + article.currency + " " + article.unitCost + `</td>
              <td> <input id=`+ countId + ` type ="number" min="1" value=` + article.count + ` onchange="changeTotal(this,` + i + `)" required> </td>
              <td style="font-weight:bold">` + " $ " + article.count * article.unitCost + `<span></td>
            </tr>
          `
          // Con el input y la id autoincremental, toma el valor de la cantidad de articulos que ya está en el array predefinida
          // Al cambiar la cantidad de artículos en el input, se ejecuta el evento onchange, que toma como valor el elemento y la posición en la que se encuentra el array.


    document.getElementById("articlesWrapper").innerHTML = htmlContentToAppend;
    costoTotal += (article.count * article.unitCost); //


  }

  MostrarTotales();
}

function cambiarEnvio(element){
  envio = parseInt(element.getAttribute("value"));
  MostrarTotales();
}

//

function changeTotal(element, i) {
  // con el element.getAttribute conseguimos el id del input y se almacenaría en countID
  // count serviria para conseguir el valor dado en el input cantidad. Uso JQUERY para facilitar sintaxis.
  var countId = element.getAttribute("id");
  var count = $("#" + countId).val();

  // llama al artículo número i (el artículo el cual estemos cambiándole el valor de cantidad), y le settea el valor nuevo que nosotros elijamos.
  articlesArray.articles[i].count = count;

  // se llama a la función que muestra el carrito de compras
  showCart(articlesArray);

  // se settea el costo total en 0 para que se haga la cuenta con el nuevo valor
  costoTotal = 0;

  // esta vez tomando como valor de cantidad, el dado por nosotros y por lo tanto modificaría el subtotal.
  articlesArray.articles.forEach(x => {
    costoTotal += (x.unitCost * x.count)  
  });
  MostrarTotales();
  
}

function MostrarTotales(){
  $("#subtotal").text("Subtotal: $" + costoTotal);
  costoEnvio = envio / 100 * costoTotal;
  $("#envio").text("Costo de envío: $" + costoEnvio);
  $("#total").text("Total ($) " + (costoTotal + costoEnvio));
  
}

function showMessage(array) {
    
    alert(array["msg"])
    
}

var botonSubmit = document.getElementById("buttonsubmit");

$("#cart-info").submit(function(e) {

  return false

})

$("#buttonsubmit").click(function() {

  getJSONData("https://japdevdep.github.io/ecommerce-api/cart/buy.json").then(function (resultObj) {

    if (resultObj.status === "ok") {
      
      messageArray = resultObj.data
      showMessage(messageArray)
    }
})

})


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function (resultObj) {
    if (resultObj.status === "ok") {

      articlesArray = resultObj.data;
      showCart(articlesArray);

    }
  })
});