import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="flex w-full h-full justify-center xl:mt-[20rem] mt-[15rem]">
      <AiOutlineLoading3Quarters className="animate-spin text-primary-foreground dark:text-primary-foreground xl:text-[5rem] text-4xl" />
    </div>
  );
};

export default Loading;
