import { Link, Route, Routes } from "solid-app-router";
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
const App: Component = () => {
  return (
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
            <Route path={ROUTES.HOME} element={<Main />} />
          </Route>
          <Route path="/*all" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
