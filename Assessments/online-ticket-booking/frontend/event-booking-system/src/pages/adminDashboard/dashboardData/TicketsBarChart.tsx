
import { colors } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

const data = [
  { month: "Jan", tickets: 120 },
  { month: "Feb", tickets: 150 },
  { month: "Mar", tickets: 180 },
  { month: "Apr", tickets: 130 },
  { month: "May", tickets: 200 },
  { month: "Jun", tickets: 170 },
  { month: "Jul", tickets: 190 },
  { month: "Aug", tickets: 210 },
  { month: "Sep", tickets: 160 },
  { month: "Oct", tickets: 220 },
  { month: "Nov", tickets: 230 },
  { month: "Dec", tickets: 250 },
];

const TicketsBarChart = () => {
  return (
    <BarChart
    dataset={data}
 
    xAxis={[{ scaleType: "band", dataKey: "month" }]}
    series={[{ dataKey: "tickets", label: "Tickets Booked" }]}
    width={660}
    height={400}
  />
  );
};

export default TicketsBarChart;