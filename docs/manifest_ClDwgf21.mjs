import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_HEADER, o as decodeKey } from './chunks/astro/server_CnpdxtZo.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || undefined,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : undefined,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/h/www/work/kofacts.github.io/","cacheDir":"file:///Users/h/www/work/kofacts.github.io/node_modules/.astro/","outDir":"file:///Users/h/www/work/kofacts.github.io/docs/","srcDir":"file:///Users/h/www/work/kofacts.github.io/src/","publicDir":"file:///Users/h/www/work/kofacts.github.io/public/","buildClientDir":"file:///Users/h/www/work/kofacts.github.io/docs/client/","buildServerDir":"file:///Users/h/www/work/kofacts.github.io/docs/server/","adapterName":"","routes":[{"file":"file:///Users/h/www/work/kofacts.github.io/docs/about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/h/www/work/kofacts.github.io/docs/api/rss.json","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/rss.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/rss\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"rss.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/rss.json.js","pathname":"/api/rss.json","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/h/www/work/kofacts.github.io/docs/blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/h/www/work/kofacts.github.io/docs/rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.js","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///Users/h/www/work/kofacts.github.io/docs/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://kofacts.github.io/","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/h/www/work/kofacts.github.io/src/pages/blog/index.astro",{"propagation":"none","containsHead":true}],["/Users/h/www/work/kofacts.github.io/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/h/www/work/kofacts.github.io/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/h/www/work/kofacts.github.io/src/pages/blog/[...slug].astro",{"propagation":"none","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/h/www/work/kofacts.github.io/src/pages/rss.xml.js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@js",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/rss.json@_@js":"pages/api/rss.json.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/blog/[...slug]@_@astro":"pages/blog/_---slug_.astro.mjs","\u0000@astro-page:src/pages/og/[slug].png@_@js":"pages/og/_slug_.png.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/rss.xml@_@js":"pages/rss.xml.astro.mjs","\u0000@astrojs-manifest":"manifest_ClDwgf21.mjs","/Users/h/www/work/kofacts.github.io/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/Users/h/www/work/kofacts.github.io/.astro/content-modules.mjs":"chunks/content-modules_CSIAn2Du.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_B5kHK9v_.mjs","/Users/h/www/work/kofacts.github.io/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_Enb9Omwv.mjs","/Users/h/www/work/kofacts.github.io/src/content/blog/using-mdx.mdx?astroPropagatedAssets":"chunks/using-mdx_DdEM0Oyt.mjs","/Users/h/www/work/kofacts.github.io/src/content/blog/using-mdx.mdx":"chunks/using-mdx_BgmZz8kp.mjs","/Users/h/www/work/kofacts.github.io/src/pages/blog/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.Cpuq40Js.js","/Users/h/www/work/kofacts.github.io/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.Dwj9mSrD.js","/Users/h/www/work/kofacts.github.io/src/layouts/BlogPost.astro?astro&type=script&index=0&lang.ts":"_astro/BlogPost.astro_astro_type_script_index_0_lang.nqqA64Yg.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/h/www/work/kofacts.github.io/src/pages/blog/index.astro?astro&type=script&index=0&lang.ts","document.querySelector(\".post-count\").textContent;"],["/Users/h/www/work/kofacts.github.io/src/pages/index.astro?astro&type=script&index=0&lang.ts","const n=[\"ArrowUp\",\"ArrowUp\",\"ArrowDown\",\"ArrowDown\",\"ArrowLeft\",\"ArrowRight\",\"ArrowLeft\",\"ArrowRight\",\"KeyB\",\"KeyA\"];let o=0;document.addEventListener(\"keydown\",function(t){t.code===n[o]?(o++,o===n.length&&(document.body.classList.add(\"konami-mode\"),document.querySelector(\"h1\").textContent=\"🕹️ achievement unlocked: konami master\",setTimeout(()=>{document.querySelector(\"h1\").textContent=\"obodugo\",document.body.classList.remove(\"konami-mode\")},2e3),o=0)):o=0});let e=\"\";document.addEventListener(\"keypress\",function(t){e+=t.key,e.length>10&&(e=e.slice(-10)),e.includes(\"hello\")&&(document.querySelector(\".bio\").innerHTML=\"👋 oh hey there! you found the secret. i see you.\",e=\"\"),e.includes(\"coffee\")&&(document.querySelector(\"h1\").textContent='☕ obodugo \"caffeinated\" rapheal',setTimeout(()=>document.querySelector(\"h1\").textContent=\"obodugo\",3e3),e=\"\")});const r=new Date().getHours();(r<6||r>22)&&(document.querySelector(\".subtitle\").textContent=\"insomniac\");const d=[\"linear-gradient(135deg, #667eea 0%, #764ba2 100%)\",\"linear-gradient(135deg, #f093fb 0%, #f5576c 100%)\",\"linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)\",\"linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)\",\"linear-gradient(135deg, #fa709a 0%, #fee140 100%)\"];setInterval(()=>{const t=document.querySelector(\".book-cover\");if(t){const i=d[Math.floor(Math.random()*d.length)];t.style.background=i}},8e3);"],["/Users/h/www/work/kofacts.github.io/src/layouts/BlogPost.astro?astro&type=script&index=0&lang.ts","window.addEventListener(\"scroll\",function(){const t=document.body.scrollTop||document.documentElement.scrollTop,d=document.documentElement.scrollHeight-document.documentElement.clientHeight,r=t/d*100;document.getElementById(\"progressBar\").style.width=r+\"%\";const l=document.getElementById(\"easterEgg\");r>50&&l.classList.add(\"visible\")});const o=document.querySelector(\"h1\").textContent,i=[o,o+\" (probably)\",o+\" (trust me)\",\"thoughts on \"+o.toLowerCase(),o+\" (hot take)\"];let u=0;document.querySelector(\".date\").textContent;document.querySelector(\".reading-time\").textContent;const c=[\"ArrowUp\",\"ArrowUp\",\"ArrowDown\",\"ArrowDown\",\"ArrowLeft\",\"ArrowRight\",\"ArrowLeft\",\"ArrowRight\",\"KeyB\",\"KeyA\"];let n=0;document.addEventListener(\"keydown\",function(t){t.code===c[n]?(n++,n===c.length&&(document.querySelector(\"h1\").textContent=\"🕹️ you found the secret level!\",document.body.style.background=\"linear-gradient(45deg, #ff6b6b, #4ecdc4)\",setTimeout(()=>{document.querySelector(\"h1\").textContent=i[u],document.body.style.background=\"#fff\"},3e3),n=0)):n=0});let e=\"\";document.addEventListener(\"keypress\",function(t){e+=t.key,e.length>10&&(e=e.slice(-10)),e.includes(\"substack\")&&(document.querySelector(\".author\").textContent=\"substack obodugo\",e=\"\"),e.includes(\"builder\")&&(document.querySelector(\".reading-time\").textContent=\"built while reading\",e=\"\")});"]],"assets":["/file:///Users/h/www/work/kofacts.github.io/docs/about/index.html","/file:///Users/h/www/work/kofacts.github.io/docs/api/rss.json","/file:///Users/h/www/work/kofacts.github.io/docs/blog/index.html","/file:///Users/h/www/work/kofacts.github.io/docs/rss.xml","/file:///Users/h/www/work/kofacts.github.io/docs/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"kEFj2FvVK+0g34GnuatQNwew/zvpfgxq1QemEZlG0NM="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
