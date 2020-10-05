import React, { Fragment, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { POST_LOADING_REQUEST } from "../../redux/types";
import { Helmet } from "react-helmet";
import { Alert, Row } from "reactstrap";
import borderSpinner from "../../components/spinner/Spinner";
import PostCardOne from "../../components/post/PostCardOne";
//import Category from "../../../../server/models/category";

const PostCardList = () => {
  const { posts, categoryResult, loading, postCount } = useSelector((state) => state.post);
  const dispatch = useDispatch();  

  useEffect(() => {
    dispatch({
      type: POST_LOADING_REQUEST,
      payload: 0
    });
  }, [dispatch]);

  const skipNumberRef = useRef(0);
  const postCountRef = useRef(0);
  const endMsg = useRef(false);
  
  postCountRef.current = postCount - 6;

  const observer = useRef();

  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          let remainPostCount = postCountRef.current - skipNumberRef.current;
          if (remainPostCount >= 0) {
            dispatch({
              type: POST_LOADING_REQUEST,
              payload: skipNumberRef.current + 6,
            });
            skipNumberRef.current += 6;
          } else {
            endMsg.current = true;
          }
        }
      });

      if (observer.current) observer.current.disconnect();

      if (node) {
        console.log(node);
        observer.current.observe(node);
      }
    },
    [dispatch, loading]
  );

  return (
    <Fragment>
      <Helmet title="Home" />
      <Row className="border-bottom border-top border-primary py-2 mb-3">
        {/* <Category posts={categoryResult} /> */}
      </Row>

      <Row>{posts ? <PostCardOne posts={posts} /> : borderSpinner}</Row>
      <div ref={lastPostElementRef}> {loading && borderSpinner} </div>
      {loading ? (
        ""
      ) : endMsg ? (
        <div>
          <Alert color="danger" className="text-center font-weight-bolder">
            No More post
          </Alert>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default PostCardList;
