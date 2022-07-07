import SneakerItem from "../Components/SneakerItem/SneakerItem";

let LikedPage = (props) => {
  return (
    <section className="sneakers_list">
      <div>
        <h2 className="sneakers_list-h2">Мои закладки</h2>
      </div>
      <div className="sneakers_list-grid">
        {props.sneakersLikedArr.map((e, index) => {
          return (
            <SneakerItem
              likedArr={props.sneakersLikedArr}
              key={index}
              name={e.name}
              price={e.price}
              imgURL={e.imgURL}
              sneakerObj={e}
              isLiked={true}
              imgPlusClicked={true}
              sneakersCartArr={props.sneakersCartArr}
              updateLikedArr={props.setSneakersLikedArr}
              updateCardArr={props.setSneakersCartArr}
              orderSneakers={props.orderSneakers}
            />
          );
        })}
      </div>
    </section>
  );
};

export default LikedPage;
