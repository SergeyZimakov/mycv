function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function setHtml(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.innerHTML = value;
  }
}

export function renderProfileCard(state) {
  const icons = [
    { class: "bi bi-linkedin", link: state.linkedIn },
    { class: "bi bi-github", link: state.git },
    { class: "bi bi-google", link: `mailto:${state.email}` },
    { class: "bi bi-facebook", link: state.facebook },
  ];

  setText("my-name", state.name);
  setText("my-position", state.position);
  setHtml("my-tel", `<a href="tel:${state.tel}">${state.tel}</a>`);
  setHtml("my-email", `<a href="mailto:${state.email}">${state.email}</a>`);
  setHtml(
    "my-cvs",
    state.cvFiles
      .map((cv) => `<a href="${cv.link}" target="_blank" rel="noopener noreferrer">${cv.name}</a>`)
      .join("")
  );
  setHtml(
    "my-icons",
    icons
      .map((icon) => {
        const attributes = icon.class === "bi bi-google" ? "" : 'target="_blank" rel="noopener noreferrer"';
        return `<a href="${icon.link}" ${attributes}><i class="${icon.class}"></i></a>`;
      })
      .join("")
  );

  setText("contact-name", state.name);
  setText("contact-tel", state.tel);
  setText("contact-email", state.email);
}

export function renderCVSectionMarkup(section) {
  const id = section.title.toLowerCase().split(/\s+/).join("-");

  return `<div class="row justify-content-center">
            <div class="col-12 col-lg-9 card-cv">
              <div class="header">
                <h1>${section.title}</h1>
              </div>
              <div id="${id}" class="content">${section.content}</div>
            </div>
          </div>`;
}

export function renderLoadingState() {
  return `
    <div class="row justify-content-center">
      <div class="col-12 col-lg-9 card-cv">
        <div class="cv-loading-state" role="status" aria-live="polite">
          <div class="cv-loading-spinner"></div>
          <p>Loading CV content...</p>
        </div>
      </div>
    </div>
  `;
}

export function renderErrorState(message) {
  return `
    <div class="row justify-content-center">
      <div class="col-12 col-lg-9 card-cv">
        <div class="cv-empty-state">
          <h2>CV is temporarily unavailable</h2>
          <p>${message}</p>
        </div>
      </div>
    </div>
  `;
}

export function renderDownloadCVMarkup(state) {
  const engCV = state.cvFiles
    .filter((cv) => cv.name.endsWith("(Eng)"))
    .map(
      (cv) =>
        `<a class="cv-download-btn" href="${cv.link}" target="_blank" rel="noopener noreferrer">${cv.name}</a>`
    )
    .join("");

  const hebCV = state.cvFiles
    .filter((cv) => cv.name.endsWith("(Heb)"))
    .map(
      (cv) =>
        `<a class="cv-download-btn" href="${cv.link}" target="_blank" rel="noopener noreferrer">${cv.name}</a>`
    )
    .join("");

  return `
    <div class="row justify-content-center">
      <div class="col-12 col-lg-9 card-cv">
        <div class="header">
          <h1>Download CV</h1>
        </div>
        <div id="download-cv-eng" class="content d-flex flex-wrap justify-content-center">${engCV}</div>
        <div id="download-cv-heb" class="content d-flex flex-wrap justify-content-center">${hebCV}</div>
      </div>
    </div>
  `;
}

export function setActiveNavLink(hash) {
  const links = document.querySelectorAll("a.nav-item");
  const activeHash = hash || "#home";

  links.forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.toggle("active-nav-item", href === activeHash);
  });
}

export function renderDownloadCvDropdown(state) {
  const container = document.getElementById("nav-download-cv");

  if (!container) {
    return;
  }

  const items = state.cvFiles
    .map(
      (cv) => `<li><a class="dropdown-item" href="${cv.link}" target="_blank" rel="noopener noreferrer">${cv.name}</a></li>`
    )
    .join("");

  container.innerHTML = `
    <div class="dropdown">
      <button class="nav-item dropdown-toggle" type="button" id="cv-download-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
        Download CV
      </button>
      <ul class="dropdown-menu" aria-labelledby="cv-download-dropdown">
        ${items}
      </ul>
    </div>
  `;
}

function closeMobileMenu() {
  const modalElement = document.getElementById("modal-nav");

  if (!modalElement || !window.bootstrap) {
    return;
  }

  const modal = window.bootstrap.Modal.getInstance(modalElement) || new window.bootstrap.Modal(modalElement);
  modal.hide();
}

export function bindNavigation() {
  document.querySelectorAll("a.nav-item").forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) {
        return;
      }

      event.preventDefault();
      const targetId = href.slice(1);
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", href);
        setActiveNavLink(href);
      }

      closeMobileMenu();
    });
  });
}

export function bindMobileMenuToggle() {
  document.querySelectorAll(".toggleNavBarBtn").forEach((element) => {
    element.addEventListener("click", () => {
      const modalElement = document.getElementById("modal-nav");
      if (!modalElement || !window.bootstrap) {
        return;
      }

      const modal = window.bootstrap.Modal.getOrCreateInstance(modalElement);
      modal.toggle();
    });
  });
}

export function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top <= 140 && rect.bottom >= 120;
}
