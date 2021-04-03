import { useHistory } from "react-router";
import { Card, CardBody, CardHeader, CardTitle, Button } from "shards-react";

import { useCheckout } from "../checkout";

const CartPage = () => {
  const { products, amount } = useCheckout();

  const history = useHistory();

  const handleNavigation = () => history.push("/billing-details");

  return (
    <Card className="app-card">
      <CardHeader>
        <CardTitle>Your Cart</CardTitle>
      </CardHeader>
      <CardBody>
        {products.map((product) => (
          <div key={product.id} className="cart-item">
            <span className="title">{product.title}</span>
            <span className="price">₹{product.price}</span>
          </div>
        ))}
        <div className="cart-item">
          <span className="cart-total">Order Total ₹{amount}</span>
        </div>
        <hr />
        <Button block onClick={handleNavigation}>
          <span className="font-weight-bold">Add Billing details</span>
        </Button>
      </CardBody>
    </Card>
  );
};

export default CartPage;
