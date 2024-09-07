import { Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";

const AuthLayout = () => {
  const isAuthenticated = false;

  useEffect(() => {
    const handleImageScroll = () => {
      const collageContainer = document.querySelector(".collage-container");
      const collageImage = collageContainer?.querySelector("img");

      if (collageContainer && collageImage) {
        const clonedImage = collageImage.cloneNode(true) as HTMLImageElement;
        collageContainer.appendChild(clonedImage);

        const scrollHeight = collageImage.clientHeight;

        const scroll = () => {
          if (collageContainer.scrollTop >= scrollHeight) {
            collageContainer.scrollTop -= scrollHeight;
          } else {
            collageContainer.scrollTop++;
          }
        };

        const intervalId = setInterval(scroll, 50);

        return () => clearInterval(intervalId);
      }
    };

    handleImageScroll();
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>

          <div className="hidden xl:block collage-container h-screen w-1/2 overflow-hidden">
            <img
              src="/assets/images/side-img.svg"
              alt="sideImage"
              className="h-full w-full object-cover bg-no-repeat"
            />
          </div>
        </>
      )}
    </>
  );
};

export default AuthLayout;
