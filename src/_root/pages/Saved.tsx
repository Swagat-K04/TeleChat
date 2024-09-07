import Loader from "@/components/shared/Loader";
import { useGetCurrentUser, useGetSavedPost } from "@/lib/react-query/queriesAndMutation";
import { Models } from "appwrite";
import GridPostList from "./GridPostList";

const Saved = () => {
  const {
    data: savedPosts,
    isLoading: isPostsLoading,
    isError: isErrorLoading 
  } = useGetSavedPost();

  const { data: currentUser } = useGetCurrentUser();
  const currentUserId = currentUser?.accountId;

  return (
    <div className="flex flex-1 flex-col items-center overflow-scroll py-10 px-5 md:p-14 custom-scrollbar">
      <div className="max-w-6xl flex flex-col items-center w-full gap-6 md:gap-9">
        <div className="max-w-6xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/bookmark.svg"
            width={36}
            height={36}
            alt="saved"
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
        </div>
      </div>

      <div className="flex flex-wrap gap-9 max-w-6xl">
        {isPostsLoading && !savedPosts ? (
          <Loader />
        ) : (
          savedPosts?.documents.map((savedPost: Models.Document) => {
            if(savedPost && savedPost.user.accountId === currentUserId)
            return (
              <div>COME ON</div>
            )
          })
        )}
      </div>
    </div>
  );
};

export default Saved;
