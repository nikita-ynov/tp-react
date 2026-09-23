import {type FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {
    AppDispatch,
    RootState
} from "../store/store.ts";
import {addPost, removePost, setPosts, type Post} from "../store/reducers/blog.ts";
import "../styles/blog.css";

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
        <main className="blog-page container">
            <header className="blog-hero">
                <p className="blog-eyebrow">Communauté</p>
                <h1>Le blog des recettes</h1>
                <p>Partagez vos idées, vos astuces et vos expériences en cuisine.</p>
            </header>

            {error && <p className="blog-message blog-message-error">{error}</p>}

            <form className="blog-form" onSubmit={submitPost}>
                <h2>Publier un article</h2>
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

            <section className="blog-posts">
                <div className="blog-section-heading">
                    <h2>Derniers articles</h2>
                    <span>{posts.length} article{posts.length > 1 ? "s" : ""}</span>
                </div>
                <div className="blog-post-grid">
                {posts.map(post => (
                <article className="blog-post-card" key={post.id}>
                    <h2>{post.title}</h2>

                    <p className="blog-post-tags">
                        Tags : {post.tags.join(", ")}
                    </p>

                    <p className="blog-post-stats">
                        <span>Likes {post.reactions.likes}</span>
                        <span>Dislikes {post.reactions.dislikes}</span>
                        <span>Vues {post.views}</span>
                    </p>

                    <div className="blog-post-actions">
                    <Link className="blog-read-link" to={`/posts/${post.id}`}>
                        Lire l’article
                    </Link>

                    <button className="blog-delete-button"
                        onClick={() => deletePost(post)}
                    >
                        Supprimer
                    </button>
                    </div>
                </article>
            ))}
                </div>
            </section>
        </main>
    )
}

export default Blog;