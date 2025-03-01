/**
 * appends to Form Data
 * @param formData 
 * @param key 
 * @param value 
 * @returns 
 */
export const appendToFormData = (formData: FormData, key: string, value: unknown) => {
    if (value === null || value === undefined) return;

    if (value instanceof File) {
        // Single file
        formData.append(key, value);
    } else if (Array.isArray(value)) {
        // Arrays
        value.forEach((item, index) => {
            if (item instanceof File) {
                // For files in arrays
                formData.append(`${key}[${index}]`, item);
            } else if (typeof item === "object") {
                // Nested objects in arrays
                Object.entries(item).forEach(([nestedKey, nestedValue]) => {
                    formData.append(`${key}[${index}][${nestedKey}]`, String(nestedValue));
                });
            } else {
                // Scalars in arrays
                formData.append(`${key}[${index}]`, String(item));
            }
        });
    } else if (typeof value === "object" && !(value instanceof File)) {
        // Objects
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
            appendToFormData(formData, `${key}[${nestedKey}]`, nestedValue);
        });
    } else {
        // Scalars
        formData.append(key, String(value));
    }
};

/**
 * converts Map to FormData
 * @param data 
 * @returns FormData
 */
export const convertMapToFormData = <T extends Record<string, unknown>>(data:T) =>{
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
        appendToFormData(formData, key, value);
    });

    return formData;
}