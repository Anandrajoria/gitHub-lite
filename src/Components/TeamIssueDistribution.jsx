import React from "react";
import ReactApexChart from "react-apexcharts";

const TeamIssueDistribution = ({ data }) => {
  // Function to get monthly data for each issue type
  const getMonthlyData = () => {
    const months = {};

    data.forEach((issue) => {
      const date = new Date(issue.created_at);
      const monthYear = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      if (!months[monthYear]) {
        months[monthYear] = {
          bug: 0,
          enhancement: 0,
          newComponent: 0,
          infrastructure: 0,
          pageReview: 0,
        };
      }

      // Check issue type based on labels
      if (
        issue.labels?.some(
          (label) =>
            label.name.toLowerCase().includes("bug") ||
            label.name.toLowerCase().includes("bug report")
        )
      ) {
        months[monthYear].bug++;
      }
      if (
        issue.labels?.some(
          (label) =>
            label.name.toLowerCase().includes("enhancement") ||
            label.name.toLowerCase().includes("enhancement request")
        )
      ) {
        months[monthYear].enhancement++;
      }
      if (
        issue.labels?.some(
          (label) =>
            label.name.toLowerCase().includes("new component") ||
            label.name.toLowerCase().includes("component request")
        )
      ) {
        months[monthYear].newComponent++;
      }
      if (
        issue.labels?.some(
          (label) =>
            label.name.toLowerCase().includes("infrastructure") ||
            label.name.toLowerCase().includes("ulc infrastructure")
        )
      ) {
        months[monthYear].infrastructure++;
      }
      if (
        issue.labels?.some(
          (label) =>
            label.name.toLowerCase().includes("page review") ||
            label.name.toLowerCase().includes("review request")
        )
      ) {
        months[monthYear].pageReview++;
      }
    });

    return months;
  };

  const monthlyData = getMonthlyData();
  const sortedMonths = Object.keys(monthlyData).sort();

  const baseChartOptions = {
    chart: {
      type: "line",
      height: 400,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    stroke: {
      curve: "smooth",
      width: 4,
      lineCap: "round",
    },
    xaxis: {
      categories: [], // Will be set dynamically for each chart
      title: {
        text: "Month",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
      labels: {
        rotate: -45,
        style: {
          fontSize: "13px",
        },
      },
    },
    yaxis: {
      title: {
        text: "Number of Issues",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
      min: 0,
      tickAmount: 5,
    },
    markers: {
      size: 5,
      hover: {
        size: 8,
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " issues";
        },
      },
      theme: "dark",
      style: {
        fontSize: "14px",
      },
    },
    grid: {
      borderColor: "#f1f1f1",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 10,
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  const charts = [
    {
      title: "Bug Reports",
      color: "#FF4560",
      data: sortedMonths.map((month) => monthlyData[month].bug),
    },
    {
      title: "Enhancement Requests",
      color: "#008FFB",
      data: sortedMonths.map((month) => monthlyData[month].enhancement),
    },
    {
      title: "New Component Requests",
      color: "#00E396",
      data: sortedMonths.map((month) => monthlyData[month].newComponent),
    },
    {
      title: "Infrastructure Requests",
      color: "#FEB019",
      data: sortedMonths.map((month) => monthlyData[month].infrastructure),
    },
    {
      title: "Page Review Requests",
      color: "#775DD0",
      data: sortedMonths.map((month) => monthlyData[month].pageReview),
    },
  ];

  return (
    <div className="team-issue-distribution">
      <h2>Issue Type Distribution Over Time</h2>
      <div className="charts-grid">
        {charts.map((chart, index) => {
          // Filter out months with zero values
          const filteredData = chart.data
            .map((value, i) => ({
              value,
              month: sortedMonths[i],
            }))
            .filter((item) => item.value > 0);

          const filteredCategories = filteredData.map((item) => {
            const [year, month] = item.month.split("-");
            return `${month}/${year}`;
          });

          const filteredValues = filteredData.map((item) => item.value);

          return (
            <div key={index} className="chart-item">
              <ReactApexChart
                options={{
                  ...baseChartOptions,
                  xaxis: {
                    ...baseChartOptions.xaxis,
                    categories: filteredCategories,
                  },
                  title: {
                    text: chart.title,
                    align: "center",
                    style: {
                      fontSize: "18px",
                      fontWeight: "bold",
                    },
                  },
                  colors: [chart.color],
                }}
                series={[
                  {
                    name: chart.title,
                    data: filteredValues,
                  },
                ]}
                type="line"
                height={400}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamIssueDistribution;
