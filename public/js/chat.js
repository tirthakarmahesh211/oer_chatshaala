//jshint esversion:8
let dropdownBtn = document.querySelector('.menu-btn');
let menuContent = document.querySelector('.menu-content');
dropdownBtn.addEventListener('click', () => {
  if (menuContent.style.display == "") {
    menuContent.style.display = "block";
  } else {
    menuContent.style.display = "";
  }
});
//Loading categories on page Load
window.onload = function () {
  var page_url = document.getElementById("page_url");

  document.getElementById("holder7").style.display = "None";
  if(page_url && page_url.getAttribute("name") == "categories"){
   document.getElementById("category_click").click();
  }
  else if (page_url && page_url.getAttribute("name") == "topic"){
    document.getElementById("holder6").style.display = "None";
    document.getElementById("holder4").style.display = "None"
    document.getElementById("holder2").style.display = "None";
    document.getElementById("holder5").style.display = "None";
    document.getElementById("holder7").style.display = "Block";

    $('#menu_active').text('Categories');
    var e = document.getElementById("category_click");
    e.classList.add("active-tab");
    e = document.getElementById("private_click");
    e.classList.remove("active-tab");
    e = document.getElementById("group_click");
    e.classList.remove("active-tab");

    document.getElementById("inbox-message-1").style.display = "Block";
  }
  else{
    document.getElementById("private_click").click();
  }
};
//Modal functioning
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("new_message");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("closes")[0];

