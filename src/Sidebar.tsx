import React from "react";
import {T_Highlight} from "react-pdf-highlighter";
import {BdComment, BdThread} from "./model";
import Thread from "./Thread";

type T_ManuscriptHighlight = BdThread & T_Highlight;

interface Props {
    highlights: Array<T_ManuscriptHighlight>,
    resetHighlights: () => void
    addComment: (thread: BdThread) => (comment: BdComment) => void;
}

function Sidebar({highlights, resetHighlights, addComment}: Props) {
    return (
        <div className="sidebar" style={{width: "25vw"}}>
            <div className="description" style={{padding: "1rem"}}>
                <h2 style={{marginBottom: "1rem"}}>BrightDiscussion</h2>

                <p>
                    <small>
                        To create area highlight hold ⌥ Option key (Alt), then click and
                        drag.
                    </small>
                </p>
            </div>

            <ul className="sidebar__highlights">
                {highlights.map((highlight, index) => (
                    <Thread key={index} thread={highlight} addComment={addComment(highlight)}/>
                ))}
            </ul>
            {highlights.length > 0 ? (
                <div style={{padding: "1rem"}}>
                    <button onClick={resetHighlights}>Reset highlights</button>
                </div>
            ) : null}
        </div>
    );
}

export default Sidebar;