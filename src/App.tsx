import { useState } from 'react';
import { DashboardProvider } from './context/DashboardContext';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardHeader } from './components/layout/DashboardHeader';
import { GlobalFilterBar } from './components/layout/GlobalFilterBar';
import { WidgetGrid } from './components/layout/WidgetGrid';
import { WidgetRenderer } from './components/layout/WidgetRenderer';
import { AddWidgetDialog } from './components/shared/AddWidgetDialog';

function App() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <DashboardProvider>
      <div className={`app-layout ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
        <Sidebar expanded={sidebarExpanded} onToggle={() => setSidebarExpanded(!sidebarExpanded)} />
        <div className="app-main">
          <div className="app-content">
            <DashboardHeader />
            <GlobalFilterBar onAddWidget={() => setShowAddDialog(true)} />
            <WidgetGrid>
              <WidgetRenderer onAddWidget={() => setShowAddDialog(true)} />
            </WidgetGrid>
          </div>
        </div>
      </div>
      <AddWidgetDialog isOpen={showAddDialog} onClose={() => setShowAddDialog(false)} />
    </DashboardProvider>
  );
}

export default App;
