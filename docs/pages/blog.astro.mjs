import { c as createComponent, r as renderTemplate, a as renderComponent, b as renderHead, d as renderScript, e as addAttribute } from '../chunks/astro/server_CnpdxtZo.mjs';
import 'kleur/colors';
import { $ as $$BaseHead } from '../chunks/BaseHead_334latrR.mjs';
import { S as SITE_DESCRIPTION, a as SITE_TITLE } from '../chunks/consts_pI4VXbS4.mjs';
import { s as slugify } from '../chunks/slugify__yd_EnaX.mjs';
import { parseStringPromise } from 'xml2js';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const rssUrl = "https://obodugo.substack.com/feed";
  const response = await fetch(rssUrl);
  const xml = await response.text();
  const json = await parseStringPromise(xml);
  const posts = json.rss.channel[0].item.map((item) => ({
    title: item.title[0],
    link: item.link[0],
    date: item.pubDate[0],
    slug: slugify(item.title[0]),
    description: item.description ? item.description[0] : ""
  }));
  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        return "recently";
      }
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long"
      }).toLowerCase();
    } catch (e) {
      return "recently";
    }
  };
  return renderTemplate`<html lang="en" data-astro-cid-5tznm7mj> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": `writing \xB7 ${SITE_TITLE}`, "description": SITE_DESCRIPTION, "data-astro-cid-5tznm7mj": true })}${renderHead()}</head> <body data-astro-cid-5tznm7mj> <a href="/" class="back" data-astro-cid-5tznm7mj>home</a> <div class="header" data-astro-cid-5tznm7mj> <h1 onclick="titleClick()" data-astro-cid-5tznm7mj>writing</h1> <div class="subtitle" onclick="cycleSubtitle()" data-astro-cid-5tznm7mj>collected thoughts</div> <div class="post-count" onclick="cycleCount()" data-astro-cid-5tznm7mj>${posts.length} posts</div> </div> <ul class="blog-list" data-astro-cid-5tznm7mj> ${posts.map((post) => renderTemplate`<li class="blog-item" data-astro-cid-5tznm7mj> <a${addAttribute(`/blog/${post.slug}/`, "href")} class="blog-link" data-astro-cid-5tznm7mj> <div class="blog-title" data-astro-cid-5tznm7mj>${post.title}</div> <div class="blog-date" data-astro-cid-5tznm7mj>${formatDate(post.date)}</div> </a> </li>`)} </ul> <div class="footer" data-astro-cid-5tznm7mj>
all thoughts are my own (unfortunately)
</div> ${renderScript($$result, "/Users/h/www/work/kofacts.github.io/src/pages/blog/index.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/h/www/work/kofacts.github.io/src/pages/blog/index.astro", undefined);

const $$file = "/Users/h/www/work/kofacts.github.io/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
