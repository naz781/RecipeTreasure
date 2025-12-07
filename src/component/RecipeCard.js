import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";
import { UserAuth } from "../pages/context/AuthContext";

const RecipeCard = ({ recipe, onDelete }) => {
    const { session } = UserAuth();

    const handleDelete = async () => {
        if (!session) {
            alert("You must be logged in to delete a recipe.");
            return;
        }

        if (window.confirm("Are you sure you want to delete this recipe?")) {
            const { error } = await supabase
                .from("recipe")
                .delete()
                .eq("id", recipe.id)
                .eq("user_id", session.user.id); // Only owner can delete

            if (error) {
                console.log("Error deleting recipe:", error);
            } else {
                onDelete(recipe.id); // Update state in Home
            }
        }
    };

    const handleEdit = (e) => {
        if (!session) {
            e.preventDefault();
            alert("You must be logged in to edit a recipe.");
        }
    };

    return (
        <div className="recipe-card">
            <h3>{recipe.title}</h3>
            <div className="method">
                {recipe.recipe.split("\n").map((step, index) => (
                    <p key={index}>{step}</p>
                ))}
            </div>
            <div className="rating">{recipe.rating}</div>
            <div className="buttons">
                <Link to={`/${recipe.id}`} onClick={handleEdit}>
                    <i className="material-icons">edit</i>
                </Link>
                <i className="material-icons" onClick={handleDelete}>delete</i>
            </div>
        </div>
    );
};

export default RecipeCard;
