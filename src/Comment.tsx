import React from "react"
import {BdComment} from "./model";

interface Props {
    comment: BdComment
}

const Comment: React.FC<Props> = ({comment}) => {
    return (
        <div className="thread__comment">
            <strong>{comment.author.name}</strong>
            <div>{comment.text}</div>
        </div>
    )
};

export default Comment