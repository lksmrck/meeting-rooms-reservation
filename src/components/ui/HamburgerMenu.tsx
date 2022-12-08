import * as React from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

interface HamburgerMenuProps {
  /*   isUserLogged: boolean; */
  loginLogoutHandler: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  loginLogoutHandler,
}: HamburgerMenuProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const menuItemsLogged = [
    { name: "Pick a date", url: "datepick" },
    { name: "Settings", url: "settings" },
  ];

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<GiHamburgerMenu />}
            variant="outlined"
            className="bg-teal-700"
          />
          <MenuList>
            {user &&
              menuItemsLogged.map((item: { name: string; url: string }) => {
                return (
                  <MenuItem
                    key={item.name}
                    onClick={() => navigate(`/${item.url}`)}
                  >
                    {item.name}
                  </MenuItem>
                );
              })}
            <MenuItem onClick={loginLogoutHandler}>
              {user ? "Logout" : "Sign In"}
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};
export default HamburgerMenu;
