import axios, {} from 'axios'
import React, {useState, useEffect} from 'react'

const Home = () => {
    
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

    useEffect(() => {
        let mounted = false
        let arre = []
        if(!mounted && categories !== undefined){
           async function myAsync(){
               try{
                await categories.map(categ => {
                        axios.get(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q='${categ.name}'`)
                        .then(res => {setImages([...images, res.data.totalHits !== 0? {id: categ.id, url: res.data.hits[0].pageURL} : {id: categ.id, url: null}])})
                        .then(() => console.log(images))
                    });
                }
                catch(e){
                    console.log(e)
                }
            }
            myAsync()
            
        }
        return () => {
            mounted = true
        }
    }, [gotdata])

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
                {}
            </div>
        </div>
    )
}

export default Home
