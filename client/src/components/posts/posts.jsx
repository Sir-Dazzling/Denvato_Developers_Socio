import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getPosts} from '../../redux/post/post.actions';

import Spinner from '../layout/spinner';
import PostItem from '../posts/postitem';
import PostForm from '../posts/post-form';

const Posts = ({getPosts, post: {posts, loading}}) => 
{
    useEffect(() => {
        getPosts();
    },[getPosts]);

    return loading ? <Spinner /> : (
        <Fragment>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome to the community
                <PostForm />
                {posts.map( post => (
                    <PostItem key = {post._id} post = {post} />
                ))}
            </p>
        </Fragment>
    );
};

Posts.propTypes = 
{
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, {getPosts})(Posts);