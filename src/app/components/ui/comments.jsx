import React, { useEffect, useState } from "react";
import { orderBy } from "lodash";
import api from "../../../api";
import { useParams } from "react-router-dom";
import CommentList from "../common/comments/commentsList";
import AddCommentForm from "../common/comments/addCommentForm";
const Comments = () => {
  const { userId } = useParams();
  const [comments, setComments] = useState([]);
  //получаем комментарии
  useEffect(() => {
    api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
  }, []);
  //обновляем комментарий
  const HandleSubmit = (data) => {
    api.comments
      .add({ ...data, pageId: userId })
      .then((data) => setComments([...comments, data]));
  };
  //метод для удаления комментариев
  const HandleRemoveComment = (id) => {
    api.comments.remove(id).then((id) => {
      setComments(comments.filter((x) => x._id !== id));
    });
  };
  //сортируем комментарии
  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
  return (
    <>
      <div className="card mb-2">
        <div className="card-body ">
          <AddCommentForm onSubmit={HandleSubmit} />
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body ">
          <h2>Comments</h2>
          <hr />
          <CommentList
            comments={sortedComments}
            onRemove={HandleRemoveComment}
          />
        </div>
      </div>
    </>
  );
};
export default Comments;
