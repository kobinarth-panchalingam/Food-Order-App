function Greeting() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  let greeting = "Good Evening";
  
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
  }
  
  return (
    <h2 className="my-3 text-center" style={{ opacity: 0.7 }}>
      {greeting} {user.name} 😉
    </h2>
  );
}

export default Greeting;