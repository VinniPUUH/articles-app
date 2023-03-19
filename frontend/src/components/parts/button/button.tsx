import { FC, memo, MouseEventHandler } from "react";

import styles from "./button.module.scss";

interface IButton {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset"
}

const Button: FC<IButton> = ({ text, onClick, type }) => {
  return (
    <button className={styles.button} onClick={onClick} type={type || "button"}>{text}</button>
  );
};

export default memo(Button);
