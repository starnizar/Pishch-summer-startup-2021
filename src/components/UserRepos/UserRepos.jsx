import React from 'react'
import './UserRepos.scss'
import Pages from '../Pages/Pages'
import NoRepos from '../NoRepos/NoRepos'

const UserRepos = ({repos, setRepos, user, setPageNum, pageNum, btnDisable, setBtnDisable}) => {
    if(repos.length === 0) return <NoRepos/>
    return <div className="userRepos">
        <h1>Repositories ({user.public_repos})</h1>
        <div className="reposList">
            {repos && repos.map((item, index) => (
                <div key={index} className="reposBox">
                    <a href={`https://github.com/${user.login}/${item.name}`} target="_blank" rel="noreferrer"><h2>{item.name}</h2></a>
                    <p>{item.description}</p>
                </div>
            ))}
        </div>
        <Pages pageNum={pageNum} setRepos={setRepos} setPageNum={setPageNum} setBtnDisable={setBtnDisable} btnDisable={btnDisable} user={user}/>
    </div>
}
export default UserRepos