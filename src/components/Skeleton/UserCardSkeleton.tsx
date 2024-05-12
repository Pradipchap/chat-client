import React from "react";

export default function UserCardSkeleton() {
  return (
    <div className="w-full max-w-[250px] p-3 border-slate-200 animate-pulse border rounded-lg shadow">
      <div className="flex flex-col items-center justify-between">
        <div className="w-24 h-24 mb-3 rounded-full bg-slate-100 animate-pulse shadow-lg" />
        <h5 className="font-medium text-gray-900 bg-slate-100 animate-pulse h-5 w-[70%]"></h5>
        <span className="h-3 w-[40%] mt-2 bg-slate-100 animate-pulse"></span>
        <div className="flex mt-4 md:mt-6"></div>
        <div className="w-full h-7 bg-slate-100 animate-pulse" />
      </div>
    </div>
  );
}
