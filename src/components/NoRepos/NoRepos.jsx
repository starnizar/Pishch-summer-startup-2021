import React from 'react'
import './NoRepos.scss'

const NotFound = () => {
    return <div className="noRepos">
        <i className="fa fa-folder-open"></i>
        <p>Repository list is empty</p>
    </div>
}
export default NotFound