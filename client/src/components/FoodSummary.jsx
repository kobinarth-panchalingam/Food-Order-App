import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import UserOrdersTable from "./UserOrdersTable";
import FoodSummaryTable from "./FoodSummaryTable";

function FoodSummary() {
  return (
    <>
      <FoodSummaryTable />
      <UserOrdersTable />
    </>
  );
}

export default FoodSummary;
