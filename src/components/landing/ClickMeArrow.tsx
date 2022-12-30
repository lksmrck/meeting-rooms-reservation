import clickMeArrow from "../../assets/landingPics/clickMeArrow.svg";

const ClickMeArrow = () => {
  return (
    <div className=" flex animate-arrowCollors  justify-end w-155 ">
      <div className="w-2/3">
        <img src={clickMeArrow} width="350px" className="-mb-30 ml-4 " />
      </div>
    </div>
  );
};

export default ClickMeArrow;
