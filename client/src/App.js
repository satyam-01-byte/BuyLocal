import Header from "./components/Header";
import Footer from "./components/Footer";
import SellerHeader from "./components/SellerHeader";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LocateScreen from "./screens/LocateScreen";
import ProductsFromShopScreen from "./screens/ProductsFromShopScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import RazorpayScreen from "./screens/RazorpayScreen";
import PlaceorderScreen from "./screens/PlaceorderScreen";
import OrderScreen from "./screens/OrderScreen";
import StoresScreen from "./screens/StoresScreen";
import SellersScreen from "./screens/SellersScreen";
import SellerRegister from "./screens/SellerRegister";
import SellerLogin from "./screens/SellerLogin";
import SellerProductsScreen from "./screens/SellerProductsScreen";
import SellerAccountScreen from "./screens/SellerAccountScreen";
import SellerAddProductScreen from "./screens/SellerAddProductScreen";
import SellerOrdersScreen from "./screens/SellerOrdersScreen";
import SellerOrderDetailsScreen from "./screens/SellerOrderDetailsScreen";
import "./styles/App.css";
import SellerAddProductBulkScreen from "./screens/SellerAddProductBulkScreen";

function App() {
  return (
    <div className="wrapperOuterDiv">
      <Router>
        <Route path="/" exact component={LocateScreen} />
        <Route
          path="/"
          render={
            (props) =>
              props.location.pathname.startsWith("/sellers") &&
              props.location.pathname.length > 19 && (
                <SellerHeader />
              ) /* /sellers/register length is 17 */
          }
        />
        <Route path="/sellers" component={SellersScreen} exact />
        <Route path="/sellers/register" component={SellerRegister} />
        <Route path="/sellers/login" component={SellerLogin} />
        <Route
          path="/sellers/:id/products"
          component={SellerProductsScreen}
          exact
        />
        <Route
          path="/sellers/:id/orders"
          component={SellerOrdersScreen}
          exact
        />
        <Route
          path="/sellers/:id/orders/:orderId"
          component={SellerOrderDetailsScreen}
        />
        <Route path="/sellers/:id/account" component={SellerAccountScreen} />
        <Route
          path="/sellers/:id/products/new"
          component={SellerAddProductScreen}
          exact
        />
        <Route
          path="/sellers/:id/products/new/bulk"
          component={SellerAddProductBulkScreen}
          exact
        />
        <div className="routeWrapperDiv">
          <Route
            path="/"
            render={(props) =>
              props.location.pathname !== "/" &&
              !props.location.pathname.startsWith("/sellers") && <Header />
            }
          />
          <Route path="/stores/location/:location" component={StoresScreen} />
          <Route
            path="/stores/:id/products"
            component={ProductsFromShopScreen}
            exact
          />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/cart" component={CartScreen} exact />
          <Route
            path="/cart/stores/:id/products/:prod?"
            component={CartScreen}
          />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/razorpay" component={RazorpayScreen} />
          <Route path="/placeorder" component={PlaceorderScreen} />
          <Route path="/orders/:id" component={OrderScreen} />
        </div>
      </Router>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
