function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function appendNodeToContent(currentSection, node) {
  if (!currentSection) {
    return;
  }

  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent?.trim();
    if (text) {
      currentSection.content += `<p>${escapeHtml(text)}</p>`;
    }
    return;
  }

  if (node.nodeName === "TABLE") {
    const parsed = parseTableToDivs(node);
    if (parsed) {
      currentSection.content += parsed.outerHTML;
    }
    return;
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    if (node.nodeName === "H1") {
      return;
    }

    currentSection.content += node.outerHTML || node.textContent || "";
  }
}

function parseTableToDivs(tableNode) {
  const rows = tableNode.querySelectorAll("tr");
  if (rows.length > 1) {
    return tableNode;
  }

  const row = rows[0];
  const tds = row?.querySelectorAll("td");
  if (!row || tds.length < 2) {
    return null;
  }

  const [first, second] = tds;
  const [title, place = ""] = (first.innerText || "").split("|").map((value) => value.trim());
  const dates = second.innerText || "";

  const expDiv = document.createElement("div");
  expDiv.innerHTML = `
    <div><span class="bold-text">${escapeHtml(title)}</span></div>
    <div><span>${escapeHtml(place)}</span></div>
    <div><span class="grey-text">${escapeHtml(dates)}</span></div>
  `;

  return expDiv;
}

export function parseResumeSections(htmlString) {
  const parser = new DOMParser();
  const document = parser.parseFromString(htmlString, "text/html");
  const sections = [];
  let currentSection = null;

  Array.from(document.body.childNodes).forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === "H1") {
      if (currentSection) {
        sections.push(currentSection);
      }

      const title = node.textContent?.trim();
      if (title) {
        currentSection = { title, content: "" };
      }
      return;
    }

    appendNodeToContent(currentSection, node);
  });

  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}
