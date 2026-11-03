import { useEffect, useState } from 'react'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import CartPage from './components/CartPage.jsx'
import { ErrorMessage, Loading } from './components/Status.jsx'

const URL = 'http://localhost:5173/api/vendors.json'

function App() {
  const [view, setView] = useState('menu') 
  const [lastOrder, setLastOrder] = useState(null)
  const [vendors, setVendors] = useState([])
  const [selectedVendorId, setSelectedVendorId] = useState(null) 
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cart, setCart] = useState([])
  const [reloadKey, setReloadKey] = useState(0)
  const cartCount = cart.length

  function handlePlaceOrder(details) {
    const total = cart.reduce((itemTotal, currentItem) => { 
       return itemTotal + (currentItem.price * currentItem.qty)  
    }, 0) // TODO: same reduce as CartPage
    
    setLastOrder({ ...details, total })
    setCart([])
    setView('done')
  }

  //
  function handleAddToCart(item) {
    setCart((prevCart) => { //identify prevCart
      const existing = prevCart.find((i) => i.id === item.id) //read find()
      if(existing) {
        return prevCart.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1} : i)
      }
      return [...prevCart, { ...item, qty: 1 }]
    })
  }

  //
  function handleChangeQty(itemId, delta) { //delta = change
    setCart((prevCart) => {
      prevCart.map((item) => {
        if (item.id === itemId) {
          const newQty = item.qty + delta 
          return newQty > 0 ? { ...item, qty: newQty } : null
        }
        return item
      }).filter(Boolean) 
    })
  }
 
  //handle remove item from cart
  function handleRemove(itemId) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
  }

  //Fetching data with useEffect
  useEffect(() => {
    const controller = new AbortController()

    fetch(URL, {signal: controller.signal})
      .then((res) => {
        if(!res.ok) throw new Error(`HTTP ${res.status}`)
          return res.json()
      })
      .then((data) => { //Auto select the first Id
        setVendors(data)
        if (data.length > 0) setSelectedVendorId(data[0].id)
      })
      .catch((err) => {
        if(err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if(!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [reloadKey])

  const selectedVendor = vendors.find((v) => v.id === selectedVendorId)

  //debug: trying to read JSON
  console.log(vendors)
  console.log(vendors[0])
  console.log(vendors[1])

  let content
  if (view === 'cart') {
    content = (
      <CartPage cart={cart} onChangeQty={handleChangeQty} onRemove={handleRemove} onPlaceOrder={handlePlaceOrder} />
    ) 
  } else if (view === 'done') {
    content = <p>Order Placed</p>  // TODO (B5): show pickup time and total
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = <ErrorMessage message={error} onRetry={() => setReloadKey((k) => k + 1)} />
  } else {
    content = ( 
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
        <h2 className="section-title">Menu: {selectedVendor?.name || 'Select a vendor'}</h2>

        {selectedVendor && <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />}
      </section>
    </>
    ) 
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