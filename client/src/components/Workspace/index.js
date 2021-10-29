import React, {useCallback} from 'react'
import 'quill/dist/quill.snow.css'
import Quill from 'quill'

function Workspace() {
    const workspaceRef = useCallback(
        workspace => {
            if(workspace == null) return;

            workspace.innerHTML = "";
            const container = document.createElement("div");
            workspace.append(container)
            new Quill(container, { theme: "snow" })
        },
        [])

    return (
        <div id="workspace" ref={workspaceRef}></div>
    )
}

export default Workspace
