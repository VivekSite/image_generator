import { useState } from "react";
import "./index.css";
import Layout from "./Layout/Layout";

function App() {
  const [query, setQuery] = useState();
  const [orientation, setOrientation] = useState();
  const [size, setSize] = useState();
  const [per_page, setPer_page] = useState(10);

  const api_key = "mAb59WInPy7nbV7ziIGPDkyPKK0j4G2ZOL2toiRiyjrbqvf1koaV66y6";

  const handle_image_generation = () => {
    const imageContainer = document.getElementById("image-container");

    fetch(
      `https://api.pexels.com/v1/search?query=${query}&per_page=${per_page}&size=${size}&orientation=${orientation}`,
      {
        headers: {
          Authorization: api_key,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        const images = data.photos;

        images.forEach((image) => {
          const imgElement = document.createElement("img");
          imgElement.src = image.src.medium;
          imageContainer.appendChild(imgElement);
        });
      })
      .catch((error) => {
        console.log("Error fetching images " + error);
      });
  };

  return (
    <Layout>
      <div id="searchArea">
      {/****************** Searchbar ******************************/}
        <input
          className="selectionBox"
          id="searchBar"
          style={{backgroundColor:'#FFF4A3', cursor:'text'}}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search To Get Images"
        />
        <div className="btnSelection">
          {/****************** Orientation Selection ************************/}
          <select
            style={{backgroundColor:'#E7E9EB'}}
            className="selectionBox"
            name="orientation"
            value={orientation}
            onChange={(e) => setOrientation(e.target.value)}
          >
            <option value="">
              Orientation
            </option>
            <option value="square">Square</option>
            <option value="landscape">Landscape</option>
            <option value="portrait">Portrait</option>
          </select>

          {/****************** Size Selection ************************/}
          <select
            style={{backgroundColor:'#FFC0C7'}}
            className="selectionBox"
            name="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="" selected>
              Size
            </option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>

          {/****************** Per_Page Selection ************************/}
          <select
            style={{backgroundColor:'#FFC0C7'}}
            className="selectionBox"
            name="per_Page"
            value={per_page}
            onChange={(e) => setPer_page(e.target.value)}
          >
            <option value="" selected>
              10 Img
            </option>
            <option value={20}>20 Img</option>
            <option value={30}>30 Img</option>
            <option value={50}>50 Img</option>
          </select>
        </div>

        <div id="btnContainer">
          {/****************** Generate Button ************************/}
          <button name="generate" className="selectionBox" onClick={handle_image_generation}>
            Generate
          </button>

          {/****************** Clear Button ************************/}
          <button name="clear" className="selectionBox">
            Clear
          </button>
        </div>
      </div>
      <div id="image-container"></div>
    </Layout>
  );
}

export default App;
