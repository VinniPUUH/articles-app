import { ReactNode, FC } from "react";

import styles from "./base-container.module.scss"

interface IBaseContainer {
  children: ReactNode;
}

const BaseContainer: FC<IBaseContainer> = ({ children }) => {
  return (
    <main className={styles.container}> {children}</main>
  );
};

export default BaseContainer;