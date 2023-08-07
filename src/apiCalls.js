export const getOrders = () => {
  return fetch("http://localhost:3001/api/v1/orders")
  .then((response) => response.json())
}

export const postOrder = (newOrder) => {
  return fetch("http://localhost:3001/api/v1/orders", {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: {newOrder}
  }).then(response => response.json())
}
