console.log('loading stuff');
// document.addEventListener('pagerendered ', () => {
const pdfFrame = document.querySelector('.d2l-fileviewer-pdf-pdfjs');

console.log(pdfFrame);


const pdfLocation = pdfFrame.dataset.location


console.log(window.location.origin + pdfLocation);

const base = chrome.runtime.getURL("build/index.html")

const iframeUrl = base + "?url=" + encodeURI(window.location.origin + pdfLocation);

console.log(iframeUrl);
// })

// /d2l/common/assets/pdfjs/1.0.0.30/web/viewer.html?file=%2Fcontent%2Fenforced%2F210737-IN4391%2B2019%2B3%2FIN4391_assignments_200226.pdf%3Fd2lSessionVal%3DOhzIbmbdOZUX9IPEFmVOKvLv8%26ou%3D210737&lang=en-us&container=d2l-fileviewer-rendered-pdf&fullscreen=d2l-fileviewer-rendered-pdf-dialog&height=978#0