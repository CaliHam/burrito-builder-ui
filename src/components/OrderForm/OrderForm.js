import { useState } from "react";
import { postOrder } from "../../apiCalls";

function OrderForm({orders, setOrders}) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [formError, setFormError] = useState(false)

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !ingredients.length){
      setFormError(true)
      return
    }
    postOrder(name, ingredients).then(data => {
      setOrders([...orders, data])
      setFormError(false)
      clearInputs();
  })
    .catch(err => console.log('error posting order', err))

  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  };

  const addIngredients = (e) => {
    e.preventDefault()
    setIngredients([...ingredients, e.target.value])
  }

  const updateName = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];
  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        value={ingredient}
        onClick={(e) => addIngredients(e)}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => updateName(e)}
      />

      {ingredientButtons}
      {formError && <p className="form-error">Please enter your name and select your ingredients!</p>}
      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button onClick={(e) => handleSubmit(e)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
