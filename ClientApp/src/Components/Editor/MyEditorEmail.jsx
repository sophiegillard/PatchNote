import React, { useRef } from 'react';
import EmailEditor from 'react-email-editor';
import {Controller} from "react-hook-form";
import {Flex} from "@chakra-ui/react";
import emailEditorInitialContent from "../../assets/json/emailEditorInitialContent.json";


export const MyEditorEmail = ({ name, control }) => {
    const emailEditorRef = useRef(null);

    const exportHtml = () => {
        emailEditorRef.current.editor.exportHtml((data) => {
            const { design, html } = data;
            console.log('exportHtml', html);
        });
    };

    const onReady = () => {
        emailEditorRef.current.editor.loadDesign(emailEditorInitialContent);
    };

    return (
            <Flex flexDirection="column">
                <div>
                    <button onClick={exportHtml}>Export HTML</button>
                </div>

                <div style={{height: "800px" }}>
                   {/* <Controller
                        name={name}
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                            <EmailEditor
                                ref={emailEditorRef}
                                onReady={onReady}
                            />
                        )}
                    />*/}

                    <EmailEditor
                        ref={emailEditorRef}
                        onReady={onReady}
                    />
                </div>


            </Flex>
    )}

