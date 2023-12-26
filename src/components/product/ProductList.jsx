import { useEffect, useState } from "react"
import { Row } from "react-bootstrap"
import ProductItem from "./ProductItem"

function ProductList() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, [])
  return (
    <>
      <h3 className="mb-3">Product List</h3>
      <Row lg={4} md={3} sm={2} xs={2} className="g-3">
        {products.map((product) => (
            <ProductItem product={product} key={product.id}/>
        ))}
      </Row>
    </>
  )
}

export default ProductList