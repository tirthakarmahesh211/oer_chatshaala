//jshint esversion:6

const anchors=document.querySelectorAll('a');
function myFunction(x) {
  if (x.matches) { // If media query matches
    for(var i=0;i<anchors.length;i++){
      if(anchors[i].getAttribute('href').includes('#menu')){

      }else{
        anchors[i].setAttribute('href',anchors[i].getAttribute('href')+'#menu');
      }
    }
  } else {
    for(var j=0;j<anchors.length;j++){
      if(anchors[j].getAttribute('href').includes('#menu')){
        anchors[j].setAttribute('href',anchors[j].getAttribute('href').split('#')[0]);
      }else{
      }
    }
  }
}

var x = window.matchMedia("(max-width: 1024px)");
myFunction(x); // Call listener function at run time
x.addListener(myFunction); // Attach listener function on state changes

(function (window, document) {

    var layout   = document.getElementById('layout'),
        menu     = document.getElementById('menu'),
        menuLink = document.getElementById('menuLink');

    function toggleClass(element, className) {
        var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        for (; i < length; i++) {
            if (classes[i] === className) {
                classes.splice(i, 1);
                break;
            }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }

    function toggleAll(e) {
        var active = 'active';

        e.preventDefault();
        toggleClass(layout, active);
        toggleClass(menu, active);
        toggleClass(menuLink, active);
    }

    function handleEvent(e) {
        if (e.target.id === menuLink.id) {
            return toggleAll(e);
        }

        if (menu.className.indexOf('active') !== -1) {
            return toggleAll(e);
        }
    }

    document.addEventListener('click', handleEvent);

}(this, this.document));
