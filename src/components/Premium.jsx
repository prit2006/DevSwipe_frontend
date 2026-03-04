import axios from "axios";
import { BASE_URL } from "../utils/const";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });

      if (res.data.isPremium) {
        setIsUserPremium(true);
      }
    } catch (err) {
      console.error("Error verifying premium:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyClick = async (type) => {
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true }
      );

      const { amount, keyId, currency, notes, orderId } = order.data;

      const options = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: "DevSwipe",
        description: "Developer Premium Membership",
        order_id: orderId,

        handler: async function (response) {
          console.log("Payment success:", response);
          await verifyPremiumUser();
        },

        prefill: {
          name: notes.firstname + " " + notes.lastname,
          email: notes.email,
          contact: "9999999999",
        },

        theme: {
          color: "#6366F1",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isUserPremium) {
    return (
      <div className="text-center mt-20 text-3xl font-bold text-green-500">
        🎉 You are already a Premium User
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-10 mt-20">

      {/* Silver Card */}
      <div className="card w-80 bg-base-200 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center">Silver Membership</h2>

        <ul className="mt-4 space-y-2">
          <li>✔ Chat with developers</li>
          <li>✔ 100 connection requests / day</li>
          <li>✔ Blue Tick</li>
          <li>✔ 3 Months</li>
        </ul>

        <button
          className="btn btn-secondary mt-6"
          onClick={() => handleBuyClick("silver")}
        >
          Buy Silver
        </button>
      </div>

      {/* Gold Card */}
      <div className="card w-80 bg-base-200 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center">Gold Membership</h2>

        <ul className="mt-4 space-y-2">
          <li>✔ Chat with developers</li>
          <li>✔ Unlimited connection requests</li>
          <li>✔ Blue Tick</li>
          <li>✔ 6 Months</li>
        </ul>

        <button
          className="btn btn-primary mt-6"
          onClick={() => handleBuyClick("gold")}
        >
          Buy Gold
        </button>
      </div>

    </div>
  );
};

export default Premium;

// import axios from "axios";
// import { BASE_URL } from "../utils/const";
// import { useEffect, useState } from "react";

// const Premium = () => {
//   const [isUserPremium, setIsUserPremium] = useState(false);
//   useEffect(() => {
//     verifyPremiumUser();
//   }, []);

//   const verifyPremiumUser = async () => {
//     const res = await axios.get(BASE_URL + "/premium/verify", {
//       withCredentials: true,
//     });

//     if (res.data.isPremium) {
//       setIsUserPremium(true);
//     }
//   };

//   const handleBuyClick = async (type) => {
//     const order = await axios.post(
//       BASE_URL + "/payment/create",
//       {
//         membershipType: type,
//       },
//       { withCredentials: true }
//     );

//     const { amount, keyId, currency, notes, orderId } = order.data;

//     const options = {
//       key: keyId,
//       amount,
//       currency,
//       name: "DevSwipe",
//       description: "Connect to other developers",
//       order_id: orderId,
//       prefill: {
//         name: notes.firstname + " " + notes.lastname,
//         email: notes.email,
//         contact: "7405228322",
//       },
//       theme: {
//         color: "#F37254",
//       },
//       handler: verifyPremiumUser,
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };
//   return isUserPremium ? (
//     "You're are already a premium user"
//   ) : (
//     <div className="m-10">
//       <div className="flex w-full">
//         <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
//           <h1 className="font-bold text-3xl">Silver Membership</h1>
//           <ul>
//             <li> - Chat with other people</li>
//             <li> - 100 connection Requests per day</li>
//             <li> - Blue Tick</li>
//             <li> - 3 months</li>
//           </ul>
//           <button
//             onClick={() => handleBuyClick("silver")}
//             className="btn btn-secondary"
//           >
//             Buy Silver
//           </button>
//         </div>
//         <div className="divider divider-horizontal">OR</div>
//         <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
//           <h1 className="font-bold text-3xl">Gold Membership</h1>
//           <ul>
//             <li> - Chat with other people</li>
//             <li> - Inifiniye connection Requests per day</li>
//             <li> - Blue Tick</li>
//             <li> - 6 months</li>
//           </ul>
//           <button
//             onClick={() => handleBuyClick("gold")}
//             className="btn btn-primary"
//           >
//             Buy Gold
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Premium;