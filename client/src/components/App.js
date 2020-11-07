import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Header from "../components/Header";
import Contact from "../pages/Contact";
import Message from "../pages/Messages";
import Footer from "./Footer";
import Error from "../pages/Error";
import ErrorBoundary from "./ErrorBoundary";

function App(_props) {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
        <Route path="/dashboard">
          {/* Error boundary to catch any errors in the component and prevent app from breaking */}
          <ErrorBoundary>
            {/*  dashboard component also acts as a home page */}
            <Dashboard />
          </ErrorBoundary>
        </Route>
        <Route path="/contact/:id">
          <ErrorBoundary>
            {/* contact page for each contact */}
            <Contact />
          </ErrorBoundary>
        </Route>
        <Route path="/message">
          <ErrorBoundary>
            {/* message component displays all the messages sent */}
            <Message />
          </ErrorBoundary>
        </Route>
        <Route>
          {/* error page to catch 404 page not found */}
          <Error />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
