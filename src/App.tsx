import { Link, Route, Routes } from "solid-app-router";
import { Component } from "solid-js";
import { Main } from "./pages/Main";
import { NotFound } from "./pages/NotFound";
import { StoryBook } from "./pages/StoryBook";
import styles from "./App.module.css";
const App: Component = () => {
  return <div class={styles.App}>
    <div class={styles.Menu}>
      <Link class="nav" href="/">
        Home
      </Link>
      <Link class="nav" href="/storybook">
        StoryBook
      </Link>
    </div>
    <div class="Container">
      <Routes>
        <Route path="/storybook" element={<StoryBook />} />
        <Route path="/" element={<Main />} />
        <Route path="/*all" element={<NotFound />} />
      </Routes>
    </div>
  </div>
};

export default App;
