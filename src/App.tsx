import React, {Component} from "react";

import URLSearchParams from "url-search-params";

import {
    PdfLoader,
    PdfHighlighter,
    Tip,
    Highlight,
    Popup,
    AreaHighlight, T_Highlight
} from "react-pdf-highlighter";

import testHighlights from "./test-highlights";

import Spinner from "./Spinner";
import Sidebar from "./Sidebar";

import "./style/App.css";
import {BdComment, BdThread} from "./model";

interface Props {
}

interface State {
    highlights: Array<BdThread>
}

const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () =>
    document.location.hash.slice("#highlight-".length);

const resetHash = () => {
    document.location.hash = "";
};

const HighlightPopup = ({comment}: T_Highlight) =>
    comment.text ? (
        <div className="Highlight__popup">
            {comment.emoji} {comment.text}
        </div>
    ) : null;

const DEFAULT_URL = "https://arxiv.org/pdf/1708.08021.pdf";

const searchParams = new URLSearchParams(document.location.search);
const url = searchParams.get("url") || DEFAULT_URL;

class App extends Component<Props, State> {
    state = {
        highlights: testHighlights[url] ? [...testHighlights[url]] : []
    };

    resetHighlights = () => {
        this.setState({
            highlights: []
        });
    };

    scrollViewerTo = (highlight: T_Highlight) => {
    };

    scrollToHighlightFromHash = () => {
        const highlight = this.getHighlightById(parseIdFromHash());

        if (highlight) {
            this.scrollViewerTo(highlight);
        }
    };

    componentDidMount() {
        window.addEventListener(
            "hashchange",
            this.scrollToHighlightFromHash,
            false
        );
    }

    getHighlightById(id: any) {
        const {highlights} = this.state;

        return highlights.find(highlight => highlight.id === id);
    }

    addHighlight(highlight: BdThread) {
        const {highlights} = this.state;

        console.log("Saving highlight", highlight);

        this.setState({
            highlights: [{...highlight, id: getNextId()}, ...highlights]
        });
    }

    addComment = (highLight: BdThread) => (comment: BdComment) => {
        console.log("Adding comment");

        this.setState({
            highlights: this.state.highlights.map(h => {
                return h.id === highLight.id
                    ? {
                        ...h,
                        comments: [...h.comments, comment]
                    }
                    : h
            })
        })
    };

    updateHighlight(highlightId: string, position: any, content: any) {
        console.log("Updating highlight", highlightId, position, content);

        this.setState({
            highlights: this.state.highlights.map(h => {
                return h.id === highlightId
                    ? {
                        ...h,
                        position: {...h.position, ...position},
                        content: {...h.content, ...content}
                    }
                    : h;
            })
        });
    }

    render() {
        const {highlights} = this.state;

        return (
            <div className="App" style={{display: "flex", height: "100vh"}}>
                <div
                    style={{
                        height: "100vh",
                        width: "75vw",
                        overflowY: "scroll",
                        position: "relative"
                    }}
                >
                    <PdfLoader url={url} beforeLoad={<Spinner/>}>
                        {(pdfDocument: any) => (
                            <PdfHighlighter
                                pdfDocument={pdfDocument}
                                enableAreaSelection={(event: any) => event.altKey}
                                onScrollChange={resetHash}
                                scrollRef={(scrollTo: any) => {
                                    this.scrollViewerTo = scrollTo;

                                    this.scrollToHighlightFromHash();
                                }}
                                onSelectionFinished={(
                                    position: any,
                                    content: any,
                                    hideTipAndSelection: any,
                                    transformSelection: any
                                ) => (
                                    <Tip
                                        onOpen={transformSelection}
                                        onConfirm={(comment: any) => {
                                            this.addHighlight({
                                                id: "",
                                                content,
                                                position,
                                                comment,
                                                comments: [],
                                                likes: 0
                                            });

                                            hideTipAndSelection();
                                        }}
                                    />
                                )}
                                highlightTransform={(
                                    highlight,
                                    index,
                                    setTip,
                                    hideTip,
                                    viewportToScaled,
                                    screenshot,
                                    isScrolledTo
                                ) => {
                                    const isTextHighlight = !Boolean(
                                        highlight.content && highlight.content.image
                                    );

                                    const component = isTextHighlight ? (
                                        <Highlight
                                            isScrolledTo={isScrolledTo}
                                            position={highlight.position}
                                            comment={highlight.comment}
                                        />
                                    ) : (
                                        <AreaHighlight
                                            highlight={highlight}
                                            onChange={boundingRect => {
                                                this.updateHighlight(
                                                    highlight.id,
                                                    {boundingRect: viewportToScaled(boundingRect)},
                                                    {image: screenshot(boundingRect)}
                                                );
                                            }}
                                        />
                                    );

                                    return (
                                        <Popup
                                            popupContent={<HighlightPopup {...highlight} />}
                                            onMouseOver={popupContent =>
                                                setTip(highlight, highlight => popupContent)
                                            }
                                            onMouseOut={hideTip}
                                            key={index}
                                            children={component}
                                        />
                                    );
                                }}
                                highlights={highlights}
                            />
                        )}
                    </PdfLoader>
                </div>
                <Sidebar
                    highlights={highlights}
                    resetHighlights={this.resetHighlights}
                    addComment={this.addComment}
                />
            </div>
        );
    }
}

export default App;