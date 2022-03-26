import { useLocation } from "solid-app-router";
import { JSX, batch, createEffect, createMemo, createSignal, onCleanup, onMount } from "solid-js";
import { MagneticContactSensorObserverPayload } from "../../../common/magneticContactSensorObserverPayload";
import { useServerCommunication } from "../../communications/context/ServerCommunicationContext";
import { RepsTempo } from "../../components/RepsTempo/RepsTempo";
import { WaterScreen } from "../../components/Transitions/WaterScreen";
import { CONSTANTS } from "../../models/constants";
import { Workout } from "../../models/workout";
import { useSensors } from "../../sensors/context/SensorsContext";
import { MainStructure } from "../../structure/MainStructure";
import { getMainRoutes } from "../routes";
import { WorkoutExercises } from "./WorkoutExercises";
import { WorkoutExerciseSets } from "./WorkoutExerciseSets";
import styles from "./WorkoutGo.module.css";

export const WorkoutGo = (): JSX.Element => {
  const location = useLocation();
  const sensors = useSensors();
  const serverCommunication = useServerCommunication();
  const [activeExerciseIndex, setActiveExerciseIndex] = createSignal(0);
  const [activeWorkout, setActiveWorkout] = createSignal<Workout | undefined>(undefined);
  const [activeSetIndex, setActiveSetIndex] = createSignal(0);
  const [workoutCompleted, setWorkoutCompleted] = createSignal(false);

  createEffect(async () => {
    const workout = location.state as Workout;
    if (workout.id === CONSTANTS.ADHOC_WORKOUT_ID) {
      setActiveWorkout(workout);
    } else {
      const workoutFromServer = await serverCommunication?.client.getWorkout(workout.id);
      setActiveWorkout(workoutFromServer);
    }
  });

  const currentExercise = createMemo(() => {
    return activeWorkout()?.workoutExercises[activeExerciseIndex()];
  });
  const currentSet = createMemo(() => {
    return currentExercise()?.exerciseSets[activeSetIndex()];
  });

  const magneticContactSensorInput = (input: MagneticContactSensorObserverPayload): void => {
    if (!input.isOpen) {
      goToNextSetOrExercise();
    }
  };

  onMount(() => {
    sensors?.sensors.magneticContactSensor.subscribe(magneticContactSensorInput);
    onCleanup(() => {
      sensors?.sensors.magneticContactSensor.unsubscribe(magneticContactSensorInput);
    });
  });

  const goToNextSetOrExercise = () => {
    const e = currentExercise();
    const s = e?.exerciseSets;
    const w = activeWorkout();
    if (e === undefined || s === undefined || w === undefined) {
      return;
    }
    if (activeSetIndex() < s.length - 1) {
      batch(() => {
        setActiveSetIndex((prev) => prev + 1);
      });
    } else {
      if (activeExerciseIndex() < w.workoutExercises.length - 1) {
        // Next exercise
        batch(() => {
          setActiveSetIndex(0);
          setActiveExerciseIndex(activeExerciseIndex() + 1);
        });
      } else {
        console.log("Workout is done!");
        batch(() => {
          setWorkoutCompleted(true);
        });
      }
    }
  };

  /**
   * Effect that check for the current set and request the weight
   * if there is a change in the weight. Two different sets with
   * the same weight do not trigger the effect.
   */
  createEffect(() => {
    const s = currentSet();
    if (s !== undefined) {
      serverCommunication?.client.adjustWeight(s.weight);
    }
  });

  return (
    <MainStructure
      title="Training"
      subtitle="Workout"
      subtitleDetail={activeWorkout()?.workoutName ?? ""}
      backButtonLink={getMainRoutes()}
    >
      {workoutCompleted() ? <WaterScreen /> : null}
      <div class={styles.WorkoutGoExercise}>
        {activeWorkout() === undefined ? null : (
          <WorkoutExercises
            exercises={activeWorkout()!.workoutExercises}
            activeExercise={activeExerciseIndex()}
          />
        )}
      </div>
      <div class={styles.WorkoutGoSets}>
        {currentExercise() === undefined ? null : (
          <WorkoutExerciseSets workoutExercise={currentExercise()!} activeSet={activeSetIndex()} />
        )}
      </div>
      <div class={styles.WorkoutGoTempo}>
        {currentSet() === undefined ? null : (
          <RepsTempo height={400} width={430} expectedReps={currentSet()!.reps} />
        )}
      </div>
    </MainStructure>
  );
};
