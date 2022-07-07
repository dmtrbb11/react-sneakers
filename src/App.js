import "./style.css";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import SideMenu from "./Components/SideMenu/SideMenu";
import Header from "./Components/Header/Header";
import HomePage from "./pages/HomePage";
import LikedPage from "./pages/LikedPage";
import ProfilePage from "./pages/ProfilePage";
import React from "react";

function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [sneakersArr, setSneakersArr] = React.useState([]); // sneakers on the page
  const [sneakersCartArr, setSneakersCartArr] = React.useState([]); // sneakers in the card
  const [sneakersLikedArr, setSneakersLikedArr] = React.useState([]); // liked sneakers
  const [orderSneakers, setOrderSneakers] = React.useState([]); // order
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    async function fetchData() {
      const sneakersRequest = await fetch(
        "https://626e76ade58c6fabe2df4f7c.mockapi.io/sneakers"
      ).then((response) => response.json());
      const orderRequest = await axios.get(
        "https://626e76ade58c6fabe2df4f7c.mockapi.io/Order"
      );
      const cardRequest = await axios.get(
        "https://626e76ade58c6fabe2df4f7c.mockapi.io/sneakersCard"
      );
      const likedRequest = await axios.get(
        "https://626e76ade58c6fabe2df4f7c.mockapi.io/likedSneakers"
      );

      setSneakersArr(sneakersRequest);
      setOrderSneakers(orderRequest.data);
      setSneakersCartArr(cardRequest.data);
      setSneakersLikedArr(likedRequest.data);
    }

    fetchData();
    // Get zapros to render items on main page
    // fetch("https://626e76ade58c6fabe2df4f7c.mockapi.io/sneakers")
    //   .then((response) => response.json())
    //   .then((commits) => {
    //     setSneakersArr(commits);
    //   });

    // Get zapros to render items in card
    // axios
    //   .get("https://626e76ade58c6fabe2df4f7c.mockapi.io/sneakersCard")
    //   .then((res) => {
    //     setSneakersCartArr(res.data);
    //   });

    // Get zapros to render liked items(to update items on reload liked page)
    // axios
    //   .get("https://626e76ade58c6fabe2df4f7c.mockapi.io/likedSneakers")
    //   .then((res) => {
    //     setSneakersLikedArr(res.data);
    //   });
  }, []);

  return (
    <div className="container">
      {cartOpened ? (
        <SideMenu
          closeCardClick={() => {
            setCartOpened(false);
          }}
          setCartOpened={setCartOpened}
          sneakersCartArr={sneakersCartArr}
          updateCardArr={setSneakersCartArr}
          orderSneakers={orderSneakers}
          setOrderSneakers={setOrderSneakers}
        />
      ) : null}

      <Header
        priceClick={() => {
          axios // get zaprov click on card(для обновления стейта при работе в прилодении)
            .get("https://626e76ade58c6fabe2df4f7c.mockapi.io/sneakersCard")
            .then((res) => {
              setSneakersCartArr(res.data);
            });
          setCartOpened(true);
        }}
        favouriteClick={() => {
          axios // get zapros click on liked(для обновления стейта при работе в прилодении)
            .get("https://626e76ade58c6fabe2df4f7c.mockapi.io/likedSneakers")
            .then((res) => {
              setSneakersLikedArr(res.data);
            });
        }}
        sneakersCartArr={sneakersCartArr}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              sneakersArr={sneakersArr}
              sneakersCartArr={sneakersCartArr}
              sneakersLikedArr={sneakersLikedArr}
              updateLikedArr={setSneakersLikedArr}
              setSneakersCartArr={setSneakersCartArr}
              orderSneakers={orderSneakers}
            />
          }
        ></Route>
        <Route
          path="/liked"
          element={
            <LikedPage
              sneakersCartArr={sneakersCartArr}
              sneakersLikedArr={sneakersLikedArr}
              setSneakersLikedArr={setSneakersLikedArr}
              setSneakersCartArr={setSneakersCartArr}
              orderSneakers={orderSneakers}
            />
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <ProfilePage
              setOrderSneakers={setOrderSneakers}
              orderSneakers={orderSneakers}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
