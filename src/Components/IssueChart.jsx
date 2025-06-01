import React from "react";
import ReactApexChart from "react-apexcharts";

const IssueChart = ({ data }) => {
  // Calculate quarterly data
  const getQuarterData = () => {
    const quarters = {
      q1: { open: 0, closed: 0 },
      q2: { open: 0, closed: 0 },
      q3: { open: 0, closed: 0 },
      q4: { open: 0, closed: 0 },
    };

    data.forEach((issue) => {
      const date = new Date(issue.created_at);
      const month = date.getMonth() + 1;
      let quarter;

      if (month >= 1 && month <= 3) quarter = "q1";
      else if (month >= 4 && month <= 6) quarter = "q2";
      else if (month >= 7 && month <= 9) quarter = "q3";
      else quarter = "q4";

      if (issue.state === "open") {
        quarters[quarter].open++;
      } else {
        quarters[quarter].closed++;
      }
    });

    return quarters;
  };

  const quarterData = getQuarterData();

  const chartOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: {
        show: true,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories: ["Q1", "Q2", "Q3", "Q4"],
      title: {
        text: "Quarters",
      },
    },
    yaxis: {
      title: {
        text: "Number of Issues",
      },
    },
    title: {
      text: "GitHub Issues by Quarter",
      align: "center",
    },
    colors: ["#2E93fA", "#66DA26"],
    legend: {
      position: "top",
    },
  };

  const series = [
    {
      name: "Open Issues",
      data: [
        quarterData.q1.open,
        quarterData.q2.open,
        quarterData.q3.open,
        quarterData.q4.open,
      ],
    },
    {
      name: "Closed Issues",
      data: [
        quarterData.q1.closed,
        quarterData.q2.closed,
        quarterData.q3.closed,
        quarterData.q4.closed,
      ],
    },
  ];

  return (
    <div className="issue-chart">
      <ReactApexChart
        options={chartOptions}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default IssueChart;
