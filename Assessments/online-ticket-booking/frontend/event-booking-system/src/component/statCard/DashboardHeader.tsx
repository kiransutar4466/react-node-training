import logoImage from '../../assets/logoImage.png'
const DashboardHeader = ({text}:any) => {
    return (
      <div className="relative w-full h-24 overflow-hidden
      bg-gradient-to-r from-[#161e30] to-[#252629] rounded-lg flex items-center px-8
    6">
      
        <h2 className="text-2xl font-bold text-white">{text}</h2>
  
 
        <img
          src={logoImage} 

          alt="Dashboard Illustration"
          className="absolute right-0 h-40 object-contain"
        />
      </div>
    );
  };
  
  export default DashboardHeader;
  