// initalize variables
var animalArray = ["dog", "cat", "panda", "giraffe", "squirrel", "zebra", "elephant", "lion", "deer", "rabbit"];
var apiKey = "d717d9d1126c4211b02b4fd33716203c";
var rating = "pg";
var limit = 10;

// displayAnimals function re-renders the HTML to display the appropriate content
      function displayAnimals() {

        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "api_key=d717d9d1126c4211b02b4fd33716203c&limit=10&lang=en";
      
        // Performing our AJAX GET request      
          $.ajax({
            url: queryURL,
            method: "GET"
           })
        // After the data comes back from the API
          .done(function(response) {

            // Storing an array of results in the results variable
            var results = response.data;

            // Looping over every result item
            for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(animalImage);

            $("#gifs-appear-here").prepend(gifDiv);
          }
        });
      }
  
// Function for rendering buttons for each animal in the array
      function renderButtons() {

        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        //looping through the array of animals
        for (var i = 0; i < animalArray.length; i++){

          // Then dynamicaly generating buttons for each animal in the array
          var a = $("<button>");
          // Adding a class of animal to our button
          a.addClass("animal");
          // Adding a data-attribute
          a.attr("data-name", animals[i]);
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

