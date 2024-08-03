import UserCardSkeleton from "./UserCardSkeleton";

export default function FriendsGroupSkeleton() {
  return (
    <div className="p-2 mt-10">
      <div className="grid grid-cols-4 w-full gap-5">
        {new Array(4).fill(1).map(() => (
          <UserCardSkeleton />
        ))}
      </div>
      <div className="w-full bg-slate-50 border-slate-100 border rounded-lg animate-pulse h-64 mt-5"></div>
    </div>
  );
}
