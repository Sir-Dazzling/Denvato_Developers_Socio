import axios from 'axios';
import {setAlert} from '../alert/alert.actions';
import {GET_POSTS, GET_POST, ADD_POST, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_COMMENT, DELETE_COMMENT} from '../types';

// Getting Posts
export const getPosts = () => async (dispatch) => 
{
    try 
    {
        const res = await axios.get("/api/posts");   

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (error) 
    {
        dispatch({
            type: POST_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};

// Getting a Post
export const getPost = (id) => async (dispatch) => 
{
    try 
    {
        const res = await axios.get(`/api/posts/${id}`);   

        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (error) 
    {
        dispatch({
            type: POST_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};

// Add Post
export const addPost = (formData) => async (dispatch) => 
{
    const config = 
    {
        headers: 
        {
            "Content-type": "application/json"
        }
    };

    try 
    {
        const res = await axios.post("/api/posts", formData, config);   

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert("Post Created", "success"));
    } catch (error) 
    {
        dispatch({
            type: POST_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};

// Delete Post
export const deletePost = (id) => async (dispatch) => 
{
    try 
    {
        await axios.delete(`/api/posts/${id}`);   

        dispatch({
            type: DELETE_POST,
            payload: id
        });

        dispatch(setAlert("Post Removed", "success"));
    } catch (error) 
    {
        dispatch({
            type: POST_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};

// Add Likes
export const addLike = (id) => async (dispatch) => 
{
    try 
    {
        const res = await axios.put(`/api/posts/like/${id}`);   

        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: res.data}
        });
    } catch (error) 
    {
        dispatch({
            type: POST_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};

// Remove Likes
export const removeLike = (id) => async (dispatch) => 
{
    try 
    {
        const res = await axios.put(`/api/posts/unlike/${id}`);   

        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: res.data}
        });
    } catch (error) 
    {
        dispatch({
            type: POST_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};

// Add Comment
export const addComment = (postId, formData) => async (dispatch) => 
{
    const config = 
    {
        headers: 
        {
            "Content-type": "application/json"
        }
    };

    try 
    {
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);   

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });

        dispatch(setAlert("Comment Added", "success"));
    } catch (error) 
    {
        dispatch({
            type: POST_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};

// Delete Comment
export const deleteComment = (postId, commentId) => async (dispatch) => 
{
    try 
    {
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`);   

        dispatch({
            type: DELETE_COMMENT,
            payload: commentId
        });

        dispatch(setAlert("Comment Deleted", "success"));
    } catch (error) 
    {
        dispatch({
            type: POST_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};