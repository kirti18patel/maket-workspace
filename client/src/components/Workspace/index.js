import React, {useCallback} from 'react'
import 'quill/dist/quill.snow.css'
import Quill from 'quill'

function Workspace() {
    const options = [
        [{header: [1, 2, 3, 4, 5, 6, false]}],
        [{font: []}],
        [{list: "ordered"}, {list: "bullet"}],
        ["bold", "italic", "underline"],
        [{color: ["red", "green", "blue", "yellow"]}, {background: ["red", "green", "blue", "yellow"]}],
        [{align: []}],
        ["image", "blockquote", "code-block"],
        ["clean"]
    ]

    const workspaceRef = useCallback(
        workspace => {
            if(workspace == null) return;

            workspace.innerHTML = "";
            const container = document.createElement("div");
            workspace.append(container)
            new Quill(container, { theme: "snow", modules: {
                toolbar: options
            } })
        },
        [])

    return (
        <div className="workspace" ref={workspaceRef}></div>
    )
}

export default Workspace
