// import MDEditor, { commands } from "@uiw/react-md-editor"

import React, { useEffect, useState } from "react"
import MDEditor, { codeEdit, codeLive, codePreview, commands } from "../models/uiw_mdEditor/react-md-editor/src"



export default function MD_EditBox_Custom() {
    const [value, setValue] = React.useState<string>("Hello, World!")
    const [isNineSolsFont, setIsNineSolsFont] = useState<boolean>(false)
    const [isDecodeCangjie, setisDecodeCangjie] = useState<boolean>(true) 

    const handleEditorChange = (newValue: string = "") => {
        setValue(newValue) 
    }


    return (
        <div className="container">
            <MDEditor
                decodeCangjie={isDecodeCangjie}
                value={value}
                onChange={handleEditorChange}
                fullscreen={true}
                extraCommands={[ 
                    codeEdit, codeLive, codePreview,
                    commands.group([], {
                        name: "update-font-family",
                        groupName: "update-font-family",
                        icon: <img src={process.env.PUBLIC_URL + "translate.svg"} alt="translate" />,
                        execute: (state, api) => {
                            setIsNineSolsFont(!isNineSolsFont)
                            document.documentElement.style.setProperty("--markdown-font", isNineSolsFont ? "NineSols" : "NotoSansTC")
                        },
                        buttonProps: { "aria-label": "update-font-family" }
                    }),
                    commands.divider,
                    commands.group([], {
                        name: "uncode-cangjie",
                        groupName: "uncode-cangjie",
                        icon: <img src={process.env.PUBLIC_URL + "edit_square.svg"} alt="uncode-cangjie" />,
                        execute: (state, api) => {
                            setisDecodeCangjie(!isDecodeCangjie)
                        },
                        buttonProps: { "aria-label": "uncode-cangjie" }
                    })
                ]}
            />
        </div>
    )
}