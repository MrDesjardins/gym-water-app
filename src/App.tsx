import { Route, Routes } from "solid-app-router";
import { Component } from "solid-js";
import { Main } from "./pages/Main";
import { NotFound } from "./pages/NotFound";
import { StoryBook } from "./pages/StoryBook";
import styles from "./App.module.css";
import { Choose } from "./pages/Choose";
import { AdHocTraining } from "./pages/adhocTraining/AdHocTraining";
import { SingleExercise } from "./pages/singleExercise/SingleExercise";
import { Workout } from "./pages/Workout/Workout";
import { ROUTES } from "./pages/routes";
import { SingleExerciseSelection } from "./pages/singleExercise/SingleExerciseSelection";
import { WorkoutGo } from "./pages/Workout/WorkoutGo";
import { SensorsProvider } from "./sensors/context/SensorsContext";
import { ServerCommunicationProvider } from "./communications/context/ServerCommunicationContext";

const App: Component = () => {
  return (
    <ServerCommunicationProvider>
      <SensorsProvider>
        <div class={styles.App}>
          <div class={styles.Container}>
            <Routes>
              <Route path={ROUTES.HOME} element={<Choose />} />
              <Route path={ROUTES.STORYBOOK} element={<StoryBook />} />
              <Route path={ROUTES.MAIN}>
                <Route path={ROUTES.ADHOC} element={<AdHocTraining />} />
                <Route path={ROUTES.SINGLE_EXERCISE} element={<SingleExerciseSelection />} />
                <Route path={ROUTES.SINGLE_EXERCISE_ID} element={<SingleExercise />} />
                <Route path={ROUTES.WORKOUT} element={<Workout />} />
                <Route path={ROUTES.WORKOUT_GO} element={<WorkoutGo />} />
                <Route path={ROUTES.HOME} element={<Main />} />
              </Route>
              <Route path="/*all" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SensorsProvider>
    </ServerCommunicationProvider>
  );
};

export default App;
