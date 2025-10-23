import API from "../_api";

export const getGenres = async () => {
    const { data } = await API.get("/genres");
    return data;
};

export const createGenre = async (data) => {
    try {
        const response = await API.post("/genres", data);
        return response.data;
    } catch (error) {
        console.error("Error creating genre:", error);
        throw error;
    }
};

export const deleteGenre = async (id) => {
    try {
        const response = await API.delete(`/genres/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting genre:", error);
        throw error;
    }
};