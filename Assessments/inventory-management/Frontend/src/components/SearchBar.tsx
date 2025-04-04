import { IoIosSearch } from "react-icons/io";
import { searchBarPropsTypes } from "../types/components-props-types/searchBarPropsTypes";

const SearchBar = ({placeholder, onChangeCb, id, name, value, width, height}:searchBarPropsTypes) => {
  return (
    <div style={{width:width, height:height}} className={`w-${width} h-${height} relative rounded-lg overflow-hidden`}>
      <input
        id={id}
        name={name}
        value={value}
        onChange={(e)=>onChangeCb(e)}
        className="bg-secondary-gray px-2 text-primary-black rounded-lg w-full h-full "
        placeholder={placeholder}
      />
      <span className="absolute right-0 top-0 text-2xl z-10 bg-primary-gray text-primary-white h-full p-1">
        <IoIosSearch />
      </span>
    </div>
  );
};

export default SearchBar;
