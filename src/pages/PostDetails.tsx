import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../store/store.ts";
import {addComment, addPost, removeComment, setComments, type Post, type PostComment} from "../store/reducers/blog.ts";

interface CommentsResponse {
    comments: PostComment[];
}

function PostDetails() {
    const {id} = useParams();
    const postId = Number(id);

    const dispatch = useDispatch<AppDispatch>();

    const post = useSelector(
        (state: RootState) =>
            state.blog.posts.find(post => post.id === postId)
    );

    const comments = useSelector(
        (state: RootState) =>
            state.blog.comments[postId]
    );

    const loggedUser = useSelector(
        (state: RootState) => state.auth.loggedUser
    );

    const [commentBody, setCommentBody] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadData = async () => {
            try {
                if (!post && postId > 0) {
                    const postResponse = await axios.get<Post>(
                        `https://dummyjson.com/posts/${postId}`
                    );

                    dispatch(addPost(postResponse.data));
                }

                if (comments === undefined && postId > 0) {
                    const commentsResponse =
                        await axios.get<CommentsResponse>(
                            `https://dummyjson.com/posts/${postId}/comments`
                        );

                    dispatch(setComments({
                        postId,
                        comments: commentsResponse.data.comments
                    }));
                }

                if (comments === undefined && postId < 0) {
                    dispatch(setComments({
                        postId,
                        comments: []
                    }));
                }
            } catch {
                setError("Impossible de charger l’article.");
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [
        comments,
        dispatch,
        post,
        postId
    ]);

    const submitComment = async () => {
        if (!commentBody || !loggedUser) {
            return;
        }

        const newComment: PostComment = {
            id: -Date.now(),
            body: commentBody,
            postId,
            likes: 0,
            user: {
                id: loggedUser.id,
                username: loggedUser.username,
                fullName:
                    `${loggedUser.firstName} ${loggedUser.lastName}`
            }
        };

        dispatch(addComment(newComment));
        setCommentBody("");

        try {
            await axios.post(
                "https://dummyjson.com/comments/add",
                {
                    body: newComment.body,
                    postId,
                    userId: loggedUser.id
                }
            );
        } catch {
            dispatch(removeComment({
                postId,
                commentId: newComment.id
            }));

            setError("Le commentaire n’a pas été ajouté.");
        }
    }

    const deleteComment = async (
        comment: PostComment
    ) => {
        dispatch(removeComment({
            postId,
            commentId: comment.id
        }));

        if (comment.id < 0) {
            return;
        }

        try {
            await axios.delete(
                `https://dummyjson.com/comments/${comment.id}`
            );
        } catch {
            dispatch(addComment(comment));
            setError("La suppression a échoué.");
        }
    }

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (!post) {
        return <p>Article introuvable.</p>;
    }

    return (
        <>
            <article>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
                <p>Tags : {post.tags.join(", ")}</p>
                <p>Vues : {post.views}</p>
            </article>

            <section>
                <h2>Commentaires</h2>

                {loggedUser && (
                    <>
                        <textarea
                            value={commentBody}
                            onChange={event =>
                                setCommentBody(event.target.value)
                            }
                            placeholder="Votre commentaire"
                        />

                        <button onClick={submitComment}>
                            Commenter
                        </button>
                    </>
                )}

                {(comments ?? []).map(comment => (
                    <article key={comment.id}>
                        <strong>
                            {comment.user.username}
                        </strong>

                        <p>{comment.body}</p>

                        <button
                            onClick={() =>
                                deleteComment(comment)
                            }
                        >
                            Supprimer
                        </button>
                    </article>
                ))}
            </section>

            {error && <p>{error}</p>}
        </>
    )
}

export default PostDetails;