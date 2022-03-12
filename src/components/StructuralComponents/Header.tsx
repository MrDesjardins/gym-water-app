import { BsArrowLeft } from "solid-icons/bs";
import { Button } from "../Button/Button";
import styles from "./Header.module.css";
export interface HeaderProps {
  title: string;
  subtitle?: string;
  subtitleDetail?: string;
  backButtonLink?: string;
}
export const Header = (props: HeaderProps) => {
  return (
    <div class={styles.Header}>
      <header>
        <h1>{props.title}</h1>
        {props.backButtonLink && (
          <Button class={styles.back} link={props.backButtonLink}>
            <BsArrowLeft size={24} color="#fff" />
            Back
          </Button>
        )}

        {props.subtitle && <h2>{props.subtitle}</h2>}
        {props.subtitleDetail && (
          <>
            <span>|</span>
            <h3>{props.subtitleDetail}</h3>
          </>
        )}
      </header>
    </div>
  );
};
