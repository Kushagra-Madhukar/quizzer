import React, {useState} from 'react'

const Card = ({Q, A, I}) => {
    const [options, setoptions] = useState([...I, A])
    return (
        <div style={{display: 'flex',
        width: '100%'}}>
            <div dangerouslySetInnerHTML={{ __html: Q}}></div>
            <form>
                {options.map(option => 
                <div><input type='radio'/>{option}</div>
                )
            }
            </form>
        </div>
    )
}

export default Card
