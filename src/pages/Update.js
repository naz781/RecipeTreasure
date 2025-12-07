import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { UserAuth } from "../pages/context/AuthContext";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { session } = UserAuth();

  const [title, setTitle] = useState('');
  const [recipeContent, setRecipeContent] = useState('');
  const [rating, setRating] = useState('');
  const [updating, setIsUpdating] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (!session) {
      navigate('/');
      return; // Prevent further execution
    }
  }, [session, navigate]);

  useEffect(() => {
    const fetchRecipe = async () => {
      const { data, error } = await supabase
        .from('recipe')
        .select()
        .eq('id', id)
        .eq('user_id', session.user.id) // Only fetch if owned by logged-in user
        .single();

      if (error) {
        navigate('/', { replace: true });
      }
      if (data) {
        setTitle(data.title);
        setRecipeContent(data.recipe);
        setRating(data.rating);
      }
    };
    fetchRecipe();
  }, [id, navigate, session]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title || !recipeContent || !rating) {
      setFormError('Please fill in all the fields');
      return;
    }

    setFormError(null);
    setIsUpdating(true);

    const { error } = await supabase
      .from("recipe")
      .update({ title, recipe: recipeContent, rating })
      .eq("id", id)
      .eq("user_id", session.user.id); // Only update if owned by user

    if (!error) {
      setTitle("");
      setRecipeContent("");
      setRating("");
      setFormError(null);
      setTimeout(() => navigate("/"), 200);
    }
    setIsUpdating(false);
  };

  return (
    <div className="page update">
      <form onSubmit={handleUpdate}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor="recipe">Recipe</label>
        <textarea id="recipe" value={recipeContent} onChange={(e) => setRecipeContent(e.target.value)} />

        <label htmlFor="rating">Rating</label>
        <input type="number" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} />

        <button disabled={updating}>Update Recipe</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Update;
