import { state } from "./state.js";

async function fillCVFromFile() {
  const cv = document.getElementById('cv-section-content');

  const convertToHtmlOptions = {
    styleMap: [
      "p.Style1 => h1"
    ]
  };

  try {
    const doc = await fetch("./cv/Zimakov_Resume_Eng.docx")
    const buffer = await doc.arrayBuffer();
    const converted = await mammoth.convertToHtml({ arrayBuffer: buffer }, convertToHtmlOptions);

    const parser = new DOMParser();
    const document = parser.parseFromString(converted.value, "text/html");

    const sections = [];
    let current = null;

    document.body.childNodes.forEach(node => {
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
    cv.innerHTML += getDownloadCVHtml();

  } catch (error) {
    window.alert(`Error: ${error.message}`);
  }
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

function getDownloadCVHtml() {
  const engCV = state.cvFiles.filter(cv => cv.name.endsWith('(Eng)')).map(cv => `<a class='cv-download-btn' href='${cv.link}' target='_blank' rel='noopener noreferrer'>${cv.name}</a>`).join('');
  const hebCV = state.cvFiles.filter(cv => cv.name.endsWith('(Heb)')).map(cv => `<a class='cv-download-btn' href='${cv.link}' target='_blank' rel='noopener noreferrer'>${cv.name}</a>`).join('');
  return `
    <div class="row justify-content-center">
      <div class="col-9 card-cv">
        <div class="header">
          <h1>Download CV</h1>
        </div>
        <div id="download-cv-eng" class="content d-flex flex-wrap justify-content-center">${engCV}</div>
        <div id="download-cv-heb" class="content d-flex flex-wrap justify-content-center">${hebCV}</div>
      </div>           
    </div>
  `
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

function init() {
  fillMyData();
  fillCVFromFile();
}

init();