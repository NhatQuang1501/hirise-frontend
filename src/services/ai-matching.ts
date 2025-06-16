import { axiosInstance } from "@/lib/axios";

export interface MatchingResult {
  id: string;
  job: string;
  job_title: string;
  application: string;
  applicant_name: string;
  applicant_id: string;
  match_score: number;
  detailed_scores: {
    combined_text: number;
    job_skills_cv_skills: number;
    job_title_cv_summary: number;
    job_preferred_cv_skills: number;
    job_requirements_cv_skills: number;
    job_requirements_cv_experience: number;
    job_responsibilities_cv_experience: number;
  };
  status: string;
  cv_file: string;
  application_date: string;
  created_at: string;
  updated_at: string;
  analysis: string;
  skills_match: {
    match_rate: string;
    matching_skills: string[];
    missing_skills: string[];
    total_job_skills: number;
    total_cv_skills: number;
  };
  key_strengths: string[];
  areas_to_improve: string[];
}

export const aiMatchingService = {
  // Match a single application with a job
  matchSingleApplication: async (jobId: string, applicationId: string): Promise<MatchingResult> => {
    try {
      const response = await axiosInstance.post(
        `/api/match/job/${jobId}/application/${applicationId}/`,
      );
      return response.data;
    } catch (error) {
      console.error("Error matching application:", error);
      throw error;
    }
  },

  // Match all applications for a job
  matchAllApplications: async (jobId: string): Promise<MatchingResult[]> => {
    try {
      const response = await axiosInstance.post(`/api/match/job/${jobId}/all-applications/`);
      return response.data;
    } catch (error) {
      console.error("Error matching all applications:", error);
      throw error;
    }
  },

  // Get match results for a job
  getJobMatchResults: async (jobId: string): Promise<MatchingResult[]> => {
    try {
      const response = await axiosInstance.get(`/api/match/job/${jobId}/results/`);
      return response.data;
    } catch (error) {
      console.error("Error getting match results:", error);
      throw error;
    }
  },
};
