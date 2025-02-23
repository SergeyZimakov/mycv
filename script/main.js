import { aboutMeItems, workExperienceItems } from "./state.js";

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

function linkedIn() {
  window.open('https://www.linkedin.com/in/sergey-zimakov/','_blank');
}

function fillAboutMe() {
  const aboutMeDiv = document.getElementById('aboutMe');
  aboutMeItems.forEach(item => {
    const p = document.createElement('p');
    p.innerText = item;
    aboutMeDiv.append(p);
  });
}
 
function fillWorkExperience() {
  const cards = document.getElementById('work-experience-cards');
  workExperienceItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'content-card';
    if (!isEmptyString(item.position)) {
      const positionDiv = document.createElement('div');
      const positionText = document.createElement('span');
      positionText.className = 'bold-text';
      positionText.innerText = item.position;
      positionDiv.append(positionText);
      card.append(positionDiv);
    }

    if (!isEmptyString(item.company)) {
      const companyDiv = document.createElement('div');
      const companyText = document.createElement('span');
      companyText.innerText = item.company;
      companyDiv.append(companyText);
      card.append(companyDiv);
    }

    if (!isEmptyString(item.dates)) {
      const datesDiv = document.createElement('div');
      const datesText = document.createElement('span');
      datesText.className = 'grey-text';
      datesText.innerText = item.dates;
      datesDiv.append(datesText);
      card.append(datesDiv);
    }

    if (item.description.length) {
      const descriptionList = document.createElement('ul');
      descriptionList.className = 'description-list';
      item.description.forEach(di => {
        const descItem = document.createElement('li');
        descItem.innerText = di;
        descriptionList.append(descItem);
      });
      card.append(descriptionList);
    }

    cards.append(card);
  });
}

function isEmptyString(str) {
  return str === '';
}

function init() {
  fillAboutMe();
  fillWorkExperience();
}

init();