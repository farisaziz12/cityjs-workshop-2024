import { useState, memo, FC } from "react";

const TestComponent: FC<{ isToggled: boolean }> = memo(
  ({ isToggled }) => {
    console.log("I have rendered");

    return <div>{isToggled ? "Toggled" : "Not Toggled"}</div>;
  },
  (prevProps, nextProps) => prevProps.isToggled === nextProps.isToggled
);

TestComponent.displayName = "TestComponent";

export default function Home() {
  const [state, setState] = useState({
    isToggled: false,
    form: {
      email: "",
      password: "",
    },
  });

  const toggleState = () => {
    setState((prevState) => ({
      isToggled: true,
      form: {
        email: "",
        password: "",
      },
    }));
  };

  return (
    <>
      <TestComponent {...state} />
      <button onClick={toggleState}>Toggle State</button>
    </>
  );
}
