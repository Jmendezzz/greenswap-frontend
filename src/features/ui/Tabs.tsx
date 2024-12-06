import { useState } from 'react';
import { Tab } from './SidebarTab';
import styled from 'styled-components';

interface TabsProps {
  tabs: Tab[];
}

function Tabs({ tabs }: TabsProps) {
  const [currentTab, setCurrentTab] = useState<Tab>(tabs[0]);

  return (
    <StyledTabs>
      <header>
        <ul>
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={currentTab.id == tab.id ? 'active' : ''}
              onClick={() => setCurrentTab(tab)}
            >
              {tab.name}
            </li>
          ))}
        </ul>
      </header>
        {currentTab.content}
    </StyledTabs>
  );
}

const StyledTabs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  height: 100%;
  header {
    display: flex;
    gap: 1rem;
    ul {
      display: flex;
      gap: 1rem;
      li {
        cursor: pointer;
        padding: 1rem 2rem;
        font-size: 2rem;
        border-radius: 0.5rem;
        background-color: var(--primary-color-light);
        color: var(--white);
        &:hover {
          font-weight: bold;
        }

        &.active {
          font-weight: bold;
        }
      }
    }
  }
`;

export default Tabs;
