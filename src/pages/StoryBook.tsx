import styles from "./StoryBook.module.css";
import { RepSelector } from "../components/RepsSelector/RepSelector";
import { RepsTempo } from "../components/RepsTempo/RepsTempo";
import { SingleWeightSelector } from "../components/SingleWeightSelector/SingleWeightSelector";
import { SingleWeightThinSelector } from "../components/SingleWeightThinSelector/SingleWeightThinSelector";
import { createSignal } from "solid-js";
export const StoryBook = () => {
  const [repGroupId, setRepGroupId] = createSignal(0);
  const [repGroupId2, setRepGroupId2] = createSignal(0);
  return (
    <div class={styles.StoryBook}>
      <div class={styles.item} style={{ width: "150px" }}>
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
      <div class={styles.item} style={{ width: "150px" }}>
        <RepSelector
          height={300}
          width={50}
          repsChoices={[6, 8, 10, 12, 16]}
          getCurrentReps={(reps) => {
            console.log("Rep Selector:", reps);
          }}
        />
      </div>
      <div class={styles.item} style={{ width: "300px" }}>
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
      <div class={styles.item} style={{ width: "300px" }}>
        <div style={{ height: "350px" }}>
          <RepsTempo
            repStartGroupId={repGroupId()}
            repStopGroupId={repGroupId2()}
            height={300}
            width={300}
            expectedReps={12}
            startTimeInMs={0}
          />
        </div>
        <button onclick={() => setRepGroupId(repGroupId() + 1)}>Start({repGroupId()})</button>
        <button onclick={() => setRepGroupId(repGroupId2() + 1)}>Stop ({repGroupId2()})</button>
      </div>
    </div>
  );
};
