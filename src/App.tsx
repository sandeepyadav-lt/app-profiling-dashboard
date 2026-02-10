import { useState } from 'react';
import { DashboardProvider } from './context/DashboardContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopNav } from './components/layout/TopNav';
import { DashboardHeader } from './components/layout/DashboardHeader';
import { WidgetGrid } from './components/layout/WidgetGrid';
import { WidgetRenderer } from './components/layout/WidgetRenderer';
import { AddWidgetDialog } from './components/shared/AddWidgetDialog';

function App() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <DashboardProvider>
      <div className="app-layout">
        <Sidebar />
        <div className="app-main">
          <TopNav />
          <div className="app-content">
            <DashboardHeader onAddWidget={() => setShowAddDialog(true)} />
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
