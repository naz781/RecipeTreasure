import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient"

const Update = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [recipe, setRecipe] = useState('')
  const [rating, setRating] = useState('')
  const [updating, setIsUpdating] = useState(false)
  const [formError, setFormError] = useState(null)


  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase.from('smoothies').select().eq('id', id).single()
      if (error) {
        navigate('/', { replace: true })
      }
      if (data) {
        setTitle(data.title)
        setRecipe(data.recipe)
        setRating(data.rating)
      }
    }
    fetchSmoothie()
  }, [id, navigate])

  const handleUpdate = async (e) => {
    e.preventDefault()

    if (!title || !recipe || !rating) {
      setFormError('Please fill in all the fields')
      return
    }
    setFormError(null)
    setIsUpdating(true)

    const { error } = await supabase
      .from("smoothies")
      .update({ title, recipe, rating })
      .eq("id", id);

    if (!error) {

      setTitle("");
      setRecipe("");
      setRating("");
      setFormError(null);


      setTimeout(() => navigate("/"), 200);
    }

    setIsUpdating(false);
  };

  return (
    <div className="page update">
      <form onSubmit={handleUpdate} >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="recipe">Recipe</label>
        <textarea
          id="recipe"
          value={recipe}
          onChange={(e) => setRecipe(e.target.value)}
        />

        <label htmlFor="rating">Rating</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button disabled={updating}>
          Update Smoothie Recipe
        </button>
        {formError && <p className="error">{formError}</p>}
      </form>

    </div>
  )
}


export default Update