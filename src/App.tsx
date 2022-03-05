import type { Component } from "solid-js";
import styles from "./App.module.css";
import { RepsTempo } from "./components/RepsTempo/RepsTempo";
import { SingleWeightSelector } from "./components/SingleWeightSelector/SingleWeightSelector";
import { SingleWeightThinSelector } from "./components/SingleWeightThinSelector/SingleWeightThinSelector";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <div class={styles.item}>
        <SingleWeightThinSelector
          height={300}
          width={30}
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
      <div class={styles.item}>
        <RepsTempo height={300} width={300} />
      </div>
    </div>
  );
};

export default App;
