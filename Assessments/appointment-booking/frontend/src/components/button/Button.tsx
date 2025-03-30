import clsx from "clsx";

export const Button = ({ variant = "primary", children, ...props }) => {
  return (
    <button
      className={clsx(
        "w-full h-13.5 my-4 px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer ",
        {
          "bg-primary text-white hover:bg-green-900": variant === "primary",
          "bg-gray-200 text-gray-800 hover:bg-gray-300":
            variant === "secondary",
          " bg-red-600 text-gray-800 hover:bg-red-700": variant === "delete",
        }
      )}
      {...props}
    >
      {children}
    </button>
  );
};
