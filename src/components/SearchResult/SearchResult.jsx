import React from 'react'
import './SearchResult.scss'
import UserInfo from '../UserInfo/UserInfo'
import UserRepos from '../UserRepos/UserRepos'
import StartSearch from '../StartSearch/StartSearch'
import NotFound from '../NotFound/NotFound'

const SearchResult = ({user, repos, setPageNum, pageNum, btnDisable, setBtnDisable}) => {
    if (user.length === 0 && repos.length === 0) return <StartSearch/>
    if (user === 'notFound') return <NotFound/>
    return <main>
        <UserInfo user={user}/>
        <UserRepos user={user} repos={repos} setPageNum={setPageNum} pageNum={pageNum} setBtnDisable={setBtnDisable} btnDisable={btnDisable}/>
    </main>  
}

export default SearchResult