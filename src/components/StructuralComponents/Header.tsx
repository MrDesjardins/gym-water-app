import styles from "./Header.module.css";
export interface HeaderProps {
  title: string;
}
export const Header = (props: HeaderProps) => {
  return (
    <div class={styles.Header}>
      <h1>{props.title}</h1>
    </div>
  );
};
