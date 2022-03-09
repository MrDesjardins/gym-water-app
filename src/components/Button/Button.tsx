import { useNavigate } from "solid-app-router";
import styles from "./Button.module.css";
import { JSX } from "solid-js";
export interface ButtonProps {
  children: JSX.Element | string;
  link?: string;
  props?: JSX.ButtonHTMLAttributes<HTMLButtonElement>;
  class?: string;
}
export const Button = (props: ButtonProps) => {
  const navigate = useNavigate();
  return (
    <button
      class={styles.Button}
      classList={{
        [props.class!]: props.class !== undefined,
      }}
      onclick={() => {
        if (props.link !== undefined) {
          navigate(props.link);
        }
      }}
      {...props.props}
    >
      {props.children}
    </button>
  );
};
