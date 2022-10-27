import React from 'react'
import { TitleInput, TagInput } from './style'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function CreatePost() {
  return (
    <>
    <div>Title</div>
    <div>Be specific and imagine you’re asking a question to another person</div>
    <div>Body</div>
    <div>Include all the information someone would need to answer your question</div>
    <TitleInput></TitleInput>
    <CKEditor
    editor={ ClassicEditor }
    data="<p>Hello from CKEditor 5!</p>"
    onReady={ editor => {
        // You can store the "editor" and use when it is needed.
        console.log( 'Editor is ready to use!', editor );
    } }
    onChange={ ( event, editor ) => {
        const data = editor.getData();
        console.log( { event, editor, data } );
    } }
    onBlur={ ( event, editor ) => {
        console.log( 'Blur.', editor );
    } }
    onFocus={ ( event, editor ) => {
        console.log( 'Focus.', editor );
    } }
    />
    <div>Tags</div>
    <div>Add up to 5 tags to describe what your question is about</div>
    <TagInput></TagInput>
</>
  )
}


export default CreatePost