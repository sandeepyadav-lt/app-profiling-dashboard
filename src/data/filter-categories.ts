import type { FilterCategory } from '../types/dashboard';

export const filterCategories: FilterCategory[] = [
  {
    id: 'platform',
    label: 'Platform',
    options: [
      { id: 'android', label: 'Android', checked: true },
      { id: 'ios', label: 'iOS', checked: true },
    ],
  },
  {
    id: 'os_version',
    label: 'OS Version',
    options: [
      { id: 'android14', label: 'Android 14', checked: false },
      { id: 'android13', label: 'Android 13', checked: false },
      { id: 'ios17', label: 'iOS 17.x', checked: false },
      { id: 'ios16', label: 'iOS 16.x', checked: false },
    ],
  },
  {
    id: 'device',
    label: 'Device',
    options: [
      { id: 'galaxy_s24', label: 'Samsung Galaxy S24', checked: false },
      { id: 'pixel_8', label: 'Google Pixel 8 Pro', checked: false },
      { id: 'iphone_15pro', label: 'iPhone 15 Pro', checked: false },
      { id: 'iphone_14', label: 'iPhone 14', checked: false },
      { id: 'oneplus_12', label: 'OnePlus 12', checked: false },
    ],
  },
  {
    id: 'flow_scenario',
    label: 'Flow / Scenario',
    options: [
      { id: 'app_launch', label: 'App Launch → Home', checked: false },
      { id: 'login_dashboard', label: 'Login → Dashboard', checked: false },
      { id: 'search_results', label: 'Search → Results', checked: false },
      { id: 'cart_checkout', label: 'Cart → Checkout', checked: false },
      { id: 'checkout_payment', label: 'Checkout → Payment', checked: false },
    ],
  },
  {
    id: 'labels',
    label: 'Labels',
    options: [
      { id: 'label_home', label: 'Home Screen', checked: false },
      { id: 'label_login', label: 'Login Screen', checked: false },
      { id: 'label_dashboard', label: 'Dashboard', checked: false },
      { id: 'label_checkout', label: 'Checkout Flow', checked: false },
      { id: 'label_settings', label: 'Settings', checked: false },
    ],
  },
  {
    id: 'app_version',
    label: 'App Build Version',
    options: [
      { id: 'v3_2_1', label: 'v3.2.1 (latest)', checked: false },
      { id: 'v3_2_0', label: 'v3.2.0', checked: false },
      { id: 'v3_1_5', label: 'v3.1.5', checked: false },
    ],
  },
  {
    id: 'network',
    label: 'Network Type',
    options: [
      { id: 'wifi', label: 'Wi-Fi', checked: false },
      { id: '5g', label: '5G', checked: false },
      { id: '4g', label: '4G LTE', checked: false },
      { id: '3g', label: '3G', checked: false },
    ],
  },
  {
    id: 'environment',
    label: 'Environment',
    options: [
      { id: 'production', label: 'Production', checked: false },
      { id: 'staging', label: 'Staging', checked: false },
      { id: 'development', label: 'Development', checked: false },
    ],
  },
  {
    id: 'project',
    label: 'Project',
    options: [
      { id: 'ombank_android', label: 'OMBank Android', checked: false },
      { id: 'ombank_ios', label: 'OMBank iOS', checked: false },
    ],
  },
  {
    id: 'test_name',
    label: 'Test Name',
    options: [
      { id: 'test_login_flow', label: 'Login Flow Test', checked: false },
      { id: 'test_checkout', label: 'Checkout E2E', checked: false },
      { id: 'test_onboarding', label: 'Onboarding Regression', checked: false },
      { id: 'test_payments', label: 'Payments Smoke', checked: false },
    ],
  },
  {
    id: 'build_name',
    label: 'Build Name',
    options: [
      { id: 'build_nightly', label: 'Nightly Build', checked: false },
      { id: 'build_release', label: 'Release Candidate', checked: false },
      { id: 'build_hotfix', label: 'Hotfix Build', checked: false },
    ],
  },
  {
    id: 'test_tag',
    label: 'Test Tag',
    options: [
      { id: 'tag_smoke', label: 'smoke', checked: false },
      { id: 'tag_regression', label: 'regression', checked: false },
      { id: 'tag_e2e', label: 'e2e', checked: false },
      { id: 'tag_performance', label: 'performance', checked: false },
    ],
  },
  {
    id: 'build_tag',
    label: 'Build Tag',
    options: [
      { id: 'btag_release', label: 'release', checked: false },
      { id: 'btag_nightly', label: 'nightly', checked: false },
      { id: 'btag_ci', label: 'ci', checked: false },
    ],
  },
  {
    id: 'job_label',
    label: 'Job Label',
    options: [
      { id: 'job_perf_suite', label: 'Performance Suite', checked: false },
      { id: 'job_regression', label: 'Regression Suite', checked: false },
      { id: 'job_sanity', label: 'Sanity Check', checked: false },
    ],
  },
];
