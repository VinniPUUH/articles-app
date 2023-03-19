import { FC, ChangeEventHandler, memo } from "react";

import styles from "./input.module.scss";

interface IInput {
  value: string;
  changeHandler: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
}

const Input: FC<IInput> = ({ value, changeHandler, placeholder }) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        value={value}
        onChange={changeHandler}
        className={styles.input}
        placeholder={placeholder}
      ></input>
    </div>
  );
};

export default memo(Input);
