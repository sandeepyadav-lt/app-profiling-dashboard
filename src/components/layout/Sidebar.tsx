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
  ChevronDownIcon,
} from '../shared/icons';
import styles from './Sidebar.module.css';

const LOGO_URL =
  'https://d7umqicpi7263.cloudfront.net/img/product/dfec4f52-826f-4160-aceb-01280a195ff6.com/c7a9033b0ea3843881b4f45562e3672c';
const LOGO_URL_EXPANDED =
  'https://awsmp-logos.s3.amazonaws.com/2c505737-59a9-4736-ada4-f304712823d9/50f6af714af1141a4c2d6c1bb280e27b.png';

function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UpgradeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 5v6M5.5 7.5L8 5l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface SidebarProps {
  expanded: boolean;
  onToggle: () => void;
}

export function Sidebar({ expanded, onToggle }: SidebarProps) {
  if (expanded) {
    return (
      <aside className={`${styles.sidebar} ${styles.expanded}`}>
        <div className={styles.expandedHeader}>
          <div className={styles.expandedLogo}>
            <img src={LOGO_URL_EXPANDED} alt="LambdaTest" className={styles.expandedLogoImg} />
          </div>
        </div>

        <button className={styles.backRow} onClick={onToggle}>
          <BackIcon />
          <span>Insights</span>
        </button>

        <nav className={styles.expandedNav}>
          <div className={styles.navItem}>
            <GridIcon size={18} />
            <span>Dashboards</span>
          </div>

          <div className={styles.sectionLabel}>Test Intelligence</div>
          <div className={styles.navItem}>
            <InsightsIcon size={18} />
            <span>Build Insights</span>
          </div>
          <div className={styles.navItem}>
            <FlaskIcon size={18} />
            <span>Test Insights</span>
          </div>
          <div className={`${styles.navItem} ${styles.activeItem}`}>
            <AutomationIcon size={18} />
            <span>App Profiling</span>
          </div>

          <div className={styles.sectionLabel}>Reports</div>
          <div className={styles.navItem}>
            <RocketIcon size={18} />
            <span>Usage</span>
          </div>
          <div className={styles.navItem}>
            <CodeIcon size={18} />
            <span>Project</span>
          </div>
          <div className={styles.navItem}>
            <ScreenIcon size={18} />
            <span>Private Real Devices</span>
          </div>
          <div className={styles.navItem}>
            <ChatIcon size={18} />
            <span>Private Desktop</span>
          </div>
          <div className={styles.navItem}>
            <OrgIcon size={18} />
            <span>Sub Organizations</span>
          </div>
          <div className={styles.navItem}>
            <ShieldIcon size={18} />
            <span>Cypress Insights</span>
          </div>
        </nav>

        <div className={styles.expandedBottom}>
          <div className={styles.bottomItem}>
            <HelpIcon size={18} />
            <span>Help</span>
            <ChevronDownIcon size={12} />
          </div>
          <div className={styles.bottomItem}>
            <KeyIcon size={18} />
            <span>Credentials</span>
            <ChevronDownIcon size={12} />
          </div>
          <div className={styles.bottomItem}>
            <SettingsIcon size={18} />
            <span>Quick Actions</span>
            <ChevronDownIcon size={12} />
          </div>
          <button className={styles.upgradeBtn}>
            <UpgradeIcon />
            Upgrade Now
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo} onClick={onToggle} role="button" tabIndex={0}>
        <div className={styles.logoMark}>
          <img src={LOGO_URL} alt="LambdaTest" className={styles.logoImg} />
        </div>
      </div>
      <nav className={styles.nav}>
        <button className={styles.navBtn} title="Dashboard">
          <GridIcon size={20} />
        </button>
        <button className={styles.navBtn} title="Insights">
          <InsightsIcon size={20} />
        </button>
        <button className={`${styles.navBtn} ${styles.active}`} title="App Profiling">
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
