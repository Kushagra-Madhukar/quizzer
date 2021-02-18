import React, {useState, useEffect} from 'react'

const Card = ({Q, A, I, setScore, scoreIndex}) => {
    const options = [...I, A]
    const [selected, setSelected] = useState()
    const [ansChanged, setAnsChanged] = useState(false)
    useEffect(() => {
        if(selected === undefined){
            // setScore(score => score)
        }
        else if(selected === A) setScore(score => ({...score, [scoreIndex]: 4}))
        else setScore(score => ({...score, [scoreIndex]: -1}))
    }, [ansChanged])

    const selectHandler = (option) => {
        setSelected(option)
        setAnsChanged(!ansChanged)
    }
    return (
        <div style={{display: 'flex',
        width: '100%'}}>
            <div dangerouslySetInnerHTML={{ __html: Q}}></div>
            <form>
                {options.map((option,i) => 
                <div key={i}><input type='radio' name={option} value={option} checked={option === selected} onChange={() => selectHandler(option)}/><div dangerouslySetInnerHTML={{ __html: option}}/></div>
                )
            }
            </form>
        </div>
    )
}

export default Card
