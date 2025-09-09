// src/pages/og/[slug].png.js
import satori from 'satori';
import { html } from 'satori-html';

export async function get({ params }) {
  const svg = await satori(
    html`
      <div style="
        width: 1200px;
        height: 630px;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 80px;
      ">
        <h1 style="
          font-size: 48px;
          color: black;
          font-family: system-ui;
          text-align: center;
          line-height: 1.2;
        ">
          ${params.slug.replace(/-/g, ' ')}
        </h1>
      </div>
    `,
    {
      width: 1200,
      height: 630,
    }
  );

  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml' }
  });
}