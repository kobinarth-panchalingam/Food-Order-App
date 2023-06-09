import axios from "axios";
import React, { useState, useEffect } from "react";
const PayerSelection = ({ selectedPayer, setSelectedPayer }) => {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/all`);
        const members = response.data.map((member) => ({ name: member.name, splitwiseId: member.splitwiseId }));
        setMembers(members);
      } catch (error) {
        console.error("Failed to fetch member emails:", error);
      }
    };

    fetchEmails();
  }, []);

  const handlePayerChange = (event) => {
    setSelectedPayer(event.target.value);
  };

  return (
    <div className="container mb-4">
      <div className="p-2 row border">
        <div className="col-5 text-center fw-bold ">
          <span className="align-middle">Select Payer:</span>
        </div>
        <div className="col-7 ">
          <select className="form-select" value={selectedPayer} onChange={handlePayerChange}>
            {members.map((member) => (
              <option key={member.name} value={member.splitwiseId}>
                {member.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default PayerSelection;
