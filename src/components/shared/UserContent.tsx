import { Models } from "appwrite";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

type UserContentProps = {
  creator: Models.Document;
  customStyles?: string;
};

const UserContent = ({ creator, customStyles = "" }: UserContentProps) => {
  return (
    <div className={`bg-dark-2 border border-dark-4 rounded-2xl p-5 flex flex-col items-center justify-between ${customStyles}`}>
      <Link to={`/profile/${creator.$id}`} className="flex flex-col items-center gap-3">
        <img
          src={creator?.imageUrl || "assets/icons/profile-placeholder.svg"}
          alt="creator"
          className="rounded-full w-[54px] h-[54px]"
        />
        <div className="text-center">
          <p className="text-light-1 font-bold">{creator.name}</p>
          <p className="text-light-3">@{creator.username}</p>
        </div>
      </Link>
      <Button
        type="button"
        className="shad-button_primary w-[70%] mt-3"
      >
        Follow
      </Button>
    </div>
  );
};

export default UserContent;
