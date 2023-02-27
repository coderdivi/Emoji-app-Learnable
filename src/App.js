import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
function App() {
  let [data, setData] = useState([]);
  let [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      "https://emoji-api.com/emojis?access_key=409b077fd6009f471debaf21d4dcf87e49aa5841"
    )
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);
  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let handleSubmit = () => {
    if (search !== "") {
      fetch(
        `https://emoji-api.com/emojis?search=${search}&access_key=409b077fd6009f471debaf21d4dcf87e49aa5841`
      )
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            setData(res);
          } else {
            setData([]);
          }
        });
    }
  };
  return (
    <div className="App">
      <div className="menu">
        <div className="menu_text">
          <h1>Emojis and Emoticons😈||Built with React</h1>
          <p>
            To use, type a keyword of an emoji you want(eg. face), and hit the
            search button.
          </p>
          <div>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => handleSearch(e)}
            />
            <button
              className="search"
              onClick={() => handleSubmit()}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        {data.map((e, i) => (
          <div
            className="card"
            key={e.slug}
          >
            <p className="emo">{e.character}</p>
            <p className="name">{e.unicodeName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
