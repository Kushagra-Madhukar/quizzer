import React, {useState, useEffect} from 'react'
import './Card.scss'

const Card = ({Q, A, I, setScore, scoreIndex, questionIndex}) => {
    const options = [...I, A]
    const [selected, setSelected] = useState()
    const [ansChanged, setAnsChanged] = useState(false)
    useEffect(() => {
        if(selected === undefined || selected === null){
            setScore(score => ({...score, [scoreIndex]: 0}))
        }
        else if(selected === A) setScore(score => ({...score, [scoreIndex]: 4}))
        else setScore(score => ({...score, [scoreIndex]: -1}))
    }, [ansChanged])

    const selectHandler = (option) => {
        if(option === selected){
            setSelected(null)
        }
        else setSelected(option)
        setAnsChanged(!ansChanged)
    }
    return (
        <div className="question-paper">
            <div dangerouslySetInnerHTML={{ __html: `${questionIndex+1}. ${Q}`}} className="quiz-question"></div>
            <form>
                {options.map((option,i) => 
                <div key={i} className="question-option"><input type='radio' name={option} value={option} checked={option === selected} onClick={() => selectHandler(option)}/><div dangerouslySetInnerHTML={{ __html: option}}/></div>
                )
            }
            </form>
        </div>
    )
}

export default Card
