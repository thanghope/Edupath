
// api/chat.js
// Vercel Serverless Function - Groq API

module.exports = async function handler(req, res) {

    // Chỉ cho phép POST
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed'
        });
    }

    // Lấy API Key từ Vercel
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey || !apiKey.trim()) {
        return res.status(500).json({
            error: 'GROQ_API_KEY chưa được cấu hình trên Vercel'
        });
    }

    try {
        const {
            messages,
            temperature,
            max_completion_tokens
        } = req.body || {};

        // Kiểm tra dữ liệu
        if (!Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({
                error: 'Messages không hợp lệ'
            });
        }

        // Gọi Groq API
        const response = await fetch(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'openai/gpt-oss-120b',
                    messages: messages,
                    max_completion_tokens:
                        max_completion_tokens || 2048
                })
            }
        );

        const data = await response.json();

        // Nếu Groq trả lỗi
        if (!response.ok) {
            console.error('Groq API Error:', {
                status: response.status,
                error: data.error
            });

            return res.status(response.status).json({
                error: data.error?.message || 'Groq API Error',
                code: data.error?.code || 'unknown_error'
            });
        }

        return res.status(200).json(data);

    } catch (error) {
        console.error('Server Error:', error);

        return res.status(500).json({
            error: 'Internal server error'
        });
    }
};
