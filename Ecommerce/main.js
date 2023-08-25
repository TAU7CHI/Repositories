// Cart Open Close
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart'); // Updated selector to match your HTML structure
let closeCart = document.querySelector('#close-cart');
let addToCartButtons = document.querySelectorAll('.add-to-cart');
let cartItemsList = document.querySelector('#cart-items');

// Open the cart
cartIcon.onclick = () => {
    cart.classList.add('active');
}

// Close the cart
closeCart.onclick = () => {
    cart.classList.remove('active');
}
// Add event listeners to "Add to Cart" buttons
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

// Function to add product to the cart
function addToCart(event) {
    const productName = event.target.getAttribute('data-product');
    const cartItem = document.createElement('li');
    cartItem.innerText = productName;
    cartItemsList.appendChild(cartItem);
}

// Making Add to  Cart Working JS
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// Making Function
function ready() {
    // Remove Item From Cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');

    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    // Quantity Change
    var quantityInputs = document.getElementsByClassName("cart-quantity");

    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addCart = document.getElementsByClassName("add-cart");
    
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addaCartClicked);
    }
}

// Function to remove a cart item
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal(); // Update the total price after removing an item
}


// Quantity Change
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal(); // Call the function to update the cart total
}


// Function to add a product to the cart
function addaCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('.product-title').innerText;
    var price = shopProducts.getElementsByClassName('.price').innerText;
    var productImg = shopProducts.getElementsByClassName('.product-img')[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}
 
function addProductToCart(title,price,product){

 // Create a new <div> element to represent the cart item
    var cartShopBox=document.createElement('div');
    cartShopBox.classList.add('cart-box');

     // Get a reference to the cart content container
    var cartItems=document.getElementsByClassName('cart-content')[0];

      // Get the attribute names of the cart-content element
    var cartItemNames=cartItems.getElementsByClassName('cart-product-title');

    
    // Loop through the attribute names
    for(var i=0; i<cartItemNames.length; i++){
        if(cartItemNames[i].innerText==title){
            alert('You have already added this item to cart');
            return;
        }
    }
    var cartBoxContent = `
    <img src="${product-img}" alt="" class="cart-img" />
    <div class="detail-box">
      <div class="cart-product-tittle">${title}</div>
      <div class="cart-price">${price}</div>
      <input
        type="number"
        name=""
        id=""
        value="1"
        class="cart-quantity"
      />
    </div>
    <!--Remove Item-->
    <i class="bx bx-trash-alt cart-remove"></i>
`;

var cartShopBox = document.createElement('div');
cartShopBox.classList.add('cart-box');
cartShopBox.innerHTML = cartBoxContent;

// Append the created cartShopBox to the cartItems container
cartItems.append(cartShopBox);

// Add event listener for removeCartItem
cartShopBox.querySelector('.cart-remove').addEventListener('click', removeCartItem);

// Add event listener for quantityChanged
cartShopBox.querySelector('.cart-quantity').addEventListener('change', quantityChanged);


// Update Total Price
function updateTotal() {
    var cartContainer = document.querySelector('.cart-content');
    var cartBoxes = cartContainer.getElementsByClassName('cart-box');
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.querySelector('.cart-price')[0];
        var quantityElement = cartBox.querySelector('.cart-quantity')[0];
        var price = parseFloat(priceElement.textContent.replace('R', ''));
        var quantity = quantityElement.value;
        total += price * quantity;
    }

    var totalElement = document.querySelector('.total-price');
    totalElement.textContent = 'R' + total.toFixed(2);
}
//If price contain some cents

// Add event listener for quantity changes
var quantityInputs = document.getElementsByClassName('cart-quantity');

for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
}
}