import { useParams } from "solid-app-router";
import { createSignal } from "solid-js";
import { style } from "solid-js/web";
import { AddSet } from "../../components/AddSet/AddSet";
import { RepSelector } from "../../components/RepsSelector/RepSelector";
import { SingleWeightThinSelector } from "../../components/SingleWeightThinSelector/SingleWeightThinSelector";
import { CONSTANTS } from "../../models/constants";
import { ExerciseSet, getNewSet } from "../../models/exerciseSet";
import { MainStructure } from "../../structure/MainStructure";
import { getMainRoutes, ROUTES } from "../routes";
import styles from "./SingleExercise.module.css";
export const SingleExercise = () => {
  const params = useParams();
  const COMPONENT_HEIGHT = 400;
  const lastKnownWeightForExercise = 50;
  const REP_SELECTOR_WIDTH = 50;
  const [setData, setSetData] = createSignal<ExerciseSet[]>([]);
  return (
    <MainStructure
      title="Training"
      subtitle="Per Exercise"
      backButtonLink={getMainRoutes(ROUTES.SINGLE_EXERCISE)}
    >
      <div class={styles.root}>
        {setData().map((set, i) => (
          <div
            class={styles.oneset}
            style={{ width: `${75 + REP_SELECTOR_WIDTH}px` }}
          >
            <div class={styles.child1}>
              <SingleWeightThinSelector
                defaultWeight={set.weight}
                minimumWeight={CONSTANTS.MIN_WEIGHT}
                maximumWeight={CONSTANTS.MAX_WEIGHT}
                getCurrentWeight={(weight) => {
                  setData()[i].weight = weight;
                }}
                height={COMPONENT_HEIGHT}
              />
            </div>
            <div class={styles.child1}>
              <RepSelector
                height={COMPONENT_HEIGHT}
                width={REP_SELECTOR_WIDTH}
                repsChoices={[6, 8, 10, 12, 16]}
                repSelection={set.reps}
                getCurrentReps={(reps) => {
                  setData()[i].reps = reps;
                }}
              />
            </div>
          </div>
        ))}
        <AddSet
          width={160}
          height={COMPONENT_HEIGHT}
          onClick={() => {
            setSetData((prev) => {
              const newData = prev.slice();
              newData.push(getNewSet());
              return newData;
            });
          }}
        >
          <div class={styles.oneset}>
            <div class={styles.child1}>
              <SingleWeightThinSelector
                defaultWeight={lastKnownWeightForExercise}
                minimumWeight={CONSTANTS.MIN_WEIGHT}
                maximumWeight={CONSTANTS.MAX_WEIGHT}
                getCurrentWeight={(weight) => {
                  console.log("Set the weight to: ", weight);
                }}
                height={COMPONENT_HEIGHT}
              />
            </div>
            <div class={styles.child1}>
              <RepSelector
                height={COMPONENT_HEIGHT}
                width={REP_SELECTOR_WIDTH}
                repsChoices={[6, 8, 10, 12, 16]}
                getCurrentReps={(reps) => {
                  console.log("Rep Selector:", reps);
                }}
              />
            </div>
          </div>
        </AddSet>
      </div>
    </MainStructure>
  );
};
