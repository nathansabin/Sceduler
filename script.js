// TODO fix bug where all boxes have a bunch of '. The issue is something to do with local storage in the first and third section

// DONE Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var hours = $("#main").children();
var textBoxs = [];
var boxId = [];

$(document).ready(function(){
  $(function () {
  // DONE: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  for (var i = 0; i <hours.length; i++){
    hours.eq(i).children().eq(2).on("click", function(){
      textBoxs[i] = $(this).siblings("textarea").val().trim();
      boxId = $(this).parent().attr("id");
      localStorage.setItem(boxId, textBoxs);
      console.log(localStorage.getItem(boxId));
    })

  }
  
  // Done: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //

  var currentHour = dayjs().format("H");
  var formatedHour = "hour-"+currentHour;
  var hourFound = false;

  for (var i = 0; i < hours.length; i++){
    if (formatedHour === hours.eq(i).attr("id") && hourFound == false ){
      hours.eq(i).removeClass("past").addClass("present");
      hourFound = true;
    }
    else if (hourFound == true) {
      hours.children(i).removeClass("past").addClass("future");
    }
  }


  // DONE: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // console.log(localStorage.getItem(hours.eq(3).attr("id")))
  
  for (var i = 0; i < hours.length; i++ ){
    boxId = hours.eq(i).attr("id");
    var textData = localStorage.getItem(boxId);
    hours.eq(i).children().eq(1).text(textData);
  }
 

  // Done Add code to display the current date in the header of the page.
  function currentDate(){
    var currentDay = dayjs().format("D, MMMM YYYY");
    $("#currentDay").text(currentDay);
  }
  // Thursday, october 5TH
  setInterval(currentDate, 1000);

  });
})
