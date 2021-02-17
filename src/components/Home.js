import axios, {} from 'axios'
import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'

const Home = () => {
    const history = useHistory()
    const [categories, setCategories] = useState()
    const [gotdata, setGotdata] = useState(false)
    const [images, setImages] = useState([])
    useEffect(() => {
        let mounted = false
        if(!mounted){
            axios.get('https://opentdb.com/api_category.php')
                .then(res => setCategories(res.data.trivia_categories))
                .then(() => setGotdata(true))
        }
        return () => {
            mounted = true
        }
    }, [])

    // useEffect(() => {
    //     let mounted = false
    //     let arre = []
    //     if(!mounted && categories !== undefined){
    //             categories.map(categ => {
    //                 axios.get(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q='${categ.name}'`)
    //                     .then(res => {setImages([...images, {id: categ.id, url: res.data.totalHits !== 0 ? res.data.hits[0].pageURL : null}])})
    //                     .then(() => console.log(images))
    //                 });
            
    //     }
    //     return () => {
    //         mounted = true
    //     }
    // }, [gotdata])

    useEffect(() => {
        axios.get('https://opentdb.com/api_category.php')
            .then(res => console.log(res.data.trivia_categories))
        return () => {
        
        }
    }, [])

    return (
        <div>
            Quiz
            <div>
                {categories !== undefined ?
                categories.map(categ => 
                    <div style={{display: 'flex'}} onClick={() => history.push(`/${categ.id}`)} >{categ.name}</div>) : null}
            </div>
        </div>
    )
}

export default Home
