import { createClient, setupAuth } from '@profcomff/api-uilib';
import { useProfileStore } from '../store';

const profileStore = useProfileStore();
const apiClient = createClient(import.meta.env.VITE_AUTH_API_BASE_URL);
setupAuth(profileStore.token);
export default apiClient;
