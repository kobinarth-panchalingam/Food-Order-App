import React, { useState } from "react";
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import { useNavigate } from "react-router-dom";
import LocalStorageService from "../utils/LocalStorageService";

const Guide = () => {
  const run = LocalStorageService.getItem("run");
  const [runTutorial, setRunTutorial] = useState(!run);
  const [stepIndex, setStepIndex] = useState(0);
  const navigate = useNavigate();

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
      placement: "bottom",
    },

    {
      target: ".current-order",
      content: "This is the Current Order page. Check your ongoing orders here.",
      placement: "bottom",
    },
    {
      target: ".all-orders",
      content: "View all orders on the All Orders page.",
      placement: "bottom",
    },
    {
      target: ".past-orders",
      content: "Access your past orders on the Past Orders page.",
      placement: "bottom",
    },
    {
      target: ".logout",
      content: "Click here to log out.",
      placement: "bottom",
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
      LocalStorageService.setItem("run", true);
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