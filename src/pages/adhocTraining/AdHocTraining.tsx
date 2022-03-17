import { createEffect, createMemo, createSignal, onCleanup, onMount } from "solid-js";
import { useServerCommunication } from "../../communications/context/ServerCommunicationContext";
import { Button } from "../../components/Button/Button";
import { RepsTempo } from "../../components/RepsTempo/RepsTempo";
import { SingleWeightSelector } from "../../components/SingleWeightSelector/SingleWeightSelector";
import { CONSTANTS } from "../../models/constants";
import { useSensors } from "../../sensors/context/SensorsContext";
import { FakeWeightSingleton } from "../../sensors/fakeSensors/fakeWeightSensor";
import { WeightSensorObserverPayload } from "../../sensors/weightSensor";
import { MainStructure } from "../../structure/MainStructure";
import { getMainRoutes } from "../routes";
import styles from "./AdHocTraining.module.css";
export const AdHocTraining = () => {
  const [weight, setWeight] = createSignal(FakeWeightSingleton.fakeWeightLbs);
  const [waitingWeightAdjustment, setWaitingWeightAdjustment] = createSignal(false);
  const [actualPhysicalWeight, setActualPhysicalWeight] = createSignal(FakeWeightSingleton.fakeWeightLbs);
  const sensors = useSensors();
  const serverCommunication = useServerCommunication();
  /**
   * We need to ensure we unsubscribe from the sensor when the component is unmounted.
   **/
  onMount(() => {
    onCleanup(() => {
      sensors?.sensors.weightSensor.unsubscribe(weightSensorCallback);
    });
  });

  const weightSensorCallback = (callback: WeightSensorObserverPayload): void => {
    console.log("Weight sensor callback", callback);
    setActualPhysicalWeight(callback.lbs);
  };

  const realWeightIsDesiredWeight = createMemo(() => {
    return (
      !waitingWeightAdjustment() ||
      Math.abs(actualPhysicalWeight() - weight()) <= CONSTANTS.THRESHOLD_WEIGHT_DIFFERENCE
    );
  });

  createEffect(() => {
    if (realWeightIsDesiredWeight()) {
      sensors?.sensors.weightSensor.unsubscribe(weightSensorCallback);
      sensors?.sensors.weightSensor.stopListening();
      setWaitingWeightAdjustment(false);
    }
  });

  return (
    <MainStructure title="Training" subtitle="Ad-Hoc" backButtonLink={getMainRoutes()}>
      <div class={styles.AdHocTraining}>
        <div class={styles.weightSelector}>
          <SingleWeightSelector
            disabled={!realWeightIsDesiredWeight()}
            height={340}
            width={230}
            desiredWeight={FakeWeightSingleton.fakeWeightLbs}
            actualWeight={actualPhysicalWeight()}
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
            disabled={!realWeightIsDesiredWeight()}
            class={styles.button}
            props={{
              onclick: () => {
                setWaitingWeightAdjustment(true);
                console.log("Adjusting the weight. Sending signal with a weight of: ", weight());
                serverCommunication?.request({ kind: "weight", payload: { weightLbs: weight() } });
                sensors?.sensors.weightSensor.startListening();
                sensors?.sensors.weightSensor.subscribe(weightSensorCallback);
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
