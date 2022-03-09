import { createSignal } from "solid-js";
import { Button } from "../../components/Button/Button";
import { RepsTempo } from "../../components/RepsTempo/RepsTempo";
import { RepsTempoChart } from "../../components/RepsTempo/RepsTempoChart";
import { SingleWeightSelector } from "../../components/SingleWeightSelector/SingleWeightSelector";
import { Header } from "../../components/StructuralComponents/Header";
import { MainStructure } from "../../structure/MainStructure";
import { getMainRoutes } from "../routes";
import styles from "./AdHocTraining.module.css";
const DEFAULT_WEIGHT = 50;
export const AdHocTraining = () => {
  const [weight, setWeight] = createSignal(DEFAULT_WEIGHT);
  const [setId, setSetId] = createSignal(0);
  return (
    <MainStructure
      title="Training"
      subtitle="Ad-Hoc"
      backButtonLink={getMainRoutes()}
    >
      <div class={styles.AdHocTraining}>
        <div class={styles.weightSelector}>
          {
            <SingleWeightSelector
              height={340}
              width={230}
              defaultWeight={DEFAULT_WEIGHT}
              minimumWeight={0}
              maximumWeight={200}
              getCurrentWeight={(weight) => {
                console.log("ADasdadadasdasd");
                setWeight(weight);
              }}
            />
          }
        </div>
        <div class={styles.weightSelectorActions}>
          <Button
            class={styles.button}
            props={{
              onclick: () => {
                console.log(
                  "Adjusting the weight. Sending signal with a weight of: ",
                  weight()
                );
              },
            }}
          >
            Adjust Weight
          </Button>
        </div>
        <div class={styles.repTempo}>
          <RepsTempo repGroupId={setId()} height={340} width={630} />
        </div>
        <div class={styles.repTempoActions}>
          <Button
            class={styles.button}
            props={{
              onclick: () => {
                setSetId((prev) => prev + 1);
              },
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    </MainStructure>
  );
};
