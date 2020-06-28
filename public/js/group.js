//jshint esversion:6
//Plus Button
function alert_func() {
  alert('Kindly Login First');
}
  function _myFunction2() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
  //Modal Display
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("plus");


  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  $(document).ready(function () {  btn.addEventListener('click',  ()=> {

      if (document.querySelector('.user')) {
        modal.style.display = "block";
      } else {
        alert_func();
      }
    });

  });



  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };


                function myFunction1() {
                    var x = document.getElementById("myTopnav1");
                    if (x.className === "topnav") {
                        x.className += " responsive";
                    } else {
                        x.className = "topnav";
                    }
                }
                function myFunction() {
                    var x = document.getElementById("myTopnav");
                    if (x.className === "topnav") {
                        x.className += " responsive";
                    } else {
                        x.className = "topnav";
                    }
                }

                function openPage(pageName, elmnt, color) {
                    // Hide all elements with class="tabcontent" by default */
                    var i, tabcontent, tablinks;
                    tabcontent = document.getElementsByClassName("tabcontent");
                    for (i = 0; i < tabcontent.length; i++) {
                        tabcontent[i].style.display = "none";
                    }

                    // Remove the background color of all tablinks/buttons
                    tablinks = document.getElementsByClassName("tablink");
                    for (i = 0; i < tablinks.length; i++) {
                        tablinks[i].style.backgroundColor = "";
                    }

                    // Show the specific tab content
                    document.getElementById(pageName).style.display = "block";

                    // Add the specific color to the button used to open the tab content
                    elmnt.style.backgroundColor = color;
                }

                // Get the element with id="defaultOpen" and click on it
                document.getElementById("defaultOpen").click();
