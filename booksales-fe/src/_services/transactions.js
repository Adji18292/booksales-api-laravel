import API from "../_api";

export const getTransactions = async () => {
    const response = await API.get("/transactions");
    return response.data.data || [];
};

export const createTransaction = async (data) => {
    try {
        const response = await API.post("/transactions", data);
        return response.data;
    } catch (error) {
        console.error("Error creating transaction:", error);
        throw error;
    }
};

export const deleteTransaction = async (id) => {
    try {
        const response = await API.delete(`/transactions/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting transaction:", error);
        throw error;
    }
};

export const getTransaction = async (id) => {
    try {
        const { data } = await API.get(`/transactions/${id}`);
        return data;
    } catch (error) {
        throw error.response || error;
    }
};