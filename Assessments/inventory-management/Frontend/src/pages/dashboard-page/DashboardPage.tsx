import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { toast } from "react-toastify";
import axios from "axios";
import { FaBox } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { IoStatsChartSharp } from "react-icons/io5";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart, PieChart } from "@mui/x-charts";
import { useSelector } from "react-redux";
import { rootState } from "../../store/store";
import { ADMIN, VENDOR } from "../../constants/roles";
import Table from "../../components/Table";
import { MdAssignmentTurnedIn, MdInventory2 } from "react-icons/md";
import { useNavigate } from "react-router";

const DashboardPage = () => {
  const [statistics, setStatistics] = useState<any>();
  // const [categoryStats, setCategoryStats] = useState<any>([]);
  // const [salesStats, setSalesStats] = useState<any>([]);
  const { userDetails } = useSelector((state: rootState) => state.auth);
  const [tableData, setTableData] = useState([])
  const navigate = useNavigate()

  const columns = [
    { name: "Sr no.", width: "60px" },
    { name: "Name", width: "200px" },
    { name: "Email", width: "220px" },
    { name: "City", width: "120px" },
    { name: "Company Name", width: "250px" },
    { name: "Contact Number", width: "150px" },
  ];

  const getStatistics = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}dashboard`,
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

  // const getCategoryStatistics = async () => {
  //   const token = localStorage.getItem("token");

  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_SERVER_BASE_URL}products/categoriesSoldCount`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "ngrok-skip-browser-warning": "69420",
  //         },
  //       }
  //     );
  //     console.log(response);
  //     setCategoryStats(response.data);
  //   } catch (error: any) {
  //     toast(error.response.data.message[0]);
  //   }
  // };

  // const getSalesStatistics = async () => {
  //   const token = localStorage.getItem("token");

  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_SERVER_BASE_URL}products/salesPerMonthForCurrentYear`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "ngrok-skip-browser-warning": "69420",
  //         },
  //       }
  //     );
  //     console.log(response);
  //     setSalesStats(response.data);
  //   } catch (error: any) {
  //     toast(error.response.data.message[0]);
  //   }
  // };

  useEffect(() => {
    getStatistics();
    // getCategoryStatistics();
    // getSalesStatistics ()
  }, []);

  useEffect(()=>{
    statistics?.bestSellers && setTableData(statistics.bestSellers?.map((vendor:any) => {
      return {
        id: vendor?.id,
        name: vendor?.firstName+" "+vendor?.lastName,
        email: vendor?.email,
        city:vendor?.city,
        companyName: vendor?.companyName,
        contactNumber: vendor?.contactNumber,
      };
    }))
  },[statistics])
  

  console.log(statistics);

  const pieData = statistics?.categoryWiseSoldCount?.map(
    (stat: { soldCount: any; category: any }, key: any) => {
      return { id: key, value: stat.soldCount, label: stat.category };
    }
  );
  const barData = statistics?.salesPerMonthForCurrentYear?.reduce(
    (acc: any[], value: { totalSales: any }) => {
      acc.push(value.totalSales);
      return acc;
    },
    []
  );
  return (
    <div className="py-2 px-5 w-full overflow-y-scroll">
      
      
      <div className="my-3">
        <h1 className="font-bold text-[18px] text-start">Dashboard</h1>
        <p className="text-sm cursor-pointer"><span onClick={()=>navigate('/')}>Home</span>/<span onClick={()=>navigate('/dashboard')}>Dashboard</span></p>
      </div>

      <div className="flex justify-between gap-5 mb-5">
      {userDetails?.role == VENDOR && <Card
          width="270px"
          onClickCb={()=>navigate('/products')}
          title={statistics?.productStats.totalProducts}
          subtitle="Total Products"
          icon={
            <span className="text-4xl text-green-600">
              <FaBox />
            </span>
          }
        />}

      
        
        <Card
          width={userDetails?.role == VENDOR ? '270px' : '380px'}
          onClickCb={()=>navigate('/orders')}
          title={"$ " + statistics?.productStats.totalSales.toFixed(2)}
          subtitle="Total Sales"
          icon={
            <span className="text-4xl">
              <FcSalesPerformance />
            </span>
          }
        />

        {userDetails?.role == ADMIN && <Card
          width={'380px'}
          onClickCb={()=>navigate('/inventory')}
          title={statistics?.totalInventory
             }
          subtitle="Total Inventories"
          icon={
            <span className="text-4xl text-purple-600">
              <MdInventory2 />
            </span>
          }
        />}

     {userDetails?.role == VENDOR && <Card
     width={'270px' }
     onClickCb={()=>navigate('/orders')}
          title={statistics?.totalOrders
             }
          subtitle="Total Orders"
          icon={
            <span className="text-4xl text-purple-600">
              <MdAssignmentTurnedIn />
            </span>
          }
        />}

        <Card
          width={userDetails?.role == VENDOR ? '270px' : '380px'}
          onClickCb={()=>navigate('/orders')}
          title={"$ " + statistics?.productStats.salesThisMonth.toFixed(2)}
          subtitle="Sales this month"
          icon={
            <span className="text-4xl text-primary-orange">
              <IoStatsChartSharp />
            </span>
          }
        />
      </div>

      <div className="flex justify-between gap-5">
        <div className="bg-primary-white  p-2 rounded-xl border-1 min-w-[560px] w-[60%] h-[400px]">
          <div className="chart flex justify-center items-center flex-col">
            <div className="w-full font-medium text-[15px] text-center">Sales per month </div>
            {userDetails?.role == VENDOR  && barData? (
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
                    data:barData ,
                  },
                ]}
                width={540}
                height={350}
              />
            ) : userDetails?.role == ADMIN && barData? (
              <LineChart
              xAxis={[{ 
                scaleType: "point",
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
              ], }]}
              series={[
                  {
                 
                    data:barData ,
                  },
                ]}
                width={540}
                height={350}
              />
            ) : <></>}
          </div>
        </div>
        <div className="bg-primary-white p-2 min-w-[350px] w-[40%] h-[400px] rounded-xl border-1 flex flex-col justify-start gap-5 items-center">
          <div className="w-full text-center font-medium text-[15px]">Sales Category Wise</div>
          <div className="chart ">
            {statistics?.categoryWiseSoldCount?.length > 0 && (
              <PieChart
                series={[
                  {
                    data: pieData,
                  },
                ]}
                slotProps={{
                  legend: {
                    labelStyle: {
                      fontSize: 12,
                    },
                    itemMarkWidth: 10,
                    itemMarkHeight: 10,
                  },
                }}
                width={500}
                height={300}
              />
            )}
          </div>
        </div>


      </div>
      
      <div className="my-5">
      { statistics?.bestSellers && tableData.length>0 && <h1 className="font-medium text-[15px] text-start mb-2">Top 5 Sellers</h1>}

      { statistics?.bestSellers && tableData.length>0 &&  <Table
            // onClickRowCb={handleRowClick}
            isLoading={false}
            tableData={tableData}
            columns={columns}
            isActions={
              false
            }
            // actions={[
            //   {
            //     content: <MdEdit />,
            //     onClickCb: (id: string) => {
            //       openEditModal(id);
            //     },
            //   },
            //   {
            //     content: <MdDelete />,
            //     onClickCb: (id: string) => {
            //       openDeleteModal(id);
            //     },
            //   },
            // ]}
            pageNum={1}
            perPage={5}
          /> }


      </div>
      
    </div>
  );
};

export default DashboardPage;
