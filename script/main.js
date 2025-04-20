import { state } from "./state.js";

function fillCVFromFile() {
  const cv = document.getElementById('cv');


  const convertToHtmlOptions = {
    styleMap: [
      "p.Style1 => h1"
    ]
  };

  fetch("./cv/Zimakov_Resume_Eng.docx")
    .then(res => res.arrayBuffer())
    .then(buffer => mammoth.convertToHtml({ arrayBuffer: buffer }, convertToHtmlOptions))
    .then(result => {
      const html = result.value;
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
  
      const sections = [];
      let current = null;
  
      doc.body.childNodes.forEach(node => {
        if (node.nodeName === "H1") {
          if (current) sections.push(current);
          current = { title: node.textContent, content: "" };
        } else if (current) {
          if (node.nodeName === "TABLE") {
            const parsed = parseTableToDivs(node);
            current.content += parsed.outerHTML;
          }
          else {
            current.content += node.outerHTML || node.textContent;
          }
        }
      });
      if (current) sections.push(current);
      
      sections.forEach(section => {
        cv.innerHTML += getCVSectionHTML(section);
      });
      
    })
    .catch(err => window.alert("Error:", err.message));
}

function parseTableToDivs(tableNode) {
  const rows = tableNode.querySelectorAll("tr");
  if (rows.length > 1) return tableNode;
  const row = rows[0];
  const tds = row.querySelectorAll("td");
  if (tds.length < 2) return;

  const [first, second] = tds;
  const [title, place = ""] = (first.innerText || "").split("|").map(s => s.trim());
  const dates = second.innerText || "";

  const expDiv = document.createElement("div");

  expDiv.innerHTML = `
    <div><span class="bold-text">${title}</span></div>
    <div><span>${place}</span></div>
    <div><span class="grey-text">${dates}</span></div>
  `;

  return expDiv;
}

function getCVSectionHTML(section) {
  const id = section.title.toLowerCase().split(' ').join('-');
  return `<div class="row justify-content-center">
            <div class="col-9 card-cv">
              <div class="header">
                <h1>${section.title}</h1>
              </div>
              <div id="${id}" class="content">${section.content}</div>        
            </div>
          </div>`;
}

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

function fillMyData() {
  const icons = [
    { class: "bi bi-linkedin", link: "https://www.linkedin.com/in/sergey-zimakov/" },
    { class: "bi bi-github", link: "https://github.com/SergeyZimakov" },
    { class: "bi bi-google", link: "mailto:zimakovs93@gmail.com" },
    { class: "bi bi-facebook", link: "https://www.facebook.com/serega.zimakov" },
  ]

  document.getElementById('my-name').innerText = state.name;
  document.getElementById('my-position').innerText = state.position;
  document.getElementById('my-tel').innerHTML = `<a href='tel:${state.tel}'>${state.tel}</a>`;
  document.getElementById('my-email').innerHTML = `<a href='mailto:${state.email}'>${state.email}</a>`;
  document.getElementById('my-cvs').innerHTML = state.cvFiles.map(cv => `<a href='${cv.link}' target='_blank' rel='noopener noreferrer'>${cv.name}</a>`).join('');
  document.getElementById('my-icons').innerHTML = icons.map(icon => {
    const attr = icon.class === 'bi bi-google' ? '' : 'target="_blank" rel="noopener noreferrer"';
    return `<a href='${icon.link}' ${attr}><i class='${icon.class}'></i></i></a>`;
  }).join('');

  document.getElementById('contact-name').innerText = state.name;
  document.getElementById('contact-tel').innerText = state.tel;
  document.getElementById('contact-email').innerText = state.email;
}

function fillDownloadCV() {
  document.getElementById('download-cv-eng').innerHTML = state.cvFiles.filter(cv => cv.name.endsWith('(Eng)')).map(cv => `<a class='cv-download-btn' href='${cv.link}' target='_blank' rel='noopener noreferrer'>${cv.name}</a>`).join('');
  document.getElementById('download-cv-heb').innerHTML = state.cvFiles.filter(cv => cv.name.endsWith('(Heb)')).map(cv => `<a class='cv-download-btn' href='${cv.link}' target='_blank' rel='noopener noreferrer'>${cv.name}</a>`).join('');
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
  fillMyData();
  fillTextListDiv('about-me');
  fillExperienceOrEduction('experience');
  fillExperienceOrEduction('education');
  fillTextListDiv('technical-skills');
  fillTextListDiv('skills');
  fillTextListDiv('languages');
  fillDownloadCV();
  fillProjects();
  fillCVFromFile();
}

init();