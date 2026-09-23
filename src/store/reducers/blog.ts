import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface Post {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: {
        likes: number;
        dislikes: number;
    };
    views: number;
    userId: number;
}

export interface PostComment {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: {
        id: number;
        username: string;
        fullName: string;
    };
}

interface BlogState {
    posts: Post[];
    postsLoaded: boolean;
    comments: Record<number, PostComment[]>;
}

const initialState: BlogState = {
    posts: [],
    postsLoaded: false,
    comments: {},
}

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload;
            state.postsLoaded = true;
        },

        addPost: (state, action: PayloadAction<Post>) => {
            state.posts.unshift(action.payload);
        },

        removePost: (state, action: PayloadAction<number>) => {
            state.posts = state.posts.filter(
                post => post.id !== action.payload
            );
        },

        setComments: (
            state,
            action: PayloadAction<{
                postId: number;
                comments: PostComment[];
            }>
        ) => {
            state.comments[action.payload.postId] =
                action.payload.comments;
        },

        addComment: (
            state,
            action: PayloadAction<PostComment>
        ) => {
            const postId = action.payload.postId;

            if (!state.comments[postId]) {
                state.comments[postId] = [];
            }

            state.comments[postId].push(action.payload);
        },

        removeComment: (
            state,
            action: PayloadAction<{
                postId: number;
                commentId: number;
            }>
        ) => {
            const {postId, commentId} = action.payload;

            state.comments[postId] =
                state.comments[postId]?.filter(
                    comment => comment.id !== commentId
                ) ?? [];
        }
    }
})

export const {setPosts, addPost, removePost, setComments, addComment, removeComment} = blogSlice.actions;

export default blogSlice.reducer;