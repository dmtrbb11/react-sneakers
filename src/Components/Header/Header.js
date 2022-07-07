import styles from "./Header.module.css";
import { Link } from "react-router-dom";
let Header = (props) => {
  
  // calculating sum in header
  let sum = 0;
  for (let i = 0; i < props.sneakersCartArr.length; i++) {
    sum = sum + parseInt(props.sneakersCartArr[i].price.replace(/[^0-9]/g, ""));
  }

  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.header_left}>
          <img width={40} height={40} src="/img/logo.png" alt="logo" />
          <div className={styles.left_txt}>
            <h2 className={styles.left_h2}>REACT SNEAKERS</h2>
            <p className={styles.left_p}>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <div className={styles.header_right}>
        <div className={styles.basket} onClick={props.priceClick}>
          <img
            width={18}
            height={18}
            src="/img/basket.svg"
            alt="basket"
            className={styles.basket_img}
          />
          <span className={styles.basket_price}>{sum + " руб."}</span>
        </div>
        <Link to="/liked">
          <img
            onClick={props.favouriteClick}
            width={21}
            height={19}
            src="/img/picked.svg"
            alt="picked"
            className={styles.favorites}
          />
        </Link>
        <Link to="/profile">
          <img
            width={20}
            height={20}
            src="/img/profile.svg"
            alt="profile"
            className={styles.profile}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
