import React from "react";
import "../styleSheet/IssueStats.css";

const IssueStats = ({ data }) => {
  // Calculate statistics
  const totalOpenIssues = data.filter((item) => item.state === "open").length;
  const totalClosedIssues = data.filter(
    (item) => item.state === "closed"
  ).length;

  // Calculate average resolution time for closed issues
  const closedIssues = data.filter((item) => item.state === "closed");
  const avgResolutionTime =
    closedIssues.reduce((acc, issue) => {
      const created = new Date(issue.created_at);
      const closed = new Date(issue.closed_at);
      const diffDays = Math.ceil((closed - created) / (1000 * 60 * 60 * 24));
      return acc + diffDays;
    }, 0) / (closedIssues.length || 1);

  // Count issues with labels
  const invalidRequests = data.filter((item) =>
    item.labels?.some((label) => label.name.toLowerCase().includes("invalid"))
  ).length;

  // Calculate total issues and invalid request percentage
  const totalIssues = data.length;
  const invalidRequestPercentage = (
    (invalidRequests / totalIssues) *
    100
  ).toFixed(1);

  const milestoneIssues = data.filter((item) => item.milestone).length;

  const stats = [
    {
      title: "Open Issues",
      value: totalOpenIssues,
      color: "#2ea44f",
      bgColor: "rgba(46, 164, 79, 0.1)",
      Text: "total active issues",
    },
    {
      title: "Closed Issues",
      value: totalClosedIssues,
      color: "#cb2431",
      bgColor: "rgba(203, 36, 49, 0.1)",
      Text: "Resolved issues",
    },
    {
      title: "Avg Resolution Time",
      value: `${Math.round(avgResolutionTime)} days`,
      color: "#0366d6",
      bgColor: "rgba(3, 102, 214, 0.1)",
      Text: "average resolution time",
    },
    {
      title: "Invalid Requests",
      value: `${invalidRequestPercentage}%`,
      color: "#d73a4a",
      bgColor: "rgba(215, 58, 74, 0.1)",
      Text: "invalid requests",
    },
    {
      title: "Milestone Issues",
      value: milestoneIssues,
      color: "#e36209",
      bgColor: "rgba(227, 98, 9, 0.1)",
      Text: "milestone issues",
    },
  ];

  return (
    <div className="issue-stats-container">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="stat-box"
          style={{
            borderColor: stat.color,
            backgroundColor: stat.bgColor,
          }}
        >
          <h3>{stat.title}</h3>
          <p>{stat.value}</p>
          <p3>{stat.Text}</p3>
        </div>
      ))}
    </div>
  );
};

export default IssueStats;
