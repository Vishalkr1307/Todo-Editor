import { Button, Stack } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import useRazorpay from "react-razorpay";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentOrder, postPaymentOrder } from "../redux/auth/action";
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const Payment = () => {
  const [Razorpay] = useRazorpay();
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  // const handlePaymnet = async () => {
  //   const res = await loadScript(
  //     "https://checkout.razorpay.com/v1/checkout.js"
  //   );
  //   if (!res) {
  //     alert("Razorpay sdf failer to load.Are you online");
  //   }

  //   const result = await axios.get("/payment/premium", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   const options = {
  //     key: result.data.key_id,
  //     orderId: result.data.data.orderId,
  //     handler: async function (response) {
  //       try {
  //         let updateResponse = await axios.post(
  //           "/payment/updatePremium",
  //           {
  //             orderId: options.orderId,
  //             paymentId: response.razorpay_payment_id,
  //             paymentStatus: "success",
  //           },
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );

  //         alert("you have successfully");
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     },
  //   };
  //   const paymentObject = new window.Razorpay(options);
  //   paymentObject.open();
  // };
  const handlePremium = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay sdf failer to load.Are you online");
    }
    let result = await dispatch(getPaymentOrder(token));

    const options = {
      key: result.key_id,
      orderId: result.data.orderId,
      handler: async function (response) {
        try {
          let data = {
            orderId: options.orderId,
            paymentId: response.razorpay_payment_id,
            paymentStatus: "success",
          };
          await dispatch(postPaymentOrder(data, token));
        } catch (error) {
          console.log(error);
        }
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <Stack>
      <Button colorScheme="teal" onClick={handlePremium}>
        Buy Premium
      </Button>
    </Stack>
  );
};

export default Payment;
