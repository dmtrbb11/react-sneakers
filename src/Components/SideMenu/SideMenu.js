import styles from "./SideMenu.module.css";
import axios from "axios";

let SideMenu = ({
  closeCardClick,
  sneakersCartArr,
  updateCardArr,
  orderSneakers,
  setOrderSneakers,
  setCartOpened,
}) => {
  const deleteItemCard = (id, sneakerObj) => {
    axios.delete(
      `https://626e76ade58c6fabe2df4f7c.mockapi.io/sneakersCard/${id}`
    );
    updateCardArr(
      sneakersCartArr.filter((e) => {
        return e.id !== id;
      })
    );
  };

  // total order price
  let sum = 0;
  for (let i = 0; i < sneakersCartArr.length; i++) {
    sum = sum + parseInt(sneakersCartArr[i].price.replace(/[^0-9]/g, ""));
  }

  // make order
  let makeOrder = async () => {
    for (const index of sneakersCartArr) {
      await axios.post(
        "https://626e76ade58c6fabe2df4f7c.mockapi.io/Order",
        index
      );
    }
    for (let i = 0; i < sneakersCartArr.length; i++) {
      const item = sneakersCartArr[i];
      await axios.delete(
        `https://626e76ade58c6fabe2df4f7c.mockapi.io/sneakersCard/` + item.id
      );
    }
    setOrderSneakers(sneakersCartArr);
    updateCardArr([]);
  };

  return (
    <div className={styles.darkbg}>
      {orderSneakers.length > 0 ? (
        <div className={styles.items_basket_wrapper}>
          <div className={styles.order_wrapper}>
            <h2 className={styles.order_basket}>Корзина</h2>
            <div className={styles.order_info}>
              <div className={styles.order_center}>
                <img
                  width={83}
                  height={120}
                  src="/img/order.jpg"
                  alt="order_complete"
                />
                <h2 className={styles.order_h2}>Заказ оформлен!</h2>
                <p className={styles.order_p}>
                  Ваш заказ скоро будет передан курьерской доставке
                </p>
              </div>
              <button
                onClick={() => {
                  setCartOpened(false);
                }}
                className={styles.makeOrder_btn}
              >
                Вернуться назад
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.items_basket_wrapper}>
          <div className={styles.items_basket}>
            <div className={styles.items_basket_header}>
              <h2 className={styles.basket_h2}>Корзина</h2>
              <img
                onClick={closeCardClick}
                className={styles.basket_closeBtn}
                src="/img/basket_btn.svg"
                alt=""
              />
            </div>
            <div className={styles.basket_list}>
              {sneakersCartArr.map((e, index) => {
                return (
                  <div key={index} className={styles.basket_item}>
                    <img src={e.imgURL} alt="sneaker" width={70} height={70} />
                    <div className={styles.basket_item_txt}>
                      <p className={styles.basket_item_p}>{e.name}</p>
                      <span className={styles.basket_item_span}>{e.price}</span>
                    </div>
                    <button
                      onClick={() => deleteItemCard(e.id, e)}
                      className={styles.basket_item_btn}
                    ></button>
                  </div>
                );
              })}
            </div>
            <div className={styles.basket_footer}>
              <div className={styles.footer_txt}>
                <span className={styles.total_txt}>Итого: </span>
                <div className={styles.dashed_line}></div>
                <span className={styles.total_price}>{sum + " руб."}</span>
              </div>
              <button className={styles.order_btn} onClick={makeOrder}>
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideMenu;
