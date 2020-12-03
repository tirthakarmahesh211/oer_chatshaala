//jshint esversion:8
let dropdownBtn = document.querySelector('.menu-btn');
let menuContent = document.querySelector('.menu-content');
dropdownBtn.addEventListener('click', () => {
  if (menuContent.style.display == "none") {
    menuContent.style.display = "block";
  } else {
    menuContent.style.display = "none";
  }
});

window.onpaint = preloadFunc();

function preloadFunc(){
  $.ajax({
    url: "/analytics"
  })
  .done(function (data) {
    // console.log(data)
    document.getElementById("total_resources").innerHTML = data.about.stats.topic_count
    document.getElementById("registered_users").innerHTML = data.about.stats.user_count
    document.getElementById("active_users").innerHTML = data.about.stats.active_users_30_days
  });
  let username = document.getElementById("curr_user").getAttribute("name");
  let curr_user_id = document.getElementById("curr_user_id").getAttribute("name");
  document.getElementById("plus_btn").style.display = "none";
  if( (username == "system" || username != "") && curr_user_id != ""){
    document.getElementById("plus_btn").style.display = "block";
    document.getElementById("logout_link").style.display = "block";
    document.getElementById("login_link").style.display = "none";
    document.getElementById("saveDelta").style.display = "block";
    document.getElementById("upload_files").style.display = "block";
  }
  else{
    document.getElementById("plus_btn").style.display = "none";
    document.getElementById("logout_link").style.display = "none";
    document.getElementById("login_link").style.display = "block";
    document.getElementById("saveDelta").style.display = "none";
    document.getElementById("upload_files").style.display = "none";
    document.getElementById("replyMessage").placeholder = "Please Login to give your feedback or ask any question or discuss the topic"
  } 
}

//Loading categories on page Load
window.onload = function () {
  history.pushState(null, null, location.href);
    window.onpopstate = function () {
    history.go(1);
  };

  let username = document.getElementById("curr_user").getAttribute("name");
  let curr_user_id = document.getElementById("curr_user_id").getAttribute("name");
  // console.log(curr_user_id);
  // console.log(username);
  if( (username == "system" || username != "") && curr_user_id != ""){
    document.getElementById("plus_btn").style.display = "block";
    document.getElementById("logout_link").style.display = "block";
    document.getElementById("login_link").style.display = "none";
  }
  else{
    document.getElementById("plus_btn").style.display = "none";
    document.getElementById("logout_link").style.display = "none";
    document.getElementById("login_link").style.display = "block";
    document.getElementById("replyMessage").placeholder = "Please Login to give your feedback or ask any question or discuss the topic";
    document.getElementById("upload_paperclip_icon").addEventListener("click", function(){
      alert("Please Login to upload files");
    });
    document.getElementById("paper_plane_icon").addEventListener("click", function(){
      alert("Please Login to give your feedback or ask any question or discuss the topic");
    });
  }

  var page_url = document.getElementById("page_url");
  document.getElementById('details-form').style.display = "none";
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

    $('#menu_active').text('Latest');
    var e = document.getElementById("category_click");
    e.classList.remove("active-tab");
    e = document.getElementById("private_click");
    e.classList.remove("active-tab");
    e = document.getElementById("group_click");
    e.classList.remove("active-tab");
    e = document.getElementById("latest_click");
    e.classList.add("active-tab");

    document.getElementById("inbox-message-1").style.display = "Block";
  }
  else{
      document.getElementById("holder5").style.display = "None";
      document.getElementById("holder2").style.display = "None";
      document.getElementById("holder6").style.display = "None";
      document.getElementById("holder4").style.display = "None";
      document.getElementById("holder7").style.display = "None";
    document.getElementById("latest_click").click();
  }
  // console.log(document.getElementById("specific_posts_page").getAttribute("name"));
  if(document.getElementById("specific_posts_page").getAttribute("name") == "true"){
    if(document.getElementById("load_next_posts") != null && document.getElementById("load_next_posts")!=undefined){
      document.getElementById("load_next_posts").style.display = "block";
    }
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

  var myInput = document.getElementById("myInput");
  var search_icon = document.getElementById("search_icon");
  // var search_clear_btn = document.getElementById("search_clear_btn");
  // console.log(event.target);
  if(myInput && (myInput.value == "" || myInput.value == null || myInput.value == undefined )){
    // search_clear_btn.style.display="none";
    myInput.style.display = "none";
    myInput.value="";
  }
  if (event.target == search_icon || event.target == myInput) {
    if(event.target == search_icon && myInput != null && myInput!= undefined && myInput.style.display == "block"){
      myInput.style.display = "none";
      myInput.value="";
      // search_clear_btn.style.display="none";
    }
    else{
      myInput.style.display = "block";
      // search_clear_btn.style.display="block";
    }
  }
  // else{
  //   myInput.style.display = "none";
  //   myInput.value="";
  //   search_clear_btn.style.display="none";
  // }

};


function visible_subcat(){
  var el =this;
  // console.log("jbkbkbkbk")
  load_subcategories();
}

