import React from 'react'
import './UserRepos.scss'
import Pages from '../Pages/Pages'
import NoRepos from '../NoRepos/NoRepos'

const UserRepos = ({repos, user, setPageNum, pageNum, btnDisable, setBtnDisable}) => {

    if(repos.length === 0) return <NoRepos/>
    if(!user.login) setPageNum(1)

    const pagesArr = []
    let page =  []
    for (let i=0, j=0; i <= repos.length; i++, j++){
        if (j !== 3 ) {
            if (i === repos.length){
                pagesArr.push(page)
                break
            }
            page.push(repos[i])
        } else {
            pagesArr.push(page)
            page = []
            j = 0
            page.push(repos[i])
        }
    }       
    return <div className="userRepos">
        <h1>Repositories ({user.public_repos})</h1>
        <div className="reposList">
            {pagesArr[pageNum-1] && pagesArr[pageNum-1].map((item, index) => (
                <div key={index} className="reposBox">
                    <a href={`https://github.com/${user.login}/${item.name}`} target="_blank" rel="noreferrer"><h2>{item.name}</h2></a>
                    <p>{item.description}</p>
                </div>
            ))}
        </div>
        <Pages repos={repos} pageNum={pageNum} setPageNum={setPageNum} setBtnDisable={setBtnDisable} btnDisable={btnDisable}/>
    </div>
}
export default UserRepos