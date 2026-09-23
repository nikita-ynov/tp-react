import {type FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {
    AppDispatch,
    RootState
} from "../store/store.ts";
import {addPost, removePost, setPosts, type Post} from "../store/reducers/blog.ts";

interface PostsResponse {
    posts: Post[];
}

function Blog() {
    const dispatch = useDispatch<AppDispatch>();

    const posts = useSelector(
        (state: RootState) => state.blog.posts
    );

    const postsLoaded = useSelector(
        (state: RootState) => state.blog.postsLoaded
    );

    const loggedUser = useSelector(
        (state: RootState) => state.auth.loggedUser
    );

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (postsLoaded) {
            return;
        }

        axios
            .get<PostsResponse>(
                "https://dummyjson.com/posts?limit=0"
            )
            .then(response => {
                dispatch(setPosts(response.data.posts));
            })
            .catch(() => {
                setError("Impossible de charger les articles.");
            });
    }, [dispatch, postsLoaded]);

    const submitPost = async (event: FormEvent) => {
        event.preventDefault();

        if (!title || !body) {
            return;
        }

        const newPost: Post = {
            id: -Date.now(),
            title,
            body,
            tags: tags
                .split(",")
                .map(tag => tag.trim())
                .filter(tag => tag !== ""),
            reactions: {
                likes: 0,
                dislikes: 0
            },
            views: 0,
            userId: loggedUser?.id ?? 1
        };

        dispatch(addPost(newPost));

        setTitle("");
        setBody("");
        setTags("");

        try {
            await axios.post(
                "https://dummyjson.com/posts/add",
                {
                    title: newPost.title,
                    body: newPost.body,
                    tags: newPost.tags,
                    userId: newPost.userId
                }
            );
        } catch {
            dispatch(removePost(newPost.id));
            setError("La publication a échoué.");
        }
    }

    const deletePost = async (post: Post) => {
        dispatch(removePost(post.id));

        if (post.id < 0) {
            return;
        }

        try {
            await axios.delete(
                `https://dummyjson.com/posts/${post.id}`
            );
        } catch {
            dispatch(addPost(post));
            setError("La suppression a échoué.");
        }
    }

    return (
        <>
            <h1>Blog</h1>

            {error && <p>{error}</p>}

            <form onSubmit={submitPost}>
                <input
                    type="text"
                    placeholder="Titre"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />

                <textarea
                    placeholder="Contenu"
                    value={body}
                    onChange={event => setBody(event.target.value)}
                />

                <input
                    type="text"
                    placeholder="Tags séparés par une virgule"
                    value={tags}
                    onChange={event => setTags(event.target.value)}
                />

                <button type="submit">
                    Publier
                </button>
            </form>

            {posts.map(post => (
                <article key={post.id}>
                    <h2>{post.title}</h2>

                    <p>
                        Tags : {post.tags.join(", ")}
                    </p>

                    <p>
                        👍 {post.reactions.likes}
                        {" — "}
                        👎 {post.reactions.dislikes}
                    </p>

                    <p>Vues : {post.views}</p>

                    <Link to={`/posts/${post.id}`}>
                        Lire l’article
                    </Link>

                    <button
                        onClick={() => deletePost(post)}
                    >
                        Supprimer
                    </button>
                </article>
            ))}
        </>
    )
}

export default Blog;