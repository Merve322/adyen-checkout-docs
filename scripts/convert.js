const fs = require('fs');
const { marked } = require('marked');
const hljs = require('highlight.js');

marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  }
});

const nav = '<nav style="position:fixed;top:0;left:0;right:0;z-index:9999;background:#ffffff;border-bottom:1px solid #e5e7eb;padding:0 32px;height:56px;display:flex;align-items:center;justify-content:space-between;font-family:Inter,-apple-system,sans-serif;box-shadow:0 1px 3px rgba(0,0,0,0.08);"><a href="index.html" style="font-weight:700;font-size:15px;color:#0ABF53;text-decoration:none;letter-spacing:-0.3px;">Adyen Checkout API</a><div style="display:flex;gap:8px;align-items:center;"><a href="index.html" style="padding:6px 14px;border-radius:6px;font-size:13px;color:#374151;text-decoration:none;font-weight:500;">Overview</a><a href="authentication.html" style="padding:6px 14px;border-radius:6px;font-size:13px;color:#374151;text-decoration:none;font-weight:500;">Authentication</a><a href="getting-started.html" style="padding:6px 14px;border-radius:6px;font-size:13px;color:#374151;text-decoration:none;font-weight:500;">Getting Started</a><a href="api-reference.html" style="padding:6px 14px;border-radius:6px;font-size:13px;color:#374151;text-decoration:none;font-weight:500;">API Reference</a><a href="errors.html" style="padding:6px 14px;border-radius:6px;font-size:13px;color:#374151;text-decoration:none;font-weight:500;">Errors</a><a href="changelog.html" style="padding:6px 14px;border-radius:6px;font-size:13px;color:#374151;text-decoration:none;font-weight:500;">Changelog</a></div><a href="api-reference.html" style="background:#0ABF53;color:white;padding:8px 18px;border-radius:6px;font-size:13px;font-weight:600;text-decoration:none;">API Reference</a></nav>';

const pageStyle = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"><style>@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");*{box-sizing:border-box;margin:0;padding:0;}body{font-family:Inter,-apple-system,sans-serif;color:#1a1a1a;line-height:1.7;padding-top:56px;background:#ffffff;}.page-container{max-width:740px;margin:0 auto;padding:72px 32px 120px;}h1{font-size:36px;font-weight:700;color:#0f0f0f;margin-bottom:20px;margin-top:56px;letter-spacing:-0.8px;line-height:1.15;}h1:first-child{margin-top:0;}h2{font-size:22px;font-weight:600;color:#111111;margin-top:56px;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid #efefef;letter-spacing:-0.3px;}h3{font-size:16px;font-weight:600;color:#1a1a1a;margin-top:36px;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px;font-size:12px;color:#6b7280;}p{margin-bottom:18px;color:#374151;font-size:15px;line-height:1.75;}code{background:#f4f4f5;padding:2px 8px;border-radius:4px;font-size:12.5px;font-family:"SF Mono",Monaco,Consolas,monospace;color:#0ABF53;font-weight:500;}pre{background:#0d1117;color:#e5e7eb;padding:24px 28px;border-radius:10px;overflow-x:auto;margin:24px 0;font-size:13px;line-height:1.65;font-family:"SF Mono",Monaco,Consolas,monospace;border:1px solid #1e2028;}pre code{background:none;color:#e5e7eb;padding:0;font-size:13px;font-weight:400;}table{width:100%;border-collapse:collapse;margin:28px 0;font-size:14px;border:1px solid #f0f0f0;border-radius:8px;overflow:hidden;}th{background:#f9fafb;padding:12px 18px;text-align:left;font-weight:600;color:#374151;border-bottom:1px solid #e5e7eb;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;}td{padding:12px 18px;border-bottom:1px solid #f7f7f7;color:#374151;vertical-align:top;font-size:14px;}tr:last-child td{border-bottom:none;}tr:hover td{background:#fafafa;}ul,ol{padding-left:24px;margin-bottom:18px;color:#374151;font-size:15px;}li{margin-bottom:8px;line-height:1.65;}a{color:#0ABF53;text-decoration:none;font-weight:500;}a:hover{text-decoration:underline;}hr{border:none;border-top:1px solid #f0f0f0;margin:48px 0;}blockquote{border-left:3px solid #0ABF53;padding:14px 22px;margin:24px 0;background:#f0fdf4;border-radius:0 8px 8px 0;}blockquote p{color:#166534;margin:0;font-size:14px;}.page-hero{margin-bottom:48px;padding-bottom:48px;border-bottom:1px solid #f0f0f0;}.badge{display:inline-block;background:#f0fdf4;color:#0ABF53;padding:4px 10px;border-radius:20px;font-size:12px;font-weight:600;margin-bottom:16px;}</style>';

const pages = [
  { input: 'index.md', output: '_site/index.html' },
  { input: 'overview.md', output: '_site/overview.html' },
  { input: 'authentication.md', output: '_site/authentication.html' },
  { input: 'getting-started.md', output: '_site/getting-started.html' },
  { input: 'errors.md', output: '_site/errors.html' },
  { input: 'changelog.md', output: '_site/changelog.html' },
];

pages.forEach(function(page) {
  const md = fs.readFileSync(page.input, 'utf8');
  const html = marked.parse(md);
  const full = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Adyen Checkout API</title>' + pageStyle + '</head><body>' + nav + '<div class="page-container">' + html + '</div></body></html>';
  fs.writeFileSync(page.output, full);
  console.log('Built: ' + page.output);
});
