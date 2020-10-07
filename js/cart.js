var articlesArray = [ ];
// Declaro la variable donde estará el array convertido del getJSONdata


function showCart(array){
let htmlContentToAppend = "";
for (let i = 0; i < array.articles.length; i++) {
    var article = array.articles[i];

            htmlContentToAppend += `
            <tr>
              <td style="width:10%"><img width="100%" src="` + article.src + `"></td>
              <td>`+ article.name +`</td>
              <td>` + article.currency + " " + article.unitCost + `</td>
              <td>` + article.count + `</td>
              <td style="font-weight:bold">` + article.currency + " " + article.count*article.unitCost + `<span></td>
            </tr>
          `
            document.getElementById("articlesWrapper").innerHTML = htmlContentToAppend;
        }

}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function(resultObj){
    if (resultObj.status === "ok") {

        articlesArray = resultObj.data;
        showCart(articlesArray);
   
    }
})
});