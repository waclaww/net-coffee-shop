import api from './axiosInstance'

export const getProducts = async () => {
    const response = await api.get('/api/product/get-all');
    console.log("Запрос отправлен", response.data)
    return response.data;
}

