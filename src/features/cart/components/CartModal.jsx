import { Button, InputGroup, Modal, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, decrementQty, removeItem } from "../slice"

function CartModal({showModal, handleHide}) {
  const items = useSelector(state => state.cart.items)
  const dispatch = useDispatch()

  const handleAddCart = (itemId) => dispatch(addToCart(itemId))
  const handleDecrementQty = (itemId) => dispatch(decrementQty(itemId))
  const handleRemove = (itemId) => dispatch(removeItem(itemId))

  let totalPrice = 0
  if(items.length){
    for (const item of items) {
      totalPrice += (item.price * item.quantity)
    } 
  }

  return (
    <Modal size="xl" show={showModal} onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Keranjang</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table responsive>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Total</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { items.length ? (
              <>
                {items.map(item => (
                  <tr className="align-middle" key={item.id}>
                    <td><img src={item.thumbnail} height="80px" /></td>
                    <td><p>{item.title}</p></td>
                    <td><p>${item.price}</p></td>
                    <td><p>x{item.quantity}</p></td>
                    <td><p>${item.quantity * item.price}</p></td>
                    <td>
                      <InputGroup style={{width: '150px'}}>
                        <Button 
                          size="sm" 
                          variant="dark"
                          disabled={item.quantity === 1 ? true : false}
                          onClick={() => handleDecrementQty({id: item.id})}
                        >-</Button>
                        <input className="form-control text-center" value={item.quantity} readOnly />
                        <Button 
                          size="sm" 
                          variant="dark" 
                          onClick={() => handleAddCart({id: item.id})}
                        >+</Button>
                      </InputGroup>
                    </td>
                    <td>
                      <p 
                        className="text-danger" 
                        onClick={() => handleRemove({id: item.id})}
                        style={{cursor: 'pointer'}}
                      >
                        <u>Remove</u>
                      </p>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={7} className="text-end">Total Price : <b>${totalPrice}</b></td>
                </tr>
              </>
            ) : (
                  <tr>
                    <td colSpan={7}><p className="text-center text-muted fs-5 my-4">Keranjang Kosong :(</p></td>
                  </tr>
                )
            }
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={() => alert('Next time ygy..')}>Checkout</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CartModal