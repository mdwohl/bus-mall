'use strict';
//global vars
var productArray = [];
var totalClicks = 0;
var maximumClicks = 5;

//constructor function to make an object: name, image src, clicks.
//constructor needs: a property that holds number of times the product has been clicked; after every selection update the newly added property to indicate it was clicked.

function Product(imageName, src){
  this.votes = 0;
  this.imageName = imageName;
  this.imageSrc = src;
  this.shown = 0;

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
        // console.log('this matches');
        productArray[productIndex].votes++;
      }
    }
    displayProducts();
    if(totalClicks === maximumClicks){
      var listOfProducts = document.getElementById('listOfProducts');
      listOfProducts.removeEventListener('click', handleProductClick);
      renderVotes();
    }
  } else {
    console.log('please choose and click an image');
  }
  // clicksEachProduct.push(totalClicks);
  // console.log(clicksEachProduct);
}

function renderVotes() {

  var productVotes = document.getElementById('votes');
  var renderTotalsText = document.createElement('li');
  renderTotalsText.textContent = 'Totals Per Product:'
  productVotes.appendChild(renderTotalsText);
  for(var i = 0; i < productArray.length; i++) {
    var votesLi = document.createElement('li');
    votesLi.textContent = productArray[i].imageName + ': ' + productArray[i].votes + ' votes and was shown ' + productArray[i].shown + ' times.';
    productVotes.appendChild(votesLi);
  }
  
}
//event listener appended to HTML where images are displayed (li, likely)
function displayProducts(){

  var index1 = Math.floor(Math.random() * productArray.length);
  var index2 = Math.floor(Math.random() * productArray.length);
  var index3 = Math.floor(Math.random() * productArray.length);

  var newProduct1 = productArray[index1];
  var newProduct2 = productArray[index2];
  var newProduct3 = productArray[index3];

  var productList = document.getElementById('listOfProducts');
  productList.innerHTML = '';
  newProduct1.renderProductAsHTML();
  newProduct1.shown++;
  newProduct2.renderProductAsHTML();
  newProduct2.shown++;
  newProduct3.renderProductAsHTML();
  newProduct3.shown++;
}
//function calls

var listOfProducts = document.getElementById('listOfProducts');
listOfProducts.addEventListener('click', handleProductClick);

new Product('R2D2 Bag', 'img/bag.jpg');
new Product('Banana Slicer', 'img/banana.jpg');
new Product('Bathroom Stand', 'img/bathroom.jpg');
new Product('Rain Boots', 'img/boots.jpg');
new Product('Breakfast Maker', 'img/breakfast.jpg');
new Product('Meatball Bubblegum', 'img/bubblegum.jpg');

displayProducts();

//on click, generate three new products at random

//ONLY 25 rounds of clicking. Keep this number in a var that can be changed for debugging

//after voting is done, remove event listeners

//display all products with number of vots and number of times shown

//generate three random product images from img dir and display inline