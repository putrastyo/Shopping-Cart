import { Button, Card, Col, InputGroup } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, decrementQty, removeItem } from "../../features/cart/slice"

function ProductItem({product}) {
  const items = useSelector(state => state.cart.items)
  const dispatch = useDispatch()

  const productInfo = {
    id: product.id,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail
  }
  const productIsExist = items.find(item => item.id == product.id)

  const handleAddCart = () => { dispatch(addToCart(productInfo)) }
  const handleIncrementQty = (itemId) => dispatch(addToCart(itemId))
  const handleDecrementQty = (itemId) => {
    productIsExist.quantity == 1 ? dispatch(removeItem(itemId)) : dispatch(decrementQty(itemId))
  }

  return (
    <Col>
      <Card className="h-100">
        <Card.Img src={productInfo.thumbnail} height="200px" />
        <Card.Body>
          <Card.Title>{productInfo.title}</Card.Title>
          <Card.Text>
            <span className="fs-5 text-muted">
              ${productInfo.price}
            </span>
            </Card.Text>
        </Card.Body>
        <Card.Footer>
          {!productIsExist || productIsExist.quantity == 0 ? (
          <Button variant="dark" className="w-100" onClick={handleAddCart}>Add To Cart</Button>
          ) : (
            <InputGroup>
              <Button 
                size="sm" 
                variant="dark"
                onClick={() => handleDecrementQty({id: productIsExist.id})}
              >-</Button>
              <input className="form-control text-center" value={productIsExist.quantity} readOnly />
              <Button 
                size="sm" 
                variant="dark" 
                onClick={() => handleIncrementQty({id: productIsExist.id})}
              >+</Button>
            </InputGroup>
          )}
        </Card.Footer>
      </Card>
    </Col>
  )  
}

export default ProductItem