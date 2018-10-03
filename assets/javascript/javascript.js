var topics = ["birds", "cats", "dogs"];

function renderButtons() {

  // Emptying out the animals view div to prevent repeats
  $("#animals-view").empty();

  // Looping through topics array to make the buttons of the animals
  for (var i = 0; i < topics.length; i++) {
    // create new buttons
    var newButton = $("<button>");
    newButton.addClass("animal-btn")
    // give an attribute of the animal type
    newButton.attr("data-name", topics[i]);
    newButton.text(topics[i]);
    $("#animals-view").append(newButton);
  }
}

// add functionality on the buttons
$(document).on("click", ".animal-btn", function () {
  // url of the gifs for the animal
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + $(this).attr("data-name") + "&limit=5&rating=g";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    results = response.data;
    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div>");

      var rating = results[i].rating;
      var p = $("<p>").text("Rating: " + rating);

      var animalImage = $("<img>");
      animalImage.addClass("gif")
      // adding attributes to each image tag of animal
      animalImage.attr({
        "src": results[i].images.fixed_width_still.url,
        "data-still": results[i].images.fixed_width_still.url,
        "data-animate": results[i].images.fixed_width.url,
        "data-state": "still"
      });

      gifDiv.append(animalImage);
      gifDiv.append(p);

      $("#gifs-appear-here").prepend(gifDiv);
    }
  })
})

// on click functionality on the gif, making the gif play
$(document).on("click", ".gif", function () {
  var state = $(this).attr("data-state");

  if (state === "still") {
    var animate = $(this).attr("data-animate");
    $(this).attr("src", animate);

    $(this).attr("data-state", "animate");
  }

  if (state === "animate") {
    var still = $(this).attr("data-still");
    $(this).attr("src", still);

    $(this).attr("data-state", "still");
  }
});

// adding on click functionality to submit a new animal to the buttons
$("#add-animal").on("click", function (event) {
  // preventing the form from refreshing
  event.preventDefault();
  var animal = $("#animal-input").val().trim();
  topics.push(animal);
  renderButtons();
})

renderButtons()