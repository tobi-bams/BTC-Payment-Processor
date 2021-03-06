import Card from "../components/ui/Card";
import { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../context/auth-context";

function GettingStartedPage() {
  const history = useHistory();

  const authCtx = useContext(AuthContext);

  const [userStore, setUserHasStore] = useState(false);
  const [userWallet, setUserHasWallet] = useState(false);
  const [userLightning, setUserHasLightning] = useState(false);
  const [userOnboarding, completedOnboarding] = useState(false);

  const userToken = localStorage.getItem("token");

  const currentUser = authCtx.currentUser;

  const [isLoading, setIsLoading] = useState(false);

  const logoutHandler = () => {
    authCtx.logout();
  };

  useEffect(() => {
    setIsLoading(true);
    const checkWallet = () => {
      if (localStorage.getItem("walletData")) {
        setUserHasWallet(true);
      } else if (currentUser?.data?.store?.wallet?.bitcoin) {
        setUserHasWallet(true);
      }
    };

    // const checkLightning = () => {
    //   fetch("http://localhost:5000/wallet/light", {
    //     headers: {
    //       Authorization: `Bearer ${userToken}`,
    //     },
    //   })
    //     .then((res) => {
    //       if (res.ok) {
    //         return res.json();
    //       } else {
    //         return res.json().then((data) => {
    //           let errorMsg = "Failed to connect!";
    //           throw new Error(errorMsg);
    //         });
    //       }
    //     })
    //     .then((data) => {
    //       if (data.message === "We are good") {
    //         setUserHasLightning(true);
    //       }
    //       localStorage.setItem("nodeStatus", "online");
    //     })
    //     .catch((err) => {
    //       alert(err.message);
    //     });
    // };
    const checkStore = () => {
      //   if (localStore) {
      //     setUserHasStore(true);
      //     checkWallet();
      //     console.log("Happy");
      //   } else if (currentUser?.data?.store !== null) {
      //     console.log("appy");
      //     setUserHasStore(true);
      //     checkWallet();
      //   }
      if (currentUser?.data?.store) {
        setUserHasStore(true);
        if (currentUser?.data?.store?.wallet?.bitcoin) {
          setUserHasWallet(true);
        }
        if (currentUser?.data?.store?.wallet?.lightning) {
          setUserHasLightning(true);
        }
      }
    };

    checkStore();

    setIsLoading(false);
  });

  if (userStore && userWallet && userLightning) {
    history.replace("/dashboard/overview");
  }

  return (
    <div className="mb-10">
      <h2 className="text-xl text-dark font-bold mb-4">Next steps?</h2>
      {isLoading ? (
        <p>Checking records...</p>
      ) : (
        <>
          {!userStore && (
            <div className="my-6">
              <Card
                title="Create your store"
                text="Your store is necessary before you can issue invoices"
                buttonText="Create store"
                buttonLink="/dashboard/create-store"
              />
            </div>
          )}
          {!userWallet && userStore && (
            <div className="my-6">
              <Card
                title="Connect your BTC wallet"
                text="Add your xPub key from which recieving addresses will be generated"
                buttonText="Add xPub key"
                buttonLink="/dashboard/wallets/bitcoin"
              />
            </div>
          )}
          {!userLightning && userStore && (
            <div className="my-6">
              <Card
                title="Connect to a lightning node"
                text="Configure BPP to communicate with your Lightning node"
                buttonText="Connect lnd node"
                buttonLink="/dashboard/wallets/lightning"
              />
            </div>
          )}

          <div className="my-6 text-center">
            <Link
              className="no-underline text-md text-red-600 leading-none"
              to="/"
              onClick={logoutHandler}
            >
              Logout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default GettingStartedPage;
