import { CopilotIcon } from '../shared/icons';
import styles from './TopNav.module.css';

const tabs = [
  { label: 'Overview', active: false },
  { label: 'Test Insights', active: false },
  { label: 'App Performance', active: true },
  { label: 'Error Tracking', active: false },
];

export function TopNav() {
  return (
    <header className={styles.topNav}>
      <nav className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`${styles.tab} ${tab.active ? styles.active : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div className={styles.actions}>
        <button className={styles.copilotBtn}>
          <CopilotIcon size={14} />
          CoPilot
        </button>
      </div>
    </header>
  );
}
