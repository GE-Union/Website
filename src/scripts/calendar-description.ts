const ALLOWED_TAGS = new Set([
  "a",
  "b",
  "blockquote",
  "br",
  "code",
  "del",
  "div",
  "em",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "i",
  "li",
  "mark",
  "ol",
  "p",
  "pre",
  "q",
  "s",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "time",
  "u",
  "ul",
]);

const DROPPED_TAGS = new Set([
  "audio",
  "base",
  "button",
  "canvas",
  "embed",
  "form",
  "iframe",
  "img",
  "input",
  "link",
  "math",
  "meta",
  "noscript",
  "object",
  "picture",
  "script",
  "style",
  "svg",
  "template",
  "video",
]);

function isAllowedLink(href: string): boolean {
  try {
    const url = new URL(href, window.location.href);
    return ["http:", "https:", "mailto:", "tel:"].includes(url.protocol);
  } catch {
    return false;
  }
}

function copySafeNode(source: Node, destination: Node): void {
  if (source.nodeType === Node.TEXT_NODE) {
    destination.appendChild(document.createTextNode(source.textContent ?? ""));
    return;
  }
  if (!(source instanceof Element)) return;

  const tagName = source.tagName.toLowerCase();
  if (DROPPED_TAGS.has(tagName)) return;
  if (!ALLOWED_TAGS.has(tagName)) {
    [...source.childNodes].forEach((child) => copySafeNode(child, destination));
    return;
  }

  const element = document.createElement(tagName);
  const title = source.getAttribute("title");
  if (title) element.title = title;

  if (element instanceof HTMLAnchorElement) {
    const href = source.getAttribute("href");
    if (href && isAllowedLink(href)) element.href = href;
    if (source.getAttribute("target") === "_blank") {
      element.target = "_blank";
      element.rel = "noopener noreferrer";
    }
  }

  destination.appendChild(element);
  [...source.childNodes].forEach((child) => copySafeNode(child, element));
}

export function renderCalendarDescription(value: string): DocumentFragment {
  const source = new DOMParser().parseFromString(value, "text/html");
  const fragment = document.createDocumentFragment();
  [...source.body.childNodes].forEach((child) => copySafeNode(child, fragment));
  return fragment;
}
