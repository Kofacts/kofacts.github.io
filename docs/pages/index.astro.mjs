import { c as createComponent, r as renderTemplate, a as renderComponent, b as renderHead, d as renderScript, e as addAttribute } from '../chunks/astro/server_CnpdxtZo.mjs';
import 'kleur/colors';
import { $ as $$BaseHead } from '../chunks/BaseHead_334latrR.mjs';
import { S as SITE_DESCRIPTION, a as SITE_TITLE } from '../chunks/consts_pI4VXbS4.mjs';
import { s as slugify } from '../chunks/slugify__yd_EnaX.mjs';
import { parseStringPromise } from 'xml2js';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const title = "Incompleteness: The Proof and Paradox of Kurt Gödel";
const author = "Rebecca Newberger Goldstein";
const note = "mind officially blown by incompleteness theorems";
const complete = "24%";
const reading = {
  title,
  author,
  note,
  complete,
};

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const rssUrl = "https://obodugo.substack.com/feed";
  const response = await fetch(rssUrl);
  const xml = await response.text();
  const json = await parseStringPromise(xml);
  const posts = json.rss.channel[0].item.slice(0, 5).map((item) => ({
    title: item.title[0],
    link: item.link[0],
    date: item.pubDate[0],
    slug: slugify(item.title[0]),
    description: item.description ? item.description[0] : ""
  }));
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long"
    }).toLowerCase();
  };
  return renderTemplate`<html lang="en" data-astro-cid-j7pv25f6> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": SITE_TITLE, "description": SITE_DESCRIPTION, "data-astro-cid-j7pv25f6": true })}${renderHead()}</head> <body data-astro-cid-j7pv25f6> <div class="header" data-astro-cid-j7pv25f6> <h1 onclick="nameClick()" data-astro-cid-j7pv25f6>obodugo</h1> <div class="subtitle" onclick="cycleTitle()" data-astro-cid-j7pv25f6>builder</div> <div class="bio" onclick="cycleBio()" data-astro-cid-j7pv25f6>
i turn questions into products. everything else is noise.
</div> </div> <nav class="nav" data-astro-cid-j7pv25f6> <a href="https://gistpool.com" data-astro-cid-j7pv25f6>gistpool</a> <a href="https://mysub.app" data-astro-cid-j7pv25f6>mysub</a> <a href="https://aristoman.com" data-astro-cid-j7pv25f6>aristoman</a> <a href="/blog" data-astro-cid-j7pv25f6>writing</a> <a href="mailto:alex@example.com" data-astro-cid-j7pv25f6>email</a> <a href="https://github.com/alexchen" data-astro-cid-j7pv25f6>github</a> </nav> <div class="reading-section" data-astro-cid-j7pv25f6> <div class="reading-header" data-astro-cid-j7pv25f6> <h3 class="reading-title" onclick="cycleReadingTitle()" data-astro-cid-j7pv25f6>currently reading</h3> <span class="reading-status" onclick="cycleStatus()" data-astro-cid-j7pv25f6>${reading.complete} complete</span> </div> <div class="book-container" onclick="bookClick()" data-astro-cid-j7pv25f6> <div class="bookmark" data-astro-cid-j7pv25f6></div> <div class="book-info" data-astro-cid-j7pv25f6> <div class="book-cover" onclick="flipCover(event)" data-astro-cid-j7pv25f6></div> <div class="book-details" data-astro-cid-j7pv25f6> <div class="book-title" onclick="cycleBookTitle(event)" data-astro-cid-j7pv25f6>${reading.title}</div> <div class="book-author" onclick="cycleAuthor(event)" data-astro-cid-j7pv25f6>${reading.author}</div> <div class="reading-note" onclick="cycleNote(event)" data-astro-cid-j7pv25f6>"${reading.note}"</div> </div> </div> <div class="last-read" onclick="cycleLastRead(event)" data-astro-cid-j7pv25f6>yesterday</div> </div> </div> <div class="section" data-astro-cid-j7pv25f6> <h2 class="section-title" onclick="cycleSectionTitle()" data-astro-cid-j7pv25f6>recent writing</h2> <ul class="blog-list" data-astro-cid-j7pv25f6> ${posts.map((post) => renderTemplate`<li class="blog-item" data-astro-cid-j7pv25f6> <a${addAttribute(`/blog/${post.slug}/`, "href")} class="blog-link" data-astro-cid-j7pv25f6> <div class="blog-title" data-astro-cid-j7pv25f6>${post.title}</div> <div class="blog-date" data-astro-cid-j7pv25f6>${formatDate(post.date)}</div> </a> </li>`)} </ul> </div> <div class="footer" onclick="revealSecret()" data-astro-cid-j7pv25f6>
built with html and css
</div> ${renderScript($$result, "/Users/h/www/work/kofacts.github.io/src/pages/index.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/h/www/work/kofacts.github.io/src/pages/index.astro", undefined);

const $$file = "/Users/h/www/work/kofacts.github.io/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
