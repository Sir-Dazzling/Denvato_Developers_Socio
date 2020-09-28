import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {getPost} from '../../redux/post/post.actions';

import Spinner from '../layout/spinner';
import PostItem from '../posts/postitem';
import CommentForm from '../post/comment-form';
import CommentItem from '../post/comment-item';

const Post = ({getPost, post: {post, loading}, match}) => 
{
    useEffect(() => {
        getPost(match.params.id)
    }, [getPost, match.params.id]);

    return loading || post === null ? <Spinner /> : <Fragment>
        <Link to = "/posts" className = "btn">Back to Posts</Link>
        <PostItem post = {post} showActions = {false} />
        <CommentForm postId = {post._id} />
        <div className="comments">
            {post.comments.map(comment => (
                <CommentItem key = {comment._id} comment = {comment} postId = {post._id} />
            ))}
        </div>
    </Fragment>
};

Post.propTypes = 
{
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, {getPost})(Post);