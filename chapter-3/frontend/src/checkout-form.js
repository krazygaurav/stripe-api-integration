import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const stripePaymentMethodHandler = (result) => {
    if (result.error) {
      console.log("error in payment::", result.error);
    } else {
      fetch("http://localhost:8000/pay", {
        method: "POST",
        body: JSON.stringify({
          payment_method_id: result.paymentMethod.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(function (result) {
        result.json().then(function (res) {
          console.log("This is the response::", res);
        });
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: "John Doe",
      },
    });

    console.log(result);

    stripePaymentMethodHandler(result);
  };
  return (
    <div className="card-wrapper">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button type="submit" className="btn">
          PAY
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