function myFunc(clicked_element_data,filter=null) {
  // alert("hi");
  // Declare variables
  var ele = document.getElementById('#back2');
  ele.addEventListener('click', visible_subcat);

  if(clicked_element_data != null && clicked_element_data.firstChild!=null && clicked_element_data.firstChild!=undefined){
    // console.log(param);
    left_panel_header_title = clicked_element_data.firstChild.getAttribute("id");
    $('#menu_active').text(left_panel_header_title);
  }
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  var chk_filter_null_or_not = true;
  if(filter == null){
    chk_filter_null_or_not = false;
    filter = input.value.toUpperCase();
  }
    var get_div = document.querySelectorAll('div[id^="holder"][style*="display: block"]');

    if((get_div && get_div[0] && get_div[0].id == "holder8") || get_div == undefined || get_div== null || get_div[0] == undefined || get_div[0] == null ){
      get_div = document.querySelectorAll('div[id^="holder"][data-display]');
    }
    else if(get_div == undefined || get_div == null || get_div[0] == undefined || get_div[0] == null ){
      get_div = document.querySelectorAll('div[id^="holder"][style*="display:block"]');
    }
    console.log(get_div);
    var div_id = (get_div!=null && get_div!=undefined && get_div.length > 0)? get_div[0].id:null;
  var holder8 = document.getElementById("holder8");

  if(filter!= "" && filter!=null && filter !=undefined && filter.length > 2){
    
    // $.ajax({
    // url: '/advanced_search',
    // data: { search_text: filter }
    //   }).done(
    //     (data) => {

    //       if(get_div[0].id != "holder8"){
    //         get_div[0].style.display = "none";
    //         get_div[0].setAttribute("data-display", "");
    //       }
    //       holder8.style.display = "block";
    //       elements = '';
    //       if(data.users!= undefined && data.users !=null){
    //       for (i = 0; i < data.users.length; i++) {
    //       elements = elements + '<div onClick="create_private_msg(\''+ data.users[i].username +'\')" data-username="'+data.users[i].username+'"><li data-toggle="tab" data-target="#inbox-message-0"><img alt="" class="img-circle medium-image" src="'+ document.getElementById("url").getAttribute("name")+data.users[i].avatar_template.replace("{size}","50")+'"> \
    //       <div class="vcentered info-combo"><h3 class="no-margin-bottom name"><b>'+ data.users[i].name +'</b> </h3><h5>'+ data.users[i].username +'</h5></div><div class="contacts-add"></div></li></div>';
    //       }
    //       holder8.innerHTML = elements;
    //       }
    //     }
    //   );

      $.ajax({
        url: '/search_topics_and_posts',
        data: { search_text: filter }
      }).done(
        (data) => {
          // console.log(data);
          // console.log(get_div);
          if(get_div && get_div.length > 0 && get_div[0].id != "holder8"){
            get_div[0].style.display = "none";
            get_div[0].setAttribute("data-display", "");
          }
          holder8.style.display = "block";
          elements = '';
          // console.log(data);
          if(data.topics!= undefined && data.topics !=null){
          for (i = 0; i < data.topics.length; i++) {
            var mydate, user_id, newdate, newtime, slud, topic_id;
            //var img = "/images/icons/noun_Email_3449902.png";

            mydate = data.posts[i].created_at;
            slug = data.topics[i].slug;
            topic_id = data.posts[i].topic_id;

              var img = data.topics[i].tags;
              // console.log(img);
              // var img = "https://t2.metastudio.org/"+ data.users[i].avatar_template;
              // var ebooks = img.includes("ebooks");
              // console.log(ebooks);
              if(img.includes("ebooks")){
                img = "/images/icons/noun_ebook_3492764.png";
              }else if(img.includes("videos")){
                img = "/images/icons/noun_Video_2354550.png";
              }else if(img.includes("documents")){
                img = "/images/icons/noun_PDF_377198.png";
              }else if(img.includes("audios")){
                img = "/images/icons/noun_Audio_3408350.png";
              }else if(img.includes("interactives")){
                img = "/images/icons/noun_interactivity_1855299.png";
              }else{
                img = "/images/icons/noun_miscellaneous_3067705.png";
              }


            newdate = mydate[8] + mydate[9] + "/" + mydate[5] + mydate[6];

            newtime = mydate[11] + mydate[12] + mydate[13] + mydate[14] + mydate[15];

             elements = elements + '<div data-posts_count="'+data.topics[i].posts_count+'" data-post_id="'+data.posts[i].id+'" onClick=' + 'load_posts_using_page_number("' + slug + "/" + topic_id +"/1"+ '",this,\"searched_data\")' + '>' + '<li id="' + data.topics[i].fancy_title + '" class="" data-toggle="tab" data-target="#inbox-message-' + 1 + '">' + '<img alt="" class="user-logo-rect medium-image" src="'+img +'">' + 
              '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + data.topics[i].title + '</b>' + ' </h3>' + '<h5>' + "Latest by: " + data.posts[i].username +'   '+ '<strong class="total-message-count">'+((data.topics[i].posts_count > 1)? data.topics[i].posts_count +' posts':data.topics[i].posts_count +' post')+'</strong>' + '</h5>' + '</div>' + 
              '<div class="contacts-add">' + '<span class="message-time">' + newdate + '<br>' + newtime + '<sup>' + '</sup>' + '</span>' + '</div>' + '</li>' + '</div>';
           }
          }
          if(chk_filter_null_or_not == true){
            holder8.style.display = "none";
            holder11.style.display = "block";
            holder11.innerHTML = elements;
          }
          else{
            holder8.innerHTML = elements;
          }
        }
      );
  }
  else if(filter.length < 2){

    if(get_div && get_div.length > 0 && get_div[0].id != "holder8"){
      var div = document.querySelectorAll('div[id^="holder"][data-display]');

      if(div  && div[0]){
        div[0].removeAttribute("data-display");
        div[0].style.display="block";
      }
    }
    holder8.style.display = "none";
    document.getElementById("inbox-message-1").style.display = "None";
  }
  // ul = document.getElementById("myUL");
  // li = ul.getElementsByTagName('li');
  // //alert(filter);
  // // Loop through all list items, and hide those who don't match the search query
  // for (i = 0; i < li.length; i++) {
  //   a = li[i].id;
  //   txtValue = a;
  //   // alert(txtValue);
  //   if (txtValue.toUpperCase().indexOf(filter) > -1) {
  //     // alert(li[i].id);
  //     li[i].style.display = "";
  //   } else {
  //     // alert("hi");
  //     li[i].style.display = "none";
  //   }  
  // }
}



    //Loading messages on left pane
    function function_pvt() {
      $("#right_panel_msg").css("display","block");
      // window.history.replaceState("object or string", '' , '/');
      document.getElementById("inbox-message-1").style.display = "None";
      if (menuContent.style.display == "block") {
        menuContent.style.display = "";
      }

      document.getElementById("holder5").style.display = "None";
      document.getElementById("holder2").style.display = "Block";
      document.getElementById("holder6").style.display = "None";
      document.getElementById("holder4").style.display = "None";
      document.getElementById("holder7").style.display = "None";
      document.getElementById("holder8").style.display = "None";
      document.getElementById("holder9").style.display = "None";
      document.getElementById("holder11").style.display = "None";

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
        url: "/sent/" + username
      })

        .done(function (data) {
          //console.log(data);
          $('#holder2').html("");
          var elements = '';


          for (var i = 0; i < data.length; i++) {
            var mydate, user_id, newdate, newtime, slud, ide;
            var img = "/images/icons/noun_Email_3449902.png";

            mydate = data[i].last_posted_at;
            slug = data[i].slug;
            ide = data[i].id;


            newdate = mydate[8] + mydate[9] + "/" + mydate[5] + mydate[6];
            //alert('newdate: ' + newdate);

            newtime = mydate[11] + mydate[12] + mydate[13] + mydate[14] + mydate[15];
            // alert('newtime: ' + newtime);

            // elements = elements + '<div onClick=' + 'load_posts("' + slug + "/" + ide + "/1" + '",this)' + '>' + '<li id="' + data[i].fancy_title + '" class="" data-toggle="tab" data-target="#inbox-message-' + i + '">' + '<div class="message-count">' + data[i].posts_count + '</div>' + '<img alt="" class="img-circle medium-image" src="' + img + '">' + '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + data[i].fancy_title + '</b>' + ' </h3>' + '<h5>' + "Latest post by: " + data[i].last_poster_username + '</h5>' + '</div>' + '<div class="contacts-add">' + '<span class="message-time">' + newdate + '<br>' + newtime + '<sup>' + '</sup>'  + '</div>' + '</li>' + '</div>';
            elements = elements + '<div onClick=' + 'load_posts("' + slug + "/" + ide + "/1" + '",this)' + '>' + '<li id="' + data[i].fancy_title + '" class="" data-toggle="tab" data-target="#inbox-message-' + i + '">' + '<img alt="" class="user-logo-rect medium-image" src="' + img + '">' + '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + data[i].fancy_title + '</b>' + ' </h3>' + '<h5>' + "Latest by: " + data[i].last_poster_username + '   '+ '<strong class="total-message-count">'+((data[i].posts_count > 1)? data[i].posts_count +' msgs':data[i].posts_count +' msg')+'</strong>' + '</h5>' + '</div>' + '<div class="contacts-add">' + '<span class="message-time">' + newdate + '<br>' + newtime + '<sup>' + '</sup>'  + '</div>' + '</li>' + '</div>';   

          }

          $('#holder2').append(elements);

          $.ajax({
            url: "/receive/" + username
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

                  // elements = elements + '<div onClick=' + 'load_posts("' + slug + "/" + ide + "/1" + '",this)' + '>' + '<li id="' + data2[i].fancy_title + '" class="" data-toggle="tab" data-target="#inbox-message-' + 1 + '">' + '<div class="message-count">' + data2[i].posts_count + '</div>' + '<img alt="" class="img-circle medium-image" src="/images/icons/noun_Email_3449902.png">' + '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + data2[i].fancy_title + '</b>' + ' </h3>' + '<h5>' + "Latest post by: " + data2[i].last_poster_username + '</h5>' + '</div>' + '<div class="contacts-add">' + '<span class="message-time">' + newdate + '<br>' + newtime + '<sup>' + '</sup>' + '</span>' + '</div>' + '</li>' + '</div>';
                elements = elements + '<div onClick=' + 'load_posts("' + slug + "/" + ide + "/1" + '",this)' + '>' + '<li id="' + data2[i].fancy_title + '" class="" data-toggle="tab" data-target="#inbox-message-' + 1 + '">' + '<img alt="" class="user-logo-rect medium-image" src="/images/icons/noun_Email_3449902.png">' + '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + data2[i].fancy_title + '</b>' + ' </h3>' + '<h5>' + "Latest by: " + data2[i].last_poster_username + '   '+ '<strong class="total-message-count">'+data2[i].posts_count +' msgs'+'</strong>' +'</h5>' + '</div>' + '<div class="contacts-add">' + '<span class="message-time">' + newdate + '<br>' + newtime + '<sup>' + '</sup>' + '</span>' + '</div>' + '</li>' + '</div>';
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
      $("#right_panel_msg").css("display","block");
      // window.history.replaceState("object or string", '' , '/');
      document.getElementById("inbox-message-1").style.display = "None";
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
      document.getElementById("holder8").style.display = "None";
      document.getElementById("holder9").style.display = "None";
      document.getElementById("holder11").style.display = "None";

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

            // elements = elements + '<div onClick=' + 'load_topics("' + slug + "/" + ide + "/load/0" + '",this)' + '>' + '<li id="' + data[i].name + '" class="" data-toggle="" data-target="">' + '<div class="message-count">' + data[i].topic_count + '</div>' + '<img alt="" class="img-circle medium-image" src="/images/icons/noun_group_737653.png">' + '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + data[i].name + '</b>' + ' </h3>' + '<h5>' + "Latest post by: " + '</h5>' + '</div>' + '<div class="contacts-add">' + '<span class="message-time">' + '<br>' + '<sup>' + '</sup>' + '</span>' + '</div>' + '</li>' + '</div>';
            elements = elements + '<div onClick=' + 'load_topics("' + slug + "/" + ide + "/load/0" + '",this)' + '>' + '<li id="' + data[i].name + '" class="" data-toggle="" data-target="">' + '<div class="message-count" title="Topics">' + data[i].topics_all_time + '</div>' + '<img alt="" class="user-logo-rect medium-image" src="/images/icons/noun_group_737653.png">' + '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + data[i].name + '</b>' + ' </h3>' + '<h5>' + "Latest post by: " + '</h5>' + '</div>' + '<div class="contacts-add">' + '<span class="message-time">' + '<br>' + '<sup>' + '</sup>' + '</span>' + '</div>' + '</li>' + '</div>';          
          }


          $('#holder4').html(elements);
        });


    }
    function function_category_common(value=null) {
      // console.log(value);
      var username = $('#curr_user').attr('name');
      if(value !=true){
      // $(".mobile_backbtn2").css("display","block");        
      $("#right_panel_msg").css("display","block");
      // window.history.replaceState("object or string", '' , '/');
      document.getElementById("inbox-message-1").style.display = "None";
      $('#menu_active').text('Categories');
      var e = document.getElementById("category_click");
      if(e!=null && e!=undefined){
        e.classList.add("active-tab")
      }
      e = document.getElementById("private_click");
      if(e!=null && e!=undefined){
        e.classList.remove("active-tab");
      }
      e = document.getElementById("group_click");
      if(e!=null && e!=undefined){
        e.classList.remove("active-tab");
      }
      e = document.getElementById("latest_click");
      if(e!=null && e!=undefined){
        e.classList.remove("active-tab");
      }
      e = document.getElementById("partner_click");
      if(e!=null && e!=undefined){
        e.classList.remove("active-tab");
      }
      e = document.getElementById("course_click");
      if(e!=null && e!=undefined){
        e.classList.remove("active-tab");
      }   
      document.getElementById("holder6").style.display = "Block";
      document.getElementById("holder4").style.display = "None";
      document.getElementById("holder2").style.display = "None";
      document.getElementById("holder5").style.display = "None";
      document.getElementById("holder7").style.display = "None";
      document.getElementById("holder8").style.display = "None";
      document.getElementById("holder9").style.display = "None";
      document.getElementById("holder10").style.display = "None";
      document.getElementById("holder11").style.display = "None";
      if (menuContent.style.display == "block") {
        menuContent.style.display = "";
      }
      }
      $.ajax({
        url: "/user/common/" + username
      })

        .done(function (data) {

          // console.log(data);
          var elements = '';
          for (var i = 0; i < data.length; i++) {
            var slug, ide, logo;
            logo="/images/icons/noun_Category_2706222.png";
            slug = data[i].slug;
            ide = data[i].id;
            if (data[i].uploaded_logo) {
              logo = data[i].uploaded_logo.url;
              logo=myUrl+logo;
            }
            let partners_div = (data[i].name == 'Institutional Partners' || data[i].name == 'State Partners' || data[i].name == 'Interest Groups' || data[i].name == 'Individual Partners')?'style="display:none;"':'';

            if(data[i]!=null && data[i]!=undefined && data[i].subcategory_ids && data[i].subcategory_ids.length > 0){

              elements = elements + '<div '+ partners_div +' data-cname="'+ data[i].name +'" class="contact_list" data-cid="'+data[i].id+'" data-cslug="'+data[i].slug+'" data-sub_cids="'+data[i].subcategory_ids.toString()+'" onClick="load_subcategories(this)"' + '>' + '<li id="' + data[i].name + '" class="" data-toggle="" data-target="">' + '<img alt="" class="user-logo-rect medium-image" src="'+logo+'">' + '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + data[i].name + '</b>' + ' </h3>' + '<h5>' + ((data[i].description)? data[i].description: '') + '</h5>' + '</div>' + '<div class="contacts-add">' + '<span class="message-time">' + '<br>' + '<sup>' + '</sup>' + '</span>' + '</div>' + '</li>' + '</div>';  
            }
            else
            {
            // let partners_div = (data[i].name == 'Institutional Partners' || data[i].name == 'State Partners' || data[i].name == 'Interest Groups' || data[i].name == 'Individual Partners')?'style="display:none;':'';
              if(data[i].description){

              elements = elements + '<div '+partners_div +' data-cid="'+ data[i].id +'" data-cname="'+ data[i].name +'" class="contact_list" onClick=' + 'load_topics("' + slug + "/" + ide + "/load/0" + '",this)' + '>' + '<li id="' + data[i].name + '" class="" data-toggle="" data-target="">'  + '<img alt="" class="user-logo-rect medium-image" src="'+logo+'">' + '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + data[i].name + '</b>' + ' </h3>' + '<h5>' +data[i].description + '</h5>' + '</div>' + '<div class="contacts-add">' + '<span class="message-time">' + '<br>' + '<sup>' + '</sup>' + '</span>' + '</div>' + '</li>' + '</div>';
              }else{
                //elements = elements + '<div data-cid="'+ data[i].id  +'" data-cname="'+ data[i].name  +'" class="contact_list" onClick=' + 'load_topics("' + slug + "/" + ide + "/load/0" + '")' + '>' + '<li id="' + data[i].name + '" class="" data-toggle="" data-target="">' + '<div class="message-count">' + data[i].topic_count + '</div>' + '<img alt="" class="img-circle medium-image" src="'+logo+'">' + '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + data[i].name + '</b>' + ' </h3>' +'</div>' + '<div class="contacts-add">' + '<span class="message-time">' + '<br>' + '<sup>' + '</sup>' + '</span>' + '<i class="fa fa-trash-o">' + '</i>' + '<div onClick=' + 'copy_topic(event,"' + "/group/" + slug + "/" + ide + '")' + '>' + '<i class="fa fa-share-alt">' + '</i>' + '</div>' + '</div>' + '</li>' + '</div>';
                elements = elements + '<div '+partners_div +' data-cid="'+ data[i].id +'" data-cname="'+ data[i].name +'" class="contact_list" onClick=' + 'load_topics("' + slug + "/" + ide + "/load/0" + '",this)' + '>' + '<li id="' + data[i].name + '" class="" data-toggle="" data-target="">'  + '<img alt="" class="user-logo-rect medium-image" src="'+logo+'">' + '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + data[i].name + '</b>' + ' </h3>' + '<h5>' + '</h5>' + '</div>' + '<div class="contacts-add">' + '<span class="message-time">' + '<br>' + '<sup>' + '</sup>' + '</span>' + '</div>' + '</li>' + '</div>';
              }
            }
            // if(data[i] && data[i].subcategory_ids){
            //   data1 = {"dataset":{"cid": data[i].id, "sub_cids": (data[i].subcategory_ids ? data[i].subcategory_ids.toString(): "" )}}
            //   load_subcategories(data1,value);
            // }
          }

          $('#holder6').html(elements);
        });
      closeNav();
    }

    function function_latestposts(){
      // alert("latest");
      $("#right_panel_msg").css("display","block");
      // window.history.replaceState("object or string", '' , '/');
      document.getElementById("inbox-message-1").style.display = "None";
      if (menuContent.style.display == "block") {
        menuContent.style.display = "";
      }

      document.getElementById("holder5").style.display = "None";
      document.getElementById("holder2").style.display = "Block";
      document.getElementById("holder6").style.display = "None";
      document.getElementById("holder4").style.display = "None";
      document.getElementById("holder7").style.display = "None";
      document.getElementById("holder8").style.display = "None";
      document.getElementById("holder9").style.display = "None";
      document.getElementById("holder10").style.display = "None";
      document.getElementById("holder11").style.display = "None";

      $('#menu_active').text('Latest');
      var e = document.getElementById("category_click");
      if(e!=null && e!=undefined){
        e.classList.remove("active-tab");
      }
      e = document.getElementById("private_click");
      if(e!=null && e!=undefined){
        e.classList.remove("active-tab");
      }
      e = document.getElementById("group_click");
      if(e!=null && e!=undefined){
        e.classList.remove("active-tab");
      }
      e = document.getElementById("latest_click");
      if(e!=null && e!=undefined){
        e.classList.add("active-tab");
      }
      e = document.getElementById("course_click");
      if(e!=null && e!=undefined){
        e.classList.remove("active-tab");
      }
      e = document.getElementById("partner_click");
      if(e!=null && e!=undefined){
        e.classList.remove("active-tab");
      }
      var my_div = $("#holder2");

      // console.log(my_div)
      // var username = $('#curr_user').attr('name');
      // alert("hi");
      document.getElementById("holder2").style.display = "Block";

      $.ajax({
        url: "/latest/" 
      })
        .done(function (data) {
          // console.log("tyutut")
          //console.log(data.topic_list.topics);

          $('#holder2').html("");
          var elements = '';

          for (var i = 0; i < data.topic_list.topics.length; i++) {
            var mydate, user_id, newdate, newtime, slud, ide, fancy_title;
            //var img = "/images/icons/noun_timeline_2021907.png";
             var img = data.topic_list.topics[i].tags;
              // console.log(img);
              // var img = "https://t2.metastudio.org/"+ data.users[i].avatar_template;
              // var ebooks = img.includes("ebooks");
              // console.log(ebooks);
              if(img.includes("ebooks")){
                img = "/images/icons/noun_ebook_3492764.png";
              }else if(img.includes("videos")){
                img = "/images/icons/noun_Video_2354550.png";
              }else if(img.includes("pdf")){
                img = "/images/icons/noun_PDF_377198.png";
              }else if(img.includes("audios")){
                img = "/images/icons/noun_Audio_3408350.png";
              }else if(img.includes("interactives")){
                img = "/images/icons/noun_interactivity_1855299.png";
              }else{
                img = "/images/icons/noun_miscellaneous_3067705.png";
              }

            mydate = data.topic_list.topics[i].last_posted_at;
            slug = data.topic_list.topics[i].slug;
            ide = data.topic_list.topics[i].id;
            fancy_title = data.topic_list.topics[i].fancy_title;

            // console.log(ide);
            // var new_posts = data.t{opic_list.topics[i].new_posts;

            // if (typeof new_posts === 'undefined'){
            //   new_posts = '0'; 
            // }
            // var user_id = null;
            // var avatar_template = null;
            // for (let j = 0; j < data.topic_list.topics[i].posters.length; j++) {
            //   if(data.topic_list.topics[i].posters[j].description.indexOf("Original Poster") != -1 ){
            //     user_id = data.topic_list.topics[i].posters[j].user_id;
            //   }
            // }
            // if(user_id!=null){
            //   for (let k = 0; k < data.users.length; k++) {
            //     if(user_id == data.users[k].id){
            //       var avatar_template = data.users[k].avatar_template.replace("{size}","50"); 
            //       var img = document.getElementById("url").getAttribute("name")+ avatar_template;
            //     }
            //   }
            // }
            // avatar_template = img;

            newdate = mydate[8] + mydate[9] + "/" + mydate[5] + mydate[6];
            //alert('newdate: ' + newdate);

            newtime = mydate[11] + mydate[12] + mydate[13] + mydate[14] + mydate[15];
            // alert('newtime: ' + newtime);

            // elements = elements + '<div onClick=' + 'load_posts("' + slug + "/" + ide + "/1" + '",this)' + '>' + '<li id="' + fancy_title + '" class="" data-toggle="tab" data-target="#inbox-message-' + i + '">' + '<div class="message-count">' + new_posts+ '</div>' + '<img alt="" class="img-circle medium-image" src="' + img + '">' + '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + fancy_title + '</b>' + ' </h3>' + '<h5>' + "Latest by: " + data.topic_list.topics[i].last_poster_username +'   '+ '<strong class="total-message-count">'+data.topic_list.topics[i].posts_count +' posts'+'</strong>'+ '</h5>' + '</div>' + '<div class="contacts-add">' + '<span class="message-time">' + newdate + '<br>' + newtime + '<sup>' + '</sup>' + '</span>' + '</div>' + '</li>' + '</div>';
             elements = elements + '<div onClick=' + 'load_posts("' + slug + "/" + ide + "/1" + '",this)' + '>' + '<li id="' + fancy_title + '" class="" data-toggle="tab" data-target="#inbox-message-' + i + '">' + '<img alt="" class="user-logo-rect medium-image" src="' + img + '">' + '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + fancy_title + '</b>' + ' </h3>' + '<h5>' + "Latest by: " + data.topic_list.topics[i].last_poster_username +'   '+ '<strong class="total-message-count">'+((data.topic_list.topics[i].posts_count > 1)? data.topic_list.topics[i].posts_count +' posts':data.topic_list.topics[i].posts_count +' post')+'</strong>'+ '</h5>' + '</div>' + '<div class="contacts-add">' + '<span class="message-time">' + newdate + '<br>' + newtime + '<sup>' + '</sup>' + '</span>' + '</div>' + '</li>' + '</div>';

          // }
        }

          $('#holder2').append(elements);

        })
        function_category_common(true);
    }


    //Loading each topic on left pane
    function copy_topic(event, x) {

      var tempInput = document.createElement("input");
      tempInput.value = window.location.origin +x.slice(5,x.length);
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);

      alert("Share URL has been copied to clipboard.");
      // alert("Copy: " + x);
      // console.log(event);
      if (event.stopPropagation) {
        event.stopPropagation();   // W3C model
      } else {
          event.cancelBubble = true; // IE model
      }
    }

    function load_topics(x, param=null) {
      console.log(param);
      $("#right_panel_msg").css("display","none");
      // console.log(x);
      y = x;
      if(x && x.split("##").length == 1){
        $('#holder5').html("");
      }
      else{
        x = x.split("##")[0];
      }

      var left_panel_header_title = null;
      // console.log("param");
      if(param != null && param.firstChild!=null && param.firstChild!=undefined){
        // console.log(param);
        left_panel_header_title = param.firstChild.getAttribute("id");
        $('#menu_active').text(left_panel_header_title);
      }
      // console.log(left_panel_header_title);
      console.log(param.dataset.class);

      // var ele = document.getElementById('#back2');
      // ele.addEventListener('click', visible_subcat);

      var class_div = false;
      if(param!=null && param!=undefined && param.dataset.class==""){
        class_div = true;
      }
      $("#category_details").attr("data-title", left_panel_header_title);
      document.getElementById("holder5").style.display = "Block";
      document.getElementById("holder2").style.display = "None";
      document.getElementById("holder6").style.display = "None";
      document.getElementById("holder4").style.display = "None";
      document.getElementById("holder7").style.display = "None";
      document.getElementById("holder8").style.display = "None";
      document.getElementById("holder9").style.display = "None";
      document.getElementById("holder10").style.display = "None";
      document.getElementById("holder11").style.display = "None";
      var my_div = $("#holder5");
      var l = 1;

      if(x && x.startsWith("c/") && x.split("/").length > 0){
        console.log("if block");
        // console.log(x);
        $.ajax({

          url: "/"+x,
          data: { class: class_div },
        })
          .done(function (data) {
            // //console.log(data);

            data = data.topic_list.topics;

            var elements = '';
            var img = "/images/icons/noun_timeline_2021907.png"

            for (var i = 0; i < data.length; i++) {
              var mydate, newdate, newtime, slug, ide, logo;
              slug = data[i].slug;
              ide = data[i].id;

              if (data[i].last_posted_at != null) {
                mydate = data[i].last_posted_at;

                newdate = mydate[8] + mydate[9] + "/" + mydate[5] + mydate[6];
                newtime = mydate[11] + mydate[12] + mydate[13] + mydate[14] + mydate[15];

              }
              else if(i==0 && data[0].created_at != null){
                mydate = data[i].created_at;

                newdate = mydate[8] + mydate[9] + "/" + mydate[5] + mydate[6];
                newtime = mydate[11] + mydate[12] + mydate[13] + mydate[14] + mydate[15];
              }
              else {
                newdate = "";
                newtime = "";
              }
              elements = elements + '<div id="topic_'+ide+'" onClick=' + 'load_posts("' + slug + "/" + ide + "/1" + '",this)' + '>' + '<li id="' + data[i].title + '" class="" data-toggle="tab" data-target="#inbox-message-' + i + '">' + '<img alt="" class="user-logo-rect medium-image" src="'+img+'">' + '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + data[i].fancy_title + '</b>' + ' </h3>' + '<h5>' + "Latest post by: " + data[i].last_poster_username + '</h5>' + '</div>' + '<div class="contacts-add">' + '<span class="message-time">' + newdate + '<br>' + newtime + '<sup>' + '</sup>' + '</span>' + '<div onClick=' + 'copy_topic(event,"' + "/post/t/" + slug + "/" + ide + "/1" + '")' + '>' + '<i class="fa fa-share-alt ">' + '</i>' + ' </div>' + '</div>' + '</li>' + '</div>';

            }



          });

      }
      else{
      console.log("else block")
      $.ajax({

        url: "/group/" + x,
        data: { class: class_div },
      })
        .done(function (data) {
          console.log(data);
          // console.log("/group/" + x);
          // console.log(data.topic_list.more_topics_url);
          var more_topics_url = (data.topic_list? data.topic_list.more_topics_url: '')
          //data = data.topic_list.topics;

          var elements = '';

          more_topics_url = 'data-more_topics_url="'+ more_topics_url +'"'
          for (var i = 0; i < data.topic_list.topics.length; i++) {
            var mydate, newdate, newtime, slug, ide, logo;
            slug = data.topic_list.topics[i].slug;
            ide = data.topic_list.topics[i].id;
            var last_poster_username = data.topic_list.topics[i].last_poster_username;
            // var img = "/images/icons/noun_timeline_2021907.png"

              var img = data.topic_list.topics[i].tags;
              // console.log(img);

              if(img.includes("ebooks")){
                img = "/images/icons/noun_ebook_3492764.png";
              }else if(img.includes("videos")){
                img = "/images/icons/noun_Video_2354550.png";
              }else if(img.includes("pdf")){
                img = "/images/icons/noun_PDF_377198.png";
              }else if(img.includes("audios")){
                img = "/images/icons/noun_Audio_3408350.png";
              }else if(img.includes("interactives")){
                img = "/images/icons/noun_interactivity_1855299.png";
              }else{
                img = "/images/icons/noun_miscellaneous_3067705.png";
              }

            if (data.topic_list.topics[i].last_posted_at != null) {
              mydate = data.topic_list.topics[i].last_posted_at;

              newdate = mydate[8] + mydate[9] + "/" + mydate[5] + mydate[6];
              newtime = mydate[11] + mydate[12] + mydate[13] + mydate[14] + mydate[15];

            }
            else {
              newdate = "";
              newtime = "";
            }

            if(data.users[i]){
              var avatar_template = data.users[i].avatar_template.replace("{size}","50"); 
              var img = document.getElementById("url").getAttribute("name")+ avatar_template;
            }
            else{
              var avatar_template = img;
            }
            // elements = elements + '<div id="topic_'+ide+'" '+ more_topics_url +'  onClick=' + 'load_posts("' + slug + "/" + ide + "/1" + '",this)' + '>' + '<li id="' + data.topic_list.topics[i].title + '" class="" data-toggle="tab" data-target="#inbox-message-' + i + '">' + '<div class="message-count">' + data.topic_list.topics[i].posts_count + '</div>' + '<img alt="" class="img-circle medium-image" src="'+img+'">' + '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + data.topic_list.topics[i].fancy_title + '</b>' + ' </h3>' + '<h5>' + "Latest by: " + data.topic_list.topics[i].last_poster_username + '</h5>' + '</div>' + '<div class="contacts-add">' + '<span class="message-time">' + newdate + '<br>' + newtime + '<sup>' + '</sup>' + '</span>' + '<div onClick=' + 'copy_topic(event,"' + "/post/t/" + slug + "/" + ide + "/1" + '")' + '>' + '<i class="fa fa-share-alt ">' + '</i>' + ' </div>' + '</div>' + '</li>' + '</div>';
            elements = elements + '<div '+((class_div== true)?'data-class=""':"")+' id="topic_'+ide+'" '+ more_topics_url +'  onClick=' + 'load_posts("' + slug + "/" + ide + "/1" + '",this)' + '>' + '<li id="' + data.topic_list.topics[i].title + '" class="" data-toggle="tab" data-target="#inbox-message-' + i + '">' + '<img alt="" class="user-logo-rect medium-image" src="'+img+'">' + '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + data.topic_list.topics[i].fancy_title + '</b>' + ' </h3>' + '<h5>' + "Latest by: " + data.topic_list.topics[i].last_poster_username + '   '+ '<strong class="total-message-count">'+data.topic_list.topics[i].posts_count +' posts'+'</strong>' +'</h5>' + '</div>' + '<div class="contacts-add">' + '<span class="message-time">' + newdate + '<br>' + newtime + '<sup>' + '</sup>' + '</span>' + '<div onClick=' + 'copy_topic(event,"' + "/post/t/" + slug + "/" + ide + "/1" + '")' + '>' + '<i class="fa fa-share-alt ">' + '</i>' + ' </div>' + '</div>' + '</li>' + '</div>';
          }
          // console.log(y);
          if(y != null && y!=undefined && y.split("##").length != 1){
            $("#load_more_topics").remove();
            $('#holder5').append(elements + "<button id='load_more_topics' onclick='load_more_topics()'> Load More </button>");
          }
          else{
            $('#holder5').html(elements + "<button id='load_more_topics' onclick='load_more_topics()'> Load More </button>");
          }
        });
        }

    }

    //Loading posts
    function my_Function(z) {
      if (z.matches) { // If media query matches
        // alert("hi");
        document.getElementById("inbox").style.display = "none";
        document.getElementById("back_").style.display = "block";
        document.getElementById("inbox-message-1").style.display = "block";
        document.getElementById('plus_btn').style.display = "none";
        document.getElementById('create-topic').style.display = "none";
        document.getElementById('create-message').style.display = "none";
      }
      else {
        document.getElementById("inbox").style.display = "block";
        document.getElementById("inbox-message-1").style.display = "block";
        document.getElementById("back_").style.display = "none";
        let username = document.getElementById("curr_user").getAttribute("name");
        let curr_user_id = document.getElementById("curr_user_id").getAttribute("name");
        if( (username == "system" || username != "") && curr_user_id != ""){
          document.getElementById('plus_btn').style.display = "block";
        }
        if(document.getElementById('plus_btn').style.borderRadius == "0%"){
          document.getElementById('create-topic').style.display = "block";
          document.getElementById('create-message').style.display = "block";
        }
        else{
          document.getElementById('create-topic').style.display = "none";
          document.getElementById('create-message').style.display = "none";         
        }
      }
    }
    function my_Function2(z) {

      if (z.matches) { // If media query matches
        //alert("hi");
        document.getElementById("inbox").style.display = "block";
        document.getElementById("inbox-message-1").style.display = "none";
        let username = document.getElementById("curr_user").getAttribute("name");
        let curr_user_id = document.getElementById("curr_user_id").getAttribute("name");
        if( (username == "system" || username != "") && curr_user_id != ""){
          document.getElementById('plus_btn').style.display = "block";
        }
        if(document.getElementById('plus_btn').style.borderRadius == "0%"){
          document.getElementById('create-topic').style.display = "block";
          document.getElementById('create-message').style.display = "block";
        }
        else{
          document.getElementById('create-topic').style.display = "none";
          document.getElementById('create-message').style.display = "none";
        }
      }
    }
    function my_func2() {
      // alert("ki");
      var z = window.matchMedia("(max-width: 767px)");
      my_Function2(z); // Call listener function at run time
      z.addListener(my_Function2); // Attach listener function on state changes


    }

    function load_posts(x, param=null, page_number=null, index_of_post_number=null) {
      // console.log(param);
      // console.log(index_of_post_number);

      var topic_head = null;
      if(typeof param === "string" ){
       topic_head = param; 
      }
      else if(param != null && param.firstChild!=null && param.firstChild!=undefined){

        // console.log(param.firstChild.getAttribute("id"));
        topic_head = param.firstChild.getAttribute("id");
      }
      $("#load_next_posts").show();

      var course_post_div = false;
      if(param && param.dataset && param.dataset.class==""){
        course_post_div = true;
      }

      // var page_number = null;
      var html_or_prepend = false;
      var html_or_append = false;
      var username = $('#curr_user').attr('name');
      var tid = null;
      var array_of_post_ids = null;
      if(Array.isArray(x) && x && x.length > 0 && x[2]!=-1){
        page_number = x[1];
        tid = x[0];
        x=x[0]+".json";
        html_or_prepend = true;
        url = "/post/more/t/" + x
      }
      else if(x && x.length > 0  && (x[2]==-1)){
        page_number = x[1];
        tid = x[0];
        // x=x[0]+".json";
        html_or_prepend = true;
        url = "/t/"+x[0]+"/posts"
        array_of_post_ids = x[3]
        if(x[5] != undefined && x[5] == "append"){
          html_or_append = true
        }
        $('#post_page').attr('name','true');
        // $('#load_next_posts').show();
      }
      else{
        var y = x.split('/');

        tid = y[1];
        var tslug = y[0];
        // window.history.pushState("object or string", tid , '/t/'+tslug+'/'+tid);
        // console.log(tslug);
        $('#slug').attr('name', tslug);
        if(topic_head!= null && topic_head != undefined){
          $('#slug').html('<h4 id="topic_head">' + topic_head  + '</h4>');
        }
        // else{
        //   // $('#slug').html('<h4 id="topic_head">' + tslug.split('_').join(' ').split('-').join(' ') + '</h4>');
        //   $('#slug').html('<h4 id="topic_head">' + topic_head  + '</h4>');
        // }
        $('#tid').attr('name', tid);
        //  alert('clicked');
        if(param && param.firstElementChild){
          $('li').removeClass('active');
          param.firstElementChild.classList.add("active");
        }

        var my_div = $("#holder3");

        //alert("hi");
        url = "/post/more/t/" + x
      }
      $("#upload_files").attr("data-topic_id",tid);
      $("#reply_form").attr("action","/upload/"+tid);
      $("#right_panel_msg").css("display","none");
      // console.log(x);
      // console.log(page_numbr);
      if(x[6] == "next_post_ids"){
        tid = x[0];
        x=x[0]+".json";
        url = "/post/more/t/" + x
      }
      // console.log(url);
      // console.log(page_number);
      $.ajax({
        url: url,
        data: {page_number:page_number, "post_ids[]": array_of_post_ids,course_post_div:course_post_div},
      })
        .done(function (data) {
          // console.log("aaaaaaaaaaaaaaaaa");
          // console.log(data.badges_info);
          var badges_info = data.badges_info;
          var posts_count = data.posts_count;
          var slug = data.slug;
          var type_of_msg = data.archetype;
          var stream = data.post_stream.stream;
          var tags = data.tags;
          data = data.post_stream.posts;

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
          var download_btn = "";
          for (let i = 0; i < data.length; i++) {
            array_to_store_post_number.push(data[i].post_number);
          }
          // console.log(array_to_store_post_number);
          for (var i = 0; i < data.length; i++) {
            // console.log(data[i].id);
            // console.log(badges_info[data[i].id] );
            download_btn = '<div class="download_div"><span id="download_' + data[i].id + '" style="display:inline-block;"></span><a target="_blank" id="download_' + data[i].id + '" href="'+ ((data[i].link_counts && data[i].link_counts.length > 0 && data[i].link_counts[0].url)?data[i].link_counts[0].url:"#") +'" download><i title="Download the resource" class="fa fa-download" aria-hidden="true"></i></a></div>'
            var post_id = data[i].id;
            var post_id = 'data-post_id="'+post_id+'"';
            // console.log(post_id);
            let message_datetime = "";
            message_datetime = new Date(data[i].updated_at).toLocaleString([], { hour: '2-digit', minute: '2-digit' , day: '2-digit', month: '2-digit', year: '2-digit'});

            if (message_datetime == null || message_datetime == undefined){
              message_datetime = "";
            }
            else{
              message_datetime = message_datetime.split("/");
              message_datetime = message_datetime[1]+"/"+message_datetime[0]+"/"+message_datetime[2]
              message_datetime = "<div class='msg_datetime'>" + message_datetime+ "</div>"
            }
            like_url = '/post_actions/'+data[i].id+'/2';
            if(data[i].actions_summary && data[i].actions_summary.length > 0){
              like_button = "";
              var if_block = false;
              for (let j = 0; j < data[i].actions_summary.length; j++) {
                // console.log(data[i].actions_summary[j].id);
                if(data[i].actions_summary[j] && data[i].actions_summary[j].id && data[i].actions_summary[j].count && data[i].actions_summary[j].id == "2")
                {
                  // like_button = data[i].actions_summary[j].count+' <i class="fa fa-heart" style="color:red"></i>'
                  if(username!="system" && username!="" && data[i].actions_summary[j].acted == true){
                    like_button = '<div class="like_div"><span id="like_count_' + data[i].id + '" style="display:inline-block;">' + data[i].actions_summary[j].count + '</span><a id="like_icon_' + data[i].id + '" onclick="like_function(this,like_url)" ><i style="color:red" class="fa fa-heart"></i></a></div>'
                  }
                  else if(username!="system" && username!=""){
                    like_button = '<div class="like_div"><span id="like_count_' + data[i].id + '" style="display:inline-block;">' + data[i].actions_summary[j].count + '</span><a id="like_icon_' + data[i].id + '" onclick="like_function(this,like_url)" ><i style="color:grey" class="fa fa-heart-o"></i></a></div>'
                  }
                  if_block = true;
                  break;
                }
              }
              if(if_block == false && username!="system" && username!="" && data[i].username != username ){
                  like_button = '<div class="like_div"><span id="like_count_' + data[i].id + '" style="display:inline-block;"></span><a id="like_icon_' + data[i].id + '" onclick="like_function(this,like_url)" ><i style="color:grey" class="fa fa-heart-o"></i></a></div>'
              }
              else if(if_block == false && data[i].username == username) {
                  //like_button = '<div class="like_div"><span id="like_count_' + data[i].id + '" style="display:inline-block;"></span><a id="like_icon_' + data[i].id + '" ><i style="color:grey" class="fa fa-heart-o"></i></a></div>'
                  like_button = '';
              }
            }
            let User_Name = (data[i].username == null) ? data[i].name : '<a class="usr_profile" href="/u/'+data[i].username+'">'+data[i].username+'</a>'+ ( (badges_info !=undefined)?getbadgeIcons(badges_info[data[i].id]):'');
            // console.log(type_of_msg);

            let chk_pvt_or_regular_msg = (type_of_msg == "regular") ? true : false;
            let share_button='';
            // console.log(chk_pvt_or_regular_msg);
            if(chk_pvt_or_regular_msg == true){
              share_button = '<div class="share_btn" id="share_btn_'+ data[i].topic_id + '_' + data[i].post_number +'_' + data[i].id+'" data-tslug="'+slug+'" title="share a link to this post" onclick="share_function(this)"><i class="fa fa-share-alt "></i></div>'
            }
            let edit_button = '<div class="edit_btn" id="edit_btn_'+ data[i].topic_id + '_' + data[i].post_number +'_' + data[i].id+'" data-tslug="'+slug+'" data-post_id="'+ data[i].id +'" title="edit this post" onclick="edit_function(this)"><i class="fa fa-pencil" aria-hidden="true"></i></div>'
            let setting_button = (username!="system" && username!="" && username!=null && username!=undefined)?'<div class="setting_btn" id="setting_btn_'+ data[i].topic_id + '_' + data[i].post_number +'_' + data[i].id+'" data-tslug="'+slug+'" data-post_id="'+ data[i].id +'" title="" onclick="setting_function(this)"><i class="fa fa-external-link"></i></div>':'';
            var cooked = (data[i].cooked!=null && data[i].cooked!=undefined)? data[i].cooked.replace(/<h3[^>]*>(\s*none\s*(\s*<br\s*>)*\s*)<\/h3>/ig,''):'';
            let ReplyBtn = (username!="system" && username!="" && username!=null && username!=undefined)?'<i id="reply_btn_'+ data[i].topic_id + '_' + data[i].post_number +'" type="button" title="'+ data[i].cooked.replace(/<[^>]+>/g, '') +'" class="fa fa-reply reply_function"></i>':'';

            if(cooked!=""){
              let match_data = cooked.match(/<a.*?href="(.*?)"[^\>]+>(.*)<\/a>/i);
              console.log(match_data);
              // console.log(cooked.split(match_data[0]));
              // console.log(cooked.split(match_data[0]).length);
              if(match_data && match_data.length > 0 && match_data[match_data.length - 1] && match_data[match_data.length - 1].startsWith("http") && (match_data[match_data.length - 1].endsWith(".epub") || match_data[match_data.length - 1].split("/")[match_data[match_data.length - 1].split("/").length - 1].indexOf(".")==-1 ) ){
                // match_data = match_data[match_data.length - 1];
                // console.log("if asasasas");
                // console.log(match_data[0]);
                match_data1 = match_data[0].replace(">"+match_data[match_data.length - 1],">Download Ebook");
                // console.log(match_data1);
                cooked = cooked.split(match_data[0])[0] +match_data1  + cooked.split(match_data[0])[1];
              }
              else if(match_data && match_data.length > 0 && match_data[match_data.length - 1] && match_data[match_data.length - 1].startsWith("http") && (match_data[match_data.length - 1].endsWith(".html") || match_data[match_data.length - 1].split("/")[match_data[match_data.length - 1].split("/").length - 1].indexOf(".")==-1 ) ){
                // match_data = match_data[match_data.length - 1];
                // console.log("if asasasas");
                // console.log(match_data[0]);
                match_data1 = match_data[0].replace(">"+match_data[match_data.length - 1],">Click here to open resource in new tab");
                // console.log(match_data1);
                cooked = cooked.split(match_data[0])[0] +match_data1  + cooked.split(match_data[0])[1];
              }

              else if(match_data && match_data.length > 0 && match_data[match_data.length - 1] && match_data[match_data.length - 1].startsWith("http") && (match_data[match_data.length - 1].endsWith(".mp4") || match_data[match_data.length - 1].split("/")[match_data[match_data.length - 1].split("/").length - 1].indexOf(".")==-1 ) ){
                let replace_data = '<video controls="" width="100%" height="100%"><source src="VIDEO_URL"><a href="VIDEO_URL" rel="nofollow ugc noopener">VIDEO_URL</a></video>'.split('VIDEO_URL').join(match_data[match_data.length - 1 ]);

                // console.log(replace_data);
                cooked = cooked.replace(match_data[0],replace_data);
              }
              if(match_data && match_data.length > 0 && match_data[match_data.length - 1] && match_data[match_data.length - 1].startsWith("http") && (match_data[match_data.length - 1].endsWith(".jpe") || match_data[match_data.length - 1].split("/")[match_data[match_data.length - 1].split("/").length - 1].indexOf(".")==-1 ) ){
                let replace_data = '<div class="lightbox-wrapper"><a class="lightbox" href="IMAGE_URL" ><img src="IMAGE_URL" width="100%"></a></div>'.split('IMAGE_URL').join(match_data[match_data.length - 1 ]);
                cooked = cooked.replace(match_data[0],replace_data);
              }
            }
            if (data[i].username != username) {//for receive
              if (data[i] && data[i].reply_count > 0 && data[i].cooked && data[i+1] && (data[i].post_number != data[i+1].reply_to_post_number || data[i].reply_count > 1)){

                // elements = elements + '<div id="msg_'+ data[i].topic_id + '_' + data[i].post_number+ '_' + posts_count+ '_' + page_number+'" ' + post_id + 'class="message info" data-count="'+ (stream != undefined? stream.indexOf((Number(data[i].id))): null) +'"> <img alt="" class="img-circle medium-image" src="'+myUrl+'/user_avatar/'+myUrl.substring(8,myUrl.length)+'/' + data[i].username + '/120/671_2.png">'+ '<div class="message-body">' + '<div class="message-info">' + '<b>' +User_Name+ '</b>' + ' </h3>' + '<i id="reply_btn_'+ data[i].topic_id + '_' + data[i].post_number +'" type="button" title="'+ data[i].cooked.replace(/<[^>]+>/g, '') +'" class="fa fa-reply reply_function" aria-hidden="true"></i>' + share_button+'</div>' + '<hr>' + '<div class="message-text">' + data[i].cooked + '</div><button id="btn_'+ data[i].topic_id + '_' + data[i].post_number + '_' + posts_count+ '_' + page_number+'" type="button" data-post_id="'+ data[i].id +'" class="see_replies">'+data[i].reply_count+ (data[i].reply_count == 1? ' Reply': ' Replies')+' </button>'+like_button+'  ' + message_datetime +'</div>' + '<br>' + '</div>';
                elements = elements + '<div '+ ((Number(index_of_post_number) > i)?'style="display:none;"':'') + 'id="msg_'+ data[i].topic_id + '_' + data[i].post_number+ '_' + posts_count+ '_' + page_number+'" ' + post_id + 'class="message info" data-count="'+ (stream != undefined? stream.indexOf((Number(data[i].id))): null) +'"> <div class="message-body">' + '<div class="message-info">' + '<b>' +User_Name+ '</b>' + ' </h3>' +  message_datetime+'</div>' + '<hr>' + '<div data-POSTID="'+ data[i].id +'" class="message-text">' + cooked + '</div><button id="btn_'+ data[i].topic_id + '_' + data[i].post_number + '_' + posts_count+ '_' + page_number+'" data-depth_id="'+ 0 +'" type="button" data-post_id="'+ data[i].id +'" class="see_replies">'+data[i].reply_count+ (data[i].reply_count == 1? ' Reply': ' Replies')+' </button>'+'  ' +'  '+ReplyBtn + setting_button+share_button+like_button+download_btn+'</div>' + '<br>' + '</div>';
              }
              else{

                let indexOfPreviousPost = array_to_store_post_number.indexOf(data[i].post_number);
                let indexOfNextPost = array_to_store_post_number.indexOf(data[i].reply_to_post_number);
                var difference = indexOfPreviousPost - indexOfNextPost;

                if(data[i].reply_to_post_number!= null && data[i].post_number != data[i].reply_to_post_number && difference!=1){
                  let indexOfPost = array_to_store_post_number.indexOf(data[i].reply_to_post_number);
                  let in_reply_to = "";
                  if(data[i].reply_to_user && data[i].reply_to_user.username){
                   in_reply_to = '<a id="InReplyTo_' + data[i].topic_id + '_' + data[i].post_number+ '_' + posts_count+ '_' + page_number+'" data-post_id="'+ data[i].id +'" onclick="get_specific_post_replies(this)"> In Reply To '+ data[i].reply_to_user.username +'</a>';
                  }
                  if (indexOfPost > 0){
                    // let reply_message = '<div>'+data[indexOfPost].cooked+'</div>';
                    let reply_message = "";
                    elements = elements + '<div ' + ((Number(index_of_post_number) > i)?'style="display:none;"':'') + ' id="msg_'+ data[i].topic_id + '_' + data[i].post_number+'_' + posts_count+ '_' + page_number+ '" ' + post_id + 'class="message info" data-count="'+ (stream != undefined? stream.indexOf((Number(data[i].id))): null) +'"> <div class="message-body">' + '<div class="message-info">' + '<b>' + User_Name + '</b>' + in_reply_to+' </h3>' + message_datetime+ '</div>' + '<hr>'  +reply_message+ '<div data-POSTID="'+ data[i].id +'" class="message-text">' + cooked + '</div>'+'  '+ReplyBtn+setting_button+ share_button+ like_button+download_btn+'</div>' + '<br>' + '</div>';
                    reply_message = "";
                  }
                  else{
                    elements = elements + '<div '+ ((Number(index_of_post_number) > i)?'style="display:none;"':'') +' id="msg_'+ data[i].topic_id + '_' + data[i].post_number+ '_' + posts_count+ '_' + page_number+'" ' + post_id + 'class="message info" data-count="'+ (stream != undefined? stream.indexOf((Number(data[i].id))): null) +'"> <div class="message-body">' + '<div class="message-info">' + '<b>' + User_Name + '</b>' + ' </h3>' + message_datetime+'</div>' + '<hr>'  +reply_message+ '<div data-POSTID="'+ data[i].id +'" class="message-text">' + cooked + '</div>' +'  '+ ReplyBtn +setting_button+share_button+like_button+download_btn+'</div>' + '<br>' + '</div>';
                  }
                }
                else{

                  elements = elements + '<div '+ ((Number(index_of_post_number) > i)?'style="display:none;"':'') +' id="msg_'+ data[i].topic_id + '_' + data[i].post_number+ '_' + posts_count+ '_' + page_number+'" ' + post_id + 'class="message info" data-count="'+ (stream != undefined? stream.indexOf((Number(data[i].id))): null) +'"> <div class="message-body">' + '<div class="message-info">' + '<b>' + User_Name + '</b>' + ' </h3>' + message_datetime+'</div>' + '<hr>'  + '<div data-POSTID="'+ data[i].id +'" class="message-text">' + cooked + '</div>'+'  '+ReplyBtn +setting_button+share_button+like_button+download_btn+'</div>' + '<br>' + '</div>';                }  
              }
            }
            else {
              //for sent
              // if (data[i] && data[i].reply_count > 1 && data[i].cooked && data[i].cooked.search("@")==-1 && data[i].cooked.search("/u/")==-1 && data[i].cooked.search("mention")==-1){
                if (data[i] && data[i].reply_count > 0 && data[i].cooked && data[i+1] && (data[i].post_number != data[i+1].reply_to_post_number || data[i].reply_count > 1)){


                elements = elements +'<div '+ ((Number(index_of_post_number) > i)?'style="display:none;"':'') +' id="msg_'+ data[i].topic_id + '_' + data[i].post_number+ '_' + posts_count+ '_' + page_number+'" ' + post_id + 'class="message my-message" data-count="'+ (stream != undefined? stream.indexOf((Number(data[i].id))): null) +'"> <div class="message-body">' + '<div class="message-info">' + '<b>' +User_Name+ '</b>' + ' </h3>' + message_datetime+'</div>' + '<hr>' + '<div data-POSTID="'+ data[i].id +'" class="message-text">' + cooked + '</div><button id="btn_'+ data[i].topic_id + '_' + data[i].post_number +'_' + posts_count+ '_' + page_number+'" data-depth_id="'+ 0 +'" type="button" data-post_id="'+ data[i].id +'" class="see_replies">'+data[i].reply_count+''+(data[i].reply_count == 1? ' Reply': ' Replies')+' </button>' +ReplyBtn + edit_button+ '<div class="delete_btn" id="delete_btn_'+ data[i].topic_id + '_' + data[i].post_number +'_' + data[i].id+'" data-tslug="'+slug+'" title="'+ data[i].cooked.replace(/<[^>]+>/g, '') +'" onclick="delete_function(this)"><i class="fa fa-trash-o"></i></div>'+ setting_button +share_button+like_button+ download_btn+'</div>' + '<br>' + '</div>'
              }
              else{

                let indexOfPreviousPost = array_to_store_post_number.indexOf(data[i].post_number);
                let indexOfNextPost = array_to_store_post_number.indexOf(data[i].reply_to_post_number);
                var difference = indexOfPreviousPost - indexOfNextPost;

                if( data[i].reply_to_post_number!= null && data[i].post_number != data[i].reply_to_post_number && difference!=1){
                  let indexOfPost = array_to_store_post_number.indexOf(data[i].reply_to_post_number);

                  if (indexOfPost > 0){
                  let in_reply_to = "";
                  if(data[i].reply_to_user && data[i].reply_to_user.username){
                    in_reply_to = '<a id="InReplyTo_' + data[i].topic_id + '_' + data[i].post_number+ '_' + posts_count+ '_' + page_number+'" data-post_id="'+ data[i].id +'" onclick="get_specific_post_replies(this)"> In Reply To '+ data[i].reply_to_user.username +'</a>'
                  }
                  // let reply_message = '<div>'+data[indexOfPost].cooked+'</div>';
                  let reply_message = "";
                  elements = elements + '<div '+ ((Number(index_of_post_number) > i)?'style="display:none;"':'') +' id="msg_'+ data[i].topic_id + '_' + data[i].post_number+ '_' + posts_count+ '_' + page_number+'" ' + post_id + 'class="message my-message" data-count="'+ (stream != undefined? stream.indexOf((Number(data[i].id))): null) +'"> <div class="message-body">' + '<div class="message-body-inner">' + '<div class="message-info">' + '<b>' + User_Name + '</b>' + in_reply_to+' </h3>' + message_datetime+'</div>' + '<hr>' + reply_message + '<div data-POSTID="'+ data[i].id +'" class="message-text">' + cooked + '</div>' + '</div>' +ReplyBtn+ edit_button+ '<div class="delete_btn" id="delete_btn_'+ data[i].topic_id + '_' + data[i].post_number +'_' + data[i].id+'" data-tslug="'+slug+'" title="'+ data[i].cooked.replace(/<[^>]+>/g, '').replace(/<h3[^>]*>(\s*None\s*)<\/h3>/ig,'') +'" onclick="delete_function(this)"><i class="fa fa-trash-o"></i></div>'+setting_button+share_button+like_button+download_btn+'</div>' + '<br>' + '</div>';
                  reply_message = "";
                  }
                  else{
                    elements = elements + '<div '+ ((Number(index_of_post_number) > i)?'style="display:none;"':'') +' id="msg_'+ data[i].topic_id + '_' + data[i].post_number+'_' + posts_count+ '_' + page_number+ '" ' + post_id + 'class="message my-message" data-count="'+ (stream != undefined? stream.indexOf((Number(data[i].id))): null) +'"> <div class="message-body">' + '<div class="message-body-inner">' + '<div class="message-info">' + '<b>' + User_Name + '</b>' + ' </h3>' + message_datetime+'</div>' + '<hr>' + '<div data-POSTID="'+ data[i].id +'" class="message-text">' + cooked+ '</div>' + '</div>' +ReplyBtn+ edit_button+ '<div class="delete_btn" id="delete_btn_'+ data[i].topic_id + '_' + data[i].post_number +'_' + data[i].id+'" data-tslug="'+slug+'" title="'+ data[i].cooked.replace(/<[^>]+>/g, '').replace(/<h3[^>]*>(\s*None\s*)<\/h3>/ig,'') +'" onclick="delete_function(this)"><i class="fa fa-trash-o"></i></div>'+setting_button+ share_button+like_button+download_btn+ '</div>' + '<br>' + '</div>';
                    reply_message = "";
                  }
                }
                else{
                elements = elements + '<div '+ ((Number(index_of_post_number) > i)?'style="display:none;"':'') +' id="msg_'+ data[i].topic_id + '_' + data[i].post_number+'_' + posts_count+ '_' + page_number+ '" ' + post_id + 'class="message my-message" data-count="'+ (stream != undefined? stream.indexOf((Number(data[i].id))): null) +'"> <div class="message-body">' + '<div class="message-body-inner">' + '<div class="message-info">' + '<b>' + User_Name + '</b>' + ' </h3>' + message_datetime+'</div>' + '<hr>' + '<div data-POSTID="'+ data[i].id +'" class="message-text">' + cooked + '</div>' + '</div>' +ReplyBtn + edit_button+ '<div class="delete_btn" id="delete_btn_'+ data[i].topic_id + '_' + data[i].post_number +'_' + data[i].id+'" data-tslug="'+slug+'" title="'+ data[i].cooked.replace(/<[^>]+>/g, '').replace(/<h3[^>]*>(\s*None\s*)<\/h3>/ig,'') +'" onclick="delete_function(this)"><i class="fa fa-trash-o"></i></div>'+setting_button + share_button+like_button+download_btn+'</div>' + '<br>' + '</div>';
                }
              }
            }
          }
          if(html_or_prepend == false && html_or_append == false){
            $('#holder3').html(elements);
          }
          else if(html_or_prepend == true && html_or_append == true){
            $('#holder3').append(elements);
          }
          else{
            $('#holder3').prepend(elements);
          }
          get_tag_groups(cooked,tags);
          var get_topic_id = document.querySelector('div[id^="msg_"]:not([style*="display:none"])');
          var last_div = $("div.message").last();
          var last_div_id = $(last_div).attr("id");
          // last_div_id = last_div_id.split("_");
          // console.log(get_topic_id);
          if(get_topic_id && (get_topic_id.dataset.count == "0")){
            $("#load_previous_posts").hide();
          }
          else{
            $("#load_previous_posts").show();
          }
          if(last_div && last_div.dataset && last_div_id.split("_")[3] == last_div.dataset.count ){
            $("#load_next_posts").hide();
          }
          else{
            $("#load_next_posts").show();
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
        // console.log(event.target);
        var fields = message_id.split('_');
        var old_post_number = ""
        if(message_id.startsWith("reply_msg_")){
          var topic_id = fields[2];
        }
        else{
          var topic_id = fields[1];
        }

        if(fields != null && fields!=undefined && fields.length<6){
          
          var old_post_number = fields[2];
          var posts_count = fields[3];
          var page_number = fields[4];
        }
        else{
          for (let i = 2; i < (fields.length-2); i++) {
            old_post_number =  old_post_number + fields[i] + "_";
          }
          old_post_number = old_post_number.slice(0,-1);
        }
        // console.log(event.target);
        var post_id = event.target.dataset.post_id;
        // console.log(post_id);
        var reply_count = 0;
        if (event.target.innerText){
           reply_count = event.target.innerText.replace(/\D/g, '');
           reply_count = Number(reply_count);
           // console.log(reply_count);
        }
        // console.log(old_post_number)
        var append_element = "";
        if(event.target.dataset.depth_id == 0 || event.target.dataset.depth_id == "0"){
          // console.log("if");
          var x = document.getElementById('msg_'+ topic_id + '_' + old_post_number+'_'+posts_count+'_'+page_number);
          append_element = '#msg_'+ topic_id + '_' + old_post_number+'_'+posts_count+'_'+page_number
        }
        else{
          // console.log("else")
          // console.log('reply_msg_'+ topic_id + '_' + old_post_number);
          append_element = '#reply_msg_'+ topic_id + '_' + old_post_number;
          var x = document.getElementById('reply_msg_'+ topic_id + '_' + old_post_number);
          // console.log(x);
          post_number = ""
          // console.log(fields);
          for (let i = 2; i < (fields.length-2); i++) {
            post_number =  post_number + fields[i] + "_";
          }
          // console.log(post_number);
          post_number = post_number.slice(0,-1);
          // console.log(post_number);
        }
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
        var username = $('#curr_user').attr('name');
          if (temp){
            $.ajax({
                // url: "/post/more/t/"+topic_id
                url: "/posts/"+post_id+"/replies"
            })
            .done(function (data) {
                var elements = '';
                let count = 1;
                if (data ){
                  // data = data.post_stream.posts
                  for (let i = 0; i < data.length; i++) {
                  let User_Name = (data[i].username == null) ? data[i].name : '<a class="usr_profile" href="/u/'+data[i].username+'">'+data[i].username+'</a>'
                  var marginLeft = 4;
                  marginLeft = marginLeft + "%";

                  let message_datetime = "";
                  message_datetime = new Date(data[i].updated_at).toLocaleString([], { hour: '2-digit', minute: '2-digit' , day: '2-digit', month: '2-digit', year: '2-digit'});

                  if (message_datetime == null || message_datetime == undefined){
                    message_datetime = "";
                  }
                  else{
                    message_datetime = message_datetime.split("/");
                    message_datetime = message_datetime[1]+"/"+message_datetime[0]+"/"+message_datetime[2]
                    message_datetime = "<div class='msg_datetime'>" + message_datetime+ "</div>"
                  }
                  // if(post_number == data[i].reply_to_post_number){
                  // var reply_msg_id = topic_id+'_'+ post_number +'_'+ data[i].post_number;
                  like_url = '/post_actions/'+data[i].id+'/2';
                  if(data[i].actions_summary && data[i].actions_summary.length > 0){
                    like_button = "";
                    var if_block = false;
                    for (let j = 0; j < data[i].actions_summary.length; j++) {
                      // console.log(data[i].actions_summary[j].id);
                      if(data[i].actions_summary[j] && data[i].actions_summary[j].id && data[i].actions_summary[j].count && data[i].actions_summary[j].id == "2")
                      {
                        // like_button = data[i].actions_summary[j].count+' <i class="fa fa-heart" style="color:red"></i>'
                        if(data[i].username != username){
                          like_button = '<div class="like_div"><span id="like_count_' + data[i].id + '" style="display:inline-block;">' + data[i].actions_summary[j].count + '</span><a id="like_icon_' + data[i].id + '" onclick="like_function(this,like_url)" ><i style="color:red" class="fa fa-heart"></i></a></div>' 
                        }
                        else{
                          like_button = '<div class="like_div"><span id="like_count_' + data[i].id + '" style="display:inline-block;">' + data[i].actions_summary[j].count + '</span><a id="like_icon_' + data[i].id + '" ><i style="color:grey" class="fa fa-heart"></i></a></div>'
                        }
                        if_block = true;
                        break;
                      }
                    }
                    if(if_block == false && data[i].username != username ){
                        like_button = '<div class="like_div"><span id="like_count_' + data[i].id + '" style="display:inline-block;"></span><a id="like_icon_' + data[i].id + '" onclick="like_function(this,like_url)" ><i style="color:grey" class="fa fa-heart-o"></i></a></div>'
                    }
                    else if(if_block == false && data[i].username == username) {
                        //like_button = '<div class="like_div"><span id="like_count_' + data[i].id + '" style="display:inline-block;"></span><a id="like_icon_' + data[i].id + '" ><i style="color:grey" class="fa fa-heart-o"></i></a></div>'
                        like_button = '';
                    }
                  }

                  var type_of_msg = data.archetype;
                  let chk_pvt_or_regular_msg = (type_of_msg == "regular") ? true : false;
                  let share_button='';
                  let edit_button = '<div class="edit_btn" id="edit_btn_'+ data[i].topic_id + '_' + data[i].post_number +'_' + data[i].id+'" data-tslug="'+slug+'" data-post_id="'+ data[i].id +'" title="edit this post" onclick="edit_function(this)"><i class="fa fa-pencil" aria-hidden="true"></i></div>'
                  let setting_button = '<div class="setting_btn" id="setting_btn_'+ data[i].topic_id + '_' + data[i].post_number +'_' + data[i].id+'" data-tslug="'+slug+'" data-post_id="'+ data[i].id +'" title="" onclick="setting_function(this)"><i class="fa fa-external-link" aria-hidden="true"></i></div>'
                  if(chk_pvt_or_regular_msg == true){
                    share_button = '<div class="share_btn" id="share_btn_'+ data[i].topic_id + '_' + data[i].post_number +'_' + data[i].id+'" data-tslug="'+slug+'" title="share a link to this post" onclick="share_function(this)"><i class="fa fa-share-alt "></i></div>'
                  }
                  if(data[i].username !=null && data[i].username!=undefined && data[i].username != username){
                    //style="margin-left: '+ marginLeft +'; width: calc(100% - '+ marginLeft +') "
                    elements = elements + '<div style="margin-left: '+ marginLeft +'; width: calc(100% - '+ marginLeft +') " id="reply_msg_'+ topic_id + '_' + old_post_number+'_'+data[i].post_number+ '" class="message reply_msg '+ class_toggle +'"> <div class="message-body">' + '<div class="message-info">' + '<b>' + User_Name + '</b>'+message_datetime+'<h5>' + '</h5>' + '</div>' + '<hr>' + '<div data-POSTID="'+ data[i].id +'" class="message-text">' + data[i].cooked + '</div>' + (data[i].reply_count > 0 ? '<button data-depth_id="'+ (Number(event.target.dataset.depth_id)+1) +'" id="btn_'+ data[i].topic_id + '_' + old_post_number + '_' +data[i].post_number + '_' + posts_count+ '_' + page_number+'" type="button" data-post_id="'+ data[i].id +'" class="see_replies">'+ data[i].reply_count+ (data[i].reply_count == 1? ' Reply': ' Replies') +' </button>': '')+ '<i id="reply_btn_'+ data[i].topic_id + '_' + data[i].post_number +'" type="button" title="'+ data[i].cooked.replace(/<[^>]+>/g, '') +'" class="fa fa-reply reply_function" aria-hidden="true"></i>' +'<div class="delete_btn" id="delete_btn_'+ data[i].topic_id + '_' + data[i].post_number +'_' + data[i].id+'" data-tslug="'+slug+'" title="'+ data[i].cooked.replace(/<[^>]+>/g, '') +'" onclick="delete_function(this)"><i class="fa fa-trash-o"></i></div>'+ setting_button+share_button+like_button+'</div>' + '<br>' + '</div>';
                  }
                  else{
                    elements = elements + '<div style="margin-left: '+ marginLeft +'; width: calc(100% - '+ marginLeft +') " id="reply_msg_'+ topic_id + '_' + old_post_number+'_'+data[i].post_number+ '" class="message my-message reply_msg '+ class_toggle +'"> <div class="message-body">' + '<div class="message-info">' + '<b>' + User_Name + '</b>'+message_datetime + '<h5>' + '</h5>' + '</div>' + '<hr>' + '<div data-POSTID="'+ data[i].id +'" class="message-text">' + data[i].cooked + '</div>' + (data[i].reply_count > 0 ? '<button data-depth_id="'+ (Number(event.target.dataset.depth_id)+1) +'" id="btn_'+ data[i].topic_id + '_' + old_post_number + '_' +data[i].post_number + '_' + posts_count+ '_' + page_number+'" type="button" data-post_id="'+ data[i].id +'" class="see_replies">'+ data[i].reply_count+ (data[i].reply_count == 1? ' Reply': ' Replies') +' </button>': '')+ '<i id="reply_btn_'+ data[i].topic_id + '_' + data[i].post_number +'" type="button" title="'+ data[i].cooked.replace(/<[^>]+>/g, '') +'" class="fa fa-reply reply_function" aria-hidden="true"></i>'+edit_button+'<div class="delete_btn" id="delete_btn_'+ data[i].topic_id + '_' + data[i].post_number +'_' + data[i].id+'" data-tslug="'+slug+'" title="'+ data[i].cooked.replace(/<[^>]+>/g, '') +'" onclick="delete_function(this)"><i class="fa fa-trash-o"></i></div>'+setting_button+share_button+like_button+'</div>' + '<br>' + '</div>';
                  }
                  count = count + 1;
                  // }
                 }
                }
                $(append_element).append(elements);
                // var newNode = document.createElement("span");
                // newNode.innerHTML = "test";
                // referenceNode =  document.getElementById('msg_'+ topic_id + '_' + post_number+'_'+posts_count+'_'+page_number)
                // referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
                // $(elements).insertAfter($('#msg_'+ topic_id + '_' + post_number+'_'+posts_count+'_'+page_number));
            });
          }
          else{
                // console.log("#reply_msg_"+ topic_id + '_' + old_post_number);
                // var get_div = document.querySelectorAll('div[id^="holder"][style*="display: block"]');
                if(event.target.dataset.depth_id == 0 || event.target.dataset.depth_id == "0"){
                  var selected_elements = document.querySelectorAll('div[id^="reply_msg_'+ topic_id + '_' + old_post_number+'"]')
                }
                else{
                  var selected_elements = document.querySelectorAll('div[id^="reply_msg_'+ topic_id + '_' + old_post_number+'_"]')
                }
                if (selected_elements!=null && selected_elements!=undefined && selected_elements.length>0){
                  for (let i = 0; i < selected_elements.length; i++) {
                    selected_elements[i].remove();
                  }
                }
          }
        }
        else if(event.target.matches('.reply_function') && event.target.id){
          var message_id = event.target.id
          var fields = message_id.split('_');
          var topic_id = fields[2];
          var post_number = fields[3];
          var textarea = document.getElementById('replyMessage');
          $('.selected_msg').empty();
          $('.rm_btn').remove();
          $(".selected_msg").css('margin-left', "7%");
          $(".display_replies").css('opacity', "100");
          $(".display_replies").css('height', (Number(textarea.style.height.split("px")[0])+10)+"px");
          $('.selected_msg').attr("id","rmv_btn_"+topic_id+'_'+post_number);
          $('.selected_msg').append(event.target.title);
          $('.display_replies').append('<button onclick="removeReplyMessage(this)" type="button" name="cancel" class="btn btn-sm rm_btn">X</button>');
        }
        else{
          alert("sorry. something went wrong. please try again later")
        }


    }, false);

    function removeReplyMessage(selected_element){
      $(".display_replies").css('opacity', "0.01");
      $('.selected_msg').empty();
      $('.rm_btn').remove();
      $(selected_element).remove();
    }

    $(window).scroll(function(){

      if ($(window).scrollTop() <=0 && false){

        var get_topic_id = document.querySelector('div[id^="msg_"]');
        var get_posts_count = document.getElementById('posts_count');
        // console.log(get_posts_count.name);
        if(get_topic_id && get_topic_id.id){
          div_id = get_topic_id.id.split("_");
          topic_id = div_id[1];
          posts_count = div_id[3];
          page_number = div_id[4];

          if ( get_posts_count && (get_posts_count.name == "" || get_posts_count.name == null || get_posts_count.name == undefined) && posts_count && topic_id && page_number && posts_count>20){

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

        var tempInput = document.createElement("input");
        tempInput.value = window.location.origin +"/t/"+clicked_element_data.dataset.tslug+"/"+tid+"/"+post_number;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);

      }
      alert("Share URL has been copied to clipboard.");
    }

    function visible_cat(){
      var el =this;
      function_category_common();
    }

    function load_subcategories(clicked_element_data,value=null){
      // console.log("load_subcategories");
      console.log(clicked_element_data.dataset);
      // console.log(clicked_element_data.dataset.sub_cids);
      var ele = document.getElementById('#back2');
      ele.addEventListener('click', visible_cat);

      var course_div = false;
      if(clicked_element_data && clicked_element_data.dataset.course == ""){
        course_div = true;
      }

      document.getElementById("holder8").style.display = "None";
      document.getElementById("holder2").style.display = "None";
      document.getElementById("holder4").style.display = "None";
      document.getElementById("holder6").style.display = "None";
      document.getElementById("holder5").style.display = "None";
      document.getElementById("holder9").style.display = "None";
      document.getElementById("holder10").style.display = "None";
      document.getElementById("holder11").style.display = "Block";
      // }
      if(clicked_element_data != null && clicked_element_data.firstChild!=null && clicked_element_data.firstChild!=undefined){
        // console.log(param);
        left_panel_header_title = clicked_element_data.firstChild.getAttribute("id");
        $('#menu_active').text(left_panel_header_title);
      }
      $(".mobile_backbtn2").css("display","block");     
      $('#holder11').html("");
      var elements = '';
      if(clicked_element_data){
        var subcategory_ids = clicked_element_data.dataset.sub_cids.split(",");
        // for (let i = 0; i < subcategory_ids.length; i++) {
          // console.log("/c/"+clicked_element_data.dataset.cid+"/"+subcategory_ids[i]);
          $.ajax({
                // url: "/c/"+clicked_element_data.dataset.cid+"/"+subcategory_ids[i],
                url: "/categories",
                type: 'GET',
                data: {parent_category_id: clicked_element_data.dataset.cid, course: course_div}
              })
              .done(function (data) {
                // console.log("load_subcategories")
                  // console.log(data);
                  var logo;
                  logo="/images/icons/noun_Subcategory_929019.png";
                  // console.log(data.topic_list);
                  if(data && data.category_list && data.category_list.categories.length > 0){
                    // title = data.topic_list.topics[0].title.substring(10,data.topic_list.topics[0].title.length-9);
                    // title = ""
                    // url = "c/14/21/0";
                    // console.log(url)
                    for (let i = 0; i < data.category_list.categories.length; i++) {
                    page_number = 0
                    url = "c/"+clicked_element_data.dataset.cid+"/"+data.category_list.categories[i].id+"/"+page_number

                    if(clicked_element_data && clicked_element_data.dataset && clicked_element_data.dataset.course==""){
                      console.log("if block")
                      elements = elements + '<div data-class="" ' +' data-cid="'+ data.category_list.categories[i].id +'" data-cname="'+ data.category_list.categories[i].name +'" class="contact_list" onClick=' + 'load_topics("' + data.category_list.categories[i].slug + "/" + data.category_list.categories[i].id + "/load/0" + '",this)' + '>' + '<li id="' + data.category_list.categories[i].name + '" class="" data-toggle="" data-target="">'  + '<img alt="" class="user-logo-rect medium-image" src="'+logo+'">' + '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + data.category_list.categories[i].name + '</b>' + ' </h3>' + '<h5>'+ '</h5>' + '</div>' + '<div class="contacts-add">' + '<span class="message-time">' + '<br>' + '<sup>' + '</sup>' + '</span>' + '</div>' + '</li>' + '</div>';
                    }else{
                      console.log("else")
                      elements = elements + '<div data-cid="'+ data.category_list.categories[i].id + '" data-cname="'+ data.category_list.categories[i].name + '" class="contact_list" onclick="myFunc(this,\'source: '+data.category_list.categories[i].name+'\')"' + '>' + '<li id="'+ data.category_list.categories[i].name +'" class="" data-toggle="" data-target="">' + '<img alt="" class="user-logo-rect medium-image" src="'+logo+'">' + '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + data.category_list.categories[i].name + '</b>' + ' </h3>' + '<h5>' + (data.category_list.categories[i].description? data.category_list.categories[i].description: "") + '</h5>' + '</div>' + '<div class="contacts-add">' + '<span class="message-time">' + '<br>' + '<sup>' + '</sup>' + '</span>' + '<div>' + '</div>' + '</div>' + '</li>' + '</div>';
                    }
                    }
                  }
                 $('#holder11').html(elements);
            });
        // }
      }
    }

function load_more(clicked_element_data){
  var get_divs = document.querySelectorAll('div[id^="msg_"][style*="display:none"]');

  // console.log(get_divs);
  var post_ids = document.getElementById("post_ids");
  // console.log(post_ids);
  if(get_divs && get_divs.length > 0){
    // console.log(get_divs.length)
    for (var i = 0; i < get_divs.length; i++) {
      get_divs[i].style.display = "block";
    }
  }
  else if (post_ids!=null && post_ids!=undefined && post_ids.innerHTML.replace(/ /g, "").replace( /[\r\n]+/gm, "" ) != ""){
    var get_topic_id = document.querySelector('div[id^="msg_"]');
    var array_of_post_ids = post_ids.innerHTML.replace(/ /g, "").replace( /[\r\n]+/gm, "" ).split(",");
    post_ids.innerHTML = "";
    // console.log(array_of_post_ids);
    posts_count = get_topic_id.id.split("_")[3];

    // divisior_of_number = 
    // page_number = -1

    page_number = get_topic_id.id.split("_")[4];
    // console.log(page_number);
    x = [get_topic_id.id.split("_")[1], page_number,-1, array_of_post_ids, posts_count];
    load_posts(x)

  }
  else
  {
    var get_topic_id = document.querySelector('div[id^="msg_"]');
    // console.log(get_topic_id);

    page_number = Number(get_topic_id.id.split("_")[4]);
    page_number = page_number -1;
    posts_count = get_topic_id.id.split("_")[3];
    // console.log(page_number);

    x = [get_topic_id.id.split("_")[1], page_number,0, null, posts_count];
    // console.log(page_number);
    // console.log(posts_count);
    if (Number(page_number) > 0){
      if(Number(page_number) == 1 && get_topic_id.dataset.count == "0"){
        $(clicked_element_data).hide();
      }
      else{
        load_posts(x);
      }
    }
    if(get_topic_id && get_topic_id.dataset.count == "0"){
      $("#load_previous_posts").hide();
    }
  }
}

function load_next_posts(clicked_element_data){
  // alert("load_next_posts");
  var last_div = $("div.message").last();
  var topic_id = $(last_div[0]).attr("id");
  var last_post_id = $(last_div[0]).attr("data-post_id");
  var count = $(last_div[0]).attr("data-count");
  // console.log($(last_div[0]).attr("data-count"));

  var posts_count = topic_id.split("_")[3];

  page_number = Number(topic_id.split("_")[4]);
  // page_number = page_number + 1;

  // page_number = (20 * page_number) - Number(count);
  // console.log(page_number);
  // if(((20 * Number(page_number)) - Number(count)) == 0){
  //   page_number = page_number + 1
  // }
  var next_post_ids = document.getElementById("next_post_ids");
  // console.log(next_post_ids.innerHTML.replace(/ /g, "").replace( /[\r\n]+/gm, "" ));

  if (next_post_ids!=null && next_post_ids!=undefined && next_post_ids.innerHTML.replace(/ /g, "").replace( /[\r\n]+/gm, "" ) != ""){
    var array_of_post_ids = next_post_ids.innerHTML.replace(/ /g, "").replace( /[\r\n]+/gm, "" ).split(",");
    // console.log(array_of_post_ids);
    next_post_ids.innerHTML = "";
    // console.log(array_of_post_ids);
    // posts_count = topic_id.split("_")[3];

    // page_number = topic_id.split("_")[4];
    x = [topic_id.split("_")[1], page_number,-1, array_of_post_ids, posts_count,"append"];
    load_posts(x)

  }
  else{
    // console.log("else ");
    // console.log(posts_count);
      x = [topic_id.split("_")[1], (page_number+1),-1, null, posts_count,"append","next_post_ids"];
      if (posts_count == "undefined" || posts_count == undefined){
        // console.log(posts_count);
        posts_count = $("#posts_count").attr("name");
        // console.log(posts_count)
        if(posts_count != undefined || posts_count != "undefined"){
          posts_count = Math.ceil((Number(posts_count) / 20))
          // console.log(posts_count);
          if (posts_count == page_number){
            $("#load_next_posts").hide();
          }
          else{
            load_posts(x)
          }
        }
      }
      else{
        posts_count = Math.ceil((Number(posts_count) / 20))
        if(page_number != posts_count){
          load_posts(x);
        }
      }
  }

}

function like_function(clicked_element_data,url){
// console.log(clicked_element_data);
// console.log(url);
let ajax_call = true;
let count= null;
if(clicked_element_data.firstChild.classList.contains("fa-heart"))
{
  ajax_call = false;
    $.ajax({
        url: "/delete_post_actions/"+clicked_element_data.id.split("_")[2]+"/2",
        type: 'DELETE'
    })
    .done(function (data) {
      count = $("#like_count_"+clicked_element_data.id.split("_")[2]).html();
      count = Number(count) - 1;
        clicked_element_data.firstChild.style.color="grey";
        clicked_element_data.firstChild.classList.remove("fa-heart");
        clicked_element_data.firstChild.classList.add("fa-heart-o");
        if(count != 0){
          $("#like_count_"+clicked_element_data.id.split("_")[2]).html(count);
        }
        else{
          $("#like_count_"+clicked_element_data.id.split("_")[2]).html("");
        }
    });
}
if( clicked_element_data && clicked_element_data.firstChild ){
  clicked_element_data.firstChild.style.color="red";
  clicked_element_data.firstChild.classList.remove("fa-heart-o");
  clicked_element_data.firstChild.classList.add("fa-heart");
}
console.log(clicked_element_data.firstChild);
if(ajax_call == true){
  count = null;
  count = $("#like_count_"+clicked_element_data.id.split("_")[2]).html();
  count = Number(count) + 1;
  // console.log(count);
  $("#like_count_"+clicked_element_data.id.split("_")[2]).html(count);

  $.ajax({
      url: "/post_actions/"+clicked_element_data.id.split("_")[2]+"/2",
      type: 'POST'
  })
  .done(function (data) {

  });
}
}

function load_more_topics(){
  // console.log($("div[id^='topic_']").last());
  var topic_div = $("div[id^='topic_']").last();

  topic_div = $(topic_div).attr("data-more_topics_url");

  if (topic_div != undefined && topic_div != null && topic_div!= "undefined"){
    var category_id = topic_div.split("/")[3].split("?")[0];
    var category_name = topic_div.split("/")[2];
    var page_number = topic_div.split("/")[3].split("page=")[1];
    page_number = page_number.charAt(0);
    // page_number = page_number.split("=")[1];
    // console.log(page_number);
    x = category_name+"/"+ category_id +"/load/"+page_number+"###"

    load_topics(x);
  }
  else{
    alert("No contents to load");
  }
}

function create_private_msg(username){
    $('li').removeClass('active');
    $(this).addClass('active');

      var z = window.matchMedia("(max-width: 767px)");
      my_Function(z); // Call listener function at run time
      z.addListener(my_Function);
    if(z.matches == false){
    document.getElementById("inbox").style.display = "Block";
    document.getElementById("inbox-message-1").style.display = "Block";
    document.getElementById("load_previous_posts").style.display = "none";    
    }


    $('#slug').attr('name', null);
    $('#slug').html('<h4 id="topic_head"></h4>');
    $('#tid').attr('name', null);
    $('#holder3').html("<b>Create a new Topic </b><br/>");
    $('#holder3').append('<input id="topic_title" value="" type="text" placeholder="Type title, or paste a link here"><br/>');
    if( username == $("#curr_user").attr("name") ){
      // $('#holder3').append('category');
      elements = 'Select a category: <select id="select_category_id" placeholder="select a category...">'
      var contact_list_divs = document.querySelectorAll('div[class^="contact_list"]');
      for (var i = 0; i < contact_list_divs.length; i++) {
        elements = elements + '<option value="'+contact_list_divs[i].dataset.cid+'">'+contact_list_divs[i].dataset.cname+'</option>';
      }
      // console.log(contact_list_divs);
      $('#holder3').append(elements);
    }
    // $('#holder3').append('<form action="/chatpost" method="POST" id="pvt_msg_form">');
    $('#holder3').append('<input id="searched_user" value="'+username+'" type="hidden">');
    // console.log(document.getElementById("topic_title").value );
    // console.log(document.getElementById("searched_user").value );

}

function hide_or_show(){
  $("#myInput").css("display","block")
}

function get_specific_post_replies(selected_element){
  console.log(selected_element.id);
  // alert("get_specific_post_replies");
  // let post_id = selected_element.id.split("_")[3];
  var msg_id = "msg"+selected_element.id.split("InReplyTo")[1];
  // console.log(document.getElementById(msg_id));
  console.log(msg_id);
  var class_toggle = "info";
  var temp = false;
  var topic_id = msg_id.split("_")[1];

  var div_element = document.getElementById(msg_id);
  if (div_element.classList.length > 0){
    temp = div_element.classList.toggle("show");
    console.log("if block");
  }
  console.log(temp);
  if(temp){
  $.ajax({
      url: "/posts/"+selected_element.dataset.post_id+"/reply-history",
      type: 'GET'
    })
    .done(function (data) {
      console.log(data);
      console.log(msg_id);
      // $("#"+msg_id).prepend();
      var username = $('#curr_user').attr('name');
      var elements = '';

      let count = 1;
      if (data ){
        // data = data.post_stream.posts
        for (let i = 0; i < data.length; i++) {
        let User_Name = (data[i].username == null) ? data[i].name : '<a class="usr_profile" href="/u/'+data[i].username+'">'+data[i].username+'</a>'
        var marginLeft = 4;
        marginLeft = marginLeft + "%";

        let message_datetime = "";
        message_datetime = new Date(data[i].updated_at).toLocaleString([], { hour: '2-digit', minute: '2-digit' , day: '2-digit', month: '2-digit', year: '2-digit'});

        if (message_datetime == null || message_datetime == undefined){
          message_datetime = "";
        }
        else{
          message_datetime = message_datetime.split("/");
          message_datetime = message_datetime[1]+"/"+message_datetime[0]+"/"+message_datetime[2]
          message_datetime = "<div class='msg_datetime'>" + message_datetime+ "</div>"
        }
        // if(post_number == data[i].reply_to_post_number){
        // var reply_msg_id = topic_id+'_'+ post_number +'_'+ data[i].post_number;
        like_url = '/post_actions/'+data[i].id+'/2';
        if(data[i].actions_summary && data[i].actions_summary.length > 0){
          like_button = "";
          var if_block = false;
          for (let j = 0; j < data[i].actions_summary.length; j++) {
            // console.log(data[i].actions_summary[j].id);
            if(data[i].actions_summary[j] && data[i].actions_summary[j].id && data[i].actions_summary[j].count && data[i].actions_summary[j].id == "2")
            {
              // like_button = data[i].actions_summary[j].count+' <i class="fa fa-heart" style="color:red"></i>'
              if(data[i].username != username){
                like_button = '<div class="like_div"><span id="like_count_' + data[i].id + '" style="display:inline-block;">' + data[i].actions_summary[j].count + '</span><a id="like_icon_' + data[i].id + '" onclick="like_function(this,like_url)" ><i style="color:red" class="fa fa-heart"></i></a></div>'
              }
              else{
                like_button = '<div class="like_div"><span id="like_count_' + data[i].id + '" style="display:inline-block;">' + data[i].actions_summary[j].count + '</span><a id="like_icon_' + data[i].id + '" ><i style="color:grey" class="fa fa-heart"></i></a></div>'
              }
              if_block = true;
              break;
            }
          }
          if(if_block == false && data[i].username != username ){
              like_button = '<div class="like_div"><span id="like_count_' + data[i].id + '" style="display:inline-block;"></span><a id="like_icon_' + data[i].id + '" onclick="like_function(this,like_url)" ><i style="color:grey" class="fa fa-heart-o"></i></a></div>'
          }
          else if(if_block == false && data[i].username == username) {
              // like_button = '<div class="like_div"><span id="like_count_' + data[i].id + '" style="display:inline-block;"></span><a id="like_icon_' + data[i].id + '" ><i style="color:grey" class="fa fa-heart-o"></i></a></div>'
              like_button = '';
          }
        }

        var type_of_msg = data.archetype;
        let chk_pvt_or_regular_msg = (type_of_msg == "regular") ? true : false;
        let share_button='';
        let edit_button = '<div class="edit_btn" id="edit_btn_'+ data[i].topic_id + '_' + data[i].post_number +'_' + data[i].id+'" data-tslug="'+slug+'" data-post_id="'+ data[i].id +'" title="edit this post" onclick="edit_function(this)"><i class="fa fa-pencil" aria-hidden="true"></i></div>'
        let setting_button = '<div class="setting_btn" id="setting_btn_'+ data[i].topic_id + '_' + data[i].post_number +'_' + data[i].id+'" data-tslug="'+slug+'" data-post_id="'+ data[i].id +'" title="" onclick="setting_function(this)"><i class="fa fa-external-link"></i></div>'
        if(chk_pvt_or_regular_msg == true){
          share_button = '<div class="share_btn" id="share_btn_'+ data[i].topic_id + '_' + data[i].post_number +'_' + data[i].id+'" data-tslug="'+slug+'" title="share a link to this post" onclick="share_function(this)"><i class="fa fa-share-alt "></i></div>'
        }
        if(data[i].username !=null && data[i].username!=undefined && data[i].username != username){
          //style="margin-left: '+ marginLeft +'; width: calc(100% - '+ marginLeft +') "
          elements = elements + '<div style="margin-right: '+ marginLeft +'; width: calc(100% - '+ marginLeft +') " id="InReplyToReplyMsg_'+ topic_id + '_'+data[i].post_number+ '" class="message reply_msg '+ class_toggle +'"> <div class="message-body">' + '<div class="message-info">' + '<b>' + User_Name + '</b>'+message_datetime+'<h5>' + '</h5>' + '</div>' + '<hr>' + '<div data-POSTID="'+ data[i].id +'" class="message-text">' + data[i].cooked + '</div>' + (data[i].reply_count > 0 ? '<button id="btn_'+ data[i].topic_id +'_' +data[i].post_number + '_' + posts_count+'" type="button" data-post_id="'+ data[i].id +'" class="see_replies">'+ data[i].reply_count+ (data[i].reply_count == 1? ' Reply': ' Replies') +' </button>': '')+ '<i id="reply_btn_'+ data[i].topic_id + '_' + data[i].post_number +'" type="button" title="'+ data[i].cooked.replace(/<[^>]+>/g, '') +'" class="fa fa-reply reply_function" aria-hidden="true"></i>'+ '<div class="delete_btn" id="delete_btn_'+ data[i].topic_id + '_' + data[i].post_number +'_' + data[i].id+'" data-tslug="'+slug+'" title="'+ data[i].cooked.replace(/<[^>]+>/g, '') +'" onclick="delete_function(this)"><i class="fa fa-trash-o"></i></div>'+setting_button+share_button+like_button+'</div>' + '<br>' + '</div>';
        }
        else{
          elements = elements + '<div style="margin-right: '+ marginLeft +'; width: calc(100% - '+ marginLeft +') " id="InReplyToReplyMsg_'+ topic_id + '_'+data[i].post_number+ '" class="message my-message reply_msg '+ class_toggle +'"> <div class="message-body">' + '<div class="message-info">' + '<b>' + User_Name + '</b>'+message_datetime + '<h5>' + '</h5>' + '</div>' + '<hr>' + '<div data-POSTID="'+ data[i].id +'" class="message-text">' + data[i].cooked + '</div>' + (data[i].reply_count > 0 ? '<button id="btn_'+ data[i].topic_id + '_' +data[i].post_number + '_' + posts_count+'" type="button" data-post_id="'+ data[i].id +'" class="see_replies">'+ data[i].reply_count+ (data[i].reply_count == 1? ' Reply': ' Replies') +' </button>': '')+ '<i id="reply_btn_'+ data[i].topic_id + '_' + data[i].post_number +'" type="button" title="'+ data[i].cooked.replace(/<[^>]+>/g, '') +'" class="fa fa-reply reply_function" aria-hidden="true"></i>'+edit_button+'<div class="delete_btn" id="delete_btn_'+ data[i].topic_id + '_' + data[i].post_number +'_' + data[i].id+'" data-tslug="'+slug+'" title="'+ data[i].cooked.replace(/<[^>]+>/g, '') +'" onclick="delete_function(this)"><i class="fa fa-trash-o"></i></div>'+setting_button+share_button+like_button+'</div>' + '<br>' + '</div>';
        }
        count = count + 1;
        // }
       }
      }
      $("#"+msg_id).prepend(elements);
    });
    }
  else
  {
    // console.log($("#"+msg_id).first());
    // $("#"+msg_id).first().remove();
     document.getElementById(msg_id).firstElementChild.innerHTML = ""; 
  }
}

function load_posts_using_page_number(x,param=null,activity_name=null)
{
    // console.log("==================================");
    $('li').removeClass('active');
    $(this).addClass('active');
    if(param && param.firstElementChild){
      $('li').removeClass('active');
      param.firstElementChild.classList.add("active");
    }
    if(activity_name && param!=null && param!=undefined && param.dataset.post_id){
      url = "/post/more/t/" + x
      page_number  = null;
      $.ajax({
        url: url,
        data: {page_number:page_number},
      })
      .done(function (data) {
        index_of_post_number = (data.post_stream.stream.indexOf(Number(param.dataset.post_id)) % 20);
        page_number = Math.ceil((data.post_stream.stream.indexOf(Number(param.dataset.post_id)) / 20));
        load_posts(x,data.title,page_number,index_of_post_number);
      });
    }
}

function setting_function(clicked_element_data){

      if(clicked_element_data){
       
        // console.log(clicked_element_data);
        var id = clicked_element_data.id.split("_")[2];
        var post_number = clicked_element_data.id.split("_")[3];
        // var tempInput = document.createElement("input");
        // tempInput.value = window.location.origin +"/t/"+clicked_element_data.dataset.tslug+"/"+tid+"/"+post_number;
        // document.body.appendChild(tempInput);
        // tempInput.select();
        // document.execCommand("copy");
        // document.body.removeChild(tempInput);
        // console.log(document.getElementById("url"));
        window.open(document.getElementById("url").getAttribute("name")+'t/'+clicked_element_data.dataset.tslug+'/'+id+'/'+post_number,' ',width=500, height=300);
      } 
           // alert("Share URL has been copied to clipboard.");
}
function edit_function(selected_element){
  // alert("hiiiiiiiiiiii");
  // console.log(selected_element);
  // console.log(selected_element.dataset.post_id);
  // console.log(document.querySelectorAll('div[id^="edit_btn_"]'));
  var edit_btns_div = document.querySelectorAll('div[id^="edit_btn_"]')
  for (var i = 0; i < edit_btns_div.length; i++) {
    edit_btns_div[i].removeAttribute("data-edit_btn");
  }
  selected_element.setAttribute("data-edit_btn", "");
  var post_id = document.querySelectorAll('div[id^="edit_btn_"][data-edit_btn]')[0].dataset.post_id
  // console.log(document.querySelectorAll('div[id^="edit_btn_"][data-edit_btn]')[0]);
  // console.log(document.querySelectorAll('div[id^="edit_btn_"][data-edit_btn]'));
  console.log(document.querySelectorAll('div[data-POSTID="'+ post_id +'"]'));
  url = "/posts/" + selected_element.dataset.post_id
  // console.log(url);
  page_number  = null;
  $.ajax({
    url: url
  })
  .done(function (data) {
    // console.log(data);
    // console.log(document.getElementById("replyMessage").value);
    document.getElementById("replyMessage").value = data.raw;
    document.getElementById("replyMessage1").value = data.raw
  });

}

function open_page(){
  document.getElementById("About").click();
  document.getElementById("mySidebar").style.width = "0";
}

function function_partners(value=null) {
  var ele = document.getElementById('#back2');
  ele.addEventListener('click', visible_cat);

  // console.log(value);
  $('#holder9').html("");
  var username = $('#curr_user').attr('name');
  if(value !=true){
  $("#right_panel_msg").css("display","block");
  // window.history.replaceState("object or string", '' , '/');
  document.getElementById("inbox-message-1").style.display = "None";
  $('#menu_active').text('Partners');
  var e = document.getElementById("category_click");
  // console.log(e)
  if(e!=null && e!=undefined){
    e.classList.remove("active-tab")
  }
  e = document.getElementById("private_click");
  if(e!=null && e!=undefined){
    e.classList.remove("active-tab");
  }
  e = document.getElementById("group_click");
  if(e!=null && e!=undefined){
    e.classList.remove("active-tab");
  }
  e = document.getElementById("partner_click");
  if(e!=null && e!=undefined){
    e.classList.add("active-tab");
  }
  e = document.getElementById("latest_click");
  if(e!=null && e!=undefined){
    e.classList.remove("active-tab");
  }
  e = document.getElementById("course_click");
  if(e!=null && e!=undefined){
    e.classList.remove("active-tab");
  }
  document.getElementById("holder6").style.display = "None";
  document.getElementById("holder4").style.display = "None";
  document.getElementById("holder2").style.display = "None";
  document.getElementById("holder5").style.display = "None";
  document.getElementById("holder7").style.display = "None";
  document.getElementById("holder8").style.display = "None";
  document.getElementById("holder9").style.display = "Block";
  document.getElementById("holder10").style.display = "None";
  document.getElementById("holder11").style.display = "None";

  if (menuContent.style.display == "block") {
    menuContent.style.display = "";
  }
  }

  elements = "";
  // elements = elements + '<div class="contact_list" onClick=' + 'load_topics("' + slug + "/" + ide + "/load/0" + '",this)' + '>' + '<li id="' + data[i].name + '" class="" data-toggle="" data-target="">'  + '<img alt="" class="img-circle medium-image" src="'+logo+'">' + '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + data[i].name + '</b>' + ' </h3>' + '<h5>' +data[i].description + '</h5>' + '</div>' + '<div class="contacts-add">' + '<span class="message-time">' + '<br>' + '<sup>' + '</sup>' + '</span>' + '</div>' + '</li>' + '</div>';

  // console.log(document.getElementById("Institutional Partners"))
  // console.log(document.getElementById("Institutional Partners").parentElement.outerHTML);
  document.getElementById("Institutional Partners").parentElement.style.display = "block";
  document.getElementById("State Partners").parentElement.style.display = "block";
  document.getElementById("Interest Groups").parentElement.style.display = "block";
  document.getElementById("Individual Partners").parentElement.style.display = "block";

  elements = elements + document.getElementById("Institutional Partners").parentElement.outerHTML;
  elements = elements + document.getElementById("State Partners").parentElement.outerHTML;
  elements = elements + document.getElementById("Interest Groups").parentElement.outerHTML;
  elements = elements + document.getElementById("Individual Partners").parentElement.outerHTML;
  $('#holder9').html(elements);
  closeNav();
}

function function_courses(){
  // console.log("function_courses");
      // console.log(value);
      var ele = document.getElementById('#back2');
      ele.addEventListener('click', visible_subcat);
      var username = $('#curr_user').attr('name');
      $("#right_panel_msg").css("display","block");
      // window.history.replaceState("object or string", '' , '/');
      document.getElementById("inbox-message-1").style.display = "None";
      $('#menu_active').text('Courses');
      var e = document.getElementById("partner_click");
      if(e!=null && e!=undefined){
        e.classList.remove("active-tab");
      }  
      e = document.getElementById("category_click");
      if(e!=null && e!=undefined){
        e.classList.remove("active-tab")
      }
      e = document.getElementById("private_click");
      if(e!=null && e!=undefined){
        e.classList.remove("active-tab");
      }
      e = document.getElementById("group_click");
      if(e!=null && e!=undefined){
        e.classList.remove("active-tab");
      }
      e = document.getElementById("latest_click");
      if(e!=null && e!=undefined){
        e.classList.remove("active-tab");
      }
      e = document.getElementById("course_click");
      if(e!=null && e!=undefined){
        e.classList.add("active-tab");
      }      
      document.getElementById("holder6").style.display = "None";
      document.getElementById("holder4").style.display = "None";
      document.getElementById("holder2").style.display = "None";
      document.getElementById("holder5").style.display = "None";
      document.getElementById("holder7").style.display = "None";
      document.getElementById("holder8").style.display = "None";
      document.getElementById("holder9").style.display = "None";
      document.getElementById("holder10").style.display = "Block";
      document.getElementById("holder11").style.display = "None";

      if (menuContent.style.display == "block") {
        menuContent.style.display = "";
      }
      $('#holder10').html("");
      $.ajax({
        url: "/user/common/" + username,
        data: { courses: true }
      })

        .done(function (data) {

          // console.log(data);
          var elements = '';
          for (var i = 0; i < data.length; i++) {
            var slug, ide, logo;
            logo="/images/icons/noun_online_course_3306259.png";
            slug = data[i].slug;
            ide = data[i].id;
            if (data[i].uploaded_logo) {
              logo = data[i].uploaded_logo.url;
              logo='https://lms.metastudio.org/'+logo;
            }
            let partners_div = (data[i].name == 'Institutional Partners' || data[i].name == 'State Partners' || data[i].name == 'Interest Groups' || data[i].name == 'Individual Partners')?'style="display:none;"':'';

            if(data[i]!=null && data[i]!=undefined && data[i].subcategory_ids && data[i].subcategory_ids.length > 0){
              elements = elements + '<div data-course="" '+ partners_div +' data-cid="'+data[i].id+'" data-cslug="'+data[i].slug+'" data-sub_cids="'+data[i].subcategory_ids.toString()+'" onClick="load_subcategories(this)"' + '>' + '<li id="' + data[i].name + '" class="" data-toggle="" data-target="">' + '<img alt="" class="user-logo-rect medium-image" src="'+logo+'">' + '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + data[i].name + '</b>' + ' </h3>' + '<h5>' + ((data[i].description)? data[i].description: '') + '</h5>' + '</div>' + '<div class="contacts-add">' + '<span class="message-time">' + '<br>' + '<sup>' + '</sup>' + '</span>' + '</div>' + '</li>' + '</div>';  
            }
            else
            {
            // let partners_div = (data[i].name == 'Institutional Partners' || data[i].name == 'State Partners' || data[i].name == 'Interest Groups' || data[i].name == 'Individual Partners')?'style="display:none;':'';
              if(data[i].description){
              elements = elements + '<div data-class="" '+partners_div +' data-cid="'+ data[i].id +'" data-cname="'+ data[i].name +'" class="contact_list" onClick=' + 'load_topics("' + slug + "/" + ide + "/load/0" + '",this)' + '>' + '<li id="' + data[i].name + '" class="" data-toggle="" data-target="">'  + '<img alt="" class="user-logo-rect medium-image" src="'+logo+'">' + '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + data[i].name + '</b>' + ' </h3>' + '<h5>' +data[i].description + '</h5>' + '</div>' + '<div class="contacts-add">' + '<span class="message-time">' + '<br>' + '<sup>' + '</sup>' + '</span>' + '</div>' + '</li>' + '</div>';
              }else{
                //elements = elements + '<div data-cid="'+ data[i].id  +'" data-cname="'+ data[i].name  +'" class="contact_list" onClick=' + 'load_topics("' + slug + "/" + ide + "/load/0" + '")' + '>' + '<li id="' + data[i].name + '" class="" data-toggle="" data-target="">' + '<div class="message-count">' + data[i].topic_count + '</div>' + '<img alt="" class="img-circle medium-image" src="'+logo+'">' + '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + data[i].name + '</b>' + ' </h3>' +'</div>' + '<div class="contacts-add">' + '<span class="message-time">' + '<br>' + '<sup>' + '</sup>' + '</span>' + '<i class="fa fa-trash-o">' + '</i>' + '<div onClick=' + 'copy_topic(event,"' + "/group/" + slug + "/" + ide + '")' + '>' + '<i class="fa fa-share-alt">' + '</i>' + '</div>' + '</div>' + '</li>' + '</div>';
                elements = elements + '<div data-class="" '+partners_div +' data-cid="'+ data[i].id +'" data-cname="'+ data[i].name +'" class="contact_list" onClick=' + 'load_topics("' + slug + "/" + ide + "/load/0" + '",this)' + '>' + '<li id="' + data[i].name + '" class="" data-toggle="" data-target="">'  + '<img alt="" class="user-logo-rect medium-image" src="'+logo+'">' + '<div class="vcentered info-combo">' + '<h3 class="no-margin-bottom name">' + '<b>' + data[i].name + '</b>' + ' </h3>' + '<h5>' + '</h5>' + '</div>' + '<div class="contacts-add">' + '<span class="message-time">' + '<br>' + '<sup>' + '</sup>' + '</span>' + '</div>' + '</li>' + '</div>';
              }
            }
            // if(data[i] && data[i].subcategory_ids){
            //   data1 = {"dataset":{"cid": data[i].id, "sub_cids": (data[i].subcategory_ids ? data[i].subcategory_ids.toString(): "" )}}
            //   load_subcategories(data1,value);
            // }
          }

          $('#holder10').html(elements);
        });
      closeNav();
}

function get_tag_groups(cooked,tags){
  $.ajax({
    url: "/tags"
  })
  .done(function (data) {
    // console.log(tags);
    // console.log(data.extras.tag_groups);
    let tags_with_grp_name = ""
    for(var j = 0; j < tags.length; j++) {
      for (var i = 0; i < data.extras.tag_groups.length; i++) {
        for (var k = 0; k < data.extras.tag_groups[i].tags.length; k++) {
        // console.log(tags[j]);
        // console.log(data.extras.tag_groups[i].tags[k].text);
        // console.log(data.extras.tag_groups[i].tags[k].text == tags[j])
        if(data.extras.tag_groups[i].tags[k].text == tags[j]){
          // console.log(data.extras.tag_groups[i].name);
          // console.log(tags[j]);
          tags_with_grp_name = tags_with_grp_name + data.extras.tag_groups[i].name+" : "+tags[j]+"<br/>"
        }
      }
      }
    }
    document.getElementsByClassName("message-text")[0].innerHTML = cooked + tags_with_grp_name;
  });
}

function getbadgeIcons(data){
  // console.log(data);
  if(data != undefined){
    var objectLengh = Object.keys(data).length;
    // console.log(objectLengh);
    var badgeIcons='';
    for (let i = 0; i < objectLengh; i++) {
      // console.log(data[i+1].image);
      badgeIcons = badgeIcons + "<img class='post_icon' src='"+ (data[i+1].image) +"' title='"+ data[i+1].name +"'>";
    }
    return badgeIcons;
  }

  return "";
}

function load_previous_module(){
  alert("HI")
}

function load_next_module(){
  alert("HI")
}