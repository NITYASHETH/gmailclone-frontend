import React, { useEffect, useState } from "react";
import Email from "./Email";
import useGetAllEmails from "../hooks/useGetAllEmails";
import { useSelector } from "react-redux";

const Emails = () => {
  useGetAllEmails(); // Custom hook to fetch all emails
  const { emails, searchText } = useSelector((store) => store.app);
  const [filteredEmails, setFilteredEmails] = useState(emails);

  useEffect(() => {
    const filteredEmails = emails.filter((email) => {
      return (
        email.subject.toLowerCase().includes(searchText.toLowerCase()) ||
        email.to.toLowerCase().includes(searchText.toLowerCase()) ||
        email.message.toLowerCase().includes(searchText.toLowerCase())
      );
    });

    setFilteredEmails(filteredEmails); // Update the state with filtered emails
  }, [emails, searchText]); // Ensure filtering happens when emails or searchText changes

  return (
    <div>
      {filteredEmails && filteredEmails.map((email) => (
        <Email key={email._id} email={email} />
      ))}
    </div>
  );
};

export default Emails;
