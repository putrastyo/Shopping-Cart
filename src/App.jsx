import React from 'react'
import Header from './components/header/Header'
import ProductList from './components/product/ProductList'
import { Container } from 'react-bootstrap'

function App() {
  return (
    <>
      <Header />
      <Container className="mt-3">
        <ProductList />
      </Container>
    </>
  )
}

export default App