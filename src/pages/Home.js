// import { useEffect, useState } from "react";
// import RecipeCard from "../component/RecipeCard";
// import supabase from "../config/supabaseClient";
// import { UserAuth } from "../pages/context/AuthContext";

// const Home = () => {
//   const [fetchError, setFetchError] = useState(null);
//   const [recipes, setRecipes] = useState([]);
//   const [orderBy, setOrderBy] = useState('created_at');
//   const { session } = UserAuth();

//   const handleDelete = async (id) => {
//     if (!session) {
//       alert("You must be logged in to delete a recipe.");
//       return;
//     }

//     const { error } = await supabase
//       .from('recipe')
//       .delete()
//       .eq('id', id)
//       .eq('user_id', session.user.id); // Only allow owner to delete

//     if (!error) {
//       setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
//     }
//   };

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       const { data, error } = await supabase
//         .from("recipe")
//         .select()
//         .order(orderBy, { ascending: false });

//       if (error) {
//         setFetchError('Could not fetch recipes');
//         setRecipes([]);
//         console.log(error);
//       } else if (data) {
//         setRecipes(data);
//         setFetchError(null);
//       }
//     };
//     fetchRecipes();
//   }, [orderBy]);

//   return (
//     <div className="page home">
//       {fetchError && <p>{fetchError}</p>}
//       {recipes.length > 0 ? (
//         <div className="recipes">
//           <div className="order-by">
//             <p>Sorted by:</p>
//             <button onClick={() => setOrderBy('created_at')}>Time Created</button>
//             <button onClick={() => setOrderBy('title')}>Title</button>
//             <button onClick={() => setOrderBy('rating')}>Rating</button>
//           </div>
//           <div className="recipes-grid">
//             {recipes.map((recipe) => (
//               <RecipeCard
//                 key={recipe.id}
//                 recipe={recipe} // keep SmoothieCard as is
//                 onDelete={handleDelete} // Safe delete
//               />
//             ))}
//           </div>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default Home;
import { useEffect, useState } from "react";
import RecipeCard from "../component/RecipeCard";
import supabase from "../config/supabaseClient";
import { UserAuth } from "../pages/context/AuthContext";
import FoodCarousel from "./FoodCarousel";
import Banner from '../pages/Banner'

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [orderBy, setOrderBy] = useState("created_at");
  const { session } = UserAuth();

  const handleDelete = async (id) => {
    if (!session) {
      alert("You must be logged in to delete a recipe.");
      return;
    }

    const { error } = await supabase
      .from("recipe")
      .delete()
      .eq("id", id)
      .eq("user_id", session.user.id);

    if (!error) {
      setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
    }
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase
        .from("recipe")
        .select()
        .order(orderBy, { ascending: false });

      if (error) {
        setFetchError("Could not fetch recipes");
        setRecipes([]);
      } else {
        setRecipes(data);
        setFetchError(null);
      }
    };
    fetchRecipes();
  }, [orderBy]);

  return (
    <div className="page-container">

      {/* 🔥 Carousel Banner */}
      <FoodCarousel />

      {fetchError && <p>{fetchError}</p>}

      {recipes.length > 0 ? (
        <div className="recipes-section">

          {/* Sorting UI */}
          <div className="order-by">
            <p>Sort by:</p>
            <button onClick={() => setOrderBy("created_at")}>🕒 Latest</button>
            <button onClick={() => setOrderBy("title")}>🔤 Title</button>
            <button onClick={() => setOrderBy("rating")}>⭐ Rating</button>
          </div>

          {/* 🔥 Recipe Cards Under Banner */}
          <div className="recipes-grid">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      ) : (
        <p>Loading recipes...</p>
      )}

      {/* 🔥 About Banner at the bottom */}
      <Banner />
    </div>
  );
};

export default Home;
