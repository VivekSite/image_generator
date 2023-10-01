import { useState } from "react";
import "./index.css";

function App() {
  const [query, setQuery] = useState();
  const [orientation, setOrientation] = useState();
  const [size, setSize] = useState();

  const api_key = "mAb59WInPy7nbV7ziIGPDkyPKK0j4G2ZOL2toiRiyjrbqvf1koaV66y6";
  const per_page = 10;

  const handle_image_generation = () => {
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
        const images = data.photos;
        const imageContainer = document.getElementById("image-container");
  
        images.forEach((image) => {
          const imgElement = document.createElement("img");
          imgElement.src = image.src.medium;
          imageContainer.appendChild(imgElement);
        });
      })
      .catch((error) => {
        console.log("Error fetching images " + error);
      });
  }

  return (
    <>
      <div id="searchArea">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search To Get Images"
        />
        <select name='orientation' value={orientation} onChange={e => setOrientation(e.target.value)}>
          <option value='' selected>orientation</option>
          <option value='square'>Square</option>
          <option value='landscape' >Landscape</option>
          <option value='portrait' >Portrait</option>
        </select>

        <select name='size' value={size} onChange={e => setSize(e.target.value)}>
          <option value='' selected>Size</option>
          <option value='small'>Small</option>
          <option value='medium'>Medium</option>
          <option value='large'>Large</option>
        </select>
        <button onClick={handle_image_generation}>generate</button>
      </div>
      <div id="image-container">

      </div>
    </>
  );
}

export default App;
