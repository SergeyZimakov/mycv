import { state } from "./state.js";

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
  window.open(`tel:${state.tel}`);
}

function email() {
  window.open(`mailto:${state.email}`);
}

function linkedIn() {
  window.open(state.linkedIn,'_blank');
}

function fillTextListDiv(divId) {
  const mainDiv = document.getElementById(divId);
  let items = [];
  switch (divId) {
    case 'about-me':
      items = state.aboutMeItems;
      break;
    case 'technical-skills':
      items = state.technicalSkillsItems;
      break;
    case 'skills':
      items = state.skillsItems;
      break;
    case 'languages':
      items = state.languagesItems;
      break;
    default:
      break;
  }
  mainDiv.innerHTML += items.map(i => `<p>${i}</p>`).join('');
}

function fillExperienceOrEduction(option) {
  const mainDiv = option === 'education'
    ? document.getElementById('education')
    : document.getElementById('work-experience');
  
  const items = option === 'education'
    ? state.educationItems
    : state.workExperienceItems;

  items.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'content-card';
    if (!isEmptyString(item.position)) {
      itemDiv.innerHTML += `<div><span class='bold-text'>${item.position}</span></div>`;
    }

    if (!isEmptyString(item.place)) {
      itemDiv.innerHTML += `<div><span>${item.place}</span></div>`;
    }

    if (!isEmptyString(item.dates)) {
      itemDiv.innerHTML += `<div><span class='grey-text'>${item.dates}</span></div>`;
    }

    if (item.description.length) {
      const descriptionItems = item.description.map(i => `<li>${i}</li>`).join('');
      itemDiv.innerHTML += `<ul class='description-list'>${descriptionItems}</ul>`;
    }

    mainDiv.append(itemDiv);
  });
}

function fillProjects() {
  const mainDiv = document.getElementById("my-projects");
  state.projectItems.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'content-card';

    if (!isEmptyString(item.name)) {
      itemDiv.innerHTML += `<div><span class='bold-text'>${item.name}</span></div>`;
    }

    if (!isEmptyString(item.technologies)) {
      const year = !isEmptyString(item.year) ? ` - ${item.year}` : '';
      itemDiv.innerHTML += `<div><span class='grey-text'>${item.technologies}${year}</span></div>`;
    }

    if (item.description.length) {
      const descriptionItems = item.description.map(i => `<li>${i}</li>`).join('');
      itemDiv.innerHTML += `<ul class='description-list'>${descriptionItems}</ul>`;
    }

    if (item.links.length) {
      itemDiv.innerHTML += item.links.map(i => `<p class='text'>${i.name}: <a href='${i.link}' target='_blank' rel='noopener noreferrer'>${i.link}</a></p>`);
    }

    if (item.images.length) {
      itemDiv.innerHTML += item.images.map(i => `<div class='card-project-image'><img src='${i}' alt=''></div>`).join('');
    }

    mainDiv.append(itemDiv);
  });
}
 
function isEmptyString(str) {
  return str === '';
}

function init() {
  fillTextListDiv('about-me');
  fillExperienceOrEduction('experience');
  fillExperienceOrEduction('education');
  fillTextListDiv('technical-skills');
  fillTextListDiv('skills');
  fillTextListDiv('languages');
  fillProjects();
}

init();