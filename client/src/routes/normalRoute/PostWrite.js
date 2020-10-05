import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import { editorConfiguration } from "../../components/editor/EditorConfig";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Progress,
} from "reactstrap";
import MyInit from "../../components/editor/UploadAdapter";
import dotenv from "dotenv";
import { POST_UPLOAD_REQUEST } from "../../redux/types";
dotenv.config();

const PostWrite = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [form, setValues] = useState({ title: "", content: "", fileUrl: "" });
  const dispatch = useDispatch();

  const onChange = (e) => {
    //바뀐 부분만 찾아서 form 값(state의 title, content, fileUrl) 업데이트
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    await e.preventDefault();
    const { title, content, fileUrl, category } = form;
    const token = localStorage.getItem('token');
    const body = { title, content, fileUrl, category, token };
    dispatch({
      type: POST_UPLOAD_REQUEST,
      payload: body
    });
  };

  const getDataFromCKEditor = (event, editor) => {
    const data = editor.getData();
    console.log(data);
    if (data && data.match("<img src=")) {
      const imgStart = data.indexOf("<img src=");
      console.log(imgStart);
      let imgEnd = "";
      let extFound = "";
      let imgUrl = "";

      const ext_names = ["jpeg", "png", "jpg", "gif"];

      for (let i = 0; i < ext_names.length; i++) {
        if (data.match(ext_names[i])) {
          console.log(data.indexOf(`${ext_names[i]}`));
          extFound = ext_names[i];
          imgEnd = data.indexOf(`${ext_names[i]}`);
        }
      }
      console.log(extFound);
      console.log(imgEnd);

      if (extFound === "jpeg") {
        imgUrl = data.substring(imgStart + 10, imgEnd + 4);
      } else {
        imgUrl = data.substring(imgStart + 10, imgEnd + 3);
      }

      console.log(imgUrl, "result img url");
      setValues({
        ...form,
        fileUrl: imgUrl,
        content: data,
      });
    } else {
      setValues({
        ...form,
        fileUrl: process.env.REACT_APP_DEFAULT_IMG_URL,
        content: data,
      });
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <Form onSubmit={onSubmit}>
          <FormGroup className="mb-3">
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              className="form-control"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label for="category">Category</Label>
            <Input
              type="text"
              name="category"
              id="category"
              className="form-control"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label for="content">Content</Label>
            <CKEditor
              editor={ClassicEditor}
              config={editorConfiguration}
              onInit={MyInit}
              onBlur={getDataFromCKEditor}
            />
            <Button
              color="success"
              block
              className="mt-3 col-md-2 offset-md-10 mb-3"
            >
              Submit
            </Button>
          </FormGroup>
        </Form>
      ) : (
        <Col width={50} className="p-5 m-5">
          <Progress animated color="info" value={100} />
        </Col>
      )}
    </div>
  );
};

export default PostWrite;
