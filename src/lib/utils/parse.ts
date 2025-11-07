

export const parseErrorJson = (data: any) => {
    const errorMessage = Object.entries(data)
        .map(([field, messages]) => `${field}: ${(messages as string[]).join(', ')}`)
        .join(' | ');
    return errorMessage;
}

export function capitalize(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}
