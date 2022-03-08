import { Link, Route, Routes } from "solid-app-router";
import { Component } from "solid-js";
import { Main } from "./pages/Main";
import { NotFound } from "./pages/NotFound";
import { StoryBook } from "./pages/StoryBook";
import styles from "./App.module.css";
import { Choose } from "./pages/Choose";
const App: Component = () => {
  return (
    <div class={styles.App}>
      <div class={styles.Container}>
        <Routes>
          <Route path="/" element={<Choose />} />
          <Route path="/storybook" element={<StoryBook />} />
          <Route path="/main" element={<Main />}>
            <Route path="/" />
            <Route path="training" element={<Main />} />
          </Route>
          <Route path="/*all" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
