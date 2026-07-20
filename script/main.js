import { state } from "./state.js";
import {
  bindMobileMenuToggle,
  bindNavigation,
  isElementInViewport,
  renderCVSectionMarkup,
  renderDownloadCVMarkup,
  renderDownloadCvDropdown,
  renderErrorState,
  renderLoadingState,
  renderProfileCard,
  setActiveNavLink,
} from "./render.js";
import { parseResumeSections } from "./cvParser.js";

async function fillCVFromFile() {
  const cv = document.getElementById("cv-section-content");

  if (!cv) {
    return;
  }

  cv.innerHTML = renderLoadingState();

  const convertToHtmlOptions = {
    styleMap: ["p.Style1 => h1"],
  };

  try {
    const doc = await fetch("./cv/Zimakov_Resume_Eng.docx");
    const buffer = await doc.arrayBuffer();
    const converted = await mammoth.convertToHtml({ arrayBuffer: buffer }, convertToHtmlOptions);

    const sections = parseResumeSections(converted.value);
    cv.innerHTML = sections.map((section) => renderCVSectionMarkup(section)).join("") + renderDownloadCVMarkup(state);
  } catch (error) {
    cv.innerHTML = renderErrorState(error.message);
  }
}

function call() {
  window.open(`tel:${state.tel}`);
}

function email() {
  window.open(`mailto:${state.email}`);
}

function linkedIn() {
  window.open(state.linkedIn, "_blank", "noopener,noreferrer");
}

function handleScroll() {
  document.querySelectorAll("section").forEach((section) => {
    if (isElementInViewport(section)) {
      const hash = `#${section.id}`;
      if (window.location.hash !== hash) {
        window.history.replaceState(null, "", hash);
      }
      setActiveNavLink(hash);
    }
  });
}

function init() {
  renderProfileCard(state);
  renderDownloadCvDropdown(state);
  bindNavigation();
  bindMobileMenuToggle();
  setActiveNavLink(window.location.hash || "#home");
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("load", () => {
    handleScroll();
  });
  fillCVFromFile();
}

window.call = call;
window.email = email;
window.linkedIn = linkedIn;

init();