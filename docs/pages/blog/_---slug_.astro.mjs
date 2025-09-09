import { f as createAstro, c as createComponent, r as renderTemplate, a as renderComponent } from '../../chunks/astro/server_CnpdxtZo.mjs';
import 'kleur/colors';
import { $ as $$BlogPost } from '../../chunks/BlogPost_afjXvj5U.mjs';
import { s as slugify } from '../../chunks/slugify__yd_EnaX.mjs';
import { parseStringPromise } from 'xml2js';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://kofacts.github.io/");
async function getStaticPaths() {
  const rssUrl = "https://obodugo.substack.com/feed";
  const response = await fetch(rssUrl);
  const xml = await response.text();
  const json = await parseStringPromise(xml);
  const posts = json.rss.channel[0].item.map((item) => ({
    title: item.title[0],
    link: item.link[0],
    date: item.pubDate[0],
    pubDate: item.pubDate[0],
    content: item["content:encoded"] ? item["content:encoded"][0] : "",
    description: item.description ? item.description[0] : "",
    slug: slugify(item.title[0])
  }));
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const post = Astro2.props;
  return renderTemplate`${renderComponent($$result, "BlogPost", $$BlogPost, { "title": post.title, "date": post.date, "link": post.link, "content": post.content, "description": post.description })}`;
}, "/Users/h/www/work/kofacts.github.io/src/pages/blog/[...slug].astro", undefined);

const $$file = "/Users/h/www/work/kofacts.github.io/src/pages/blog/[...slug].astro";
const $$url = "/blog/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$,
    file: $$file,
    getStaticPaths,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
