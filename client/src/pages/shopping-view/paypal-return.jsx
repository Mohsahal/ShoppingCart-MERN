import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ShoppingContext } from "@/context/shopping-context";

function PaypalReturnPage() {
  const { capturePayment } = useContext(ShoppingContext);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

      capturePayment(paymentId, payerId, orderId).then((data) => {
        if (data?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success";
        }
      });
    }
  }, [paymentId, payerId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment...Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalReturnPage;
