import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import { Container } from "shards-react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import "./App.css";

import BillingDetailsPage from "./pages/BillingDetails";
import CartPage from "./pages/Cart";
import PayPage from "./pages/Pay";

import { CheckoutProvider } from "./checkout";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutProvider>
        <div className="App">
          <Router basename="/checkout">
            <Container className="app-container">
              <Switch>
                <Route path="/cart">
                  <CartPage />
                </Route>
                <Route path="/billing-details">
                  <BillingDetailsPage />
                </Route>
                <Route path="/pay">
                  <PayPage />
                </Route>
              </Switch>
            </Container>
          </Router>
        </div>
      </CheckoutProvider>
    </Elements>
  );
}

export default App;
