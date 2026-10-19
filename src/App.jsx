import Footer from "./components/Footer"
import Header from "./components/header"
import MenuItemCard from "./components/MenuItemCard"
import VendorCard from "./components/VendorCard"

function App() {

  return (
    <>
      <Header /> 
      <main className="container">
        <section>
          <h2 className="section-title">Today's Vendor</h2>
          <VendorCard />
        </section>
        <section>
          <h2 className="section-title"> Popular Items</h2>
          <div className="grid">
            <MenuItemCard />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App
