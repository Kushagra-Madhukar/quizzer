import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Card from './Card'

const Quiz = () => {
    const [difficulty, setDifficulty] = useState('easy')
    const [questionsLeft, setQuestionsLeft] = useState(10)
    const [questions, setQuestions] = useState([])
    const [timer, setTimer] = useState(false)
    const {id} = useParams()
    // useEffect(() => {
    //     axios.get(`https://opentdb.com/api.php?amount=10&category=${id}&difficulty=${difficulty}`)
    //     return () => {
    //         cleanup
    //     }
    // }, [input])
    // console.log(id)
    useEffect(() => {
        let timer1
        if(timer){
            timer1 = setTimeout(() => {
                setTimer(false)
            }, 60000);
        }
        return () => {
            clearTimeout(timer1)
        }
    }, [timer])

    const submitHandler = (Event) => {
        Event.preventDefault()
        // console.log(id)
        // console.log(difficulty)
        axios.get(`https://opentdb.com/api.php?amount=10&category=${id}&difficulty=${difficulty}`)
            .then(res => {setQuestions(res.data.results); setTimer(true);console.log(res.data.results[0])})
            .catch(err => console.log(err))
    }
    
        if(!timer && questionsLeft==10){
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
        else if(timer && questionsLeft>0){
            return(
                <div>
                    {questions.map(q => (<div style={{display: 'flex', flex: 1}}>
                        <Card Q={q.question} I = {q.incorrect_answers} A = {q.correct_answer}/>
                    </div>))}
                </div>
            )
        }
}

export default Quiz
