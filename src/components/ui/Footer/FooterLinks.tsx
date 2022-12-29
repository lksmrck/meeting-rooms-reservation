import { FC, RefObject } from "react";
import { LandingRefsObject, FooterLinkObject } from "../../../types/types";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

type FooterLinksProps = {
  landingRefs: LandingRefsObject;
  clickLinkHandler: (link: RefObject<HTMLDivElement>) => void;
};

const FooterLinks: FC<FooterLinksProps> = ({
  landingRefs,
  clickLinkHandler,
}) => {
  const landingLinks = [
    { name: "Features", ref: landingRefs.featuresRef },
    { name: "Steps", ref: landingRefs.stepsRef },
    { name: "References", ref: landingRefs.referencesRef },
    { name: "Get started", ref: landingRefs.contactRef },
  ];

  const { user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {pathname != "/home" ? (
        <div className="[&>a]:text-xs [&>a]:mt-1 text-gray-300 flex flex-col [&>a]:cursor-pointer  min-w-fit ">
          <h1 className="mb-1 font-bold">Links</h1>
          <a onClick={() => navigate("/home")} className="hover:text-gray-400">
            Home
          </a>
          {user && (
            <a
              onClick={() => navigate("/datepick")}
              className="hover:text-gray-400"
            >
              Pick date
            </a>
          )}
        </div>
      ) : (
        <div className="[&>a]:text-xs [&>a]:mt-1 text-gray-300 flex flex-col [&>a]:cursor-pointer ">
          <h1 className="mb-1 font-bold">About</h1>
          {landingLinks.map((link: FooterLinkObject) => {
            return (
              <a
                onClick={() => clickLinkHandler(link.ref)}
                className="hover:text-gray-400"
              >
                {link.name}
              </a>
            );
          })}
        </div>
      )}
    </>
  );
};

export default FooterLinks;
