import {
  GridIcon,
  InsightsIcon,
  AutomationIcon,
  RocketIcon,
  FlaskIcon,
  CodeIcon,
  ScreenIcon,
  ChatIcon,
  OrgIcon,
  ShieldIcon,
  HelpIcon,
  KeyIcon,
  LinkIcon,
  SettingsIcon,
} from '../shared/icons';
import styles from './Sidebar.module.css';

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoMark}>L</div>
      </div>
      <nav className={styles.nav}>
        <button className={styles.navBtn} title="Dashboard">
          <GridIcon size={20} />
        </button>
        <button className={`${styles.navBtn} ${styles.active}`} title="Insights">
          <InsightsIcon size={20} />
        </button>
        <button className={styles.navBtn} title="Automation">
          <AutomationIcon size={20} />
        </button>
        <button className={styles.navBtn} title="Builds">
          <RocketIcon size={20} />
        </button>
        <button className={styles.navBtn} title="Test Lab">
          <FlaskIcon size={20} />
        </button>
        <button className={styles.navBtn} title="HyperExecute">
          <CodeIcon size={20} />
        </button>
        <button className={styles.navBtn} title="Visual Testing">
          <ScreenIcon size={20} />
        </button>
        <button className={styles.navBtn} title="Messages">
          <ChatIcon size={20} />
        </button>
        <button className={styles.navBtn} title="Organization">
          <OrgIcon size={20} />
        </button>
        <button className={styles.navBtn} title="Security">
          <ShieldIcon size={20} />
        </button>
      </nav>
      <div className={styles.bottom}>
        <button className={styles.navBtn} title="Help">
          <HelpIcon size={20} />
        </button>
        <button className={styles.navBtn} title="Access Key">
          <KeyIcon size={20} />
        </button>
        <button className={styles.navBtn} title="Integrations">
          <LinkIcon size={20} />
        </button>
        <button className={styles.navBtn} title="Settings">
          <SettingsIcon size={20} />
        </button>
        <div className={styles.statusDot} />
      </div>
    </aside>
  );
}
