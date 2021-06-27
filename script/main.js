function toggleModalNavBar() {
  $("#modal-nav").modal('toggle');
}


function isElementInViewport (el) {
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  const rect = el.getBoundingClientRect();
  const flag = (rect.bottom > 0) && (rect.height >= (rect.top) * -1) && (rect.top <= 50);
  return flag;
}

$(".nav-item").click(function (e) {
  e.preventDefault();
  var section = this.href;
  var sectionClean = section.substring(section.indexOf("#"));
  $("html, body").animate({
    scrollTop: $(sectionClean).offset().top
  }, 500, "linear", function () {
    window.location.hash = sectionClean;
  });
});

$(document).on("scroll", function() {
  $("section").each(function (idx, el) {
    if (isElementInViewport(el)) {
      if (window.history.pushState) {
        var urlHash = "#" + $(el).attr("id");
        window.history.pushState(null, null, urlHash);
        setClassForActiveLink();
      }
    }
  });
});

function setClassForActiveLink() {
  const links = $('a.nav-item');
  const hash = window.location.hash;
  for (let index = 1; index < links.length - 1; index++) {
    const link = $(links[index]);
    const href = link[0].attributes.href.value;
    if (href === hash) {
      link.addClass('active-nav-item');
    } else {
      link.removeClass('active-nav-item');
    }
  }
}

function dropdownToggle() {
  $('#downloadCV').dropdown('toggle')
}

function call() {
  window.open('tel:+972544366021');
}

function email() {
  window.open('mailto:zimakovs93@gmail.com');
}