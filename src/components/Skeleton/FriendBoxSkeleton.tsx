export default function FriendBoxSkeleton() {
  return (
    <div className="bg-gray-200 animate-pulse px-2 rounded-lg flex items-center h-16 gap-3 mt-2 w-full">
      <div className="relative w-12 h-12 bg-gray-100 animate-pulse rounded-full" />
      <div className="flex-1 h-full py-1 flex flex-col justify-around items-start">
        {" "}
        <p className="text-lg h-2 w-[40%] font-medium bg-gray-100 animate-pulse"></p>
        <div className="flex w-full justify-start items-center gap-2 pt-1 ">
          <div className="h-1 w-[20%] bg-gray-100 animate-pulse"></div>
          <div className=" h-1 w-[10%] bg-gray-100 animate-pulse" />
          <div className=" h-1 w-[5%] bg-gray-100 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
