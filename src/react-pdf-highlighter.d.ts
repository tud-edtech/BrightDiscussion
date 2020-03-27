declare module 'react-pdf-highlighter' {
    interface PdfLoaderProps {
        url: string,
        beforeLoad: React.Element<any>,
        children: (pdfDocument: T_PDFJS_Document) => React.Element<any>
    }

    interface PdfLoaderState {
        pdfDocument?: T_PDFJS_Document
    }

    export class PdfLoader extends React.Component<PdfLoaderProps, PdfLoaderState> {
    }

    type T_ViewportHighlight<T_HT> = { position: T_Position } & T_HT;

    interface PdfHighlighterState<T_HT> {
        ghostHighlight?: {
            position: T_ScaledPosition
        },
        isCollapsed: boolean,
        range?: Range,
        tip?: {
            highlight: T_ViewportHighlight<T_HT>,
            callback: (highlight: T_ViewportHighlight<T_HT>) => React.Element<any>
        },
        isAreaSelectionInProgress: boolean,
        scrolledToHighlightId: string
    }

    interface PdfHighlighterProps<T_HT> {
        highlightTransform: (
            highlight: T_ViewportHighlight<T_HT>,
            index: number,
            setTip: (
                highlight: T_ViewportHighlight<T_HT>,
                callback: (highlight: T_ViewportHighlight<T_HT>) => React.Element<any>
            ) => void,
            hideTip: () => void,
            viewportToScaled: (rect: T_LTWH) => T_Scaled,
            screenshot: (position: T_LTWH) => string,
            isScrolledTo: boolean
        ) => React$Element<any>,
        highlights: Array<T_HT>,
        onScrollChange: () => void,
        scrollRef: (scrollTo: (highlight: T_Highlight) => void) => void,
        pdfDocument: T_PDFJS_Document,
        onSelectionFinished: (
            position: T_ScaledPosition,
            content: { text?: string, image?: string },
            hideTipAndSelection: () => void,
            transformSelection: () => void
        ) => React$Element<any> | null,
        enableAreaSelection: (event: MouseEvent) => boolean
    }

    export class PdfHighlighter<T_HT> extends React.PureComponent<PdfHighlighterProps<T_HT>, PdfHighlighterState<T_HT>> {
    }

    interface TipState {
        compact: boolean,
        text: string,
        emoji: string
    }

    interface TipProps {
        onConfirm: (comment: { text: string, emoji: string }) => void,
        onOpen: () => void,
        onUpdate?: () => void
    }

    export class Tip extends React.Component<TipProps, TipState> {
    }

    type HighlightProps = {
        position: {
            boundingRect: T_LTWH,
            rects: Array<T_LTWH>
        },
        onClick?: () => void,
        onMouseOver?: () => void,
        onMouseOut?: () => void,
        comment: {
            emoji: string,
            text: string
        },
        isScrolledTo: boolean
    }

    export class Highlight extends React.Component<HighlightProps> {
    }

    interface PopupProps {
        onMouseOver: (content: React.Element<any>) => void,
        popupContent: React.Element<any>,
        onMouseOut: () => void,
        children: React.Element<any>
    }

    interface PopupState {
        mouseIn: boolean
    }

    export class Popup extends React.Component<PopupProps, PopupState> {
    }


    interface AreaHightlightProps {
        highlight: T_ViewportHighlight,
        onChange: (rect: T_LTWH) => void
    }

    export class AreaHighlight extends React.Component<AreaHightlightProps> {
    }

    export type T_LTWH = {
        left: number,
        top: number,
        width: number,
        height: number
    };

    export type T_Scaled = {
        x1: number,
        y1: number,

        x2: number,
        y2: number,

        width: number,
        height: number
    };

    export type T_Position = {
        boundingRect: T_LTWH,
        rects: Array<T_LTWH>,
        pageNumber: number
    };

    export type T_ScaledPosition = {
        boundingRect: T_Scaled,
        rects: Array<T_Scaled>,
        pageNumber: number,
        usePdfCoordinates?: boolean
    };

    export type T_NewHighlight = {
        position: T_ScaledPosition,
        content: {
            text?: string,
            image?: string
        },
        comment: {
            text: string,
            emoji: string
        }
    };

    export type T_Highlight = { id: string } & T_NewHighlight;

    export type T_ViewportHighlight = { position: T_Position } & T_Highlight;

    export type T_VIEWPORT = {
        convertToPdfPoint: (x: number, y: number) => Array<number>,
        convertToViewportRectangle: (pdfRectangle: Array<number>) => Array<number>,
        width: number,
        height: number
    };

    export type T_PDFJS_Viewer = {
        container: HTMLDivElement,
        viewer: HTMLDivElement,
        getPageView: (
            page: number
        ) => {
            textLayer: { textLayerDiv: HTMLDivElement },
            viewport: T_VIEWPORT,
            div: HTMLDivElement,
            canvas: HTMLCanvasElement
        },
        setDocument: (document: T_PDFJS_Document) => Promise<void>,
        scrollPageIntoView: (options: {
            pageNumber: number,
            destArray: Array<mixed>
        }) => void,
        currentScaleValue: string
    };

    export type T_PDFJS_Document = {
        numPages: number
    };

    export type T_PDFJS_LinkService = {
        setDocument: (document: Object) => void,
        setViewer: (viewer: T_PDFJS_Viewer) => void
    };

    export type T_PDFJS = {
        TextLayerBuilder: {
            prototype: {
                _bindMouse: () => void
            }
        },
        PDFViewer: (options: Object) => T_PDFJS_Viewer,
        PDFLinkService: () => T_PDFJS_LinkService,
        getDocument: (url: string) => Promise<T_PDFJS_Document>,
        disableWorker: boolean
    };
}