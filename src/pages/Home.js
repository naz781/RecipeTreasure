import { useEffect, useState } from "react";
import SmoothieCard from "../component/SmoothieCard";
import supabase from "../config/supabaseClient";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState([]);
  const [orderBy, setOrderBy] = useState('created_at')

  const handleDelete = (id) => {
    // Filter out the deleted smoothie from local state
    setSmoothies(prevSmoothies => prevSmoothies.filter(smoothie => smoothie.id !== id));
  };

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from("smoothies").select().order(orderBy, { ascending: false });

      if (error) {
        setFetchError('Could not fetch recipes');
        setSmoothies([]);
        console.log(error);
      } else if (data) {
        setSmoothies(data);
        setFetchError(null);
      }
    };

    fetchSmoothies();
  }, [orderBy]);

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {smoothies.length > 0 ? (
        <div className="smoothies">
          <div className="order-by">
            <p>  Order By :</p>
            <button onClick={() => setOrderBy('created_at')}>Time Created</button>
            <button onClick={() => setOrderBy('title')}>Title</button>
            <button onClick={() => setOrderBy('rating')}>Rating</button>
            {orderBy}
          </div>
          <div className="smoothies-grid">
            {smoothies.map((smoothie) => (
              <SmoothieCard
                key={smoothie.id}
                smoothie={smoothie}
                onDelete={handleDelete} // Pass delete handler to each card
              />
            ))}
          </div>
        </div>
      ) : (
        <p>No smoothies available</p>
      )}
    </div>
  );
};

export default Home;
