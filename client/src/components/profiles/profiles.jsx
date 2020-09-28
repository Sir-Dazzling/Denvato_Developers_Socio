import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/spinner';
import {connect} from 'react-redux';

import ProfileItem from './profile_item';
import {getProfiles} from '../../redux/profile/profile.actions'; 

const Profiles = ({getProfiles, profile: {profiles, loading}}) => 
{
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    return loading ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Developers</h1>
        <p className="lead">
            <i className="fab fa-connect-develop">Browse and connect with developers</i>
        </p>
        <div className="profiles">
            {profiles.length > 0 ? (
                profiles.map(profile => (
                    <ProfileItem key = {profile._id} profile = {profile} />
                ))
            ) : <h4> <Spinner /></h4> }
        </div>     
    </Fragment>;
};

Profiles.propTypes = 
{
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => 
({
    profile: state.profile
});
export default connect(mapStateToProps, {getProfiles})(Profiles);