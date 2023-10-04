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

  const api_key = "mAb59WInPy7nbV7ziIGPDkyPKK0j4G2ZOL2toiRiyjrbqvf1koaV66y6";
  let data = null;

  const handleRemove = () => {
    setImageUrls([]);
  };

  const handle_image_generation = async () => {
    setImageUrls([]);
    await axios
      .get(
        `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=${per_page}&size=${size}&orientation=${orientation}`,
        {
          headers: {
            Authorization: api_key,
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

      {/*–––––––––––––––––––––––– Generated Images ––––––––––––––––––––––––––*/}
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
      {imageUrls.length !== 0 ? (
          <>
            <center><p><strong>Note:</strong>&nbsp;Image loading depends on your internet speed & quality of Image selected</p></center>
          </>
        ) : (
          <></>
        )}
    </Layout>
  );
}

export default App;
