import { useState } from 'react'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import { ErrorMessage } from './components/Status.jsx'


function App() {
  const [view, setView] = useState('menu') 
  const cartCount = 0
  const [lastOrder, setLastOrder] = useState(null)

  function handlePlaceOrder(details) {
    const total = 0 // TODO: same reduce as CartPage
    setLastOrder({ ...details, total })
    setCart([])
    setView('done')
  }

  let content
  if (view === 'cart') {
    content = (
      <CartPage cart={cart} onChangeQty={handleChangeQty} onRemove={handleRemove} onPlaceOrder={handlePlaceOrder} />
    ) 
  } else if (view === 'done') {
    content = <p>Order Placed</p>
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = <ErrorMessage message={error} onRetry={() => setReloadKey((k) => k + 1)} />
  } else {
    content = <>{
    <>
      <section>
        <h2 className="section-title">Choose a vendor</h2>
        <div className="vendor-grid">
          {
           vendors.map((vendor) => (
              <VendorCard
              key={vendor.id}
              vendor={vendor}
              isSelected={vendor.id === selectedVendorId}
              onSelect={setSelectedVendorId}
              />
            ))
          }
        </div>
      </section>

      <section>
        <h2 className="section-title">Menu: {selectedVendor.name}</h2>

        <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
      </section>
    </>
   }</>
  }

  return (
   <>
    <Header cartCount={cart.length} onShowMenu={() => setView('menu')} onShowCart={() => setView('cart')} />

    <main className="container">
      {content}
    </main>

    <Footer />
   </>
  )
}

export default App