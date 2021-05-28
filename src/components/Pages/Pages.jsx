import React, {useRef} from 'react'
import './Pages.scss'
import Void from '../Void/Void'

const Pages = ({user, setRepos, pageNum, setPageNum, btnDisable, setBtnDisable}) => {
    const pagesAmount = Math.ceil(user.public_repos/4)
    const pageInpuRef = useRef()
    if(pagesAmount === 1) return <Void/>
    const goTo = (event) => {
        event.preventDefault()
        const inputNum = +pageInpuRef.current.value
        if (isNaN(inputNum) || inputNum < 1 || inputNum > pagesAmount){
            return
        }else if (inputNum === 1){
            const updateDisable = {prevBtnDisable: true, nextBtnDisable: false}
            setBtnDisable(updateDisable)
            setPageNum(inputNum)
            updateRepoPage(inputNum)
            pageInpuRef.current.value = ''
        }else if (inputNum === pagesAmount) {
            const updateDisable= {prevBtnDisable: false, nextBtnDisable: true}
            setBtnDisable(updateDisable)
            setPageNum(inputNum)
            updateRepoPage(inputNum)
            pageInpuRef.current.value = ''
        }else{
            setPageNum(inputNum)
            updateRepoPage(inputNum)
            pageInpuRef.current.value = ''
        }
    }
    const updateRepoPage = async (num) => {
        const responseRepos = await fetch(`https://api.github.com/users/${user.login}/repos?per_page=4&page=${num}`)
        const result = await responseRepos.json()
        setRepos(result)
    }

    const nextPage = (event) => {
        event.preventDefault()
        if(pageNum !== pagesAmount-1 || pageNum > pagesAmount-1){
            const updatePageNum = pageNum+1
            setPageNum(updatePageNum)
            const udateDisable = {prevBtnDisable: false, nextBtnDisable: false}
            setBtnDisable(udateDisable)
            updateRepoPage(updatePageNum)
        } else {
            const updateDisable= {prevBtnDisable: false, nextBtnDisable: true}
            setBtnDisable(updateDisable)
            const updatePageNum = pageNum+1
            setPageNum(updatePageNum)
            updateRepoPage(updatePageNum)
        }
    }
    const prevPage = (event) => {
        event.preventDefault()
        
        if(pageNum !== 2 || pageNum < 2){
            const updatePageNum = pageNum-1
            setPageNum(updatePageNum)
            const updateDisable = {prevBtnDisable: false, nextBtnDisable: false}
            setBtnDisable(updateDisable)
            updateRepoPage(updatePageNum)
        } else{
            const updateDisable = {prevBtnDisable: true, nextBtnDisable: false}
            setBtnDisable(updateDisable)
            const updatePageNum = pageNum-1
            setPageNum(updatePageNum)
            updateRepoPage(updatePageNum)
        }   
    }
   
    return <div className='pages'>
        <button disabled={btnDisable.prevBtnDisable} onClick={prevPage}><i className="fa fa-arrow-left"></i></button>
        <span>{pageNum} of {pagesAmount}</span>
        <button disabled={btnDisable.nextBtnDisable} onClick={nextPage}><i className="fa fa-arrow-right"></i></button>
        <input ref={pageInpuRef} type='text'/>
        <button onClick={goTo}>Go</button>
    </div>
}
export default Pages