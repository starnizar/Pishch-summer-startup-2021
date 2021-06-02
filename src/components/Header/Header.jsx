import {React, useRef, useState} from 'react'
import './Header.scss'
import logo from '../assets/images/logo.svg'
import loader from '../assets/images/loader.svg'

const Header = ({setUser, setRepos, setPageNum, setBtnDisable, pageNum}) => {
    const [load, setLoad] = useState('none')
    const userInputRef = useRef()
    const getUser = async (event) => {
        event.preventDefault()
        if (userInputRef.current.value.trim() === ''){
            return
        }
        setLoad('block') 
        const responseUser = await fetch(`https://api.github.com/users/${userInputRef.current.value}`)
        if(!responseUser.ok) {
            setLoad('none')
            setUser('notFound')
            setRepos([])        
            return
        }
        const user = await responseUser.json()
        const responseRepos = await fetch(`https://api.github.com/users/${userInputRef.current.value}/repos?per_page=4&page=${pageNum}`)
        const repos = await responseRepos.json()
        const loading = () => {
            setLoad('none')
            setUser(user)
            setRepos(repos)
            setPageNum(1)
            setBtnDisable({prevBtnDisable: true, nextBtnDisable: false})
        }
        setTimeout(loading, 500)       
    }
    return <header>
        <a href="https://github.com/" rel="noreferrer" target="_blank">
            <img className='logo' src={logo} alt="#" />
        </a>
        
        <form onSubmit={getUser}>
            <button><i className="fa fa-search"></i></button>
            <input  required ref={userInputRef} placeholder='Enter GitHub username' type="text" /> 
            <img style={{display:load}} className='loader' src={loader} alt="" />
        </form>
    </header>
}

export default Header