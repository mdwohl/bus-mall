'use strict';
//global vars
var productArray = [];
var totalClicks = 0;

//constructor function to make an object: name, image src, clicks.
//constructor needs: a property that holds number of times the product has been clicked; after every selection update the newly added property to indicate it was clicked.

function Product(imageName, src){
  this.liveClicks = 0;
  this.imageName = imageName;
  this.imageSrc = src;

  productArray.push(this);
}

Product.prototype.renderProductAsHTML = function() {
  var target = document.getElementById('listOfProducts');
  var productLi = document.createElement('li');

  var productImage = document.createElement('img');
  productImage.src = this.imageSrc;
  productImage.alt = this.imageName;
  productLi.appendChild(productImage);

  var productTextP = document.createElement('p');
  productTextP.textContent = this.imageName;
  productLi.appendChild(productTextP);

  target.appendChild(productLi);
};

function handleProductClick(event) {
  if (event.target.tagName === 'IMG') {
    totalClicks++;

    for (var productIndex = 0; productIndex < productArray.length; productIndex++) {
      if(productArray[productIndex].imageSrc === event.target.getAttribute('src')) {
        console.log('this matches');
        productArray[productIndex].liveClicks++;
      }
    }
    displayProducts();
    if(totalClicks === 25){
      var productList = document.getElementById('listOfProducts');
      listOfProducts.removeEventListener('click', handleProductClick);
    }
  } else {
    console.log('please choose and click an image');
  }
}

//event listener appended to HTML where images are displayed (li, likely)
function displayProducts(){

  var index1 = Math.floor(Math.random() * productArray.length);
  var index2 = Math.floor(Math.random() * productArray.length);
  var index3 = Math.floor(Math.random() * productArray.length);
  var index4 = Math.floor(Math.random() * productArray.length);
  var index5 = Math.floor(Math.random() * productArray.length);
  var index6 = Math.floor(Math.random() * productArray.length);

  var newProduct1 = productArray[index1];
  var newProduct2 = productArray[index2];
  var newProduct3 = productArray[index3];
  var newProduct4 = productArray[index4];
  var newProduct5 = productArray[index5];
  var newProduct6 = productArray[index6];

  var productList = document.getElementById('listOfProducts');
  productList.innerHTML = '';
  newProduct1.renderProductAsHTML();
  newProduct2.renderProductAsHTML();
  newProduct3.renderProductAsHTML();
  newProduct4.renderProductAsHTML();
  newProduct5.renderProductAsHTML();
  newProduct6.renderProductAsHTML();
}

//function calls

var listOfProducts = document.getElementById('listOfProducts');
listOfProducts.addEventListener('click', handleProductClick);

new Product('R2D2 Bag', 'img/bag.jpg');
new Product('Banana Slicer', 'img/banana.jpg');
new Product('Bathroom Stand', 'img/bathroom.jpg')
new Product('Rain Boots', 'img/boots.jpg');
new Product('Breakfast Maker', 'img/breakfast.jpg')
new Product('Meatball Bubblegum', 'img/bubblegum.jpg')

//on click, generate three new products at random

//ONLY 25 rounds of clicking. Keep this number in a var that can be changed for debugging

//after voting is done, remove event listeners

//display all products with number of vots and number of times shown

//generate three random product images from img dir and display inline