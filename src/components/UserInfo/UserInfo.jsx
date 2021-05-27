import React from 'react'
import './UserInfo.scss'

const UserInfo = ({user}) => {
    console.log();
    return <div className="userInfo">
        <img src={user && user.avatar_url} alt="" />
        <h1>{user && user.name}</h1>
        <a href={user && user.html_url} target="_blank" rel="noreferrer">{user && user.login}</a>
        <div className='follows'>
            <p><i className="fa fa-users"></i>{user && user.followers} followers</p>
            <p><i className="fa fa-user"></i>{user && user.following} following</p>
        </div>
    </div>
}

export default UserInfo