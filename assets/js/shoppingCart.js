//***********************
// Shopping cart functions
var hwShoppingCart = {};
 hwShoppingCart.cart = [];

hwShoppingCart.Item = function(id, name, picture, price, count){
  this.id = id
  this.name = name
  this.picture = picture
  this.price = price
  this.count = count
};

// addItemToCart
hwShoppingCart.addItemToCart = function(id, name, picture, price, count){
   for (var i in this.cart ){
     if(this.cart[i].id === id){
       this.cart[i].count += count;
       hwShoppingCart.saveCart();
       return;
     }
   }
   var item = new this.Item(id, name, picture, price, count);
   console.log(item);
   this.cart.push(item);
   hwShoppingCart.saveCart();
}


hwShoppingCart.removeItemFromCart = function(id) {// Remove one item
    for (var i in this.cart){
      if (this.cart[i].id === id) {
          this.cart[i].count --;
          if (this.cart[i].count === 0){
            this.cart.splice(i, 1);
          }
          break;
      }
    }
    hwShoppingCart.saveCart();
}

hwShoppingCart.removeItemFromCartAll = function(id)  {// Removes all item name
  for (var i in this.cart){
    if (this.cart[i].id === id) {
        if (this.cart[i].count === 0){
          this.cart.splice(i, 1);
        }
        break;
    }
  }
  hwShoppingCart.saveCart()
}


hwShoppingCart.clearCart = function() {
  this.cart = [];
  hwShoppingCart.saveCart();
}

//clearCart();

hwShoppingCart.countCart = function() { // return total countCart
   var totalCount = 0;
   for (var i in this.cart) {
     totalCount += this.cart[i].count;
   }
   return totalCount;

};

hwShoppingCart.totalCart = function() { // return total cost
  var totalCost = 0;
  for (var i in this.cart) {
    totalCost += this.cart[i].price * this.cart[i].count;
  }
  return totalCost.toFixed(2);
}

hwShoppingCart.totalCartC = function() { // return total cost plus transport
  var totalCostC = 0;
  var total = 0;
  for (var i in this.cart) {
    totalCostC += this.cart[i].price * this.cart[i].count;
  }
  total += totalCostC + 100;
  return total.toFixed(2);
}

hwShoppingCart.listCart = function() { // -> array of item
    var cartCopy = [];
    for (var i in this.cart) {
         var item = this.cart[i];
         var itemCopy = {};
         for (var p in item) {
              itemCopy[p] = item[p];
          }
          itemCopy.total = (item.price * item.count).toFixed(2);
          cartCopy.push(itemCopy);
    }
    return cartCopy;
 }

hwShoppingCart.saveCart = function() { //save cart to local storage
  localStorage.setItem("hwShoppingCart", JSON.stringify(this.cart));
}

hwShoppingCart.loadCart = function() { // load cart from local storage
  this.cart = JSON.parse(localStorage.getItem("hwShoppingCart"));
  if (this.cart === null) {
        this.cart = [];
       }
}
hwShoppingCart.loadCart();

 function sload(){
    var data = hwShoppingCart.cart;
    console.log(data);
    $.ajax({
         type: "post",
         url: "http://localhost:8000/j/",
         data: JSON.stringify(data),
         contentType: "application/json",
         dataType:'json',
         error: function (data) {
             console.log(data.status)
         }
     });

};
