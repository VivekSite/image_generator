import { useState } from "react";
import "./index.css";
import Layout from "./Layout/Layout";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [orientation, setOrientation] = useState("landscape");
  const [size, setSize] = useState("medium");
  const [per_page, setPer_page] = useState(10);
  const [imageUrls, setImageUrls] = useState([]);
  let [page, setPage] = useState(1);

  let data = null;

  const handleRemove = () => {
    document.getElementById('noImageFound').style.display = 'none'
    setImageUrls([]);
  };

  const handle_image_generation = async () => {
    document.getElementById('noImageFound').style.display = 'none'
    if(!query){ alert("No Query Is Given\nSearch To Get Images"); return }
    document.getElementById('wait').style.display = 'block'
    setImageUrls([]);
    await axios
    .get(
      `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=${per_page}&size=${size}&orientation=${orientation}`,
      {
        headers: {
          Authorization: process.env.API_KEY,
        },
      }
      )
      .then((res) => (data = res.data))
      .catch((error) => {
        console.log("Error fetching images " + error);
      });
      
    if (data) {
      setImageUrls(data.photos.map((obj) => obj.src.original));
    }
    document.getElementById('wait').style.display = 'none'

    if(data.photos.length===0){
      document.getElementById('noImageFound').style.display = 'block'
    }
  };

  const getNextPage = () => {
    setPage(page+=1);
    handle_image_generation();
  }

  const getPrevPage = () => {
    if(page > 1){
      setPage(page-=1);
      handle_image_generation();
    }
  }

  const sizeArr = ["tiny", "small", "medium", "large", "large2x", "original"];
  const orientationArr = ["Portrait", "Landscape", "Square"];

  return (
    <Layout>
      <div id="searchArea">
        {/*–––––––––––––––––––––––– Searchbar ––––––––––––––––––––––––*/}
        <input
          className="styleBox"
          id="searchBar"
          style={{ backgroundColor: "#FFF4A3", cursor: "text" }}
          type="text"
          value={query}
          onChange={(e) => {setQuery(e.target.value); setPage(1)}}
          placeholder="Search To Get Images"
        />
        <div className="btnSelection">
          {/*–––––––––––––––––––––––– Orientation Selection ––––––––––––––––––––––––*/}
          <select
            style={{ backgroundColor: "#E7E9EB" }}
            className="styleBox"
            name="orientation"
            value={orientation}
            onChange={(e) => setOrientation(e.target.value)}
          >
            {orientationArr.map((option) => (
              <option value={option.toLowerCase()}>{option}</option>
            ))}
          </select>

          {/*–––––––––––––––––––––––– Size Selection ––––––––––––––––––––––––*/}
          <select
            style={{ backgroundColor: "#FFC0C7" }}
            className="styleBox"
            name="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            {sizeArr.map((option) => (
              <option value={option.toLowerCase()}>{option}</option>
            ))}
          </select>

          {/*–––––––––––––––––––––––– quantity Selection ––––––––––––––––––––––––*/}
          <select
            style={{ backgroundColor: "#FFC0C7" }}
            className="styleBox"
            name="per_Page"
            value={per_page}
            onChange={(e) => setPer_page(e.target.value)}
          >

            <option value={10}>10 Img</option>
            <option value={20}>20 Img</option>
            <option value={30}>30 Img</option>
            <option value={50}>50 Img</option>
          </select>
        </div>

        <div id="btnContainer">
          {/*–––––––––––––––––––––––– Generate Button ––––––––––––––––––––––––*/}
          <button
            name="generate"
            className="styleBox"
            onClick={handle_image_generation}
          >
            Generate
          </button>

          {/*–––––––––––––––––––––––– Clear Button ––––––––––––––––––––––––*/}
          <button name="clear" className="styleBox" onClick={handleRemove}>
            Clear
          </button>
        </div>
      </div>

      <center><p style={{color:'gray'}}><strong style={{color:'red'}}>Note:</strong>&nbsp;Image loading depends on your internet speed & quality of Image selected</p></center>

      {/*–––––––––––––––––––––––– Generated Images ––––––––––––––––––––––––––*/}

      <div id="wait">
        <center><p>Please Wait...</p></center>
      </div>
      <div id="noImageFound">
        <center>
          <p>No Images Found! <br />Search For Another Word</p>
        </center>
      </div>
      <div id="image-container">
        {
          imageUrls.map((imageUrl, index) => (
          <img src={imageUrl} alt={`Error Loading..`} key={index} />
        ))}

      </div>
      {/*–––––––––– conditional rendering of Prev & Next buttons –––––––––*/}
      {imageUrls.length !== 0 ? (
        <div id='pageBtns'>
          <button name="prevPage" className="styleBox" onClick={getPrevPage}>
            &larr; prevPage
          </button>
          <button name="nextPage" className="styleBox" onClick={getNextPage}>
            nextPage &rarr;
          </button>
        </div>
      ) : (
        <></>
      )}
    </Layout>
  );
}

export default App;
