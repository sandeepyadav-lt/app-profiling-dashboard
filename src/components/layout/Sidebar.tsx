import { HomeIcon, InsightsIcon, SettingsIcon } from '../shared/icons';
import styles from './Sidebar.module.css';

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoMark}>L</div>
      </div>
      <nav className={styles.nav}>
        <button className={styles.navBtn} title="Home">
          <HomeIcon size={20} />
        </button>
        <button className={`${styles.navBtn} ${styles.active}`} title="Insights">
          <InsightsIcon size={20} />
        </button>
      </nav>
      <div className={styles.bottom}>
        <button className={styles.navBtn} title="Settings">
          <SettingsIcon size={20} />
        </button>
      </div>
    </aside>
  );
}
