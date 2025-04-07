import { IoIosSearch } from "react-icons/io";
import { searchBarPropsTypes } from "../types/components-props-types/searchBarPropsTypes";

const SearchBar = ({
  placeholder,
  onChangeCb,
  id,
  name,
  value,
  width,
  height,
}: searchBarPropsTypes) => {
  return (
    <div
      style={{ width: width, height: height }}
      className={`w-${width} h-${height} relative rounded-[5px] overflow-hidden  border-[1px] border-table-border`}
    >
      <input
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChangeCb(e)}
        className="bg-primary-white px-2 text-text-dark rounded-[5px] w-full h-full"
        placeholder={placeholder}
      />
      <span className="absolute right-0 top-0 text-2xl z-10 bg-header-bg text-text-dark h-full p-1">
        <IoIosSearch />
      </span>
    </div>
  );
};

export default SearchBar;
