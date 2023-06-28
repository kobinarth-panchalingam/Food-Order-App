import React, { useState } from "react";
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";

const Guide = () => {
  const run = sessionStorage.getItem("run");
  const [runTutorial, setRunTutorial] = useState(false); //need to change this code
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    {
      target: ".swipe-element",
      content: "Swipe left or right to navigate through the content.",
      disableBeacon: true,
      placement: "center",
    },
    {
      target: ".order-here",
      content: "Welcome to the Order Here page! Click here to place an order.",
      placement: "top",
    },

    {
      target: ".current-order",
      content: "This is the Current Order page. Check your ongoing orders here.",
      placement: "top",
    },
    {
      target: ".all-orders",
      content: "View all orders on the All Orders page.",
      placement: "top",
    },
    {
      target: ".past-orders",
      content: "Access your past orders on the Past Orders page.",
      placement: "top",
    },
    {
      target: ".logout",
      content: "Click here to log out.",
      placement: "top",
    },
    // Add more steps for your tutorial as needed
  ];

  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Update state to advance the tour
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      sessionStorage.setItem("run", true);
    }
  };

  return (
    <>
      {/* Render the Joyride component */}
      <Joyride
        steps={steps}
        run={runTutorial}
        continuous={true}
        callback={handleJoyrideCallback}
        showProgress={true}
        showSkipButton={true}
        stepIndex={stepIndex}
        disableOverlayClose={true}
        locale={{
          back: "Back",
          next: "Next",
          skip: "Skip",
          last: "Finish",
        }}
      />
    </>
  );
};

export default Guide;
