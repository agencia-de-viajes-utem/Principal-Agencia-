import "./App.css";
import Layout from "./components/Layout";
import { Route } from "wouter";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ForgotPasword from "./pages/ForgotPassword";
function App() {
    return (
        <>
            <Layout>
                <Route component={Home} path="/" />
                <Route component={Login} path="/login" />
                <Route component={Register} path="/register" />
                <Route component={ForgotPasword} path="/forgot-password" />
            </Layout>
        </>
    );
}

export default App;
