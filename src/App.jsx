import Footer from "./components/Footer"
import Header from "./components/header"
import MenuItemCard from "./components/MenuItemCard"
import VendorCard from "./components/VendorCard"

function App() {
  const selectedVendor = vendors[0]
  return (
  <>
    <Header />
    <main className="container">
    <section>
      <h2 className="section-title">Menu: {selectedVendor.name}</h2>
      <MenuList items={selectedVendor.menu} />
    </section>
    </main>
    <Footer />
  </>
  ) 
}

export default App
