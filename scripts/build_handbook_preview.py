#!/usr/bin/env python3

from __future__ import annotations

import argparse
import html
import re
from dataclasses import dataclass
from pathlib import Path


FRONT_MATTER_RE = re.compile(r"^---\n(.*?)\n---\n?", re.S)


@dataclass
class Page:
    title: str
    linktitle: str
    slug: str
    weight: int
    body: str
    source_path: Path


def strip_front_matter(text: str) -> tuple[dict[str, str], str]:
    match = FRONT_MATTER_RE.match(text)
    if not match:
        return {}, text

    front_matter = {}
    for line in match.group(1).splitlines():
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        front_matter[key.strip()] = value.strip().strip('"')
    return front_matter, text[match.end():].lstrip()


def slugify(value: str) -> str:
    value = value.lower().strip()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "section"


def format_inline(text: str) -> str:
    escaped = html.escape(text)
    escaped = re.sub(r"`([^`]+)`", r"<code>\1</code>", escaped)
    escaped = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", escaped)
    escaped = re.sub(r"\*([^*]+)\*", r"<em>\1</em>", escaped)
    escaped = re.sub(
        r"\[([^\]]+)\]\(([^)]+)\)",
        lambda match: f'<a href="{html.escape(match.group(2), quote=True)}">{match.group(1)}</a>',
        escaped,
    )
    escaped = re.sub(
        r"(?<![\">])(https?://[^\s<]+)",
        lambda match: f'<a href="{match.group(1)}">{match.group(1)}</a>',
        escaped,
    )
    return escaped


def markdown_to_html(markdown: str) -> str:
    lines = markdown.splitlines()
    output: list[str] = []
    paragraph: list[str] = []
    list_mode: str | None = None

    def flush_paragraph() -> None:
        nonlocal paragraph
        if paragraph:
            text = " ".join(item.strip() for item in paragraph if item.strip())
            if text:
                output.append(f"<p>{format_inline(text)}</p>")
            paragraph = []

    def close_list() -> None:
        nonlocal list_mode
        if list_mode:
            output.append(f"</{list_mode}>")
            list_mode = None

    for raw_line in lines:
        line = raw_line.rstrip()
        stripped = line.strip()

        if not stripped:
            flush_paragraph()
            close_list()
            continue

        heading_match = re.match(r"^(#{1,6})\s+(.*)$", stripped)
        if heading_match:
            flush_paragraph()
            close_list()
            level = len(heading_match.group(1))
            title = heading_match.group(2).strip()
            output.append(f'<h{level} id="{slugify(title)}">{format_inline(title)}</h{level}>')
            continue

        unordered_match = re.match(r"^-\s+(.*)$", stripped)
        ordered_match = re.match(r"^\d+\.\s+(.*)$", stripped)
        if unordered_match or ordered_match:
            flush_paragraph()
            item_text = unordered_match.group(1) if unordered_match else ordered_match.group(1)
            next_mode = "ul" if unordered_match else "ol"
            if list_mode != next_mode:
                close_list()
                output.append(f"<{next_mode}>")
                list_mode = next_mode
            output.append(f"<li>{format_inline(item_text)}</li>")
            continue

        if line.startswith("  ") and list_mode and output and output[-1].startswith("<li>"):
            continuation = format_inline(stripped)
            output[-1] = output[-1][:-5] + f" {continuation}</li>"
            continue

        close_list()
        paragraph.append(stripped)

    flush_paragraph()
    close_list()
    return "\n".join(output)


def load_pages(source_dir: Path) -> list[Page]:
    pages: list[Page] = []
    for path in sorted(source_dir.glob("*.md")):
        text = path.read_text(encoding="utf-8")
        front_matter, body = strip_front_matter(text)
        title = front_matter.get("title", path.stem.replace("-", " ").title())
        linktitle = front_matter.get("linktitle", title)
        weight = int(front_matter.get("weight", "999"))
        slug = "" if path.name == "_index.md" else path.stem
        pages.append(
            Page(
                title=title,
                linktitle=linktitle,
                slug=slug,
                weight=weight,
                body=body,
                source_path=path,
            )
        )
    return sorted(pages, key=lambda page: (page.weight, page.slug))


def nav_html(pages: list[Page]) -> str:
    links = []
    for page in pages:
        href = "/preview/handbook/" if not page.slug else f"/preview/handbook/{page.slug}/"
        links.append(f'<li><a href="{href}">{html.escape(page.linktitle)}</a></li>')
    return "<ul class=\"course-nav\">\n" + "\n".join(links) + "\n</ul>"


