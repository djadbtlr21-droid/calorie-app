const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent';

const PROMPT = `Analyze this food image and respond with ONLY a JSON object, no other text.
You are also a strict but caring female fitness trainer. Assess how healthy the food is and give a short comment in Korean.

Response format:
{"foods":[{"name":"food name in Korean","amount":"portion size","calories":number,"protein":number,"carbs":number,"fat":number}],"totalCalories":number,"confidence":"높음/중간/낮음","dietScore":number,"dietComment":"trainer comment"}

dietScore: 1-10 (10=very healthy, 1=very unhealthy)
dietComment: 1 sentence in Korean, in character as a strict but caring female fitness trainer. Use these EXACT responses based on the food:
- totalCalories under 200 AND healthy food: "완벽해요! 이런 식단이라면 금방 목표 달성해요! 💪"
- totalCalories 200-400 AND healthy food: "좋아요! 건강한 선택이에요! 계속 이렇게 해요! 😊"
- totalCalories over 400 OR junk food (fried, fast food, dessert): "이거 드시면 안 돼요! 살쪄요! 오늘 운동 2배로 하세요! 😤"
- sugary drinks (cola, juice, soda, sweetened beverages): "당 음료는 다이어트의 적이에요! 물로 바꾸세요! 💧"`;

export async function analyzeFoodImage(imageBase64, apiKey, userDescription = '', mimeType = 'image/jpeg') {
  const cleanKey = apiKey?.trim();
  console.log('API Key exists:', !!cleanKey, 'Length:', cleanKey?.length, 'First4:', cleanKey?.substring(0,4));

  const descriptionHint = userDescription ? `\nUser hint: "${userDescription}" - use this to improve accuracy.` : '';
  const fullPrompt = PROMPT + descriptionHint;

  const response = await fetch(`${GEMINI_URL}?key=${cleanKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: fullPrompt },
          { inline_data: { mime_type: mimeType, data: imageBase64 } }
        ]
      }],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 8192,
        thinkingConfig: {
          thinkingBudget: 0
        }
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Gemini API error details:', errorData);
    throw new Error(`${response.status}: ${JSON.stringify(errorData?.error?.message || errorData)}`);
  }

  const data = await response.json();
  console.log('Full API response:', JSON.stringify(data));

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  console.log('Gemini raw response:', text);

  if (!text) throw new Error('분석 실패');

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
