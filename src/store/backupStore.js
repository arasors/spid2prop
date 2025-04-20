import { create } from 'zustand';
import axios from 'axios';

const API_BASE_URL = 'http://217.131.2.177:6001';

const useBackupStore = create((set, get) => ({
  backupJobs: [],
  isLoading: false,
  error: null,
  
  // Start a new backup job
  startBackup: async (url) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_BASE_URL}/start-scraping`, { url });
      const newJob = {
        taskId: response.data.task_id,
        url,
        status: response.data.status,
        progress: 0,
        createdAt: new Date().toISOString(),
        downloadLinks: null
      };
      
      set(state => ({ 
        backupJobs: [newJob, ...state.backupJobs],
        isLoading: false 
      }));
      
      // Start polling for status updates
      get().pollJobStatus(newJob.taskId);
      
      return newJob;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to start backup', 
        isLoading: false 
      });
      return null;
    }
  },
  
  // Check the status of a job
  checkJobStatus: async (taskId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/status/${taskId}`);
      set(state => ({
        backupJobs: state.backupJobs.map(job => 
          job.taskId === taskId 
            ? { 
                ...job, 
                status: response.data.status,
                progress: response.data.progress || 0,
                downloadLinks: response.data.download_links || null
              } 
            : job
        )
      }));
      return response.data;
    } catch (error) {
      console.error('Error checking job status:', error);
      return null;
    }
  },
  
  // Poll job status every 10 seconds
  pollJobStatus: (taskId) => {
    const poll = async () => {
      const job = get().backupJobs.find(j => j.taskId === taskId);
      
      if (!job || job.status === 'completed' || job.status === 'failed') {
        return; // Stop polling if job is completed or failed
      }
      
      const status = await get().checkJobStatus(taskId);
      
      if (status && status.status !== 'completed' && status.status !== 'failed') {
        // Continue polling after 10 seconds
        setTimeout(() => poll(), 10000);
      }
    };
    
    // Start polling
    poll();
  },
  
  // Get download URL for a completed job
  getDownloadUrl: (taskId, type) => {
    const job = get().backupJobs.find(j => j.taskId === taskId);
    if (!job || !job.downloadLinks) return null;
    
    return `${API_BASE_URL}${job.downloadLinks[type]}`;
  },
  
  // Clear error message
  clearError: () => set({ error: null })
}));

export default useBackupStore; 