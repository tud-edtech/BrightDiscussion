import React, {ReactElement, useEffect, useState} from "react";

import pdfjs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import {T_PDFJS_Document} from "react-pdf-highlighter";

interface Props {
    url: string
    useBuffer: boolean
    buffer: ArrayBuffer | null
    beforeLoad: ReactElement
    children: (pdfDocument: T_PDFJS_Document) => ReactElement
}

const MyPdfLoader: React.FC<Props> = ({children, beforeLoad, useBuffer, buffer, url}) => {
    const [pdfDocument, setPdfDocument] = useState<T_PDFJS_Document>();

    useEffect(() => {
        if (useBuffer) {
            if (buffer) {
                pdfjs.getDocument({data: buffer, isEvalSupported: false}).promise
                    .then((pdf: T_PDFJS_Document) => {
                        setPdfDocument(pdf);
                    });
            }
        } else {
            fetch(url)
                .then(response => response.blob())
                .then(blob => blob.arrayBuffer())
                .then(buffer => {
                    pdfjs.getDocument({data: buffer, isEvalSupported: false}).promise
                        .then((pdf: T_PDFJS_Document) => {
                            setPdfDocument(pdf);
                        })
                });
        }
    }, [useBuffer, buffer, url]);

    if (pdfDocument) {
        return children(pdfDocument);
    }

    return beforeLoad;
};

export default MyPdfLoader;