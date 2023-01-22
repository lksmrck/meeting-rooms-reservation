import { companiesLogos } from "../../data/data";
import "./style.css";

const Companies = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center mt-20   companies">
      <div className="w-96  lg:w-110 md:mr-28 md:mb-14 ml-8 ">
        <h1 className="font-bold mb-2 text-center md:text-left text-xl">
          Join our community
        </h1>
        <p className="text-center md:text-left text-base">
          Become one of our users today and enjoy the app among many other
          companies around the world. Feel the impact of the community.
        </p>
        <p className="text-center md:text-left text-base">
          The world of exciting features is waiting for you.
        </p>
      </div>
      <div className="grid grid-cols-4 gap-1 rounded-lg mt-10 md:mt-0 mr-8 hover:cursor-pointer ">
        {companiesLogos.map((logo: string) => {
          return <img src={logo} className=" w-24 h-22 rounded-lg  -z-10" />;
        })}
      </div>
    </div>
  );
};

export default Companies;
