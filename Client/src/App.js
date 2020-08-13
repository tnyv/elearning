import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import  HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CoursesScreen from "./screens/CoursesScreen";
import LeaderboardScreen from "./screens/LeaderboardScreen";

import "./custom.css";

const App = () => {


    return (
      <Layout>
        <Route exact path="/" component={HomeScreen} />
        <Route path="/courses" component={CoursesScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/leaderboard" component={LeaderboardScreen} />
      </Layout>
    );
}

export default App;