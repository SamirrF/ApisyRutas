import { Link } from "react-router-dom";
import styles from '../styles/App.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.buttonGroup}>
        <Link to="/get" className={styles.getButton}>
          🐶🐈Ver Perros y Gatos (GET)
        </Link>
        <Link to="/post" className={styles.postButton}>
          📨 Enviar Datos (POST)
        </Link>
      </div>
    </div>
  );
}