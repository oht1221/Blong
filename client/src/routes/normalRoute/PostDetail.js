import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  POST_DELETE_REQUEST,
  POST_DETAIL_LOAD_REQUEST,
  USER_LOADING_REQUEST,
} from "../../redux/types";
import { Button, Col, Container, Row } from "reactstrap";
import CKEditor from "@ckeditor/ckeditor5-react";
import BoarderSpinner from "../../components/spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faCommentDots,
  faMouse,
} from "@fortawesome/free-solid-svg-icons";
import BallonEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor";
import { editorConfiguration } from "../../components/editor/EditorConfig";
import Comments from "../../components/comments/Comments";

const PostDetail = (req) => {
  const dispatch = useDispatch();
  const { postDetail, creatorId, title, loading } = useSelector((state) => state.post);
  const { userId, userName } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);

  console.log(req);
  useEffect(() => {
    dispatch({
      type: POST_DETAIL_LOAD_REQUEST,
      payload: req.match.params.id,
    });
    dispatch({
      type: USER_LOADING_REQUEST,
      payload: localStorage.getItem("token"),
    });
  }, []);

  const onDeleteClick = () => {
    dispatch({
      type: POST_DELETE_REQUEST,
      payload: {
        id: req.match.params.id,
        token: localStorage.getItem("token"),
      },
    });
  };

  const authButtons = (
    <Fragment>
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-md-3 mr-md-3">
          <Link to="/" className="btn btn-primary btn-block">
            Home
          </Link>
        </Col>
        <Col className="col-md-3 mr-md-3">
          <Link
            to={`/post/${req.match.params.id}/edit`}
            className="btn btn-success btn-block"
          >
            Edit
          </Link>
        </Col>
        <Col className="col-md-3 mr-md-3">
          <Button className="btn-block btn-danger" onClick={onDeleteClick}>
            Delete
          </Button>
        </Col>
      </Row>
    </Fragment>
  );

  const unAuthButton = (
    <Fragment>
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-sm-12 com-md-3">
          <Link to="/" className="btn btn-primary btn-block">
            Home
          </Link>
        </Col>
      </Row>
    </Fragment>
  );

  const Body = (
    <>
      {userId === creatorId ? authButtons : unAuthButton}
      <Row className="border-bottom border-top border-primary p-3 mb-3 d-flex justify-content-between">
        {(() => {
          if (postDetail && postDetail.creator) {
            return (
              <Fragment>
                <div className="font-weight-bold text-big">
                  <span className="mr-3">
                    <Button color="info">
                      {postDetail.category.categoryName}
                    </Button>
                  </span>
                  {postDetail.title}
                </div>
                <div className="align-self-end">{postDetail.creator.name}</div>
              </Fragment>
            );
          }
        })()}
      </Row>
      {postDetail && postDetail.comments ? (
        <Fragment>
          <div className="d-flex justify-content-end align-items-baseline small">
            <FontAwesomeIcon icon={faPencilAlt} />
            &nbsp;
            <span> {postDetail.createdAt} </span>
            &nbsp;&nbsp;
            <FontAwesomeIcon icon={faCommentDots} />
            &nbsp;
            <span> {postDetail.comments.length} </span>
            &nbsp;&nbsp;
            <FontAwesomeIcon icon={faMouse} />
            &nbsp;
            <span> {postDetail.views} </span>
          </div>
          <Row className="mb-3">
            <CKEditor
              editor={BallonEditor}
              disabled="true"
              data={postDetail.content}
              config={editorConfiguration}
            />
          </Row>
          <Row>
            <Container className="mb-3 border border-blue rounded">
              {Array.isArray(comments)
                ? comments.map(
                    ({ content, _id, creatorName, creator, createdAt }) => (
                      <div key={_id}>
                        <Row className="justify-content-between p-2">
                          <div className="font-weight-bold">
                            {creatorName ? creatorName : creator}
                          </div>
                          <div className="text-small">
                            <span className="font-weight-bold">
                              {createdAt.split(" ")[0]}
                            </span>
                            <span className="font-weight-light">
                              &nbsp;{createdAt.split(" ")[1]}
                            </span>
                          </div>
                        </Row>
                        <Row className="p-2">
                          <div>
														{content}
													</div>
                        </Row>
												<hr />
                      </div>
                    )
                  )
                : "Creator"}
							<Comments 
                id={req.match.params.id}
                userId={userId}
                userName={userName}
							/>
            </Container>
          </Row>
        </Fragment>
      ) : (
        ""
      )}
    </>
  );

  return (
    <div>
      <Helmet title={`Post | ${title}`} />
      {loading === true ? BoarderSpinner : Body}
    </div>
  );
};

export default PostDetail;
