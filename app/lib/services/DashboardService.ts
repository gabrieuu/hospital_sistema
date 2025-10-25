import { DashboardStats } from "@/app/lib/domain/models/DashboardStats";
import { IStatsRepository } from "@/app/lib/repositories/contracts/IStatsRepository";

export class DashboardService {
  constructor(private statsRepository: IStatsRepository) {}

  async getDashboardStats(hospitalId: string): Promise<DashboardStats> {
    return await this.statsRepository.getDashboardStats(hospitalId);
  }
}
