(() => {
    const pdfFrame = document.querySelector('.d2l-fileviewer-pdf-pdfjs');
    console.log(pdfFrame.dataset);
    const pdfLocation = pdfFrame.dataset.location;
    const base = chrome.runtime.getURL("index.html?buffer=true");
    const iframeUrl = base + "?url=" + encodeURI(window.location.origin + pdfLocation);

    console.log(iframeUrl);

    const iframe = document.createElement('iframe');
    iframe.src = base;
    iframe.style.width = "100%";
    iframe.style.height = "960px";
    iframe.addEventListener('load', () => {

        fetch(window.location.origin + pdfLocation)
            .then(response => response.blob())
            .then(blob => blob.arrayBuffer())
            .then((buffer) => {
                console.log('posting message');

                iframe.contentWindow.postMessage(buffer, '*')
            });
    });

    pdfFrame.replaceWith(iframe);

})();
