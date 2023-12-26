import { Container, Navbar, Nav, Button } from "react-bootstrap"
import CartModal from "../../features/cart/components/cartModal"
import { useState } from "react"
import { useSelector } from "react-redux"

function Header() {
  const items = useSelector(state => state.cart.items)
  const itemsCount = items.length

  //? Handle Modal
  const [showModal, setShowModal] = useState(false)
  const handleShowModal = () => {setShowModal(true)}
  const handleCloseModal = () => {setShowModal(false)}
  //? End Handle Modal

  return (
    <>
      <Navbar bg="white" className="shadow-sm" sticky="top">
        <Container>
          <Navbar.Brand href="#home">PutraShop</Navbar.Brand>
          <Nav className="mr-auto">
            <Button variant="outline-dark" className="position-relative rounded-circle p-0" style={{width: '42px', height: '42px'}} onClick={handleShowModal}>
              🛒
              <small 
                className="position-absolute end-0 bottom-0 bg-danger text-white rounded-circle d-block" style={{
                  transform: 'translate(25%, 25%)', 
                  width: '20px', 
                  height:'20px'
                }}
              >{itemsCount}</small>
            </Button>
          </Nav>
        </Container>
      </Navbar>
      <CartModal showModal={showModal} handleHide={handleCloseModal} />
    </>
  )
}

export default Header