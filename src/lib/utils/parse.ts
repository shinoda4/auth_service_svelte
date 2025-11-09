

export const parseErrorJson = (data: any): string => {
    // 1. 处理常见的非字段错误 (如 detail, non_field_errors)
    if (typeof data === 'object' && data !== null) {
        if (data.detail && typeof data.detail === 'string') {
            return data.detail;
        }
        if (data.non_field_errors && Array.isArray(data.non_field_errors)) {
            return (data.non_field_errors as string[]).join(' | ');
        }
    }

    // 2. 处理字段级别错误
    try {
        const errorMessage = Object.entries(data)
            .map(([field, messages]) => {
                let messageString: string;

                if (Array.isArray(messages)) {
                    // 确保数组中的元素是字符串再连接
                    messageString = (messages as any[])
                        .map(msg => String(msg))
                        .join(', ');
                } else if (typeof messages === 'string') {
                    // 如果消息是单个字符串而不是数组 (不标准但可能发生)
                    messageString = messages;
                } else {
                    // 无法处理的结构，将其转换为字符串
                    messageString = String(messages);
                }

                // 避免显示 "detail: Invalid credentials" 这种冗余信息
                if (field === 'detail' || field === 'non_field_errors') {
                    return messageString;
                }

                return `${field}: ${messageString}`;
            })
            .join(' | ');

        // 如果解析结果为空字符串 (例如 data 是空对象 {} )
        if (errorMessage.trim().length > 0) {
            return errorMessage;
        }

    } catch (e) {
        // 如果 Object.entries(data) 因为 data 是 null 或非对象而失败
        console.error('Error during error data parsing:', e);
        // Fallthrough to step 3
    }

    // 3. 安全回退
    return 'An unknown server error occurred.';
};

export function capitalize(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}
