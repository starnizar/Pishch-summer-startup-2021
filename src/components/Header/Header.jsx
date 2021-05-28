import {React, useRef, useState} from 'react'
import './Header.scss'
import logo from '../assets/images/logo.svg'
import loader from '../assets/images/loader.svg'
import {Octokit} from '@octokit/core'

const octokit = new Octokit({ auth: `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` });
const Header = ({setUser, setRepos, setPageNum, setBtnDisable, pageNum}) => {
    const [load, setLoad] = useState('none')
    const userInputRef = useRef()
    const getUser = async (event) => {
        event.preventDefault()
        if (userInputRef.current.value === '') {
            setUser([])
            setRepos([])
            return
        }
        setLoad('block') 
        try{
            const responseUser = await octokit.request('GET /users/{username}', {
                username: userInputRef.current.value
            })
            const responseRepos = await octokit.request('GET /users/{username}/repos', {
                username: userInputRef.current.value,
                per_page: 4,
                page: pageNum
            })
            console.log(responseRepos);
            const loading = () => {
                setLoad('none')
                setUser(responseUser.data)
                setRepos(responseRepos.data)
                setPageNum(1)
                setBtnDisable({prevBtnDisable: true, nextBtnDisable: false})
            }
            setTimeout(loading, 500)       
        } catch(e){
            setLoad('none')
            setUser('notFound')
            setRepos([])
        }
        
    }
    return <header>
        <a href="https://github.com/" rel="noreferrer" target="_blank">
            <img className='logo' src={logo} alt="#" />
        </a>
        
        <form onSubmit={getUser} onChange={getUser}>
            <button><i className="fa fa-search"></i></button>
            <input  required ref={userInputRef} placeholder='Enter GitHub username' type="text" /> 
            <img style={{display:load}} className='loader' src={loader} alt="" />
        </form>
    </header>
}

export default Header