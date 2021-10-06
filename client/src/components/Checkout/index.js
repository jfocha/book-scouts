import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
// import "./pay.css";


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const token = loadStripe("pk_test_51Jh10GKqUGoZm9h84dJeuXUkp5wC6yX6Vs5XXZ7vPYF52PR9e4AQNZmoNCDeJPwscUwPNuPPkAooCKjJZVd0jo6P00vTZi4tCv");

const Cart =() => {
  return (
    <div className="App">
      <Elements stripe={token}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
export default Cart;