import React, {Component, ReactElement} from "react";

// import type { T_PDFJS, T_PDFJS_Document } from "../types";

import pdfjs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import {T_PDFJS_Document} from "react-pdf-highlighter";

interface Props {
    url: string
    useBuffer: boolean
    buffer: ArrayBuffer | null,
    beforeLoad: ReactElement<any>,
    children: (pdfDocument: T_PDFJS_Document) => ReactElement<any>
}

interface State {
    pdfDocument: T_PDFJS_Document | null
}

class MyPdfLoader extends Component<Props, State> {
    state: State = {
        pdfDocument: null
    };

    componentDidMount() {
        this.loadPdf();
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        if (prevProps.url !== this.props.url || prevProps.buffer !== this.props.buffer) this.loadPdf()
    }

    loadPdf() {
        const {useBuffer, url, buffer} = this.props;

        if (useBuffer) {
            if (buffer) {
                console.log("Got buffer man");
                pdfjs.getDocument({data: buffer, isEvalSupported: false}).promise.then((pdf: T_PDFJS_Document) => {
                    this.setState({
                        pdfDocument: pdf
                    });
                });
            }
        } else {
            fetch(url)
                .then(response => response.blob())
                .then(blob => blob.arrayBuffer())
                .then(buffer => {
                    pdfjs.getDocument({data: buffer, isEvalSupported: false}).promise.then((pdf: T_PDFJS_Document) => {
                        this.setState({
                            pdfDocument: pdf
                        });
                    })
                });
        }
    }

    render() {
        const {children, beforeLoad} = this.props;
        const {pdfDocument} = this.state;

        if (pdfDocument) {
            return children(pdfDocument);
        }

        return beforeLoad;
    }
}

export default MyPdfLoader;