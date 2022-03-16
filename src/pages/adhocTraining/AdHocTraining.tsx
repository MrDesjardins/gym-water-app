import { createSignal } from "solid-js";
import { Button } from "../../components/Button/Button";
import { RepsTempo } from "../../components/RepsTempo/RepsTempo";
import { SingleWeightSelector } from "../../components/SingleWeightSelector/SingleWeightSelector";
import { CONSTANTS } from "../../models/constants";
import { MainStructure } from "../../structure/MainStructure";
import { getMainRoutes } from "../routes";
import styles from "./AdHocTraining.module.css";
const DEFAULT_WEIGHT = 50;
export const AdHocTraining = () => {
  const [weight, setWeight] = createSignal(DEFAULT_WEIGHT);

  return (
    <MainStructure title="Training" subtitle="Ad-Hoc" backButtonLink={getMainRoutes()}>
      <div class={styles.AdHocTraining}>
        <div class={styles.weightSelector}>
          <SingleWeightSelector
            height={340}
            width={230}
            defaultWeight={DEFAULT_WEIGHT}
            minimumWeight={CONSTANTS.MIN_WEIGHT}
            maximumWeight={CONSTANTS.MAX_WEIGHT}
            getCurrentWeight={(weight) => {
              console.log("Set the weight to: ", weight);
              setWeight(weight);
            }}
          />
        </div>
        <div class={styles.weightSelectorActions}>
          <Button
            class={styles.button}
            props={{
              onclick: () => {
                console.log("Adjusting the weight. Sending signal with a weight of: ", weight());
              },
            }}
          >
            Adjust Weight
          </Button>
        </div>
        <div class={styles.repTempo}>
          <RepsTempo height={440} width={625} />
        </div>
      </div>
    </MainStructure>
  );
};
