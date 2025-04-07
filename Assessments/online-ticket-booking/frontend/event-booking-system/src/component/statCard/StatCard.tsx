import { CircularProgress } from "@mui/material";

const StatCard = ({ icon, title, value, bg, loading }:any) => {
  return (
    <div
      className={`rounded-xl p-6 shadow-md flex items-center gap-4 ${bg} hover:shadow-lg transition duration-300`}
    >
      <div>{icon}</div>
      <div>
        <h3 className="text-lg text-gray-300">{title}</h3>
        <p className="text-2xl font-bold text-white">
          {loading ? <CircularProgress size="30px" /> : value}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
