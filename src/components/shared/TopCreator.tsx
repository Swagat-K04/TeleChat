import { useGetUsers } from "@/lib/react-query/queriesAndMutation";
import Loader from "./Loader";
import UserContent from "./UserContent";
import { Models } from "appwrite";

const TopCreator = () => {
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorLoading,
  } = useGetUsers(10);

  return (
    <div className="home-creators">
      <h2 className="h4-bold md:h3-bold text-left w-full">Top Creators</h2>
      <ul className="grid 2xl:grid-cols-2 grid-cols-1 gap-4">
        {isUserLoading && !creators ? (
          <Loader />
        ) : (
          creators?.documents.map((creator: Models.Document) => (
            <UserContent key={creator.$id} creator={creator} />
          ))
        )}
      </ul>
    </div>
  );
};

export default TopCreator;
