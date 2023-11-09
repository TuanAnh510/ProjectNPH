import "@styles/custom.css";
import { CartProvider } from "react-use-cart";
import { Elements } from "@stripe/react-stripe-js";
import { GoogleOAuthProvider } from "@react-oauth/google";

//internal import
import getStripe from "@utils/stripe";
import { UserProvider } from "@context/UserContext";
import DefaultSeo from "@component/common/DefaultSeo";
import { SidebarProvider } from "@context/SidebarContext";
import MessengerChat from "@utils/messengesChat";
import NextNProgress from "nextjs-progressbar";
import { CartRentProvider } from "@context/CartRentContext";

const stripePromise = getStripe();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <UserProvider>
          <SidebarProvider>
            <Elements stripe={stripePromise}>
              <CartProvider>
                <CartRentProvider>
                  <DefaultSeo />
                  <NextNProgress
                    color="#02c719"
                    startPosition={0.3}
                    stopDelayMs={200}
                    height={4}
                    showOnShallow={true}
                  />
                  <Component {...pageProps} />
                  {/* <MessengerChat
                    pageId="102652242927004"
                    themeColor="#15803d"
                    minimized={true}
                    htmlRef="fb-msgr"
                  /> */}
                </CartRentProvider>
              </CartProvider>
            </Elements>
          </SidebarProvider>
        </UserProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default MyApp;
