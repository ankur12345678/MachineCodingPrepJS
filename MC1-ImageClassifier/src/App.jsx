import { useEffect, useState } from "react";
import "./index.css"; // Import the CSS file

function App() {
  const [mydata, setData] = useState([]);
  const [isModalProp, setIsModalProp] = useState(false);
  const [filteredImage, setFilteredImage] = useState([]);
  const uri = "https://jsonplaceholder.typicode.com/photos";

  useEffect(() => {
    console.log("api called");
    const apiCall = async () => {
      const res = await fetch(uri);
      const data = await res.json();
      setData(data);
    };
    apiCall();
  }, []);

  let albumId = 0;

  const handleButtonClick = (albumId) => {
    const filtered = mydata.filter((item) => albumId === item.albumId);
    setFilteredImage(filtered);
    setIsModalProp(true);
  };

  return (
    <div className="mainContainer">
      {isModalProp ? (
        <div className="imageAndButtonContainer">
          <div className="imageContainer">
            {filteredImage.map((item) => (
              <div key={item.id} className="imageItem">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <img src={item.thumbnailUrl} alt="image" />
                </a>
              </div>
            ))}
          </div>
          <button className="closeButton" onClick={() => setIsModalProp(false)}>
            Close
          </button>
        </div>
      ) : (
        <div className="buttonContainer">
          {mydata.map((item) => {
            if (albumId === item.albumId) {
              return null;
            } else {
              albumId = item.albumId;
              return (
                <button
                  key={item.id}
                  className="button"
                  onClick={() => handleButtonClick(item.albumId)}
                >
                  {`Album ${item.albumId}`}
                </button>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}

export default App;
