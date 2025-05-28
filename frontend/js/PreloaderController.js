// wait until the entire html document has been completely loaded and parsed
document.addEventListener("DOMContentLoaded", function () {

    // select all elements on the page that have the class "seat" and store them in a variable called 'seats'
    const seats = document.querySelectorAll(".seat");

    if (seats.length === 0) return;
  
    // initialize a variable to keep track of the current seat index (not actively used here)
    let currentSeat = 0;
  
    // start a repeated function that runs every 300 milliseconds
    const seatInterval = setInterval(() => {
      
      // first, remove the "active" class from all seats so none are highlighted
      seats.forEach((seat) => seat.classList.remove("active"));
  
      // then randomly pick 3 different seats and add the "active" class to them
      // this gives a flashing or shuffling effect
      for (let i = 0; i < 3; i++) {
        // generate a random index between 0 and the number of seats
        const randomIndex = Math.floor(Math.random() * seats.length);
        // add the "active" class to the randomly selected seat
        seats[randomIndex].classList.add("active");
      }
    }, 300); // this code block runs every 300 milliseconds
  
    // wait until the entire window (including all assets like images) is fully loaded
    window.addEventListener("load", function () {
  
      // after a short delay of 1000 milliseconds (1 second), stop the flashing animation
      setTimeout(function () {
        // stop the repeated seat highlight function
        clearInterval(seatInterval);
  
        // get the preloader overlay element by its id
        const preloader = document.getElementById("preloader-overlay");
  
        // add a "fade-out" class to the preloader so it fades out visually (assuming css handles the effect)
        preloader.classList.add("fade-out");
  
        // after an additional 400 milliseconds, remove the preloader element completely from the page
        setTimeout(() => {
          // check if the preloader and its parent still exist
          if (preloader && preloader.parentNode) {
            // remove the preloader element from its parent node (typically the body)
            preloader.parentNode.removeChild(preloader);
          }
        }, 400); // this timeout matches the fade-out animation duration
  
      }, 1000); // wait 1 second after the window is fully loaded
    });
  
  });  