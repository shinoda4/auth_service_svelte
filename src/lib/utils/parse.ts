

export const parseErrorJson = (data: any) => {
    const errorMessage = Object.entries(data)
        .map(([field, messages]) => `${field}: ${(messages as string[]).join(', ')}`)
        .join(' | ');
    return errorMessage;
}