import { DashboardStats } from "@/app/lib/domain/models/DashboardStats";

export interface IStatsRepository {
  getDashboardStats(hospitalId: string): Promise<DashboardStats>;
}
