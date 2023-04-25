import React, { Component } from 'react';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from "@looop/quill-image-resize-module-react";
Quill.register('modules/ImageResize', ImageResize);
class EditorComponent extends Component{

    constructor(props){
        super(props);
    }
    modules = {
        toolbar: [
            //[{ 'font': [] }],
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            [{ 'align': [] }, { 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            ['clean']
        ],
        ImageResize: {
            parchment: Quill.import('parchment')
        }
    }

    formats = [
        //'font',
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
        'align', 'color', 'background',
    ]

    render(){
        const { value, onChange } = this.props;

        //  이미지 클릭 후, 삭제 버튼 클릭시 에러 방지
        window.Quill = Quill
        return(
            <div className={"text-editor"} style={{height: "500px", width : "100%"}}>
                <ReactQuill
                    style={{height: "450px"}}
                    theme="snow"
                    modules={this.modules}
                    formats={this.formats}
                    value={value || ''}
                    onChange={(content, delta, source, editor) => onChange(editor.getHTML())} />
            </div>
        )
    }
}
export default EditorComponent