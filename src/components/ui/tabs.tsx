'use client';

import { ReactNode, useState } from 'react';

interface TabsProps {
  tabs: { id: string; label: string; icon?: ReactNode }[];
  defaultTab?: string;
  onChange?: (tab: string) => void;
  children: ReactNode;
}

export default function Tabs({ tabs, defaultTab, onChange, children }: TabsProps) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id);

  const handleChange = (id: string) => {
    setActive(id);
    onChange?.(id);
  };

  return (
    <div>
      <div className="border-b border-slate-200">
        <nav className="flex gap-0 -mb-px overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                active === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-4">
        {children}
      </div>
    </div>
  );
}

interface TabPanelProps {
  id: string;
  activeTab: string;
  children: ReactNode;
}

export function TabPanel({ id, activeTab, children }: TabPanelProps) {
  if (id !== activeTab) return null;
  return <div>{children}</div>;
}
