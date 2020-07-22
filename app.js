'use strict';
//global vars
Product.productArray = [];
var totalClicks = 0;
var maximumClicks = 5;
//this below var will need to correspond with the index of the displayed product
var productIndexPreviouslyOnPage = [1,2,3];

function Product(imageName, src, votes, shown){
  this.votes = votes;
  this.imageName = imageName;
  this.imageSrc = src;
  this.shown = shown;

  Product.productArray.push(this);
}

Product.prototype.renderProductAsHTML = function() {
  var target = document.getElementById('listOfProducts');
  var productLi = document.createElement('td');

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

    for (var productIndex = 0; productIndex < Product.productArray.length; productIndex++) {
      if(Product.productArray[productIndex].imageSrc === event.target.getAttribute('src')) {
        // console.log('this matches');
        Product.productArray[productIndex].votes++;
      }
    }
    displayProducts();
    if(totalClicks === maximumClicks){
      var listOfProducts = document.getElementById('listOfProducts');
      listOfProducts.removeEventListener('click', handleProductClick);
      // renderVotes();
      storeLocalVotes();
      renderGraphOnPage();

      //render chart function will go here
    }
  } else {
    console.log('please choose and click an image');
  }
  // clicksEachProduct.push(totalClicks);
  // console.log(clicksEachProduct);
}
//this function no longer necessary, as it was rending the list of data.
// function renderVotes() {

//   var productVotes = document.getElementById('votes');
//   var renderTotalsText = document.createElement('li');
//   renderTotalsText.textContent = 'Totals Per Product:';
//   productVotes.appendChild(renderTotalsText);
//   for(var i = 0; i < Product.productArray.length; i++) {
//     var votesLi = document.createElement('li');
//     votesLi.textContent = Product.productArray[i].imageName + ': ' + Product.productArray[i].votes + ' votes and was shown ' + Product.productArray[i].shown + ' times.';
//     productVotes.appendChild(votesLi);
// storeLocalVotes();
//   }
// }

function storeLocalVotes() {
  var stringyVotes = JSON.stringify(Product.productArray);
  localStorage.setItem('productArray', stringyVotes);
  console.log(stringyVotes);
}

//event listener appended to HTML where images are displayed (li, likely)
function displayProducts(){

  //need to create a loop to re-shuffle the product display if there are duplicates, or if the product matches one from a previous display
  //also need to DISPLAY INLINE

  var index1 = Math.floor(Math.random() * Product.productArray.length);
  while(
    index1 === productIndexPreviouslyOnPage[0] ||
    index1 === productIndexPreviouslyOnPage[1] ||
    index1 === productIndexPreviouslyOnPage[2])
  {
    index1 = Math.floor(Math.random() * Product.productArray.length);
  }

  var index2 = Math.floor(Math.random() * Product.productArray.length);
  while(
    index2 === productIndexPreviouslyOnPage[0] ||
      index2 === productIndexPreviouslyOnPage[1] ||
      index2 === productIndexPreviouslyOnPage[2] ||
      index2 === index1)
  {
    index2 = Math.floor(Math.random() * Product.productArray.length);
  }

  var index3 = Math.floor(Math.random() * Product.productArray.length);
  while(
    index3 === productIndexPreviouslyOnPage[0] ||
    index3 === productIndexPreviouslyOnPage[1] ||
    index3 === productIndexPreviouslyOnPage[2] ||
    index3 === index2 ||
    index3 === index1){
    index3 = Math.floor(Math.random() * Product.productArray.length);
  }
  productIndexPreviouslyOnPage = [index1, index2, index3];
  var newProduct1 = Product.productArray[index1];
  var newProduct2 = Product.productArray[index2];
  var newProduct3 = Product.productArray[index3];

  var productList = document.getElementById('listOfProducts');
  productList.innerHTML = '';
  newProduct1.renderProductAsHTML();
  newProduct1.shown++;
  newProduct2.renderProductAsHTML();
  newProduct2.shown++;
  newProduct3.renderProductAsHTML();
  newProduct3.shown++;
}
//when new products display, we'll need to update what is on the page

//we will need to wrap chart in a function and call it after max clicks is reached

//here is the generic chart.js

//CHART GOALS:
//1. Make a label array and a for loop
function renderGraphOnPage (){
  var productLabelArray = [];
  for(var i = 0; i < Product.productArray.length; i++) {
    productLabelArray.push(Product.productArray[i].imageName);
  }

  var productData = [];
  for(var j = 0; j < Product.productArray.length; j++) {
    productData.push(Product.productArray[j].votes);
  }

  var productTimesShown = [];
  for(var x = 0; x < Product.productArray.length; x++) {
    productTimesShown.push(Product.productArray[x].shown);
  }

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productLabelArray,
      datasets: [{
        label: '# of Votes',
        data: productData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }, {
        label: 'times shown',
        data: productTimesShown,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
//function calls

var listOfProducts = document.getElementById('listOfProducts');
listOfProducts.addEventListener('click', handleProductClick);

var checkLocalStorage = localStorage.getItem('productArray');
if(checkLocalStorage !== null) {
  //reconstitute here
  var parseLs = JSON.parse(checkLocalStorage);
  console.log(parseLs);
  for(var i = 0; i < parseLs.length; i++) {
    // votes;
    // imageName;
    // imageSrc ;
    // shown ;
    var parsedVotes = parseLs[i].votes;
    var parsedImageName = parseLs[i].imageName;
    var parsedImageSrc = parseLs[i].imageSrc;
    var parsedShown = parseLs[i].shown;
    new Product(parsedImageName, parsedImageSrc, parsedVotes, parsedShown);
  }
} else {
  new Product('R2D2 Bag', 'img/bag.jpg', 0, 0);
  new Product('Banana Slicer', 'img/banana.jpg', 0, 0);
  new Product('Bathroom Stand', 'img/bathroom.jpg', 0, 0);
  new Product('Rain Boots', 'img/boots.jpg', 0, 0);
  new Product('Breakfast Maker', 'img/breakfast.jpg', 0, 0);
  new Product('Meatball Bubblegum', 'img/bubblegum.jpg', 0, 0);
}

displayProducts();
