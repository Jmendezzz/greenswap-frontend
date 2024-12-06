import { Devices } from "@/styles/Devices";
import styled from "styled-components";

const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 4rem;
  background-color: var(--primary-color-light);
  border-radius: 3rem;
  min-width: 300px;
  width:fit-content;
  padding: 2rem 3rem;
  height: 100%;
  position: sticky;
  top:40px; 
  overflow-y: auto;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media (max-width: ${Devices.tablet}) {
    padding: 0.3rem 1rem;

    max-width: 300px;
  }
`;

export default SidebarMenu;