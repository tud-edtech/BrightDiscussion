import {T_Highlight} from "react-pdf-highlighter";

export interface BdThread extends T_Highlight {
    comments: BdComment[]
    likes: number
}

export interface BdAuthor {
    name: string
}

export interface BdComment {
    author: BdAuthor
    text: string
}