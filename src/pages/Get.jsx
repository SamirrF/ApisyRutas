import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/App.module.css';

const GetPage = () => {
  const [dogImage, setDogImage] = useState('');
  const [catImage, setCatImage] = useState('');
  const [loading, setLoading] = useState({
    dog: false,
    cat: false
  });

  const fetchAnimalImage = async (animal) => {
    setLoading(prev => ({ ...prev, [animal]: true }));
    
    try {
      let apiUrl = '';
      if (animal === 'dog') {
        apiUrl = 'https://dog.ceo/api/breeds/image/random';
      } else if (animal === 'cat') {
        apiUrl = 'https://api.thecatapi.com/v1/images/search';
      }

      const response = await axios.get(apiUrl);
      const data = response.data;

      if (animal === 'dog') {
        setDogImage(data.message);
      } else if (animal === 'cat') {
        setCatImage(data[0].url);
      }
    } catch (error) {
      console.error(`Error fetching ${animal} image:`, error);
    } finally {
      setLoading(prev => ({ ...prev, [animal]: false }));
    }
  };

  const fetchBothImages = () => {
    fetchAnimalImage('dog');
    fetchAnimalImage('cat');
  };

  return (
    <div className={styles.container}>    
      <div className={styles.buttonGroup}>
        <button
          onClick={() => fetchAnimalImage('dog')}
          disabled={loading.dog}
          className={styles.getButton}
        >
          {loading.dog ? 'Cargando...' : '🐶 Obtener Perro'}
        </button>
        
        <button
          onClick={() => fetchAnimalImage('cat')}
          disabled={loading.cat}
          className={styles.postButton}
        >
          {loading.cat ? 'Cargando...' : '🐱 Obtener Gato'}
        </button>

        <button
          onClick={fetchBothImages}
          disabled={loading.dog || loading.cat}
          className={styles.bothButton}
        >
          🐶+🐱 Obtener Ambas
        </button>
      </div>

      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <h2>Perro</h2>
          {loading.dog ? (
            <p>Cargando imagen de perro...</p>
          ) : (
            dogImage && <img src={dogImage} alt="Random dog" className={styles.animalImage} />
          )}
        </div>
        
        <div className={styles.imageWrapper}>
          <h2>Gato</h2>
          {loading.cat ? (
            <p>Cargando imagen de gato...</p>
          ) : (
            catImage && <img src={catImage} alt="Random cat" className={styles.animalImage} />
          )}
        </div>
      </div>
    </div>
  );
};

export default GetPage;