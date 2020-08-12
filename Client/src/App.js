import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import  Home  from "./screens/Home";
import { Counter } from "./components/Counter";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import "./custom.css";

const App = () => {


    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/counter" component={Counter} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
      </Layout>
    );
}

export default App;