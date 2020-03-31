(() => {
    const pdfFrame = document.querySelector('.d2l-fileviewer-pdf-pdfjs');
    const pdfLocation = pdfFrame.dataset.location;
    const iframe = document.createElement('iframe');

    const responseFuture =
        fetch(window.location.origin + pdfLocation)
            .then(response => response.blob())
            .then(blob => blob.arrayBuffer())

    iframe.src = chrome.runtime.getURL("index.html?buffer=true");
    iframe.style.width = "100%";
    iframe.style.height = "960px";
    iframe.addEventListener('load', async () => {
        const buffer = await responseFuture;
        iframe.contentWindow.postMessage(buffer, '*');
    });

    pdfFrame.replaceWith(iframe);
})();
