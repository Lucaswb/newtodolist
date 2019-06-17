//Businnes logic for toDo list
var newArray=[]

function ToDoList() {
  this.items = [],
  this.currentId = 0
}

ToDoList.prototype.addItem = function(item) {
  item.id = this.assignID(),
  this.items.push(item)
}

ToDoList.prototype.assignID = function() {
  this.currentId += 1;
  return this.currentId;
}
ToDoList.prototype.deleteItem = function(id) {
  for (var i=0; i,this.items.length; i++) {
    if (this.items[i]) {
      if (this.items[i].id== id) {
        delete this.items[i];
        return true;
      }
    }
  };
  return false;
}

// function(newlistHighlight) {
//   var itemsList = $("ul#items");
//   var htmlForItemInfo = "";
//   newlistDisplay.items.forEach(function(item) {
//
//     htmlForItemInfo += "<li id=" + item.id + 'class="highlight">' + item.itemToDo+ ": " + "</li>";
//
//   });
//   itemsList.html(htmlForItemInfo);
//   console.log(itemsList)
// }

ToDoList.prototype.findItem = function(id) {
  for (var i=0; i<this.items.length; i++) {
    if (this.items[i].id == id){
      return this.items[i];
    }
  };
  return false;
};
ToDoList.prototype.highlightItem=function(id) {
  for (var i=0; i<this.items.length; i++) {
    if (this.items[i].id == id){
      this.items[i].highlight = true;
    }
  };
  return false;
};
//Business logic for items
function Item(itemToDo, description) {
    this.itemToDo = itemToDo,
    this.description= description
    this.highlight= false

}
var newlist = new ToDoList ();

function displayItemDetails(newlistDisplay) {
  var itemsList = $("ul#items");
  var htmlForItemInfo = "";
  newlistDisplay.items.forEach(function(item) {

    if (item.highlight == true)
    {
      htmlForItemInfo += "<li class='highlight' id=" + item.id + ">" + item.itemToDo+ ": " + "</li>";


    }else {
      htmlForItemInfo += "<li id=" + item.id + ">" + item.itemToDo+ ": " + "</li>";
    }

  });
  itemsList.html(htmlForItemInfo);
  // console.log(newArray)
};
function appendArray(item) {
  var newItem = "<li id=" + item.id + ">" + item.itemToDo+ ": " + "</li>";
  newArray.push(item)
  console.log(newArray)
};


function attachItemListeners() {
  $("ul#items").on("click", "li", function() {
    showItem(this.id);
  });

  $("#buttons").on("click", ".deleteButton", function() {
    newlist.deleteItem(this.id);
    $("#show-items").hide();
    displayItemDetails(newlist);
  });

  $("#buttons").on("click", ".highlightButton", function() {
    newlist.highlightItem(this.id);
    // var stringID = "#" + this.id
    // console.log(stringID)
    // $(stringID).addClass("highlight")
    $("#show-items").hide()
    displayItemDetails(newlist);
  });
};

function showItem(itemId) {
  var item = newlist.findItem(itemId);
  $("#show-items").show();
  $(".addItem").html(item.itemToDo);
  $(".addDescription").html(item.description);

  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + item.id + ">Delete</button>");
  buttons.append("<button class='highlightButton' id=" + item.id + ">Highlight</button>");
}




// User Interface Logic ---------

$(document).ready(function() {
  attachItemListeners();
  $("form").submit(function(event) {
    event.preventDefault();
    var inputtedItem = $("input#addItem").val();
    var inputtedDescription = $("input#addDescription").val();
    $("input#addItem").val("");
    $("input#addDescription").val("");
    var newItem = new Item(inputtedItem, inputtedDescription);
    newlist.addItem(newItem);
    appendArray(newlist);
    displayItemDetails(newlist);


  })
})
// var item1 = new Item("do homework")
// var item2 = new Item("do dishes")
// newlist.addItem(item1)
// newlist.addItem(item2)
//
//
// console.log(newlist.findItem(2))
// newlist.deleteItem(2)
// console.log(newlist.items)
