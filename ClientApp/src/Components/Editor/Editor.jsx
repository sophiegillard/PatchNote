import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Controller } from 'react-hook-form';
import ImageResize from 'quill-image-resize-module-react';
import Quill from "quill";

Quill.register('modules/imageResize', ImageResize);

export const Editor = ({ name, control, isRequired }) => {

    const editorStyle = {
        backgroundColor: 'white',
    };

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'size': [] }],
            [
                {list:"ordered"},
                {list:"bullet"},
                {indent:"-1"},
                {indent:"+1"},
            ],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['link', 'image', 'video'],
            ['clean']
        ],
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize']
        }
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'blockquote', 'list', 'bullet',
        'link', 'image', 'video',
        'align', 'color', 'background',
    ];


    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: isRequired }}
            render={({ field: { onChange, value } }) => (
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={onChange}
                    modules={modules}
                    formats={formats}
                    style={editorStyle}
                />
            )}
        />
    );
};
