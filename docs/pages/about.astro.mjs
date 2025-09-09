import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_CnpdxtZo.mjs';
import 'kleur/colors';
import { $ as $$BlogPost } from '../chunks/BlogPost_afjXvj5U.mjs';
export { renderers } from '../renderers.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$BlogPost, { "title": "About Me", "description": "Lorem ipsum dolor sit amet", "pubDate": /* @__PURE__ */ new Date("August 08 2024") }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>
soon.
</p> ` })}`;
}, "/Users/h/www/work/kofacts.github.io/src/pages/about.astro", undefined);

const $$file = "/Users/h/www/work/kofacts.github.io/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$About,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
