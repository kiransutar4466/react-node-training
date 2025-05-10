import { useState} from "react";
import StarSvg from "./StarSvg";
import moment from "moment";
import parrot from "../assets/pexels-frans-van-heerden-201846-1463295.jpg";
import { memo } from "react";
import { cardPropsType } from "../types/cardTypes";

const Card = memo(
  ({ data, HandleViewDetails, toggleFavourite}: cardPropsType) => {
    const [isSeeMoreDesc, setIsSeeMoreDesc] = useState<boolean>(false);
    const [isSeeMoreTitle, setIsSeeMoreTitle] = useState<boolean>(false);

    const slicedTitle =
      data.title?.length > 40 ? data.title.slice(0, 40) : data.title;
    const slicedDesc =
      data.description && data.description.length > 40
        ? data.description.slice(0, 40)
        : data.description;

    const handleSeeMoreTitle = () => {
      setIsSeeMoreTitle((prev) => !prev);
    };

    const handleSeeMoreDesc = () => {
      setIsSeeMoreDesc((prev) => !prev);
    };

    

    return (
      <>
        <div className="flex flex-col justify-between w-[250px] min-h-74 h-fit overflow-hidden m-1 rounded-lg drop-shadow-lg bg-black text-white relative">
          <div className="mb-2">
            <img
              className="w-full h-34"
              src={data.urlToImage ? data.urlToImage : parrot}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = parrot;
              }}
              alt="image"
            />
            <h2 className="px-2 text-zinc-100">
              {isSeeMoreTitle ? data.title : slicedTitle}{" "}
              <span className="cursor-pointer" onClick={handleSeeMoreTitle}>
                ... {!isSeeMoreTitle ? "see more" : "see less"}
              </span>
            </h2>
            <p className="px-2 text-zinc-700 text-[12px]">
              {isSeeMoreDesc ? data.description : slicedDesc}{" "}
              {data.description && (
                <span className="cursor-pointer" onClick={handleSeeMoreDesc}>
                  ... {!isSeeMoreDesc ? "see more" : "see less"}
                </span>
              )}
            </p>
          </div>
          <div>
            <div className="px-2 flex justify-between">
              <button className="p-1 text-[13px] bg-blue-500 rounded-lg cursor-pointer">
                <a href={data.url} target="_blank">
                  Visit Source
                </a>
              </button>
              <button
                className="p-1 text-[13px] bg-blue-500 rounded-lg cursor-pointer"
                onClick={() => HandleViewDetails(data.id)}
              >
                View Details
              </button>
            </div>

            <p className="px-2 text-zinc-500 text-[10px] mb-1 mt-2">
              <span>Published at: </span>{" "}
              <span>{moment(data.publishedAt).format("DD/MM/YYYY")}</span>
            </p>
          </div>

          <div
            className="absolute top-2 right-2 cursor-pointer"
            onClick={() => toggleFavourite(data.id)}
          >
            <StarSvg fillColor={`${data.isFavourite ? "#ffeb49" : "#666"}`} />
          </div>
        </div>
      </>
    );
  }
);

export default Card;
