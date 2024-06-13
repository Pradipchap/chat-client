export default function FriendBoxSkeleton() {
  return (
    <div className="bg-gray-300 animate-pulse px-2 rounded-lg flex items-center h-16 gap-3 mt-2 w-full">
      <div className="relative w-12 h-12 bg-slate-200 animate-pulse rounded-full">
        <div className="h-3 w-3 bg-green-600 rounded-full absolute bottom-[2%] right-[10%]" />
      </div>

      <div className="flex-1 h-full py-1 flex flex-col justify-around items-start">
        {" "}
        <p className="text-lg h-2 w-[40%] font-medium bg-slate-200 animate-pulse"></p>
        <div className="flex w-full justify-start items-center gap-2 pt-1 ">
          <div className="h-1 w-[20%] bg-slate-200 animate-pulse"></div>
          <div className=" h-1 w-[10%] bg-slate-200 animate-pulse" />
          <div className=" h-1 w-[5%] bg-slate-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
