import styles from "./StoryBook.module.css";
import { RepSelector } from "../components/RepsSelector/RepSelector";
import { RepsTempo } from "../components/RepsTempo/RepsTempo";
import { SingleWeightSelector } from "../components/SingleWeightSelector/SingleWeightSelector";
import { SingleWeightThinSelector } from "../components/SingleWeightThinSelector/SingleWeightThinSelector";
import { createSignal } from "solid-js";
import { useSensors } from "../sensors/context/SensorsContext";
import { FakeMagneticSensorSingleton } from "../sensors/fakeSensors/fakeMagneticSensor";
import { FakeUltraSonirSensorSingleton } from "../sensors/fakeSensors/fakeUltraSonicSensor";
export const StoryBook = () => {
  const sensors = useSensors();
  return (
    <div class={styles.StoryBook}>
      <div class={styles.item} style={{ width: "150px" }}>
        <SingleWeightThinSelector
          height={300}
          actualWeight={100}
          desiredWeight={100}
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
          actualWeight={100}
          desiredWeight={100}
          minimumWeight={0}
          maximumWeight={200}
          getCurrentWeight={(weight) => {
            console.log("Fat out:", weight);
          }}
        />
      </div>
      <div class={styles.item} style={{ width: "300px" }}>
        <div style={{ height: "350px" }}>
          <RepsTempo height={300} width={300} expectedReps={12} />
        </div>
        <button
          onclick={() => {
            FakeMagneticSensorSingleton.isOpen = true;
            FakeUltraSonirSensorSingleton.isMoving = true;
          }}
        >
          Start
        </button>
        <button
          onclick={() => {
            FakeMagneticSensorSingleton.isOpen = false;
            FakeUltraSonirSensorSingleton.isMoving = false;
          }}
        >
          Stop
        </button>
      </div>
    </div>
  );
};
