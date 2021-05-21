import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Card from './Card'
import './Quiz.scss'

const timeInterval = 1000
const testTime = 60000
const number_questions = 10
const initialScores = {}
for(let i = 1;i<=number_questions;i++){
    initialScores[i] = 0
}
// console.log("Init",initialScores)
const Quiz = () => {
    const history = useHistory()
    const [difficulty, setDifficulty] = useState('easy')
    const [questionsLeft, setQuestionsLeft] = useState(number_questions)
    const [questions, setQuestions] = useState([])
    const [timer, setTimer] = useState(false)
    const [gameover, setGameover] = useState(false)
    const [timeLeft, setTimeLeft] = useState(testTime)
    const [score, setScore] = useState(initialScores)
    const [loading, setLoading] = useState(false)
    const {id} = useParams()
    // useEffect(() => {
    //     axios.get(`https://opentdb.com/api.php?amount=10&category=${id}&difficulty=${difficulty}`)
    //     return () => {
    //         cleanup
    //     }
    // }, [input])
    // console.log(id)
   useEffect(() => {
       let timer2
       if(timer){
            timer2 = setTimeout(() => {
                setTimeLeft(timeLeft => timeLeft-timeInterval)
            },timeInterval)
        }
       return () => {
           clearTimeout(timer2)
       }
   }, [timer, timeLeft])

    useEffect(() => {
        let timer1
        let a
        if(timer){
            a = 10
            timer1 = setTimeout(() => {
                setTimer(false)
                setGameover(true)
            }, testTime);
            // console.log("a inside", a)
        }
        // console.log("a",a)
        return () => {
            // console.log("a beta", a)
            clearTimeout(timer1)
        }
    }, [timer])

    const submitHandler = (Event) => {
        Event.preventDefault()
        // console.log(id)
        // console.log(difficulty)
        setLoading(true)
        axios.get(`https://opentdb.com/api.php?amount=${number_questions}&category=${id}&difficulty=${difficulty}`)
            .then(res => {setQuestions(res.data.results); setTimer(true); setLoading(false);})
            .catch(err => console.log(err))
    }

    const resetHandler = () => {
        setQuestionsLeft(number_questions)
        setQuestions([])
        setTimer(false)
        setGameover(false)
        setTimeLeft(testTime)
        setScore(initialScores)
    }

    const scoreHandler = () => {
        let finalScore = 0
        let key
        for(key in score){
            finalScore += score[key]
        }
        return finalScore
    }

    function submitQuiz(){
        setTimeLeft(0)
        setTimer(false)
        setGameover(true)
    }

    function formatTimeLeft(time) {
        // The largest round integer less than or equal to the result of time divided being by 60.
        const minutes = Math.floor(time / 60);
        
        // Seconds are the remainder of the time divided by 60 (modulus operator)
        let seconds = time % 60;
        
        // If the value of seconds is less than 10, then display seconds with a leading zero
        if (seconds < 10) {
          seconds = `0${seconds}`;
        }
      
        // The output in MM:SS format
        return `${minutes}:${seconds}`;
      }

        if(loading){
            return(
                <h2>Loading...</h2>
            )
        }
        
        else if(!timer && !gameover){
            return(   
            <form onSubmit={submitHandler} className="quiz-entry-menu">
                <label>Please choose difficulty</label>
                <p>Following are some Rules for the game-
                    <ol>
                        <li>Don't cheat</li>
                        <li>Each question has +4 marks for correct response and -1 for incorrect response</li>
                        <li>0 marks for an unattempted quetion</li>
                    </ol>
                </p>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <button type="submit">Start Game!</button>
            </form>
            )
        }
        else if(timer && !gameover){
            return(
                <div className="quiz-questions-page">
                    <div className="question-card-container">
                        {questions.map((q,i) => (<div key = {i}>
                            <Card questionIndex ={i} Q={q.question} I = {q.incorrect_answers} A = {q.correct_answer} setScore={setScore} scoreIndex={i}/>
                        </div>))}
                    <button onClick={submitQuiz}>Submit</button>
                    </div>
                    <div className="timer-container"><div className="timer-box"><CircularProgressbar value={testTime - timeLeft} maxValue={testTime} text={formatTimeLeft(timeLeft/timeInterval)} /></div></div>
                </div>
            )
        }
        else if(gameover){
            return (
                <div className="gameover-card">
                    <div>Your score is {scoreHandler()}</div>
                    <div className="btn-container">
                        <button onClick={() => history.push('/')}>Go to home</button>
                        <button onClick={resetHandler}>Retry</button>
                    </div>
                </div>
            )
        }
}

export default Quiz
