import { useState } from "react";
import { postOrder } from "../../apiCalls";

function OrderForm({orders, setOrders}) {
  const [name, setName] = useState("");
  // const [ingredient, setIngredient] = useState('')
  const [ingredients, setIngredients] = useState([]);
  const [newOrder, setNewOrder] = useState('')

  function handleSubmit(e) {
    e.preventDefault();
    postOrder(newOrder).then(response => setOrders({...orders, response}))
    .catch(err => console.log('error posting order', err))
    clearInputs();
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  };

  const addIngredients = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    setIngredients([...ingredients, e.target.value])
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
        onChange={(e) => setName(name)}
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button onClick={(e) => handleSubmit(e)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
