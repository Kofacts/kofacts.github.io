import { f as createAstro, c as createComponent, r as renderTemplate, a as renderComponent, e as addAttribute, b as renderHead, d as renderScript, u as unescapeHTML } from './astro/server_CnpdxtZo.mjs';
import 'kleur/colors';
import { $ as $$BaseHead } from './BaseHead_334latrR.mjs';
/* empty css                         */

const $$Astro = createAstro("https://kofacts.github.io/");
const $$BlogPost = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogPost;
  const { title, date, link, content, description } = Astro2.props;
  const formatDate = (dateStr) => {
    try {
      const date2 = new Date(dateStr);
      if (isNaN(date2.getTime())) {
        return "recently";
      }
      return date2.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long"
      }).toLowerCase();
    } catch (e) {
      return "recently";
    }
  };
  const getReadingTime = (content2) => {
    if (!content2) return "2 min read";
    const words = content2.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };
  return renderTemplate`<html lang="en"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": `${title} \xB7 obodugo rapheal`, "description": description || title })}<!-- Add OG image meta tag --><meta property="og:image"${addAttribute(`/og/${ogSlug}.png`, "content")}><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="twitter:card" content="summary_large_image"><meta property="twitter:image"${addAttribute(`/og/${ogSlug}.png`, "content")}>${renderHead()}</head> <body> <div class="progress-bar" id="progressBar"></div> <a href="/blog" class="back" onclick="goBack()">back</a> <header class="blog-header"> <h1 onclick="titleClick()">${title}</h1> <div class="meta"> <span class="date" onclick="cycleDate()">${formatDate(date)}</span> <span class="author" onclick="cycleAuthor()">obodugo rapheal</span> <span class="reading-time" onclick="toggleReadingTime()">${getReadingTime(content || "")}</span> </div> </header> <article class="blog-content"> ${content ? renderTemplate`<div>${unescapeHTML(content)}</div>` : renderTemplate`<p>This is a preview. The full post is available on Substack.</p>`} <a${addAttribute(link, "href")} target="_blank" rel="noopener noreferrer" class="substack-link">
Read full post on Substack →
</a> </article> <nav class="footer-nav"> <a href="/blog">← all posts</a> <a href="/">home</a> <a${addAttribute(link, "href")} target="_blank">substack →</a> </nav> <div class="easter-egg" id="easterEgg" onclick="activateEasterEgg()">
🥚
</div> ${renderScript($$result, "/Users/h/www/work/kofacts.github.io/src/layouts/BlogPost.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/h/www/work/kofacts.github.io/src/layouts/BlogPost.astro", undefined);

export { $$BlogPost as $ };
