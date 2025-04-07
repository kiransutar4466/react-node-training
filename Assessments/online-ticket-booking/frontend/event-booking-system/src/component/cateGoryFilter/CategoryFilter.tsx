import { useState } from "react";

const CategoryFilter = ({ data, onAdd }: any) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState("");

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);
    setSelectedType("");
  };

  const handleAdd = () => {
    if (selectedCategory && selectedType) {
      onAdd({ category: selectedCategory, type: selectedType });
    }
  };

  return (
    <div className="flex gap-10 p-4 w-100 bg-[#fbfbfb] border-[2px] border-[gray] rounded-[8px]">
      <div style={{ minWidth: "150px" }}>
        <h4>Filter Events</h4>
        {Object.keys(data).map((category) => (
          <div
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-3 py-2 cursor-pointer mt-1 ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            } border-b `}
          >
            {category}
          </div>
        ))}
      </div>

      {/* Right side - Type selection */}
      <div>
        {selectedCategory && (
          <>
          {/* {selectedCategory} */}
            <h4>Event Types</h4>
            {data[selectedCategory].map((type: any) => (
              <label key={type} className="mt-2 block ">
                <input
                  type="radio"
                  name="type"
                  value={type}
                  checked={selectedType === type}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="mx-1"
                />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              
              </label>
            ))}
            <button
              onClick={handleAdd}
              className="mt-2 bg-black text-white px-6 p-1 rounded-[4px]"
            >
              Add
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
