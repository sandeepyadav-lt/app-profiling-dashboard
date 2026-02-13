import styles from './TopNav.module.css';

function NotificationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2a5 5 0 00-5 5v3l-1 2h12l-1-2V7a5 5 0 00-5-5zM7.5 14a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UserAvatar() {
  return (
    <div className={styles.avatar}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 16c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function TopNav() {
  return (
    <header className={styles.topNav}>
      <span className={styles.title}>App Profiling</span>
      <div className={styles.actions}>
        <button className={styles.iconBtn} title="Notifications">
          <NotificationIcon />
        </button>
        <UserAvatar />
        <button className={styles.upgradeBtn}>Upgrade Now</button>
      </div>
    </header>
  );
}
