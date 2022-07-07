import SneakerItem from "../Components/SneakerItem/SneakerItem";
import axios from "axios";

let ProfilePage = (props) => {
  let deleteOrder = async () => {
    for (let i = 0; i < props.orderSneakers.length; i++) {
      const item = props.orderSneakers[i];
      await axios.delete(
        `https://626e76ade58c6fabe2df4f7c.mockapi.io/Order/` + item.id
      );
    }
    props.setOrderSneakers([]);
  };

  return (
    <section className="sneakers_list">
      <div>
        <h2 className="sneakers_list-h2">Мои покупки</h2>
      </div>
      <div className="sneakers_list-grid">
        {props.orderSneakers.map((e, index) => {
          return (
            <SneakerItem
              id={e.id}
              key={index}
              name={e.name}
              price={e.price}
              imgURL={e.imgURL}
              sneakerObj={e}
              orderSneakers={props.orderSneakers}
            />
          );
        })}
      </div>
      <button onClick={deleteOrder} className="deleteOrder_btn">
        Отменить заказ
      </button>
    </section>
  );
};

export default ProfilePage;
