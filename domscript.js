//  Panier
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart"); 
//Ouverture du panier
cartIcon.onclick = () => {
    cart.classList.add("active");
};
//Fermeture du panier
closeCart.onclick = () => {
    cart.classList.remove("active");
};

//Fonctionnement du panier JS
if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
}else{
    ready(); 
}

//Fonction de confection
function ready() {
    //suppression des articles du panier
    var removeCartButtons = document.getElementsByClassName("cart-remove")
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    //Changements de quantites
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
    }
    //Ajout au panier
    var addCart = document.getElementsByClassName("add-cart")
    for (var i = 0; i < addCart.length; i++){
        var  button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    //Bouton d'achat
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}
//Fonction de buton d'achat
function buyButtonClicked(){
    alert("Votre commande est passee");
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

//fonction de supression d'articles du panier 
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}
//fonction de changement de quantites
function quantityChanged (event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateTotal();
}
//Fonction d'Ajout au panier
function addCartClicked(event){
    var button = event.target;
    var shopProduct = button.parentElement;
    var title = shopProduct.getElementsByClassName("product-title")[0].innerText;
    var price = shopProduct.getElementsByClassName("price")[0].innerText;
    var productImg = shopProduct.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updateTotal(); 
}
//Fonction d'Ajout de produit au panier
function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title){
            alert("Vous avez deja ajouter cet article au panier");
        return;
        } 
    }

    var cartBoxContent = `<img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!--Supprimer le panier-->
                        <i class='bx bxs-trash-alt cart-remove' ></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
}                    

//mise a jour du total
function updateTotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box"); 
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        //Si le prix contient une valeur decimale
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName("total-price")[0].innerText = "$" + total;

}

const likeElements = document.querySelectorAll('.like');

for (let i = 0; i < likeElements.length; i++) {
  let countLike = 0;
  const like = likeElements[i];

  like.addEventListener('click', () => {
    if (countLike === 0) {
      like.classList.toggle('anim-like');
      countLike = 1;
      like.style.backgroundPosition = 'right';
    } else {
      countLike = 0;
      like.style.backgroundPosition = 'left';
    }
  });

  like.addEventListener('animationend', () => {
    like.classList.toggle('anim-like');
  });
}

