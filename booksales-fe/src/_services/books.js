import API from "../_api"

export const getBooks = async () => {
    const { data } = await API.get("/books")
    return data;
}

export const createBook = async (data) => {
    try {
        const response = await API.post("/books", data)
        return response.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const getBook = async (id) => {
    try {
        const { data } = await API.get(`/books/${id}`);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateBook = async (id, bookData) => {
    const { data } = await API.put(`/books/${id}`, bookData);
    return data;
};