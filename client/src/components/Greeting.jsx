export default function Greeting() {
  const currentHour = new Date().getHours();
  let greeting = "";
  const user = JSON.parse(localStorage.getItem("user"));
  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return (
    <h2 className="my-3 text-center" style={{ opacity: 0.7 }}>
      {greeting} {user.name} 😉
    </h2>
  );
}
