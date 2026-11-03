import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm"

function CartPage({ cart, onChangeQty, onRemove, onPlaceOrder }) {
    if (cart.length === 0) {
        return <p className="muted">Your cart is empty. Pick something from a menu first.</p>
    }

    const total = cart.reduce((itemTotal, currentItem) => {
       return itemTotal + (currentItem.price * currentItem.qty)  
    }, 0) 
    /*
    - Starts with 0 
    - Item total + price of item * quantity of item
    - return the total price of the cart (in total)
    */ 

    return (
        <div className="cart-layout">
            <div className="card">
                <ul className="cart-list">
                    {
                    cart.map((line) => ( //fTODO: 'line' is not defined
                        <CartItem key={line.item.id} line={line} onChangeQty={onChangeQty} onRemove={onRemove} />
                    ))
                    }
                </ul>
                <p className="cart-total">Total: RM {total.toFixed(2)}</p>
            </div>

        <CheckoutForm onPlaceOrder={onPlaceOrder} />
        </div>
    )
}
export default CartPage