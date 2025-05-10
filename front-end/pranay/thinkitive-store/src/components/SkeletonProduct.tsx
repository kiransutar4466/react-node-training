import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const SkeletonProduct = () => {
  return (
    <>
      <Stack spacing={1} bgcolor={"whitesmoke"} padding={2}>
        <div className="flex md:flex-nowrap flex-wrap overflow-y-scroll w-[90%] h-[90vh] gap-2 p-5 bg-amber-100 m-auto mt-5 rounded-lg justify-center">
          <div className="w-fit p-3 ">
            <Skeleton
              animation="wave"
              sx={{
                bgcolor: "grey",
                width: "100%",
                minWidth: "350px",
                maxHeight: "90%",
                maxWidth: "350px",
              }}
              variant="rounded"
              width={400}
              height={550}
            />
            <Skeleton
              animation="wave"
              sx={{ bgcolor: "grey" }}
              variant="text"
              width={350}
              height={40}
            />
          </div>
          <div className="flex flex-col justify-start gap-4">
            <Skeleton
              animation="wave"
              sx={{ bgcolor: "grey" }}
              variant="text"
              width={800}
              height={50}
            />{" "}
            <Skeleton
              animation="wave"
              sx={{ bgcolor: "grey" }}
              variant="text"
              width={910}
              height={30}
            />
            <Skeleton
              animation="wave"
              sx={{ bgcolor: "grey" }}
              variant="text"
              width={600}
              height={30}
            />
            <Skeleton
              animation="wave"
              sx={{ bgcolor: "grey" }}
              variant="text"
              width={120}
              height={20}
            />
            <Skeleton
              animation="wave"
              sx={{ bgcolor: "grey" }}
              variant="text"
              width={70}
              height={20}
            />
            <Skeleton
              animation="wave"
              sx={{ bgcolor: "grey" }}
              variant="text"
              width={60}
              height={20}
            />
          </div>
        </div>
      </Stack>
    </>
  );
};

export default SkeletonProduct;
