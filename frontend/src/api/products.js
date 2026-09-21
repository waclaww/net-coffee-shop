import api from './axiosInstance'

export const getProducts = async () => {
    const response = await api.get('/api/product/get-all');
    console.log("Запрос на получение продуктов отправлен", response.data)
    return response.data;
}

export const addFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file)

    const response = await api.post(
        '/api/file/send',
        formData, 
        {
            headers: {'Content-Type': 'multipart/form-data'}
        }
    );
    console.log("Запрос на отправление файла отправлен");
    return response.data;
}

export const addProduct = async ({
    name,
    type,
    description,
    price,
    preview,
}) => {
    const uploaded = await addFile(preview);
    const previewId = uploaded.file.id
    console.log('previewId', previewId)

    const payload = {
            name,
            type,
            description,
            price,
            preview: previewId,
        }

    console.log('payload JSON:', payload);

    const response = await api.post(
        '/api/product/add',
        payload
    );
    console.log("Запрос на добавление продукта добавлен", response.data);
    return response.data
}

