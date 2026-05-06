import { api } from "../api";

const getAllCache = new Map<string, Promise<any>>();

const normalizeFacilityList = (response: any) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.data)) return response.data;
  return [];
};

export const socialFacilitiesService = {
  getAll: async (page: number = 1, limit: number = 10, type?: string) => {
    const cacheKey = `${page}-${limit}-${type || ""}`;

    if (getAllCache.has(cacheKey)) {
      return getAllCache.get(cacheKey);
    }

    const promise = api
      .get("/social-facilities", { page, limit, ...(type ? { type } : {}) })
      .then((res) => res.data);

    getAllCache.set(cacheKey, promise);

    // Xóa cache sau 2 giây để tránh dữ liệu cũ nhưng vẫn đảm bảo giải quyết gán song song
    setTimeout(() => {
      getAllCache.delete(cacheKey);
    }, 2000);

    return promise;
  },
    fetchAll: async (type?: string, limit: number = 1000) => {
        const response = await api.get('/social-facilities', { page: 1, limit, ...(type ? { type } : {}) });
        return normalizeFacilityList(response);
    },
    getById: async (id: string) => {
        const response = await api.get(`/social-facilities/${id}`);
        return response.data;
    },
    create: async (data: any) => {
        const response = await api.post(`/social-facilities`, data);
        return response.data;
    },
    update: async (id: string, data: any) => {
        const response = await api.put(`/social-facilities/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        const response = await api.delete(`/social-facilities/${id}`);
        return response.data;
    },
};
