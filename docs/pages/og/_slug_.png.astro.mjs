import satori from 'satori';
export { renderers } from '../../renderers.mjs';

// src/pages/og/[slug].png.js

async function GET({ params }) {
  const title = params.slug.replace(/-/g, ' ');
  
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
        },
        children: [
          {
            type: 'h1',
            props: {
              style: {
                fontSize: '48px',
                color: 'black',
                fontFamily: 'system-ui',
                textAlign: 'center',
                lineHeight: '1.2',
                margin: 0,
              },
              children: title,
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
    }
  );

  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml' },
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
