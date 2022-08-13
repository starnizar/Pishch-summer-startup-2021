import React from 'react'
import './UserInfo.scss'

const UserInfo = ({user}) => {
    console.log();
    return <div className="userInfo">
        {
            user && <>
                <img src={user.avatar_url} alt="" />
                <h1>{user.name}</h1>
                <a href={user.html_url} target="_blank" rel="noreferrer">{user && user.login}</a>
                <div className='follows'>
                    <p><i className="fa fa-users"></i>{user.followers} followers</p>
                    <p><i className="fa fa-user"></i>{user.following} following</p>
                </div>
            </>
        }
        
    </div>
}

export default UserInfo