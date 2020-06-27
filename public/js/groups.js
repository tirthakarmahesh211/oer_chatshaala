//jshint esversion:8
function alert_func() {
  alert('Kindly Login First');
}
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
//modal
function _myFunction2() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("plus");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
$(document).ready(function () {
  $('#pvt_msg_form').hide();

  $('#create_topic').click(() => {
    $('#modal_head').html('Create Topic');
    $('#pvt_msg_form').hide();
    $('#topic_form').show();
  });
  $('#pvt_msg').click(() => {
    $('#modal_head').html('Create Private Message');
    $('#pvt_msg_form').show();
    $('#topic_form').hide();
  });
  btn.addEventListener('click', () => {
    if (document.getElementById('home')) {
      modal.style.display = "block";
      $.ajax({
        url: '/categories'
      }).done(
        (data) => {
          $('select[name="category"] option').remove();
          $('select[name="category"]').append('<option value=\"\" disabled selected>Select your Category</option>');
          for (var i = 0; i < data.length; i++) {
            $('select[name="category"]').append('<option value=\"' + data[i].id + '\">' + data[i].name + '</option>');
          }
        }
      );
    } else {
      alert_func();
    }
  });

  $('input[name="user_search"]').keyup(() => {
    var text = $('input[name="user_search"]').val();
    $.ajax({
      url: '/find',
      data: { text: text }
    }).done(
      (data) => {
        $('#users1 option').remove();
        for (var i = 0; i < data.length; i++) {
          var txt = data[i].name + ' (@' + data[i].username + ')';
          $('#users1').append('<option value=\"' + data[i].username + '\">' + txt + '</option>');
        }
      }
    );
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
