import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import issuesData from "../dummyData/github_dummy_issues.json";

interface Issue {
  state: string;
  labels: { name: string }[];
  created_at: string;
  reactions: {
    "+1": number;
    "-1": number;
    laugh: number;
    hooray: number;
    confused: number;
    heart: number;
    rocket: number;
    eyes: number;
  };
}

const IssueCharts: React.FC = () => {
  const [issues] = useState<Issue[]>(issuesData);

  // Chart 1: Issues by State
  const stateOptions: ApexOptions = {
    chart: {
      type: "pie",
    },
    labels: ["Open", "Closed"],
    title: {
      text: "Issues by State",
      align: "center",
    },
    colors: ["#2ecc71", "#e74c3c"],
  };

  const stateSeries = [
    issues.filter((issue) => issue.state === "open").length,
    issues.filter((issue) => issue.state === "closed").length,
  ];

  // Chart 2: Top Labels
  const labelCounts = issues.reduce((acc, issue) => {
    issue.labels.forEach((label) => {
      acc[label.name] = (acc[label.name] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const labelOptions: ApexOptions = {
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    title: {
      text: "Top Issue Labels",
      align: "center",
    },
    xaxis: {
      categories: Object.keys(labelCounts),
    },
  };

  const labelSeries = [
    {
      name: "Number of Issues",
      data: Object.values(labelCounts),
    },
  ];

  // Chart 3: Reactions Distribution
  const reactionOptions: ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: ["👍", "👎", "😄", "🎉", "😕", "❤️", "🚀", "👀"],
    title: {
      text: "Reactions Distribution",
      align: "center",
    },
  };

  const reactionSeries = [
    issues.reduce((sum, issue) => sum + issue.reactions["+1"], 0),
    issues.reduce((sum, issue) => sum + issue.reactions["-1"], 0),
    issues.reduce((sum, issue) => sum + issue.reactions.laugh, 0),
    issues.reduce((sum, issue) => sum + issue.reactions.hooray, 0),
    issues.reduce((sum, issue) => sum + issue.reactions.confused, 0),
    issues.reduce((sum, issue) => sum + issue.reactions.heart, 0),
    issues.reduce((sum, issue) => sum + issue.reactions.rocket, 0),
    issues.reduce((sum, issue) => sum + issue.reactions.eyes, 0),
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <ReactApexChart
          options={stateOptions}
          series={stateSeries}
          type="pie"
          height={350}
        />
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <ReactApexChart
          options={labelOptions}
          series={labelSeries}
          type="bar"
          height={350}
        />
      </div>
      <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
        <ReactApexChart
          options={reactionOptions}
          series={reactionSeries}
          type="donut"
          height={350}
        />
      </div>
    </div>
  );
};

export default IssueCharts;
