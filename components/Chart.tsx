import { Chart } from "primereact/chart";
import { useMemo } from "react";

type SeriesItem = {
  name: string;
  data: number[];
};

type ChartResponse = {
  categories: string[];
  series: SeriesItem[];
};

type Props = {
  chartResponse: ChartResponse;
  title?: string;
};

export default function SatisfactionTrendChart({
  chartResponse,
  title = "Xu hướng mức độ hài lòng",
}: Props) {
  const chartData = useMemo(() => {
    const palette = [
      "#25A7C8", // xanh dương nhạt (cyan)
      "#F59E0B", // vàng cam
      "#10B981", // xanh lá
      "#EF4444", // đỏ
      "#8B5CF6", // tím
      "#EC4899", // hồng
      "#F97316", // cam
      "#6366F1", // indigo
    ];

    return {
      labels: chartResponse.categories,
      datasets: chartResponse.series.map((item, index) => {
        const color = palette[index % palette.length];
        return {
          label: item.name,
          data: item.data,
          borderColor: color,
          backgroundColor: color,
          pointBackgroundColor: color,
          pointBorderColor: color,
          pointHoverBackgroundColor: color,
          pointHoverBorderColor: color,
          pointRadius: 3.5,
          pointHoverRadius: 5,
          pointBorderWidth: 0,
          borderWidth: 2,
          tension: 0.25,
          fill: false
        };
      })
    };
  }, [chartResponse]);

  const options = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 8,
          right: 12,
          bottom: 0,
          left: 8
        }
      },
      interaction: {
        mode: "index" as const,
        intersect: false
      },
      plugins: {
        title: {
          display: false
        },
        legend: {
          position: "bottom" as const,
          align: "start" as const,
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            boxWidth: 8,
            boxHeight: 8,
            padding: 18,
            color: "#6B7280",
            font: {
              size: 12,
              family: "Inter, sans-serif"
            }
          }
        },
        tooltip: {
          enabled: true,
          backgroundColor: "#FFFFFF",
          titleColor: "#6B7280",
          bodyColor: "#111827",
          borderColor: "#25A7C8",
          borderWidth: 1,
          padding: 10,
          displayColors: true,
          callbacks: {
            title: function (items: any[]) {
              return items?.[0]?.label || "";
            },
            label: function (context: any) {
              return `${context.dataset.label}: ${Number(context.parsed.y).toFixed(2)}`;
            }
          }
        }
      },
      scales: {
        x: {
          offset: false,
          grid: {
            color: "#E5E7EB",
            drawBorder: false,
            drawTicks: false
          },
          ticks: {
            color: "#9CA3AF",
            autoSkip: false,
            maxRotation: 45,
            minRotation: 45,
            padding: 8,
            font: {
              size: 11,
              family: "Inter, sans-serif"
            }
          }
        },
        y: {
          min: 3.9,
          max: 4.5,
          ticks: {
            stepSize: 0.1,
            color: "#4B5563",
            padding: 8,
            callback: function (value: number) {
              return Number(value).toFixed(2);
            },
            font: {
              size: 11,
              family: "Inter, sans-serif"
            }
          },
          grid: {
            color: "#D1D5DB",
            drawBorder: false
          }
        }
      }
    };
  }, []);

  return (
    <div className="rounded-3xl border border-slate-200 bg-[#f6f7f9] p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[16px] font-semibold text-slate-700">{title}</h3>
      </div>

      <div className="h-[320px] w-full rounded-2xl bg-white/70 p-3">
        <Chart type="line" data={chartData} options={options} className="h-full w-full" />
      </div>
    </div>
  );
}