import React from "react";
import {BdComment, BdThread} from "./model";
import Comment from "./Comment"
import useForm from "./effect";

interface Props {
    thread: BdThread
    addComment: (comment: BdComment) => void
}

const updateHash = (highlight: BdThread) => {
    document.location.hash = `highlight-${highlight.id}`;
};

const Thread: React.FC<Props> = ({thread, addComment}) => {

    const formSubmit = (value: {text?: string}) => {
        console.log(values);
        addComment({
            text: value.text ?? "",
            author: {
                name: "testauthor",
            }
        })
    };

    const {values, handleChange, handleSubmit} = useForm(formSubmit);

    return (
        <li
            className="sidebar__thread"
            onClick={() => {
                updateHash(thread);
            }}
        >
            <div>
                <strong>{thread.comment.text}</strong>
                {thread.content.text ? (
                    <blockquote style={{marginTop: "0.5rem"}}>
                        {`${thread.content.text.slice(0, 90).trim()}…`}
                    </blockquote>
                ) : null}
                {thread.content.image ? (
                    <div
                        className="thread__image"
                        style={{marginTop: "0.5rem"}}
                    >
                        <img src={thread.content.image} alt={"Screenshot"}/>
                    </div>
                ) : null}
            </div>
            <div className="thread__location">
                Page {thread.position.pageNumber}
            </div>
            <div className="thread__comments">
                {thread.comments.map((comment, index) => <Comment key={index} comment={comment}/>)}
            </div>
            <div className="thread__form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <textarea name="text" onChange={handleChange} value={values.text}/>
                    </div>
                    <div>
                        <button type="submit">Add comment</button>
                    </div>
                </form>
            </div>
        </li>
    )
};

export default Thread