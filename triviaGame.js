var keys = document.querySelector('.ultdiv');
var checkedBox = 0.0;

var display = document.querySelector('.display');
var scoreD = document.querySelector('.score');
console.log(display.textContent)
var dochandeler = document.getElementById("textbox");

var trivia = [
  {statement: "A cow-bison hyrid is called a beefalo", value: true},
  {statement: "Scotland has 421 words for snow", value: true},
  {statement: "Armadillo shells are bulletproof", value: true},
  {statement: "Octopuses lay 56,000 eggs at a time", value: true},
  {statement: "The tiny pocket in jeans was designed to store pocket watches", value: true},
  {statement: "Theodore Roosevelt had a pet hyena", value: true},
  {statement: "Giraffe tongues can be 20 inches long", value: true},
  {statement: "There is only one U.S. state capital without a McDonald store", value: true},
  {statement: "Europeans were scared of eating tomatoes when they were introduced", value: true},
  {statement: "Humans are not the only animal that can dream", value: true}, 
  {statement: "The name Windy City has everything to do with Chicago weather", value: false},
  {statement: "Johnny Appleseed's fruits were for eating", value: false},
  {statement: "The longest English word is 189,820 letters longs", value: false},
  {statement: "Blue whales eat 700,000 calories in one mouthful", value: false},
  {statement: "The current American flag was designed by a college student", value: false},
  {statement: "Cows do not have lower front teeth", value: false},
  {statement: "Only one-fifth of the Sahara Desert is sandy", value: false},
  {statement: "Dogs sniff good smells with their right nostril", value: false},
  {statement: "You only have one body part that never stops growing", value: false},
  {statement: "The U.S. gooovernment saved every public tweet from 2007 to 2018", value: false}
];

function randomNumber(min, max) { //a helper function to generate a new, random number
      return Math.floor(Math.random() * (max - min) + min); //round the Math.random down and give it a range from the initial (which is the first number in the array) to the last number (length-1)
  }

  function randomList(length){ // length is just a number
    var list = []; // create an empty array to push things into
    for (var i = 0; list.length < length; i++) { //go through the number every time/breaks it down (5 = 0,1,2,3,4)
      list.push(i); // push the obtained number into the empty array to store it
    }
    var retArr = []; // create another empty array so that I can push numbers (made random) into this one to return
    while (list.length > 0) { //loops so that we make sure that we removed everything from list, made it random, and pushed it into the new array.
      var randNum = randomNumber(list[0], list.length-1); //pulling our helper function so it can randomize numbers within a specific range
      var remove = list.indexOf(randNum); //identifying and storing a random number to use in splice so that we can pull it
      retArr.push(list.splice(remove, 1)); //find the number to remove the element in the array (we only want to remove 1) and push it to a new array
    }
    return retArr; //return the new randomized list.
  }

  function makeAnd (first, second) {
    var retObj = {statement: first.statement + " and " + second.statement, value: false};
    if (first.value && second.value) {
      retObj.value = true;
      return retObj;
    }
    else {
      return retObj;
    }
  }

  function makeOr (first, second) {
    var retObj = {statement: first.statement + " or " + second.statement, value: false};
    if (first.value || second.value) {
      retObj.value = true;
      return retObj;
    }
    else {
      return retObj;
    }
  }

  function makeNot(object){
   var retObj = {statement:"It is not the case that "};
    retObj.statement += object.statement;
    retObj.value = !object.value;
    return retObj;
  }

  function makeComplex(arr, maxLen=5) {
  var len = (Math.floor(Math.random() * maxLen - 1)) + 2;
  var retObj = {};
  var order = randomList(arr.length);
  for (var i = 0; i < len; i++) {
    var current = {};
    var index = order.pop();
    current.statement = arr[index].statement;
    current.value = arr[index].value;
    if (Math.random() < .25) {
      current = makeNot(current)
    }
    if(i == 0) {
      retObj.statement = current.statement;
      retObj.value = current.value;
    }
    else {
      if (Math.random() < .5) {
        retObj = makeOr(retObj, current);
      }
      else {
        retObj = makeAnd(retObj, current);
      }
    }
  }
    return retObj;
}

  var stateArr = makeComplex(trivia);
  var index = 0;
  var score= 0;
  scoreD.textContent = "Score : " + score;
  display.textContent = stateArr.statement;
  keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
      var key = e.target;
      var action = key.dataset.action;
      var keyContent = key.textContent;
      var displayed = display.textContent;
      //simply resets the page
      if (action === "reset") {
        location.reload()
      }
      if (action === "true") {
        if (stateArr.value === true) {
          score += 1;
        }else{
          score -= 1;
        }
        console.log(stateArr[0]);
        while (index == 0) {
          stateArr = makeComplex(trivia);
          index ++;
        }
        display.textContent = stateArr.statement;
        index = 0;
      }

      if (action === "false") {
        if (stateArr.value === false) {
          score+=1;
        }
        else{
          score-=1;
        }
        console.log(stateArr[0]);
        while (index == 0) {
          stateArr = makeComplex(trivia);
          index ++;
        }
        display.textContent = stateArr.statement;
        index = 0;
        }

        scoreD.textContent = "Score: " + score;
      }
    })
