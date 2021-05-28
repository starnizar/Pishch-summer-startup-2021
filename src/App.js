import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header'
import SearchResult from './components/SearchResult/SearchResult'
function App() {
  const [user, setUser] = useState([])
  const [repos, setRepos] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [btnDisable, setBtnDisable] = useState({prevBtnDisable: true, nextBtnDisable: false})

  return (
    <div className="App">
      <Header setUser={setUser} setRepos={setRepos} setPageNum={setPageNum} pageNum={pageNum} setBtnDisable={setBtnDisable}/>
      <SearchResult user={user} repos={repos} setRepos={setRepos} setPageNum={setPageNum} pageNum={pageNum} btnDisable={btnDisable} setBtnDisable={setBtnDisable}/>
    </div>
  );
}

export default App;
