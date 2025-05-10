import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const CardSkeleton = () => {
  return (
    <>
      <Stack spacing={1} bgcolor={"whitesmoke"} padding={2}>
        <Skeleton
          animation="wave"
          sx={{ bgcolor: "grey" }}
          variant="rounded"
          width={210}
          height={118}
        />
        <Skeleton
          animation="wave"
          sx={{ bgcolor: "grey" }}
          variant="text"
          width={210}
          height={18}
        />
        <Skeleton
          animation="wave"
          sx={{ bgcolor: "grey" }}
          variant="text"
          width={210}
          height={18}
        />
        <div className="flex justify-between">
          <Skeleton
            animation="wave"
            sx={{ bgcolor: "grey" }}
            variant="text"
            width={70}
            height={18}
          />{" "}
          <Skeleton
            animation="wave"
            sx={{ bgcolor: "grey" }}
            variant="text"
            width={70}
            height={18}
          />
        </div>
      </Stack>
    </>
  );
};

export default CardSkeleton;
