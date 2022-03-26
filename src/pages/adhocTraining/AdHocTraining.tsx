import { createEffect, createMemo, createSignal, onCleanup, onMount } from "solid-js";
import { WeightSensorObserverPayload } from "../../../common/weightSensorObserverPayload";
import { useServerCommunication } from "../../communications/context/ServerCommunicationContext";
import { Button } from "../../components/Button/Button";
import { RepsTempo } from "../../components/RepsTempo/RepsTempo";
import { SingleWeightSelector } from "../../components/SingleWeightSelector/SingleWeightSelector";
import { CONSTANTS } from "../../models/constants";
import { useSensors } from "../../sensors/context/SensorsContext";
import { MainStructure } from "../../structure/MainStructure";
import { triggerIfChanged } from "../../utils/changeFilter";
import { getMainRoutes } from "../routes";
import styles from "./AdHocTraining.module.css";
export const AdHocTraining = () => {
  const [desiredWeight, setDesiredWeight] = createSignal(50);
  const [actualPhysicalWeight, setActualPhysicalWeight] = createSignal(0);

  const [waitingWeightAdjustment, setWaitingWeightAdjustment] = createSignal(false);
  const sensors = useSensors();
  const serverCommunication = useServerCommunication();
  /**
   * We need to ensure we unsubscribe from the sensor when the component is unmounted.
   **/
  onMount(() => {
    sensors?.sensors.weightSensor.subscribe(weightSensorCallback);
    onCleanup(() => {
      sensors?.sensors.weightSensor.unsubscribe(weightSensorCallback);
    });
  });

  const weightSensorCallback = (callbackPayload: WeightSensorObserverPayload): void => {
    triggerIfChanged(
      (value: number) => {
        setActualPhysicalWeight(value);
      },
      actualPhysicalWeight(),
      callbackPayload.lbs,
    );
  };

  const realWeightIsDesiredWeight = createMemo(() => {
    return !waitingWeightAdjustment() || Math.abs(actualPhysicalWeight() - desiredWeight()) === 0;
  });

  createEffect(() => {
    if (realWeightIsDesiredWeight()) {
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
            desiredWeight={desiredWeight()}
            actualWeight={actualPhysicalWeight()}
            minimumWeight={CONSTANTS.MIN_WEIGHT}
            maximumWeight={CONSTANTS.MAX_WEIGHT}
            getCurrentWeight={(weight) => {
              console.log("AdHoc: Set the weight to: ", weight);
              setDesiredWeight(weight);
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
                console.log("Adjusting the weight. Sending signal with a weight of: ", desiredWeight());
                serverCommunication?.client.adjustWeight(desiredWeight());
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
