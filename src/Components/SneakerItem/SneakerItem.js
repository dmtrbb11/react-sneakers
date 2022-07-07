import styles from "./SneakerItem.module.css";
import React from "react";
import axios from "axios";

let SneakerItem = ({
  id,
  name,
  price,
  imgURL,
  updateLikedArr,
  updateCardArr,
  sneakerObj,
  likedArr,
  sneakersCartArr,
  isLiked = false,
  imgPlusClicked = false,
  orderSneakers,
}) => {
  const [plusBtn, setPlusBtn] = React.useState(imgPlusClicked);
  const [likedBtn, setLikedBtn] = React.useState(isLiked);

  // for change plus icon when you delete item from card
  if (plusBtn) {
    if (sneakersCartArr.some((e) => e.name === sneakerObj.name)) {
    } else {
      setPlusBtn(false);
    }
  }

  const onClickLiked = () => {
    if (likedBtn === true) {
    } else {
      axios.post(
        "https://626e76ade58c6fabe2df4f7c.mockapi.io/likedSneakers",
        sneakerObj
      );
      setLikedBtn(true);
    }

    if (
      likedArr.find((e) => {
        return e.id === sneakerObj.id;
      })
    ) {
      axios.delete(
        `https://626e76ade58c6fabe2df4f7c.mockapi.io/likedSneakers/${sneakerObj.id}`
      );
      updateLikedArr(
        likedArr.filter((e) => {
          return e.id !== sneakerObj.id;
        })
      );
    }
  };

  const onClickPlus = () => {
    if (orderSneakers.length > 0) {
      alert("Для оформления нового заказа омените прошлый в личном кабинете");
    } else if (plusBtn === true) {
    } else {
      axios.post(
        "https://626e76ade58c6fabe2df4f7c.mockapi.io/sneakersCard",
        sneakerObj
      );
      // для отображения только при разовой работе с приложением сникеров в корзине
      updateCardArr((prev) => {
        return [...prev, sneakerObj];
      });
      setPlusBtn(true);
    }
  };

  return (
    <div className={styles.sneakers_item}>
      <img
        onClick={onClickLiked}
        className={styles.favourite}
        src={likedBtn ? "/img/likedSneakerClick.svg" : "/img/likedSneaker.png"}
        alt=""
      />
      <img className={styles.sneakers_img} src={imgURL} alt="sneaker_item" />
      <p className={styles.item_p}>{name}</p>
      <div className={styles.item_down}>
        <div className={styles.item_info}>
          <span className={styles.price_txt}>Цена</span>
          <span className={styles.price_number}>{price}</span>
        </div>
        <img
          onClick={() => onClickPlus()}
          className={styles.add_btn}
          src={plusBtn ? "/img/basket_btn_clicked.svg" : "/img/add_btn.svg"}
          alt=""
        />
      </div>
    </div>
  );
};

export default SneakerItem;
