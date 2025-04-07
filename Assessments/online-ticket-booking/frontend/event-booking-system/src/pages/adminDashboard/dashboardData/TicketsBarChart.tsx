import { BarChart } from "@mui/x-charts/BarChart";

const TicketsBarChart = ({ data }: any) => {
  return (
    <BarChart
      dataset={data}
      xAxis={[{ scaleType: "band", dataKey: "month", label: "Months" }]}
      yAxis={[
        {
          label: "Tickets",
        },
      ]}
      series={[{ dataKey: "tickets", label: "Tickets Booked" }]}
      width={660}
      height={400}
    />
  );
};

export default TicketsBarChart;
