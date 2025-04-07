import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  
 
  const rawSegments = location.pathname.split("/").filter((segment) => segment && segment !== "admin");


  const pathSegments = rawSegments.map((segment) => {
    if (segment === "admin" || segment === "event-management") {
      return "Event Management";
    }
    return segment;
  });

  return (
    <nav className="text-gray-600 text-sm mb-4">
      <ul className="flex items-center gap-2">

        <li>
          <Link to="/admin/admin-dashboard" className="text-blue-600 hover:underline">
            Dashboard
          </Link>
        </li>

        {pathSegments.length > 0 && <span>/</span>}

        {pathSegments.map((segment, index) => {
      
          const path = `/admin/${rawSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;

          return (
            <li key={path} className="flex items-center">
              {!isLast ? (
                <Link to={path} className="text-blue-600 hover:underline capitalize">
                  {segment}
                </Link>
              ) : (
                <span className="text-gray-900 capitalize">{segment}</span>
              )}
              {!isLast && <span className="mx-2">/</span>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
