const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function login() {
  // Seteamos el valor de log en true para saber si el usuario esta logueado
  sessionStorage.setItem("log", true)
  // Guardamos el mail del usuario para luego mostrarlo en nuestra aplicacion
  var user = document.getElementById("inputMail");
  sessionStorage.setItem("email", user.value);
} 

function forzarlogIn() {
  var logueo = sessionStorage.getItem("log");
  var userEmail = sessionStorage.getItem("email");
  
  if (!logueo) { 
    sessionStorage.setItem("log", false);
    location.href="login.html";
  }

  if (userEmail) {
    // Insertamos en el html el mail del usuario ingresado, previamente guardado en sessionStorage
    document.getElementById('usuarioIniciado').innerHTML = userEmail;
  }
}

function logout() {
  // Limpiamos el sessionStorage y recargamos la pagina
  sessionStorage.clear();
  window.location.reload();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  forzarlogIn();
});
