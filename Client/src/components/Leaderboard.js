import React from "react";

const LeaderBoard = () => {
  return (
    <div>
      <p className="d-flex justify-content-center">
        <b>Leaderboard</b>
      </p>
      <table class="table">
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Sally Walberg</td>
            <td>90 Points</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob Thornton</td>
            <td>80 Points</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry Bird</td>
            <td>50 Points</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Jessica Parker</td>
            <td>20 Points</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Tony Vu</td>
            <td>0 Points</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;