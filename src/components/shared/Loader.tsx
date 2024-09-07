import loaderImage from '/assets/icons/loader.svg'

const Loader = () => {
  return (
    <div className="flex-center w-full">
        <img 
            src={loaderImage}
            alt="loader"
            width={24}
            height={24}
        />
    </div>
  )
}

export default Loader