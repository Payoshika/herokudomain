import React, {useState, useEffect} from "react"
import axios from "axios"

const Form = () => {
  const [searchWord, setSearchWord] = useState("");
  const [bookList, setBookList] = useState([]);
  const [bookResult, setBookResult] = useState(<div><p>結果</p></div>)

  useEffect(() => {
      setBookResult(bookList.slice(0,11).map((books) => {
        return (
        <p
          onClick = {()=>changeValue2(`${books["Item"]["title"]}${books["Item"]["author"]}${books["Item"]["publisherName"]}`)}> {books["Item"]["title"]} :
          {books["Item"]["author"]} :{books["Item"]["publisherName"]}
        </p>)}))
   }, [bookList]);

  const search = (searchUrl) => {
    axios.get(searchUrl)
    .then(response =>　
      setBookList(response.data["Items"])
    )
    .catch(error => console.log("check error", error))
  }

  function changeValue(event){
    let inputWord = event.target.value
    console.log(inputWord);
    setSearchWord(inputWord)
  }

  function changeValue2(event){
    setSearchWord(event)
  }


  function searchBook (event) {
     if (searchWord.length >= 2){
     let searchUrl = encodeURI(`https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?applicationId=1025599016601623375&title=${searchWord}`)
      setTimeout(search(searchUrl), 800)
    }
  }
  function submitBook (event){
      // api call to backend
  }

  return(
    <div>
      <div>
        <h1>講義を受けたい古典をリクエストする</h1>
        <div>
          <input type="text" value={searchWord} onChange={(event)=>changeValue(event)}
           />
        <button　onClick={()=>searchBook()} >検索する</button>
        <button　onClick={()=>submitBook()} >リクエスト</button>
        </div>
        <div className="bookResult">
          {bookResult}
        </div>
      </div>
    </div>
  )
}

export default Form
