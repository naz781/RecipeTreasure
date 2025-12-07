import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { UserAuth } from "../pages/context/AuthContext";

const Create = () => {
  const navigate = useNavigate();
  const { session } = UserAuth();

  useEffect(() => {
    if (!session) {
      alert("You must be logged in to create a recipe.");
      navigate("/");
      return; // Prevent further execution
    }
  }, [session, navigate]);

  const [formError, setFormError] = useState(null);
  const [title, setTitle] = useState('');
  const [recipeContent, setRecipeContent] = useState('');
  const [rating, setRating] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !recipeContent || !rating) {
      setFormError('Please fill in all the fields');
      return;
    }

    setIsSubmitting(true);

    const { data, error } = await supabase.from('recipe').insert({
      title,
      recipe: recipeContent,
      rating,
      user_id: session.user.id // Associate recipe with logged-in user
    });

    if (error) {
      console.log(error);
      setFormError('Could not create recipe');
      setIsSubmitting(false);
      return;
    }

    setTitle('');
    setRecipeContent('');
    setRating('');
    setFormError(null);
    setIsSubmitting(false);
    setTimeout(() => navigate("/"), 200);
  };

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor="recipe">Recipe</label>
        <textarea id="recipe" value={recipeContent} onChange={(e) => setRecipeContent(e.target.value)} />

        <label htmlFor="rating">Rating</label>
        <input type="number" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} />

        <button disabled={isSubmitting || !title || !recipeContent || !rating}>
          Create Recipe
        </button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
