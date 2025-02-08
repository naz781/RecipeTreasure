import { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"
const Create = () => {

  const navigate = useNavigate()

  const [formError, setFormError] = useState(null)
  const [title, setTitle] = useState('')
  const [recipe, setRecipe] = useState('')
  const [rating, setRating] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !recipe || !rating) {
      setFormError('Please fill in all the fields')
      return
    }

    setIsSubmitting(true)

    const { data, error } = await supabase.from('smoothies').insert({
      title,
      recipe,
      rating
    })

    if (error) {
      console.log(error)
      setFormError('Please fill in all the fields')
      setIsSubmitting(false)
      return
    }
    // if (data) {
    //   console.log(data)

    setTitle('')
    setRecipe('')
    setRating('')
    setFormError(null)
    setIsSubmitting(false)
    setTimeout(() => navigate("/"), 200);
    // }
  }

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
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
        <button disabled={isSubmitting || !title || !recipe || !rating}>
          Create Smoothie Recipe
        </button>
        {formError && <p className="error">{formError}</p>}
      </form>

    </div>
  )
}

export default Create