def render_page(page: Page, body_html: str, sidebar_html: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{html.escape(page.title)} | Handbook Preview</title>
    <link rel="stylesheet" href="/preview/handbook/style.css">
  </head>
  <body>
    <div class="shell">
      <aside class="sidebar">
        <div class="sidebar-inner">
          <p class="eyebrow">Preview</p>
          <h1>Applied ML for Tabular Data</h1>
          <p class="deck">Handbook-style short course preview built from the new docs pages.</p>
          {sidebar_html}
          <div class="sidebar-footer">
            <span>Self-paced short course preview</span>
          </div>
        </div>
      </aside>
      <main class="main">
        <div class="hero">
          <p class="meta">Handbook Short Course</p>
          <h2>{html.escape(page.title)}</h2>
        </div>
        <article class="page">
          {body_html}
        </article>
      </main>
    </div>
  </body>
</html>
"""


def write_styles(output_dir: Path) -> None:
    css = """
:root {
  --sand: #efe3d2;
  --paper: #fdf8ef;
  --ink: #1f2624;
  --muted: #68736d;
  --accent: #145b52;
  --accent-soft: #dcefeb;
  --line: #d7c9b6;
  --shadow: 0 28px 70px rgba(42, 39, 30, 0.12);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  color: var(--ink);
  font-family: "Charter", "Iowan Old Style", "Palatino Linotype", serif;
  background:
    radial-gradient(circle at top right, rgba(20, 91, 82, 0.14), transparent 30%),
    linear-gradient(180deg, #f1e5d6 0%, #ede4d5 100%);
}

a {
  color: var(--accent);
}

code {
  background: rgba(20, 91, 82, 0.08);
  border-radius: 0.25rem;
  font-family: "SFMono-Regular", "Menlo", monospace;
  padding: 0.1rem 0.3rem;
}

.shell {
  display: grid;
  grid-template-columns: minmax(260px, 320px) 1fr;
  min-height: 100vh;
}

.sidebar {
  background: rgba(253, 248, 239, 0.78);
  backdrop-filter: blur(18px);
  border-right: 1px solid rgba(215, 201, 182, 0.9);
}

.sidebar-inner {
  position: sticky;
  top: 0;
  padding: 2rem 1.5rem 2rem;
}

.eyebrow,
.meta {
  margin: 0;
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.sidebar h1 {
  margin: 0.45rem 0 0.85rem;
  font-size: 2rem;
  line-height: 1.02;
}

.deck {
  color: var(--muted);
  line-height: 1.55;
}

.course-nav {
  list-style: none;
  margin: 1.5rem 0 0;
  padding: 0;
}

.course-nav li + li {
  margin-top: 0.45rem;
}

.course-nav a {
  display: block;
  padding: 0.55rem 0.7rem;
  border-radius: 0.65rem;
  color: var(--ink);
  text-decoration: none;
}

.course-nav a:hover {
  background: rgba(20, 91, 82, 0.07);
}

.sidebar-footer {
  margin-top: 1.4rem;
  padding-top: 1rem;
  border-top: 1px solid var(--line);
}

.main {
  padding: 2rem;
}

.hero {
  max-width: 920px;
  margin: 0 auto 1rem;
}

.hero h2 {
  margin: 0.35rem 0 0;
  font-size: 2.4rem;
  line-height: 1.05;
}

.page {
  max-width: 920px;
  margin: 0 auto;
  background: var(--paper);
  border: 1px solid rgba(215, 201, 182, 0.88);
  border-radius: 1.5rem;
  box-shadow: var(--shadow);
  padding: 2.4rem 3rem 3rem;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  line-height: 1.14;
}

h1 {
  font-size: 2.2rem;
}

h2 {
  font-size: 1.45rem;
  margin-top: 2.3rem;
  padding-top: 1.1rem;
  border-top: 1px solid var(--line);
}

h3 {
  margin-top: 1.5rem;
  font-size: 1.14rem;
}

p,
li {
  font-size: 1.03rem;
  line-height: 1.72;
}

ul,
ol {
  padding-left: 1.4rem;
}

blockquote {
  margin: 1.5rem 0;
  padding: 1rem 1.2rem;
  background: var(--accent-soft);
  border-left: 4px solid var(--accent);
}

@media (max-width: 900px) {
  .shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    border-right: 0;
    border-bottom: 1px solid rgba(215, 201, 182, 0.9);
  }

  .sidebar-inner {
    position: static;
  }

  .main {
    padding: 1rem;
  }

  .page {
    padding: 1.4rem;
  }

  .hero h2 {
    font-size: 1.9rem;
  }
}
"""
    (output_dir / "style.css").write_text(css.strip() + "\n", encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(description="Build a local HTML preview for handbook-style docs.")
    parser.add_argument("source_dir", type=Path, help="Docs section directory")
    parser.add_argument("output_dir", type=Path, help="Preview output directory")
    args = parser.parse_args()

    pages = load_pages(args.source_dir)
    args.output_dir.mkdir(parents=True, exist_ok=True)
    write_styles(args.output_dir)
    sidebar = nav_html(pages)

    for page in pages:
        rendered = render_page(page, markdown_to_html(page.body), sidebar)
        if not page.slug:
            destination = args.output_dir / "index.html"
        else:
            destination = args.output_dir / page.slug / "index.html"
            destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(rendered, encoding="utf-8")


if __name__ == "__main__":
    main()
