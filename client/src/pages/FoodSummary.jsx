import UserOrdersTable from "../components/UserOrdersTable";
import FoodSummaryTable from "../components/FoodSummaryTable";
import NavBar from "../components/NavBar";

function FoodSummary() {
  return (
    <>
      <NavBar activeTab={"tab2"} />
      <FoodSummaryTable />
      <UserOrdersTable />
    </>
  );
}

export default FoodSummary;
