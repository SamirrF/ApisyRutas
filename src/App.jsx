import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import GetPage from './pages/Get';
import PostPage from './pages/Post';
import styles from './styles/App.module.css'; // Cambia esta línea

function App() {
  return (
    <div className={styles.container}> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get" element={<GetPage />} />
        <Route path="/post" element={<PostPage />} />
      </Routes>
    </div>
  );
}

export default App;