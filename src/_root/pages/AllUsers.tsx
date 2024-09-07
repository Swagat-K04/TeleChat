import UserContent from "@/components/shared/UserContent";
import { Input } from "@/components/ui/input";
import { useGetUsers } from "@/lib/react-query/queriesAndMutation";
import Loader from "@/components/shared/Loader";
import { Models } from "appwrite";

const AllUsers = () => {
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorLoading,
  } = useGetUsers(10);

  console.log(creators);

  return (
    <div className="flex flex-1 flex-col items-center overflow-scroll py-10 px-5 custom-scrollbar">
      <div className="max-w-6xl flex flex-col items-center w-full gap-6 md:gap-9">
        <div className="max-w-6xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/people.svg"
            width={36}
            height={36}
            alt="users"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Search Users</h2>
        </div>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            alt="search"
            width={24}
            height={24}
          />
          <Input
            type="text"
            placeholder="search"
            className="explore-search"
            onChange={() => {}}
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-6xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Top Creators</h3>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All time</p>
          <img
            src="/assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
          />
        </div>
      </div>

      <div className="grid ucl:grid-cols-3 ucm:grid-cols-2 ucs:grid-cols-1 ucxl1:grid-cols-2 ucxl2:grid-cols-3 grid-cols-4 gap-5 w-full max-w-6xl items-center">
        {isUserLoading && !creators ? (
          <Loader />
        ) : (
          creators?.documents.map((creator: Models.Document) => (
            <UserContent
              key={creator.$id}
              creator={creator}
              customStyles="ucs:w-[80%] ucs:mx-auto"
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AllUsers;
