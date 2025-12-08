import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { UserAuth } from "./context/AuthContext";

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const navigate = useNavigate();
    const { session } = UserAuth();

    useEffect(() => {
        const fetchRecipe = async () => {
            const { data, error } = await supabase
                .from("recipe")
                .select()
                .eq("id", id)
                .single();

            if (!error) setRecipe(data);
        };
        fetchRecipe();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Delete this recipe permanently?")) return;

        const { error } = await supabase
            .from("recipe")
            .delete()
            .eq("id", id)
            .eq("user_id", session.user.id);

        if (!error) navigate("/");
    };

    if (!recipe) return <p>Loading Recipe...</p>;

    return (
        <div className="page-container recipe-detail">

            <h2>{recipe.title}</h2>

            <p><b>Rating:</b> ⭐ {recipe.rating}</p>

            <div className="recipe-text">
                {recipe.recipe.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                ))}
            </div>

            <p className='recipe-created'><b>Created:</b> {new Date(recipe.created_at).toLocaleDateString()}</p>

            {session && session.user.id === recipe.user_id && (
                <div className="actions">
                    <Link to={`/${recipe.id}`}>✏ Edit</Link>
                    <button onClick={handleDelete}>🗑 Delete</button>
                </div>
            )}

            <Link to="/">⬅ Back to Home</Link>
        </div>
    );
};

export default RecipeDetail;
