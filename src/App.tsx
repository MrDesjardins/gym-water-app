import { Component, createSignal } from "solid-js";
import styles from "./App.module.css";
import { RepsTempo } from "./components/RepsTempo/RepsTempo";
import { SingleWeightSelector } from "./components/SingleWeightSelector/SingleWeightSelector";
import { SingleWeightThinSelector } from "./components/SingleWeightThinSelector/SingleWeightThinSelector";

const App: Component = () => {
  const [repGroupId, setRepGroupId] = createSignal(0);
  return (
    <div class={styles.App}>
      <div class={styles.item}>
        <SingleWeightThinSelector
          height={300}
          defaultWeight={100}
          minimumWeight={0}
          maximumWeight={200}
          getCurrentWeight={(weight) => {
            console.log("Thin out:", weight);
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
            console.log("Fat out:", weight);
          }}
        />
      </div>
      <div class={styles.item}>
        <div style={{ height: "350px" }}>
          <RepsTempo repGroupId={repGroupId()} height={300} width={300} />
        </div>
        <button onclick={() => setRepGroupId(repGroupId() + 1)}>
          Next Set ({repGroupId()})
        </button>
      </div>
    </div>
  );
};

export default App;
