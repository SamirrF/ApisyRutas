import { useState } from "react";

export function DogImageFetcher() {
  const [dogImage, setDogImage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchRandomDog = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      setDogImage(data.message); // URL de la imagen
    } catch (error) {
      console.error("Error fetching dog image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Random Dog Images 🐶</h1>
      <button 
        onClick={fetchRandomDog} 
        disabled={loading}
        style={{ 
          padding: "0.5rem 1rem",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {loading ? "Loading..." : "Get Random Dog!"}
      </button>
      
      {dogImage && (
        <div style={{ marginTop: "2rem" }}>
          <img 
            src={dogImage} 
            alt="Random Dog" 
            style={{ 
              maxWidth: "100%", 
              height: "auto", 
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }} 
          />
        </div>
      )}
    </div>
  );
}
export default DogImageFetcher;