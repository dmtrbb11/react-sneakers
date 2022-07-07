import SneakerItem from "../Components/SneakerItem/SneakerItem";

let HomePage = ({
  searchValue,
  setSearchValue,
  sneakersArr,
  sneakersLikedArr,
  updateLikedArr,
  setSneakersCartArr,
  sneakersCartArr,
  orderSneakers,
}) => {
  let searchSneakers = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <section className="sneakers_list">
      <div className="sneakers_list-up">
        <h2 className="sneakers_list-h2">
          {searchValue
            ? `Результат поиска по "${searchValue}"`
            : `Все кроссовки`}
        </h2>
        <label className="label">
          <img className="search_loop-img" src="/img/input.svg" alt="" />
          <input
            onChange={searchSneakers}
            value={searchValue}
            className="sneakers_list-input"
            type="text"
            placeholder="Поиск..."
          />
          <img
            onClick={() => setSearchValue("")}
            className="search_deleteText-img"
            src="/img/searchDeleteText.jpg"
            alt=""
          />
        </label>
      </div>
      <div className="sneakers_list-grid">
        {sneakersArr
          .filter((e) => {
            return e.name.toLowerCase().includes(searchValue.toLowerCase());
          })
          .map((e, index) => {
            return (
              <SneakerItem
                sneakersCartArr={sneakersCartArr}
                likedArr={sneakersLikedArr}
                updateLikedArr={updateLikedArr}
                updateCardArr={setSneakersCartArr}
                id={e.id}
                key={index}
                name={e.name}
                price={e.price}
                imgURL={e.imgURL}
                sneakerObj={e}
                imgPlusClicked={true}
                isLiked={sneakersLikedArr.some((obj) => obj.name === e.name)}
                orderSneakers={orderSneakers}
              />
            );
          })}
      </div>
    </section>
  );
};

export default HomePage;
