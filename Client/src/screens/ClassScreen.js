import React from "react";

const ClassScreen = (props) => {
  const clicked = () => {
    console.log(props.location.courses[props.location.courseId]);
  };

  return (
    <div>
      <button onClick={clicked}>PRESS ME</button>
    </div>
  );
};

export default ClassScreen;
