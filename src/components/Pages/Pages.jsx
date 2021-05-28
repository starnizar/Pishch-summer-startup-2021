import React, {useRef} from 'react'
import './Pages.scss'

const Pages = ({repos, pageNum, setPageNum, btnDisable, setBtnDisable}) => {
    
    const pagesAmount = Math.ceil(repos.length/3)
    const pageInpuRef = useRef()

    const goTo = (event) => {
        event.preventDefault()
        const inputNum = +pageInpuRef.current.value
        if (isNaN(inputNum) || inputNum < 1 || inputNum > pagesAmount){
            return
        }else if (inputNum === 1){
            const updateDisable = {prevBtnDisable: true, nextBtnDisable: false}
            setBtnDisable(updateDisable)
        }else if (inputNum === pagesAmount) {
            const updateDisable= {prevBtnDisable: false, nextBtnDisable: true}
            setBtnDisable(updateDisable)
        }else{
            const toNum = +inputNum
            setPageNum(toNum)
            pageInpuRef.current.value = ''
        }
    }
    
    const nextPage = (event) => {
        event.preventDefault()
        if(pageNum !== pagesAmount-1 || pageNum > pagesAmount-1){
            setPageNum(pageNum+1)
            const udateDisable = {prevBtnDisable: false, nextBtnDisable: false}
            setBtnDisable(udateDisable)
        } else {
            const updateDisable= {prevBtnDisable: false, nextBtnDisable: true}
            setBtnDisable(updateDisable)
            setPageNum(pageNum+1)
        }
    }
    const prevPage = (event) => {
        event.preventDefault()
        if(pageNum !== 2 || pageNum < 2){
            setPageNum(pageNum-1)
            const updateDisable = {prevBtnDisable: false, nextBtnDisable: false}
            setBtnDisable(updateDisable)
        } else{
            const updateDisable = {prevBtnDisable: true, nextBtnDisable: false}
            setBtnDisable(updateDisable)
            setPageNum(pageNum-1)
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