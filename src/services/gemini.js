const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent';

const PROMPT = `이 음식 사진을 분석해서 다음 JSON 형식으로만 응답해줘 (다른 텍스트 없이):
{
  "foods": [
    {
      "name": "음식명",
      "amount": "양(g 또는 개수)",
      "calories": 숫자,
      "protein": 숫자,
      "carbs": 숫자,
      "fat": 숫자
    }
  ],
  "totalCalories": 숫자,
  "confidence": "높음/중간/낮음"
}`;

export async function analyzeFoodImage(imageBase64, apiKey, userDescription = '') {
  console.log('API Key exists:', !!apiKey, 'Length:', apiKey?.length);

  const descriptionHint = userDescription ? `\n\n사용자 힌트: "${userDescription}" - 이 정보를 참고해서 더 정확하게 분석해줘.` : '';
  const fullPrompt = PROMPT + descriptionHint;

  const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: fullPrompt },
          { inline_data: { mime_type: 'image/jpeg', data: imageBase64 } }
        ]
      }],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 1024,
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Gemini API error details:', errorData);
    const status = response.status;
    if (status === 400) throw new Error('API 요청이 잘못되었습니다.');
    if (status === 403) throw new Error('API 키가 유효하지 않습니다.');
    if (status === 404) throw new Error('API 모델을 찾을 수 없어요. 잠시 후 다시 시도해주세요.');
    if (status === 429) throw new Error('API 요청 한도 초과. 잠시 후 다시 시도해주세요.');
    throw new Error(`Gemini API error: ${status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) throw new Error('분석 실패');

  console.log('Raw Gemini response:', text);

  // Try multiple parsing strategies
  let result = null;

  // Strategy 1: Direct parse
  try { result = JSON.parse(text.trim()); } catch (e) {}

  // Strategy 2: Remove markdown code blocks
  if (!result) {
    try {
      const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      result = JSON.parse(cleaned);
    } catch (e) {}
  }

  // Strategy 3: Extract JSON object
  if (!result) {
    try {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) result = JSON.parse(match[0]);
    } catch (e) {}
  }

  // Strategy 4: Fix common issues and retry
  if (!result) {
    try {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        const fixed = match[0]
          .replace(/,(\s*[}\]])/g, '$1')
          .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3');
        result = JSON.parse(fixed);
      }
    } catch (e) {}
  }

  if (!result) {
    console.error('All parsing strategies failed. Raw text:', text);
    throw new Error('응답 처리 실패');
  }

  return result;
}

export function imageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