// When the user clicks the button, open the modal
$(document).ready(function () {
  btn.addEventListener('click', function () {
    // alert("ji");
    if (document.getElementById('home')) {
      modal.style.display = "block";
      // $.ajax({
      //   url: '/all/categories'
      // }).done(
      //   (data) => {
      //     $('select[name="category"] option').remove();
      //     $('select[name="category"]').append('<option value=\"\" disabled selected>Select your Category</option>');
      //     for (var i = 0; i < data.length; i++) {
      //       $('select[name="category"]').append('<option value=\"' + data[i].id + '\">' + data[i].name + '</option>');
      //     }
      //   }
      // );
    } else {
      modal.style.display = "block";

      // $.ajax({
      //   url: '/categories'
      // }).done(
      //   (data) => {
      //     $('select[name="category"] option').remove();
      //     $('select[name="category"]').append('<option value=\"\" disabled selected>Select your Category</option>');
      //     for (var i = 0; i < data.length; i++) {
      //       $('select[name="category"]').append('<option value=\"' + data[i].id + '\">' + data[i].name + '</option>');
      //     }
      //   }
      // );
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
  var menu_active = document.getElementById("menu_active");
  // console.log(event.target);
  if (event.target != menu_active) {
    menucontent = document.getElementsByClassName("menu-content");
    menucontent[0].style.display = "none";
  }
};

function myFunc() {
  //alert("hi");
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');
  //alert(filter);
  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].id;
    txtValue = a;
    // alert(txtValue);
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      // alert(li[i].id);
      li[i].style.display = "";
    } else {
      // alert("hi");
      li[i].style.display = "none";
    }
  }
}



    //Loading messages on left pane
    function function_pvt() {
      if (menuContent.style.display == "block") {
        menuContent.style.display = "";
      }
      $('#menu_active').text('Messages');
      var e = document.getElementById("category_click");
      e.classList.remove("active-tab");
      e = document.getElementById("private_click");
      e.classList.add("active-tab");
      e = document.getElementById("group_click");
      e.classList.remove("active-tab");

      var my_div = $("#holder2");


      var username = $('#curr_user').attr('name');
      //alert("hi");
      document.getElementById("holder2").style.display = "Block";
      $.ajax({
        url: "/receive/" + username
      })

        .done(function (data) {
          //console.log(data);
          $('#holder2').html("");
          var elements = '';


          for (var i = 0; i < data.length; i++) {
            var mydate, user_id, newdate, newtime, slud, ide;
            var img = "https://bootdey.com/img/Content/avatar/avatar1.png";

            mydate = data[i].last_posted_at;
            slug = data[i].slug;
            ide = data[i].id;


            newdate = mydate[8] + mydate[9] + "/" + mydate[5] + mydate[6];
            //alert('newdate: ' + newdate);

            newtime = mydate[11] + mydate[12] + mydate[13] + mydate[14] + mydate[15];
            // alert('newtime: ' + newtime);

            elements = elements + '<div onClick=' + 'load_posts("' + slug + "/" + ide + "/1" + '")' + '>' + '<li id="' + data[i].fancy_title + '" class="" data-toggle="tab" data-target="#inbox-message-' + i + '">' + '<div class="message-count">' + data[i].posts_count + '</div>' + '<img alt="" class="img-circle medium-image" src="' + img + '">' + '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + data[i].fancy_title + '</b>' + ' </h3>' + '<h5>' + "Latest post by:" + data[i].last_poster_username + '</h5>' + '</div>' + '<div class="contacts-add">' + '<span class="message-time">' + newdate + '<br>' + newtime + '<sup>' + '</sup>' + '</span>' + '<i class="fa fa-trash-o">' + '</i>' + '</div>' + '</li>' + '</div>';

          }

          $('#holder2').append(elements);

          $.ajax({
            url: "/sent/" + username
          })

            .done(function (data2) {
              //console.log(data2);


              var elements = '';


              for (var i = 0; i < data2.length; i++) {
                var mydate, newdate, newtime, slug, ide;

                mydate = data2[i].last_posted_at;
                slug = data2[i].slug;
                ide = data2[i].id;

                newdate = mydate[8] + mydate[9] + "/" + mydate[5] + mydate[6];
                //alert('newdate: ' + newdate);

                newtime = mydate[11] + mydate[12] + mydate[13] + mydate[14] + mydate[15];
                // alert('newtime: ' + newtime);

                elements = elements + '<div onClick=' + 'load_posts("' + slug + "/" + ide + "/1" + '")' + '>' + '<li id="' + data2[i].fancy_title + '" class="" data-toggle="tab" data-target="#inbox-message-' + 1 + '">' + '<div class="message-count">' + data2[i].posts_count + '</div>' + '<img alt="" class="img-circle medium-image" src="https://bootdey.com/img/Content/avatar/avatar1.png">' + '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + data2[i].fancy_title + '</b>' + ' </h3>' + '<h5>' + "Latest post by:" + data2[i].last_poster_username + '</h5>' + '</div>' + '<div class="contacts-add">' + '<span class="message-time">' + newdate + '<br>' + newtime + '<sup>' + '</sup>' + '</span>' + '<i class="fa fa-trash-o">' + '</i>' + '</div>' + '</li>' + '</div>';

              }

              $('#holder2').append(elements);

            });


        });
        

      setTimeout(function () {
        $(".chat-body").animate({ scrollTop: $('.chat-body').prop("scrollHeight") }, 1000);
      }, 1);
      document.getElementById("holder4").style.display = "None";
      document.getElementById("holder5").style.display = "None";
      document.getElementById("holder6").style.display = "None";
      document.getElementById("holder7").style.display = "None";

    }
    function function_category() {
      $('#menu_active').text('Groups');
      var e = document.getElementById("category_click");
      e.classList.remove("active-tab");
      e = document.getElementById("private_click");
      e.classList.remove("active-tab");
      e = document.getElementById("group_click");
      e.classList.add("active-tab");
      var username = $('#curr_user').attr('name');
      document.getElementById("holder6").style.display = "None";
      document.getElementById("holder4").style.display = "Block";
      document.getElementById("holder2").style.display = "None";
      document.getElementById("holder5").style.display = "None";
      document.getElementById("holder7").style.display = "None";

      if (menuContent.style.display == "block") {
        menuContent.style.display = "";
      }
      $.ajax({
        url: "/user/subscribed/" + username
      })

        .done(function (data) {
          //console.log(data);

          var elements = '';
          for (var i = 0; i < data.length; i++) {
            var slug, ide;
            slug = data[i].slug;
            ide = data[i].id;

            elements = elements + '<div onClick=' + 'load_topics("' + slug + "/" + ide + "/load/0" + '")' + '>' + '<li id="' + data[i].name + '" class="" data-toggle="" data-target="">' + '<div class="message-count">' + data[i].topic_count + '</div>' + '<img alt="" class="img-circle medium-image" src="https://bootdey.com/img/Content/avatar/avatar1.png">' + '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + data[i].name + '</b>' + ' </h3>' + '<h5>' + "Latest post by:" + '</h5>' + '</div>' + '<div class="contacts-add">' + '<span class="message-time">' + '<br>' + '<sup>' + '</sup>' + '</span>' + '<i class="fa fa-trash-o">' + '</i>' + '<i class="fa fa-share-alt " >' + '</i>' + '</div>' + '</li>' + '</div>';
          }

          $('#holder4').html(elements);
        });


    }
    function function_category_common() {
      $('#menu_active').text('Categories');
      var e = document.getElementById("category_click");
      e.classList.add("active-tab");
      e = document.getElementById("private_click");
      e.classList.remove("active-tab");
      e = document.getElementById("group_click");
      e.classList.remove("active-tab");
      var username = $('#curr_user').attr('name');
      document.getElementById("holder6").style.display = "Block";
      document.getElementById("holder4").style.display = "None";
      document.getElementById("holder2").style.display = "None";
      document.getElementById("holder5").style.display = "None";
      document.getElementById("holder7").style.display = "None";

      if (menuContent.style.display == "block") {
        menuContent.style.display = "";
      }
      $.ajax({
        url: "/user/common/" + username
      })

        .done(function (data) {

          // console.log(data);
          var elements = '';
          for (var i = 0; i < data.length; i++) {
            var slug, ide, logo;
            logo="https://bootdey.com/img/Content/avatar/avatar1.png";
            slug = data[i].slug;
            ide = data[i].id;
            if (data[i].uploaded_logo) {
              logo = data[i].uploaded_logo.url;
              logo=myUrl+logo;
            }
            if(data[i].description){
            elements = elements + '<div onClick=' + 'load_topics("' + slug + "/" + ide + "/load/0" + '")' + '>' + '<li id="' + data[i].name + '" class="" data-toggle="" data-target="">' + '<div class="message-count">' + data[i].topic_count + '</div>' + '<img alt="" class="img-circle medium-image" src="'+logo+'">' + '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + data[i].name + '</b>' + ' </h3>' + '<h5>' +data[i].description.substring(0,60)+'...' + '</h5>' + '</div>' + '<div class="contacts-add">' + '<span class="message-time">' + '<br>' + '<sup>' + '</sup>' + '</span>' + '<i class="fa fa-trash-o">' + '</i>' + '<div onClick=' + 'copy_topic("' + "/group/" + slug + "/" + ide + '")' + '>' + '<i class="fa fa-share-alt">' + '</i>' + '</div>' + '</div>' + '</li>' + '</div>';
          }else{
              elements = elements + '<div onClick=' + 'load_topics("' + slug + "/" + ide + "/load/0" + '")' + '>' + '<li id="' + data[i].name + '" class="" data-toggle="" data-target="">' + '<div class="message-count">' + data[i].topic_count + '</div>' + '<img alt="" class="img-circle medium-image" src="'+logo+'">' + '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + data[i].name + '</b>' + ' </h3>' +'</div>' + '<div class="contacts-add">' + '<span class="message-time">' + '<br>' + '<sup>' + '</sup>' + '</span>' + '<i class="fa fa-trash-o">' + '</i>' + '<div onClick=' + 'copy_topic("' + "/group/" + slug + "/" + ide + '")' + '>' + '<i class="fa fa-share-alt">' + '</i>' + '</div>' + '</div>' + '</li>' + '</div>';
            }
          }

          $('#holder6').html(elements);
        });
    }

    //Loading each topic on left pane
    function copy_topic(x) {
      alert("Copy: " + x);
    }

    function load_topics(x) {
      document.getElementById("holder5").style.display = "Block";
      document.getElementById("holder2").style.display = "None";
      document.getElementById("holder6").style.display = "None";
      document.getElementById("holder4").style.display = "None";
      document.getElementById("holder7").style.display = "None";
      var my_div = $("#holder5");
      var l = 1;



      $.ajax({

        url: "/group/" + x
      })
        .done(function (data) {
          // //console.log(data);

          data = data.topic_list.topics;

          var elements = '';


          for (var i = 0; i < data.length; i++) {
            var mydate, newdate, newtime, slug, ide, logo;
            slug = data[i].slug;
            ide = data[i].id;

            if (data[i].last_posted_at != null) {
              mydate = data[i].last_posted_at;

              newdate = mydate[8] + mydate[9] + "/" + mydate[5] + mydate[6];
              newtime = mydate[11] + mydate[12] + mydate[13] + mydate[14] + mydate[15];

            }
            else {
              newdate = "";
              newtime = "";
            }
            elements = elements + '<div onClick=' + 'load_posts("' + slug + "/" + ide + "/1" + '")' + '>' + '<li id="' + data[i].title + '" class="" data-toggle="tab" data-target="#inbox-message-' + i + '">' + '<div class="message-count">' + data[i].posts_count + '</div>' + '<img alt="" class="img-circle medium-image" src="https://bootdey.com/img/Content/avatar/avatar1.png">' + '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + data[i].fancy_title + '</b>' + ' </h3>' + '<h5>' + "Latest post by:" + data[i].last_poster_username + '</h5>' + '</div>' + '<div class="contacts-add">' + '<span class="message-time">' + newdate + '<br>' + newtime + '<sup>' + '</sup>' + '</span>' + '<i class="fa fa-trash-o">' + '</i>' + '<div onClick=' + 'copy_topic("' + "/post/t/" + slug + "/" + ide + "/1" + '")' + '>' + '<i class="fa fa-share-alt ">' + '</i>' + ' </div>' + '</div>' + '</li>' + '</div>';

          }


          $('#holder5').html(elements);
        });

    }

    //Loading posts
    function my_Function(z) {

      if (z.matches) { // If media query matches
        //alert("hi");
        document.getElementById("inbox").style.display = "None";
        document.getElementById("back_").style.display = "Block";
        document.getElementById("inbox-message-1").style.display = "Block";
      }
      else {
        document.getElementById("inbox").style.display = "Block";
        document.getElementById("inbox-message-1").style.display = "Block";
        document.getElementById("back_").style.display = "None";
      }
    }
    function my_Function2(z) {

      if (z.matches) { // If media query matches
        //alert("hi");
        document.getElementById("inbox").style.display = "Block";
        document.getElementById("inbox-message-1").style.display = "None";

      }
    }
    function my_func2() {
      // alert("ki");
      var z = window.matchMedia("(max-width: 767px)");
      my_Function2(z); // Call listener function at run time
      z.addListener(my_Function2); // Attach listener function on state changes


    }

    function load_posts(x) {
      var page_number = null;
      var html_or_prepend = false;

      var username = $('#curr_user').attr('name');
      var tid = null;
      if(Array.isArray(x) && x && x.length > 0){
        page_number = x[1];
        tid = x[0];
        x=x[0]+".json";
        html_or_prepend = true;
      }
      else{
        var y = x.split('/');

        tid = y[1];
        var tslug = y[0];
        console.log(tslug);
        $('#slug').attr('name', tslug);
        $('#slug').html('<h4 id="topic_head">' + tslug.split('_').join(' ').split('-').join(' ') + '</h4>');
        $('#tid').attr('name', tid);
        //  alert('clicked');
        $('li').removeClass('active');
        $(this).addClass('active');


        var my_div = $("#holder3");

        //alert("hi");
      }
      $("#upload_files").attr("data-topic_id",tid);
      $("#reply_form").attr("action","/upload/"+tid);

      // console.log(x);
      // console.log(page_number);

      $.ajax({
        url: "/post/more/t/" + x,
        data: {page_number:page_number}
      })

        .done(function (data) {
          var posts_count = data.posts_count;
          var slug = data.slug;
          var type_of_msg = data.archetype;
          data = data.post_stream.posts

          if (page_number && page_number != null){
            page_number = page_number
          }
          else{
            page_number = Number(posts_count) / 20;
            page_number = Math.floor(page_number);
            page_number = page_number + 1;
          }
          var elements = '';
          var reply_message = '';
          var array_to_store_post_number = [];
          var like_button = "";
          for (let i = 0; i < data.length; i++) {
            array_to_store_post_number.push(data[i].post_number);
          }
          // console.log(array_to_store_post_number);
          for (var i = 0; i < data.length; i++) {
            let message_datetime = "";
            message_datetime = new Date(data[i].updated_at).toLocaleString([], { hour: '2-digit', minute: '2-digit' , day: '2-digit', month: '2-digit', year: '2-digit'});

            if (message_datetime == null || message_datetime == undefined){
              message_datetime = "";
            }
            else{
              message_datetime = message_datetime.split("/");
              message_datetime = message_datetime[1]+"/"+message_datetime[0]+"/"+message_datetime[2]
            }
            if(data[i].actions_summary && data[i].actions_summary.length > 0){
              like_button = "";
              for (let j = 0; j < data[i].actions_summary.length; j++) {
                // console.log(data[i].actions_summary[j].id);
                if(data[i].actions_summary[j] && data[i].actions_summary[j].id && data[i].actions_summary[j].count && data[i].actions_summary[j].id == "2")
                {
                  like_button = data[i].actions_summary[j].count+' <i class="fa fa-heart" style="color:red"></i>'
                  // like_count = '<button id="share_btn_'+ data[i].topic_id + '_' + data[i].post_number +'_' + data[i].id+'" type="button" data-tslug="'+slug+'">'+data[i].actions_summary[i].count+</button>';
                  break;
                }
              }
            }
            let User_Name = (data[i].username == null) ? data[i].name : data[i].username;
            // console.log(type_of_msg);

            let chk_pvt_or_regular_msg = (type_of_msg == "regular") ? true : false;
            let share_button='';
            // console.log(chk_pvt_or_regular_msg);
            if(chk_pvt_or_regular_msg == true){
              share_button = '<button id="share_btn_'+ data[i].topic_id + '_' + data[i].post_number +'_' + data[i].id+'" type="button" data-tslug="'+slug+'" title="share a link to this post" onclick="share_function(this)">Share</button>'
            }

            if (data[i].username != username) {//for receive
              if (data[i] && data[i].reply_count > 1 && data[i].cooked && data[i].cooked.search("@")==-1 && data[i].cooked.search("href")==-1 && data[i].cooked.search("/u/")==-1 && data[i].cooked.search("mention")==-1){

                elements = elements + '<div id="msg_'+ data[i].topic_id + '_' + data[i].post_number+ '_' + posts_count+ '_' + page_number+'" class="message info">' + '<img alt="" class="img-circle medium-image" src="'+myUrl+'/user_avatar/'+myUrl.substring(8,myUrl.length)+'/' + data[i].username + '/120/671_2.png">'+ '<div class="message-body">' + '<div class="message-info">' + '<b>' +User_Name+ '</b>' + ' </h3>' + '<i id="reply_btn_'+ data[i].topic_id + '_' + data[i].post_number +'" type="button" title="'+ data[i].cooked.replace(/<[^>]+>/g, '') +'" class="fa fa-reply reply_function" aria-hidden="true"></i>' + share_button+'</div>' + '<hr>' + '<div class="message-text">' + data[i].cooked + '</div><button id="btn_'+ data[i].topic_id + '_' + data[i].post_number + '_' + posts_count+ '_' + page_number+'" type="button" class="see_replies">'+data[i].reply_count+' replies </button>' + message_datetime +'</div>' + '<br>' + '</div>';
              }
              else{

                let indexOfPreviousPost = array_to_store_post_number.indexOf(data[i].post_number);
                let indexOfNextPost = array_to_store_post_number.indexOf(data[i].reply_to_post_number);
                var difference = indexOfPreviousPost - indexOfNextPost;

                if(data[i].reply_to_post_number!= null && data[i].post_number != data[i].reply_to_post_number && difference!=1){
                  let indexOfPost = array_to_store_post_number.indexOf(data[i].reply_to_post_number);

                  if (indexOfPost > 0){
                    let reply_message = '<div>'+data[indexOfPost].cooked+'</div>';
                    elements = elements + '<div id="msg_'+ data[i].topic_id + '_' + data[i].post_number+'_' + posts_count+ '_' + page_number+ '" class="message info">' + '<img alt="" class="img-circle medium-image" src="'+myUrl+'/user_avatar/'+myUrl.substring(8,myUrl.length)+'/' + data[i].username + '/120/671_2.png">' + '<div class="message-body">' + '<div class="message-info">' + '<b>' + User_Name + '</b>' + ' </h3>' + '<i id="reply_btn_'+ data[i].topic_id + '_' + data[i].post_number +'" type="button" title="'+ data[i].cooked.replace(/<[^>]+>/g, '') +'" class="fa fa-reply reply_function"></i>' + share_button+'</div>' + '<hr>'  +reply_message+ '<div class="message-text">' + data[i].cooked + '</div>' + message_datetime+ '</div>' + '<br>' + '</div>';
                    reply_message = "";
                  }
                  else{
                    elements = elements + '<div id="msg_'+ data[i].topic_id + '_' + data[i].post_number+ '_' + posts_count+ '_' + page_number+'" class="message info">' + '<img alt="" class="img-circle medium-image" src="'+myUrl+'/user_avatar/'+myUrl.substring(8,myUrl.length)+'/' + data[i].username + '/120/671_2.png">' + '<div class="message-body">' + '<div class="message-info">' + '<b>' + User_Name + '</b>' + ' </h3>' + '<i id="reply_btn_'+ data[i].topic_id + '_' + data[i].post_number +'" type="button" title="'+ data[i].cooked.replace(/<[^>]+>/g, '') +'" class="fa fa-reply reply_function"></i>' + share_button+'</div>' + '<hr>'  +reply_message+ '<div class="message-text">' + data[i].cooked + '</div>' + message_datetime+'</div>' + '<br>' + '</div>';
                  }
                }
                else{
                  elements = elements + '<div id="msg_'+ data[i].topic_id + '_' + data[i].post_number+ '_' + posts_count+ '_' + page_number+'" class="message info">' + '<img alt="" class="img-circle medium-image" src="'+myUrl+'/user_avatar/'+myUrl.substring(8,myUrl.length)+'/' + data[i].username + '/120/671_2.png">' + '<div class="message-body">' + '<div class="message-info">' + '<b>' + User_Name + '</b>' + ' </h3>' + '<i id="reply_btn_'+ data[i].topic_id + '_' + data[i].post_number +'" type="button" title="'+ data[i].cooked.replace(/<[^>]+>/g, '') +'" class="fa fa-reply reply_function"></i>' + share_button+'</div>' + '<hr>'  + '<div class="message-text">' + data[i].cooked + '</div>' +message_datetime+ '</div>' + '<br>' + '</div>';                }  

              }
            }
            else {
              //for sent
              if (data[i] && data[i].reply_count > 1 && data[i].cooked && data[i].cooked.search("@")==-1 && data[i].cooked.search("href")==-1 && data[i].cooked.search("/u/")==-1 && data[i].cooked.search("mention")==-1){


                elements = elements +'<div id="msg_'+ data[i].topic_id + '_' + data[i].post_number+ '_' + posts_count+ '_' + page_number+'" class="message my-message"> '+ '<img alt="" class="img-circle medium-image" src="'+myUrl+'/user_avatar/'+myUrl.substring(8,myUrl.length)+'/' + data[i].username + '/120/671_2.png">' + '<div class="message-body">' + '<div class="message-info">' + '<b>' +User_Name+ '</b>' + ' </h3>' + '<i id="reply_btn_'+ data[i].topic_id + '_' + data[i].post_number +'" type="button" title="'+ data[i].cooked.replace(/<[^>]+>/g, '') +'" class="fa fa-reply reply_function"></i>' + '<button id="delete_btn_'+ data[i].topic_id + '_' + data[i].post_number +'_' + data[i].id+'" type="button" data-tslug="'+slug+'" title="'+ data[i].cooked.replace(/<[^>]+>/g, '') +'" onclick="delete_function(this)">Delete</button>'+ share_button+'</div>' + '<hr>' + '<div class="message-text">' + data[i].cooked + '</div><button id="btn_'+ data[i].topic_id + '_' + data[i].post_number +'_' + posts_count+ '_' + page_number+'" type="button" class="see_replies">'+data[i].reply_count+' replies </button>' + message_datetime +'</div>' + '<br>' + '</div>';
              }
              else{

                let indexOfPreviousPost = array_to_store_post_number.indexOf(data[i].post_number);
                let indexOfNextPost = array_to_store_post_number.indexOf(data[i].reply_to_post_number);
                var difference = indexOfPreviousPost - indexOfNextPost;

                if( data[i].reply_to_post_number!= null && data[i].post_number != data[i].reply_to_post_number && difference!=1){
                  let indexOfPost = array_to_store_post_number.indexOf(data[i].reply_to_post_number);

                  if (indexOfPost > 0){
                  let reply_message = '<div>'+data[indexOfPost].cooked+'</div>';
                  elements = elements + '<div id="msg_'+ data[i].topic_id + '_' + data[i].post_number+ '_' + posts_count+ '_' + page_number+'" class="message my-message">' + '<img alt="" class="img-circle medium-image" src="'+myUrl+'/user_avatar/'+myUrl.substring(8,myUrl.length)+'/' + data[i].username + '/120/671_2.png">' + '<div class="message-body">' + '<div class="message-body-inner">' + '<div class="message-info">' + '<b>' + User_Name + '</b>' + ' </h3>' + '<i id="reply_btn_'+ data[i].topic_id + '_' + data[i].post_number +'" type="button" title="'+ data[i].cooked.replace(/<[^>]+>/g, '') +'" class="fa fa-reply reply_function"></i>' + '<button id="delete_btn_'+ data[i].topic_id + '_' + data[i].post_number +'_' + data[i].id+'" type="button" data-tslug="'+slug+'" title="'+ data[i].cooked.replace(/<[^>]+>/g, '') +'" onclick="delete_function(this)">Delete</button>'+ share_button+'</div>' + '<hr>' + reply_message + '<div class="message-text">' + data[i].cooked + '</div>' + '</div>' +like_button+'  '+ message_datetime+'</div>' + '<br>' + '</div>';
                  reply_message = "";
                  }
                  else{
                    elements = elements + '<div id="msg_'+ data[i].topic_id + '_' + data[i].post_number+'_' + posts_count+ '_' + page_number+ '" class="message my-message">' + '<img alt="" class="img-circle medium-image" src="'+myUrl+'/user_avatar/'+myUrl.substring(8,myUrl.length)+'/' + data[i].username + '/120/671_2.png">' + '<div class="message-body">' + '<div class="message-body-inner">' + '<div class="message-info">' + '<b>' + User_Name + '</b>' + ' </h3>' + '<i id="reply_btn_'+ data[i].topic_id + '_' + data[i].post_number +'" type="button" title="'+ data[i].cooked.replace(/<[^>]+>/g, '') +'" class="fa fa-reply reply_function"></i>' + '<button id="delete_btn_'+ data[i].topic_id + '_' + data[i].post_number +'_' + data[i].id+'" type="button" data-tslug="'+slug+'" title="'+ data[i].cooked.replace(/<[^>]+>/g, '') +'" onclick="delete_function(this)">Delete</button>'+ share_button+'</div>' + '<hr>' + '<div class="message-text">' + data[i].cooked + '</div>' + '</div>' +like_button+ '  '+ message_datetime+ '</div>' + '<br>' + '</div>';
                    reply_message = "";
                  }
                }
                else{
                elements = elements + '<div id="msg_'+ data[i].topic_id + '_' + data[i].post_number+'_' + posts_count+ '_' + page_number+ '" class="message my-message">' + '<img alt="" class="img-circle medium-image" src="'+myUrl+'/user_avatar/'+myUrl.substring(8,myUrl.length)+'/' + data[i].username + '/120/671_2.png">' + '<div class="message-body">' + '<div class="message-body-inner">' + '<div class="message-info">' + '<b>' + User_Name + '</b>' + ' </h3>' + '<i id="reply_btn_'+ data[i].topic_id + '_' + data[i].post_number +'" type="button" title="'+ data[i].cooked.replace(/<[^>]+>/g, '') +'" class="fa fa-reply reply_function"></i>' + '<button id="delete_btn_'+ data[i].topic_id + '_' + data[i].post_number +'_' + data[i].id+'" type="button" data-tslug="'+slug+'" title="'+ data[i].cooked.replace(/<[^>]+>/g, '') +'" onclick="delete_function(this)">Delete</button>'+ share_button+'</div>' + '<hr>' + '<div class="message-text">' + data[i].cooked + '</div>' + '</div>' +like_button+ '  '+ message_datetime +'</div>' + '<br>' + '</div>';
                }
              }
            }
          }
          if(html_or_prepend == false){
            $('#holder3').html(elements);
          }
          else{
            $('#holder3').prepend(elements);
          }
          document.getElementById('chat_').scrollTop = 9999999;
        });


      var z = window.matchMedia("(max-width: 767px)");
      my_Function(z); // Call listener function at run time
      z.addListener(my_Function); // Attach listener function on state changes
      //alert(x);

    }

    //Navbar
    /* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
    function openNav() {
      document.getElementById("mySidebar").style.width = "250px";
      // document.getElementById("main").style.marginLeft = "250px";
    }

    /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
    function closeNav() {
      document.getElementById("mySidebar").style.width = "0";
      // document.getElementById("main").style.marginLeft = "0";
    }

    document.addEventListener('click', function (event) {

      // If the clicked element doesn't have the right selector, bail
      if (!event.target.matches('.see_replies') && !event.target.matches('.reply_function')) return;

      // Don't follow the link
      event.preventDefault();

      // Log the clicked element in the console
      // console.log(event.target.id);?

      if (event.target.matches('.see_replies') && event.target.id){
        var message_id = event.target.id

        var fields = message_id.split('_');
        var topic_id = fields[1];
        var post_number = fields[2];
        var posts_count = fields[3];
        var page_number = fields[4];
        var reply_count = 0;
        if (event.target.innerText){
           reply_count = event.target.innerText.replace(/\D/g, '');
           reply_count = Number(reply_count);
           // console.log(reply_count);
        }

        var x = document.getElementById('msg_'+ topic_id + '_' + post_number+'_'+posts_count+'_'+page_number);
        // console.log(x.classList);
        var temp = false;
        var class_toggle = "info";

        if (x.classList.length > 0){
          temp = x.classList.toggle("show");
          class_toggle = x.classList[0].includes("my-message");
          if (class_toggle){
            class_toggle = "my-message";
          }
        }
          if (temp){
            $.ajax({
                url: "/post/more/t/"+topic_id
            })
            .done(function (data) {
                var elements = '';
                let count = 1;
                if (data && data.post_stream){
                  data = data.post_stream.posts
                  for (let i = 0; i < data.length; i++) {
                  let User_Name = (data[i].username == null) ? data[i].name : data[i].username;
                  if(post_number == data[i].reply_to_post_number){
                    elements = elements + '<div id="reply_msg_'+ topic_id + '_' + post_number+ '_' +count+ '" class="message '+ class_toggle +'">' + '<img alt="" class="img-circle medium-image" src="'+myUrl+'/user_avatar/'+myUrl.substring(8,myUrl.length)+'/' + data[i].username + '/120/671_2.png">'+ '<div class="message-body">' + '<div class="message-info">' + '<b>' + User_Name + '</b>' + ' </h3>' + '<h5>' + '</h5>' + '</div>' + '<hr>' + '<div class="message-text">' + data[i].cooked + '</div>' + '</div>' + '<br>' + '</div>';
                    count = count + 1;
                  }
                 }
                }
                $('#msg_'+ topic_id + '_' + post_number+'_'+posts_count+'_'+page_number).append(elements);
            });
          }
          else{
              var count = 1 ;
              // console.log(reply_count);
              while(reply_count+1 > count){
                if (document.querySelector("#reply_msg_"+ topic_id + '_' + post_number+ '_'+count)){
                  document.querySelector("#reply_msg_"+ topic_id + '_' + post_number+ '_'+count).remove();
                }
                count = count +1;
              }
          }
        }
        else if(event.target.matches('.reply_function') && event.target.id){
          var message_id = event.target.id
          var fields = message_id.split('_');
          var topic_id = fields[2];
          var post_number = fields[3];
          $('.display_replies').empty();
          $(".display_replies").css('margin', "1%");
          $('.display_replies').attr("id","rmv_btn_"+topic_id+'_'+post_number);
          $('.display_replies').append(event.target.title+'<button onclick="removeReplyMessage()" type="button" name="remove" class="btn btn-sm">remove</button>');
        }
        else{
          alert("sorry. something went wrong. please try again later")
        }


    }, false);

    function removeReplyMessage(){
      $('.display_replies').empty();
    }

    $(window).scroll(function(){

      if ($(window).scrollTop() <=0 ){

        var get_topic_id = document.querySelector('div[id^="msg_"]');

        if(get_topic_id && get_topic_id.id){
          div_id = get_topic_id.id.split("_");
          topic_id = div_id[1];
          posts_count = div_id[3];
          page_number = div_id[4];

          if (posts_count && topic_id && page_number && posts_count>20){

            page_number = Number(page_number)-1;

            if (page_number>0){
              x = [topic_id,page_number]
              load_posts(x);
            }
           }
        }
      }
    });

    function delete_function(clicked_element_data){
      // console.log(clicked_element_data.id);

      if(clicked_element_data){
        var id = clicked_element_data.id.split("_")[4];
        // console.log(id);

        $.ajax({
                url: "delete/posts/"+id,
                type: 'DELETE'
            })
            .done(function (data) {
              clicked_element_data.offsetParent.offsetParent.remove();
        });
      }
    }

    function share_function(clicked_element_data){
      // console.log(clicked_element_data);

      if(clicked_element_data){
        id = clicked_element_data.id.split("_")
        tid = id[2];
        post_number = id[3];
        var id = clicked_element_data.id;
        alert(window.location.origin +"/t/"+clicked_element_data.dataset.tslug+"/"+tid+"/"+post_number);
      }
    }