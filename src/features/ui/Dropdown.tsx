import useClickOutside from '@/hooks/useClickOutside';
import { createContext, useContext, useState } from 'react';
import styled from 'styled-components';

const DropdownContext = createContext({ toggle: () => {}, isOpen: false, closeDropdown: () => {}});

interface Props {
  children: React.ReactNode;
}
const Dropdown = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  return (
    <DropdownContext.Provider value={{ toggle, isOpen, closeDropdown }}>
      <DropdownWrapper>{children}</DropdownWrapper>
    </DropdownContext.Provider>
  );
};
const DropdownToggle = ({ children }: Props) => {
  const { toggle } = useContext(DropdownContext);
  return <button onClick={toggle}>{children}</button>;
};
const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

function DropdownMenu({ children }: Props) {
  const { isOpen, closeDropdown } = useContext(DropdownContext);
  const ref = useClickOutside(closeDropdown);
  return (
    <StyledDropdownMenu isOpen={isOpen} ref={ref}>
      {children}
    </StyledDropdownMenu>
  );
}
const StyledDropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--primary-color-light);
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 2rem;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;

export default Dropdown;
