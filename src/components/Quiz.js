import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Card from './Card'

const timeInterval = 1000
const testTime = 60000
const number_questions = 10
const initialScores = {}
for(let i = 0;i<number_questions;i++){
    initialScores[i] = 0
}
console.log("Init",initialScores)
const Quiz = () => {
    const history = useHistory()
    const [difficulty, setDifficulty] = useState('easy')
    const [questionsLeft, setQuestionsLeft] = useState(number_questions)
    const [questions, setQuestions] = useState([])
    const [timer, setTimer] = useState(false)
    const [gameover, setGameover] = useState(false)
    const [timeLeft, setTimeLeft] = useState(testTime)
    const [score, setScore] = useState(0)
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
            console.log("a inside", a)
        }
        console.log("a",a)
        return () => {
            console.log("a beta", a)
            clearTimeout(timer1)
        }
    }, [timer])

    const submitHandler = (Event) => {
        Event.preventDefault()
        // console.log(id)
        // console.log(difficulty)
        axios.get(`https://opentdb.com/api.php?amount=${number_questions}&category=${id}&difficulty=${difficulty}`)
            .then(res => {setQuestions(res.data.results); setTimer(true);console.log(res.data.results[0])})
            .catch(err => console.log(err))
    }

    const resetHandler = () => {
        setQuestionsLeft(number_questions)
        setQuestions([])
        setTimer(false)
        setGameover(false)
        setTimeLeft(testTime)
        setScore(0)
    }
        if(!timer && !gameover){
            return(   
            <form onSubmit={submitHandler}>
                <label>Please choose difficulty</label>
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
                <div>
                    {questions.map(q => (<div style={{display: 'flex', flex: 1}}>
                        <Card Q={q.question} I = {q.incorrect_answers} A = {q.correct_answer} setScore={setScore}/>
                    </div>))}
                    <div>{timeLeft/timeInterval}</div>
                </div>
            )
        }
        else if(gameover){
            return (
                <div>
                <div>Your Scorecard, your score is {score}</div>
                <button onClick={() => history.push('/')}>Go to home</button>
                <button onClick={resetHandler}>Retry</button>
                </div>
            )
        }
}

export default Quiz
