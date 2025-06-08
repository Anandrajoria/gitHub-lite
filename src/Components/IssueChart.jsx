import React from "react";
import ReactApexChart from "react-apexcharts";

const IssueChart = ({ data }) => {
  // Calculate quarterly data
  const getQuarterData = () => {
    const quarters = {};

    data.forEach((issue) => {
      const date = new Date(issue.created_at);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      let quarter;

      if (month >= 1 && month <= 3) quarter = `q1_${year}`;
      else if (month >= 4 && month <= 6) quarter = `q2_${year}`;
      else if (month >= 7 && month <= 9) quarter = `q3_${year}`;
      else quarter = `q4_${year}`;

      if (!quarters[quarter]) {
        quarters[quarter] = { open: 0, closed: 0, milestone: 0 };
      }

      if (issue.state === "open") {
        quarters[quarter].open++;
      } else {
        quarters[quarter].closed++;
      }

      if (issue.milestone) {
        quarters[quarter].milestone++;
      }
    });

    return quarters;
  };

  const quarterData = getQuarterData();

  // Get unique quarters sorted chronologically and filter out quarters with no data
  const quarters = Object.keys(quarterData)
    .filter((quarter) => {
      const data = quarterData[quarter];
      return data.open > 0 || data.closed > 0 || data.milestone > 0;
    })
    .sort((a, b) => {
      const [qA, yearA] = a.split("_");
      const [qB, yearB] = b.split("_");
      if (yearA !== yearB) return parseInt(yearA) - parseInt(yearB);
      return parseInt(qA.slice(1)) - parseInt(qB.slice(1));
    });

  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
      stacked: false,
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: quarters.map((q) => {
        const [quarter, year] = q.split("_");
        return `${quarter.toUpperCase()} ${year}`;
      }),
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
    colors: ["#1f618d", "#1a252f", "#dcdde1"],
    legend: {
      position: "top",
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " issues";
        },
      },
    },
  };

  const series = [
    {
      name: "Open Issues",
      data: quarters.map((q) => quarterData[q].open),
    },
    {
      name: "Closed Issues",
      data: quarters.map((q) => quarterData[q].closed),
    },
    {
      name: "Milestone Issues",
      data: quarters.map((q) => quarterData[q].milestone),
    },
  ];


  return (
    <div className="issue-chart">
      <ReactApexChart
        options={chartOptions}
        series={series}
        type="bar"
        height={350}
      />
      
    </div>
  );
};

export default IssueChart;
