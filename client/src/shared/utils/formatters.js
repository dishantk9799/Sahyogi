export const getApiData = (response) => response?.data?.data ?? response?.data;

export const getApiMessage = (error, fallback = "Something went wrong") => {
    return error?.response?.data?.message || error?.message || fallback;
};

export const formatDate = (value) => {
    if (!value) return "";

    return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric"
    }).format(new Date(value));
};

export const toFormData = (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") return;
        formData.append(key, value);
    });

    return formData;
};
