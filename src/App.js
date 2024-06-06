
import './App.css';
import { useRef, useState } from 'react';
import { quiz } from "./data"
function App() {
  let random = Math.round(Math.random() * 1)
  const [index, setIndex] = useState(0)
  const [data, setData] = useState(quiz[random])
  const [question, setQuestion] = useState(data[index])
  const [lock, setLock] = useState(true)
  const [score, setScore] = useState(0)
  const [hideQuiz, setHideQuiz] = useState(true)

  const option1 = useRef(null)
  const option2 = useRef(null)
  const option3 = useRef(null)
  const option4 = useRef(null)

  let option_array = [option1, option2, option3, option4]

  const chaskAns = (e, ans) => {
    if (lock) {
      if (question.ans === ans) {
        e.target.classList.add("true")
        setLock(false)
        setScore(prev => prev + 1)

      } else {
        e.target.classList.add("false")
        setLock(false)
        option_array[question.ans - 1].current.classList.add("true")
      }
    }
  }

  const next = () => {
    if (!lock) {
      if (data.length !== index + 1) {
        setIndex(prev => prev + 1)
        setQuestion(data[index + 1])
        setLock(true)

        option_array.map(item => {
          item.current.classList.remove("true")
          item.current.classList.remove("false")
          return null
        })
      } else {
        setHideQuiz(false)
      }
    }
  }

  return (
    <div className="container">
      <div className="card">
        <p className='card_title'>Javascript Test</p>
        {hideQuiz && <>
          <span>{data.length} savoldan {index + 1} chisi</span>
          <ul className="quiz-container">
            <p className='quiz_title'> <p> {index + 1}) </p> {question.question}</p>
            <li ref={option1} onClick={e => chaskAns(e, 1)} className="quiz-list">{question.A}</li>
            <li ref={option2} onClick={e => chaskAns(e, 2)} className="quiz-list">{question.B}</li>
            <li ref={option3} onClick={e => chaskAns(e, 3)} className="quiz-list">{question.C}</li>
            <li ref={option4} onClick={e => chaskAns(e, 4)} className="quiz-list">{question.D}</li>
          </ul>
          <button onClick={next} className="next-btn">Keyingi</button>
        </>}

        {!hideQuiz &&
          <>
            <span>siz {data.length} ta savoldan {score} ta to'g'ri topdingiz</span>
            <form>
              <button className="reset-btn">Restart</button>
            </form>
          </>}
      </div>
    </div>
  );
}

export default App;
