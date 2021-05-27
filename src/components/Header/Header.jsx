import {React, useRef, useState} from 'react'
import './Header.scss'
import logo from '../assets/images/logo.svg'
import loader from '../assets/images/loader.svg'

const Header = ({setUser, setRepos, setPageNum, setBtnDisable}) => {
    const [load, setLoad] = useState('none')
    const userInputRef = useRef()
    const getUser = async (event) => {
        event.preventDefault()
        setLoad('block') 
        const responseUser = await fetch(`https://api.github.com/users/${userInputRef.current.value}`) 
        const userInfo = await responseUser.json()
        if(userInfo.message === 'Not Found'){
            setLoad('none')
            setUser('notFound')
            setRepos([])
        } else {
            const responseRepos = await fetch(userInfo.repos_url)
            const reposList = await responseRepos.json()
            const loading = () => {
                setLoad('none')
                setUser(userInfo)
                setRepos(reposList)
                setPageNum(1)
                setBtnDisable({prevBtnDisable: true, nextBtnDisable: false})
            }
            setTimeout(loading, 500)       
        }
    }
    return <header>
        <a href="https://github.com/" rel="noreferrer" target="_blank">
            <img className='logo' src={logo} alt="#" />
        </a>
        
        <form onSubmit={getUser}>
            <i className="fa fa-search"></i>
            <input required ref={userInputRef} placeholder='Enter GitHub username' type="text" /> 
            <img style={{display:load}} className='loader' src={loader} alt="" />
        </form>
    </header>
}

export default Header