export type MetricType = 'cpu' | 'memory' | 'fps' | 'crashRate';

interface ThresholdBands {
  warningMin: number;
  dangerMin: number;
  inverted?: boolean; // true for metrics where higher is better (e.g., FPS)
}

const thresholds: Record<MetricType, ThresholdBands> = {
  cpu: { warningMin: 60, dangerMin: 80 },
  memory: { warningMin: 300, dangerMin: 400 },
  fps: { warningMin: 50, dangerMin: 30, inverted: true },
  crashRate: { warningMin: 1, dangerMin: 2 },
};

const zoneColors = {
  green: 'rgba(22, 163, 74, 0.07)',
  warning: 'rgba(234, 179, 8, 0.10)',
  danger: 'rgba(220, 38, 38, 0.10)',
};

/**
 * Generates chartjs-plugin-annotation box annotations for threshold zones.
 * Zones are drawn behind datasets and clipped to the visible chart area.
 * adjustScaleRange: false prevents annotations from expanding the axis range.
 */
export function getThresholdAnnotations(
  metric: MetricType,
  yMin: number,
  yMax: number,
  yScaleID = 'y',
) {
  const { warningMin, dangerMin, inverted } = thresholds[metric];

  if (inverted) {
    return {
      [`${metric}DangerZone`]: {
        type: 'box' as const,
        yMin,
        yMax: dangerMin,
        yScaleID,
        backgroundColor: zoneColors.danger,
        borderWidth: 0,
        drawTime: 'beforeDatasetsDraw' as const,
        adjustScaleRange: false,
      },
      [`${metric}WarningZone`]: {
        type: 'box' as const,
        yMin: dangerMin,
        yMax: warningMin,
        yScaleID,
        backgroundColor: zoneColors.warning,
        borderWidth: 0,
        drawTime: 'beforeDatasetsDraw' as const,
        adjustScaleRange: false,
      },
      [`${metric}GreenZone`]: {
        type: 'box' as const,
        yMin: warningMin,
        yMax,
        yScaleID,
        backgroundColor: zoneColors.green,
        borderWidth: 0,
        drawTime: 'beforeDatasetsDraw' as const,
        adjustScaleRange: false,
      },
    };
  }

  return {
    [`${metric}GreenZone`]: {
      type: 'box' as const,
      yMin,
      yMax: warningMin,
      yScaleID,
      backgroundColor: zoneColors.green,
      borderWidth: 0,
      drawTime: 'beforeDatasetsDraw' as const,
      adjustScaleRange: false,
    },
    [`${metric}WarningZone`]: {
      type: 'box' as const,
      yMin: warningMin,
      yMax: dangerMin,
      yScaleID,
      backgroundColor: zoneColors.warning,
      borderWidth: 0,
      drawTime: 'beforeDatasetsDraw' as const,
      adjustScaleRange: false,
    },
    [`${metric}DangerZone`]: {
      type: 'box' as const,
      yMin: dangerMin,
      yMax,
      yScaleID,
      backgroundColor: zoneColors.danger,
      borderWidth: 0,
      drawTime: 'beforeDatasetsDraw' as const,
      adjustScaleRange: false,
    },
  };
}
