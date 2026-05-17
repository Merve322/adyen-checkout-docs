const fs = require('fs');
const { marked } = require('marked');

const nav = '<nav style="position:fixed;top:0;left:0;right:0;z-index:9999;background:#ffffff;border-bottom:1px solid #e5e7eb;padding:0 32px;height:56px;display:flex;align-items:center;justify-content:space-between;font-family:Inter,-apple-system,sans-serif;box-shadow:0 1px 3px rgba(0,0,0,0.08);"><a href="index.html" style="font-weight:700;font-size:15px;color:#0ABF53;text-decoration:none;letter-spacing:-0.3px;">Adyen Checkout API</a><div style="display:flex;gap:8px;align-items:center;"><a href="index.html" style="padding:6px 14px;border-radius:6px;font-size:13px;color:#374151;text-decoration:none;font-weight:500;">Overview</a><a href="authentication.html" style="padding:6px 14px;border-radius:6px;font-size:13px;color:#374151;text-decoration:none;font-weight:500;">Authentication</a><a href="getting-started.html" style="padding:6px 14px;border-radius:6px;font-size:13px;color:#374151;text-decoration:none;font-weight:500;">Getting Started</a><a href="api-reference.html" style="padding:6px 14px;border-radius:6px;font-size:13px;color:#374151;text-decoration:none;font-weight:500;">API Reference</a><a href="errors.html" style="padding:6px 14px;border-radius:6px;font-size:13px;color:#374151;text-decoration:none;font-weight:500;">Errors</a><a href="changelog.html" style="padding:6px 14px;border-radius:6px;font-size:13px;color:#374151;text-decoration:none;font-weight:500;">Changelog</a></div><a href="api-reference.html" style="background:#0ABF53;color:white;padding:8px 18px;border-radius:6px;font-size:13px;font-weight:600;text-decoration:none;">API Reference</a></nav>';

const pageStyle = '<style>@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");*{box-sizing:border-box;margin:0;padding:0;}body{font-family:Inter,-apple-system,sans-serif;color:#1a1a1a;line-height:1.7;padding-top:56px;background:#ffffff;}.page-container{max-width:780px;margin:0 auto;padding:60px 32px 120px;}h1{font-size:32px;font-weight:700;color:#0f0f0f;margin-bottom:16px;margin-top:48px;letter-spacing:-0.5px;line-height:1.2;}h1:first-child{margin-top:0;}h2{font-size:22px;font-weight:600;color:#1a1a1a;margin-top:48px;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #f0f0f0;}h3{font-size:17px;font-weight:600;color:#1a1a1a;margin-top:32px;margin-bottom:8px;}p{margin-bottom:16px;color:#374151;font-size:15px;}code{background:#f4f4f5;padding:2px 7px;border-radius:4px;font-size:13px;font-family:"SF Mono",Monaco,monospace;color:#0ABF53;}pre{background:#1a1d23;color:#e5e7eb;padding:20px 24px;border-radius:8px;overflow-x:auto;margin:20px 0;font-size:13px;line-height:1.6;font-family:"SF Mono",Monaco,monospace;}pre code{background:none;color:#e5e7eb;padding:0;font-size:13px;}table{width:100%;border-collapse:collapse;margin:24px 0;font-size:14px;}th{background:#f9fafb;padding:10px 16px;text-align:left;font-weight:600;color:#374151;border-bottom:2px solid #e5e7eb;font-size:13px;}td{padding:10px 16px;border-bottom:1px solid #f0f0f0;color:#374151;vertical-align:top;}tr:last-child td{border-bottom:none;}ul,ol{padding-left:24px;margin-bottom:16px;color:#374151;font-size:15px;}li{margin-bottom:6px;}a{color:#0ABF53;text-decoration:none;}a:hover{text-decoration:underline;}hr{border:none;border-top:1px solid #f0f0f0;margin:40px 0;}blockquote{border-left:3px solid #0ABF53;padding:12px 20px;margin:20px 0;background:#f0fdf4;border-radius:0 6px 6px 0;}blockquote p{color:#166534;margin:0;}</style>';

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
