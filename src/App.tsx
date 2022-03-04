import type { Component } from "solid-js";
import styles from "./App.module.css";
import { SingleWeightSelector } from "./components/SingleWeightSelector";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <div class={styles.item}>
        <SingleWeightSelector
          height={300}
          width={200}
          defaultWeight={0}
          minimumWeight={0}
          maximumWeight={200}
          getCurrentWeight={(weight) => {
            console.log(weight);
          }}
        />
      </div>
      <div class={styles.item}>
        <SingleWeightSelector
          height={300}
          width={200}
          defaultWeight={100}
          minimumWeight={0}
          maximumWeight={200}
          getCurrentWeight={(weight) => {
            console.log(weight);
          }}
        />
      </div>
      <div class={styles.item}>
        <SingleWeightSelector
          height={300}
          width={200}
          defaultWeight={200}
          minimumWeight={0}
          maximumWeight={200}
          getCurrentWeight={(weight) => {
            console.log(weight);
          }}
        />
      </div>
    </div>
  );
};

export default App;
