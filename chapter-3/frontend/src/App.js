import './App.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './checkout-form';
import { PUBLISHABLE_KEY } from './config/app.config';

const stripePromise = loadStripe(PUBLISHABLE_KEY);

function App() {

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default App;
