// js/config.js - Configuration
// API Key được quản lý qua Vercel Environment Variables (production)
// hoặc file config.local.js (development)

const CONFIG = {
    // Groq API Configuration
    // KHÔNG đặt API key ở đây - dùng serverless function
    GROQ_API_URL: '/api/chat', // Vercel serverless function
    GROQ_MODEL: 'openai/gpt-oss-120b',
    
    // Fallback cho local development (nếu có config.local.js)
    GROQ_API_KEY: null, // Sẽ được override bởi config.local.js
    GROQ_DIRECT_URL: 'https://api.groq.com/openai/v1/chat/completions',

    // App Configuration
    MAX_CONVERSATION_LENGTH: 50,
    STORAGE_KEY_CHAT: 'edupath_chat_history',
    STORAGE_KEY_HOLLAND: 'edupath_holland_result',

    // Detect environment
    isProduction: function() {
        return window.location.hostname !== 'localhost' 
            && window.location.hostname !== '127.0.0.1'
            && !window.location.protocol.includes('file');
    },

    // System prompt for AI
    SYSTEM_PROMPT: `Bạn là EduPath AI - trợ lý tư vấn tuyển sinh đại học Việt Nam.

Nhiệm vụ của bạn:
1. Tư vấn về điểm chuẩn đại học, ngành học, khối thi
2. Phân tích kết quả trắc nghiệm Holland và gợi ý ngành phù hợp
3. So sánh các trường đại học
4. Trả lời câu hỏi về tuyển sinh, quy chế thi

Quy tắc:
- Trả lời bằng tiếng Việt, thân thiện, dễ hiểu
- Đưa ra thông tin chính xác dựa trên dữ liệu điểm chuẩn 2025
- Nếu không chắc chắn, hãy nói rõ
- Khuyến khích thí sinh tìm hiểu thêm từ nguồn chính thống
- Sử dụng markdown để format câu trả lời (bảng, danh sách, bold...)

Bạn có thể truy cập:
- Dữ liệu điểm chuẩn 80+ trường đại học
- Kết quả trắc nghiệm Holland của thí sinh (nếu có)`
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
