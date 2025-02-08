import { Link } from "react-router-dom"
import supabase from "../config/supabaseClient"


const SmoothieCard = ({ smoothie, onDelete }) => {
    const handleDelete = async () => {
        const { data, error } = await supabase.from('smoothies').delete().eq('id', smoothie.id).select()

        if (error) {
            console.log('Error deleting smoothie:', error)
        }
        if (data) {
            console.log('Smoothie deleted:', data)
            onDelete(smoothie.id) // Pass smoothie id to Home for state update
        }
    }

    return (
        <div className="smoothie-card">
            <h3>{smoothie.title}</h3>
            <div className="method">
                {smoothie.recipe.split("\n").map((step, index) => (
                    <p key={index}>{step}</p>
                ))}
            </div>
            <div className="rating">{smoothie.rating}</div>
            <div className="buttons">
                <Link to={'/' + smoothie.id}>
                    <i className="material-icons">edit</i>
                </Link>
                <i className="material-icons" onClick={handleDelete}>delete</i>
            </div>
        </div>
    )
}

export default SmoothieCard;
