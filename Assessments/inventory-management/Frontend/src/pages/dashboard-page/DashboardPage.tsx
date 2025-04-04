import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { toast } from "react-toastify";
import axios from "axios";
import { FaBox } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { IoStatsChartSharp } from "react-icons/io5";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts";

const DashboardPage = () => {
  const [statistics, setStatistics] = useState<any>();
  const [categoryStats, setCategoryStats] = useState<any>([]);
  const [salesStats, setSalesStats] = useState<any>([]);

  const getStatistics = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}products/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      setStatistics(response.data);
    } catch (error: any) {
      toast(error.response.data.message[0]);
    }
  };

  const getCategoryStatistics = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}products/categoriesSoldCount`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      console.log(response);
      setCategoryStats(response.data);
    } catch (error: any) {
      toast(error.response.data.message[0]);
    }
  };

  const getSalesStatistics = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}products/salesPerMonthForCurrentYear`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      console.log(response);
      setSalesStats(response.data);
    } catch (error: any) {
      toast(error.response.data.message[0]);
    }
  };



  useEffect(() => {
    getStatistics();
    getCategoryStatistics();
    getSalesStatistics ()
  }, []);

  const pieData = categoryStats.map((stat: { soldCount: any; category: any; },key: any)=>{return { id: key, value: stat.soldCount, label: stat.category }})
  const barData = salesStats.reduce((acc: any[], value: { totalSales: any; })=>{acc.push(value.totalSales); return acc},[])
  return (
    <div className="py-2">
      <div className="my-3">
        <h1 className="font-bold text-2xl text-center">Dashboard</h1>
      </div>

      <div className="flex justify-center gap-5 mb-5">
        <Card
          title={statistics?.totalProducts}
          subtitle="Total Products"
          icon={
            <span className="text-4xl text-green-600">
              <FaBox />
            </span>
          }
        />
        <Card
          title={"$" + statistics?.totalSales.toFixed(2)}
          subtitle="Total Sales"
          icon={
            <span className="text-4xl">
              <FcSalesPerformance />
            </span>
          }
        />
        <Card
          title={"$" + statistics?.salesThisMonth.toFixed(2)}
          subtitle="Sales this month"
          icon={
            <span className="text-4xl text-primary-orange">
              <IoStatsChartSharp />
            </span>
          }
        />
      </div>

      <div className="flex justify-center gap-5">
        <div className="bg-primary-white w-fit p-2 rounded-xl border-1">
          <div className="chart w-[560px] h-[350px] flex justify-center items-center flex-col">
            <div className="w-full text-center">Sales per month </div>
            <BarChart
              xAxis={[
                {
                  id: "barCategories",
                  data: [
                    "JAN",
                    "FEB",
                    "MAR",
                    "APR",
                    "MAY",
                    "JUN",
                    "JUL",
                    "AUG",
                    "SEP",
                    "OCT",
                    "NOV",
                    "DEC",
                  ],
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  //data: barData,
                  data:[655,414,988,314,389,415,890,678,234,765,456,560]
                },
              ]}
              width={540}
              height={350}
            />
          </div>
        </div>
        <div className="bg-primary-white w-fit p-2 rounded-xl border-1">
        <div className="w-full text-center">Sales Category Wise</div>
          <div className="chart w-[350px] h-[350px] flex justify-between items-center">
            {categoryStats.length>0 && <PieChart
              series={[
                {
                  data: pieData,
                },
              ]}
              width={400}
              height={200}
            />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
