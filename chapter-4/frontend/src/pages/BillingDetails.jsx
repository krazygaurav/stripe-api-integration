import { useState } from "react";
import { useHistory } from "react-router";
import {
  Form,
  FormGroup,
  FormInput,
  FormTextarea,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Button,
} from "shards-react";
import { useCheckout } from "../checkout";

const BillingDetailsPage = () => {
  const history = useHistory();
  const { billingDetails, updateCheckout } = useCheckout();

  const [billingFormValues, setBillingFormValues] = useState(billingDetails);

  const handleChange = (e) =>
    setBillingFormValues({
      ...billingFormValues,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = () => {
    updateCheckout({ billingDetails: billingFormValues });
    history.push("/pay");
  };

  return (
    <Card className="app-card">
      <CardHeader>
        <CardTitle>Billing Details</CardTitle>
      </CardHeader>
      <CardBody>
        <Form>
          <FormGroup>
            <label htmlFor="username">Name</label>
            <FormInput
              value={billingFormValues.name}
              onChange={handleChange}
              name="name"
              id="name"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="address">Address</label>
            <FormTextarea
              value={billingFormValues.address}
              onChange={handleChange}
              name="address"
              id="address"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="phone">Phone</label>
            <FormInput
              value={billingFormValues.phone}
              onChange={handleChange}
              name="phone"
              id="phone"
            />
          </FormGroup>
          <Button block onClick={handleSubmit}>
            <span className="font-weight-bold">Save & Continue</span>
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default BillingDetailsPage;
