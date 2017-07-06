// initalize variables
var animalArray = ["dog", "cat", "panda", "giraffe", "squirrel", "zebra", "elephant", "lion", "deer", "rabbit"];
// var apiKey = "d717d9d1126c4211b02b4fd33716203c";
// var rating = "pg";
// var limit = 10;

// Function for rendering buttons for each animal in the array
      function renderButtons() {

        // (this is necessary otherwise you will have repeat buttons)
        $("#buttonPanel").empty();

        //looping through the array of animals
        for (var i = 0; i < animalArray.length; i++) {

          // Then dynamicaly generating buttons for each animal in the array
          var a = $("<button>");
          // Adding a class of animal to our button
          a.addClass("animalButton");
          // Adding a data-attribute
          a.attr("data-name", animalArray[i]);
          // Providing the initial button text
          a.text(animalArray[i]);
          // Adding the button to the buttons-view div
          $("#buttonPanel").append(a);
        }
      }

//add additional animals to the array
      $("#submit-animal").on("click", function(event) {
        event.preventDefault();
        var animal = $("#animal-input").val().trim();
        $("#animal-input").val("");
        animalArray.push(animal);
        renderButtons();
      });



// displayAnimals function re-renders the HTML to display the appropriate content
      function displayAnimals() {

        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=d717d9d1126c4211b02b4fd33716203c&limit=10&lang=en";
      
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
            $("#gifs-appear-here").empty();

            for (var i = 0; i < results.length; i++) {

            // / Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg") {
            
            // Creating a div with the class "item"
             var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var animalImage = $("<img>");
            
            animalImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(animalImage);

            $("#gifs-appear-here").prepend(gifDiv);
          }
        }
      });
    

