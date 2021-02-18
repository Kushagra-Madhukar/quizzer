import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const defaultImage = 'https://www.indianlink.com.au/wp-content/uploads/2020/06/Leeds-round-of-Great-Legal-Quiz-set-for-20-November-800x500_c.png'

const Home = () => {
  const history = useHistory();
  const [categories, setCategories] = useState();
  const [gotdata, setGotdata] = useState(false);
  const [images, setImages] = useState({});
  useEffect(() => {
    let mounted = false;
    if (!mounted) {
      axios
        .get("https://opentdb.com/api_category.php")
        .then((res) => setCategories(res.data.trivia_categories))
        .then(() => setGotdata(true));
    }
    return () => {
      mounted = true;
    };
  }, []);

  const [idPtr, setIdPtr] = useState(0)
  useEffect(() => {
    let mounted = false;
    if (!mounted && categories !== undefined && idPtr < categories.length) {
        

        axios
          .get(
            `https://pixabay.com/api/?key=${
              process.env.REACT_APP_PIXABAY_API_KEY
            }&q=${categories[idPtr].name.replace(/[^a-zA-Z ]/g, "")}`
          )
          .then((res) => {
            setImages({
              ...images,
              [categories[idPtr].id]: {url: res.data.totalHits !== 0 ? res.data.hits[Math.floor(Math.random()*res.data.hits.length)].webformatURL : null},
            });
          })
          .then(() => {setIdPtr(idPtr => idPtr+1)});

         

        
    //   });
    }
    return () => {
      mounted = true;
    };
  }, [gotdata, idPtr]);


  const checkIfExist = (id) => {
    let exist = true;
    if(images[id] === undefined || images[id].url === null)
    {
        exist = false
    }
    return exist
  }
  return (
    <div>
      Quiz
      <div>
        {categories !== undefined
          ? categories.map((categ, i) => (
              <div
                key={i}
                style={{ display: "flex" }}
                onClick={() => history.push(`/${categ.id}`)}
              >{checkIfExist(categ.id) ?
                <img src={images[categ.id].url} alt={`${categ.name} Quiz`}/> 
                :
                <img src={defaultImage} alt={`${categ.name} Quiz`}/>
              }  
                {categ.name}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Home;
