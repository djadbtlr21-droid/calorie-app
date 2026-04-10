export const FOOD_CATEGORIES = ['밥류', '면류', '국/찌개', '고기/생선', '반찬', '빵/간식', '음료', '과일', '패스트푸드', '단백질/다이어트', '샐러드/채소', '다이어트 간식', '다이어트 세트'];

export const FOODS = [
  // 밥류
  { id: 'rice', name: '공기밥', category: '밥류', calories: 300, protein: 5, carbs: 65, fat: 1, serving: '1공기 (210g)' },
  { id: 'bibimbap', name: '비빔밥', category: '밥류', calories: 560, protein: 18, carbs: 75, fat: 15, serving: '1인분' },
  { id: 'kimchi_fried_rice', name: '김치볶음밥', category: '밥류', calories: 480, protein: 12, carbs: 68, fat: 16, serving: '1인분' },
  { id: 'kimbap', name: '김밥', category: '밥류', calories: 430, protein: 14, carbs: 62, fat: 12, serving: '1줄' },
  { id: 'curry_rice', name: '카레라이스', category: '밥류', calories: 550, protein: 15, carbs: 78, fat: 18, serving: '1인분' },
  { id: 'bokkeumbap', name: '볶음밥', category: '밥류', calories: 500, protein: 14, carbs: 70, fat: 16, serving: '1인분' },
  { id: 'juk', name: '죽', category: '밥류', calories: 200, protein: 6, carbs: 38, fat: 3, serving: '1그릇' },
  { id: 'omurice', name: '오므라이스', category: '밥류', calories: 520, protein: 18, carbs: 65, fat: 20, serving: '1인분' },

  // 면류
  { id: 'ramyeon', name: '라면', category: '면류', calories: 500, protein: 10, carbs: 70, fat: 18, serving: '1인분' },
  { id: 'jajangmyeon', name: '짜장면', category: '면류', calories: 620, protein: 16, carbs: 85, fat: 20, serving: '1인분' },
  { id: 'jjamppong', name: '짬뽕', category: '면류', calories: 520, protein: 22, carbs: 65, fat: 18, serving: '1인분' },
  { id: 'naengmyeon', name: '냉면', category: '면류', calories: 460, protein: 14, carbs: 80, fat: 6, serving: '1인분' },
  { id: 'kalguksu', name: '칼국수', category: '면류', calories: 420, protein: 15, carbs: 68, fat: 8, serving: '1인분' },
  { id: 'udon', name: '우동', category: '면류', calories: 400, protein: 12, carbs: 65, fat: 8, serving: '1인분' },
  { id: 'japchae', name: '잡채', category: '면류', calories: 380, protein: 10, carbs: 55, fat: 12, serving: '1인분' },

  // 국/찌개
  { id: 'kimchi_jjigae', name: '김치찌개', category: '국/찌개', calories: 180, protein: 12, carbs: 8, fat: 10, serving: '1인분' },
  { id: 'doenjang_jjigae', name: '된장찌개', category: '국/찌개', calories: 150, protein: 10, carbs: 10, fat: 8, serving: '1인분' },
  { id: 'sundubu_jjigae', name: '순두부찌개', category: '국/찌개', calories: 200, protein: 14, carbs: 8, fat: 12, serving: '1인분' },
  { id: 'budae_jjigae', name: '부대찌개', category: '국/찌개', calories: 380, protein: 20, carbs: 25, fat: 22, serving: '1인분' },
  { id: 'miyeokguk', name: '미역국', category: '국/찌개', calories: 100, protein: 8, carbs: 5, fat: 5, serving: '1그릇' },
  { id: 'tteokguk', name: '떡국', category: '국/찌개', calories: 380, protein: 15, carbs: 55, fat: 10, serving: '1그릇' },
  { id: 'samgyetang', name: '삼계탕', category: '국/찌개', calories: 550, protein: 35, carbs: 40, fat: 22, serving: '1인분' },

  // 고기/생선
  { id: 'samgyeopsal', name: '삼겹살', category: '고기/생선', calories: 330, protein: 18, carbs: 0, fat: 28, serving: '100g' },
  { id: 'bulgogi', name: '불고기', category: '고기/생선', calories: 260, protein: 22, carbs: 12, fat: 14, serving: '100g' },
  { id: 'galbi', name: '갈비', category: '고기/생선', calories: 350, protein: 25, carbs: 8, fat: 25, serving: '100g' },
  { id: 'dakgalbi', name: '닭갈비', category: '고기/생선', calories: 300, protein: 25, carbs: 15, fat: 14, serving: '1인분' },
  { id: 'chicken', name: '치킨 (후라이드)', category: '고기/생선', calories: 300, protein: 20, carbs: 10, fat: 20, serving: '2조각' },
  { id: 'godeungeo', name: '고등어구이', category: '고기/생선', calories: 200, protein: 22, carbs: 0, fat: 12, serving: '1토막' },
  { id: 'jeyukbokkeum', name: '제육볶음', category: '고기/생선', calories: 320, protein: 22, carbs: 10, fat: 22, serving: '1인분' },

  // 반찬
  { id: 'kimchi', name: '김치', category: '반찬', calories: 15, protein: 1, carbs: 2, fat: 0, serving: '1접시 (50g)' },
  { id: 'gyeran_mari', name: '계란말이', category: '반찬', calories: 150, protein: 10, carbs: 2, fat: 11, serving: '1인분' },
  { id: 'dubu', name: '두부', category: '반찬', calories: 80, protein: 8, carbs: 2, fat: 5, serving: '1/4모' },
  { id: 'namul', name: '나물반찬', category: '반찬', calories: 50, protein: 3, carbs: 5, fat: 2, serving: '1접시' },
  { id: 'tteokbokki', name: '떡볶이', category: '반찬', calories: 380, protein: 8, carbs: 65, fat: 8, serving: '1인분' },
  { id: 'mandu', name: '만두', category: '반찬', calories: 300, protein: 12, carbs: 35, fat: 12, serving: '5개' },
  { id: 'gyeran_furai', name: '계란후라이', category: '반찬', calories: 90, protein: 6, carbs: 1, fat: 7, serving: '1개' },

  // 빵/간식
  { id: 'bread', name: '식빵', category: '빵/간식', calories: 80, protein: 3, carbs: 15, fat: 1, serving: '1장' },
  { id: 'cake', name: '케이크', category: '빵/간식', calories: 350, protein: 5, carbs: 45, fat: 16, serving: '1조각' },
  { id: 'cookie', name: '쿠키', category: '빵/간식', calories: 150, protein: 2, carbs: 20, fat: 7, serving: '2개' },
  { id: 'hotteok', name: '호떡', category: '빵/간식', calories: 250, protein: 4, carbs: 40, fat: 8, serving: '1개' },
  { id: 'bungeoppang', name: '붕어빵', category: '빵/간식', calories: 180, protein: 4, carbs: 30, fat: 5, serving: '1개' },
  { id: 'chips', name: '감자칩', category: '빵/간식', calories: 270, protein: 3, carbs: 28, fat: 17, serving: '1봉 (50g)' },

  // 음료
  { id: 'americano', name: '아메리카노', category: '음료', calories: 5, protein: 0, carbs: 1, fat: 0, serving: '1잔' },
  { id: 'latte', name: '카페라떼', category: '음료', calories: 150, protein: 7, carbs: 12, fat: 8, serving: '1잔' },
  { id: 'cola', name: '콜라', category: '음료', calories: 140, protein: 0, carbs: 35, fat: 0, serving: '1캔 (355ml)' },
  { id: 'soju', name: '소주', category: '음료', calories: 400, protein: 0, carbs: 0, fat: 0, serving: '1병' },
  { id: 'beer', name: '맥주', category: '음료', calories: 150, protein: 1, carbs: 13, fat: 0, serving: '1캔 (355ml)' },
  { id: 'milk', name: '우유', category: '음료', calories: 130, protein: 6, carbs: 10, fat: 7, serving: '1잔 (200ml)' },
  { id: 'juice', name: '오렌지주스', category: '음료', calories: 110, protein: 2, carbs: 26, fat: 0, serving: '1잔 (200ml)' },

  // 과일
  { id: 'banana', name: '바나나', category: '과일', calories: 89, protein: 1, carbs: 23, fat: 0, serving: '1개', diet: true },
  { id: 'apple', name: '사과', category: '과일', calories: 95, protein: 0, carbs: 25, fat: 0, serving: '1개', diet: true },
  { id: 'mandarin', name: '귤', category: '과일', calories: 40, protein: 1, carbs: 10, fat: 0, serving: '1개', diet: true },
  { id: 'grape', name: '포도', category: '과일', calories: 69, protein: 1, carbs: 18, fat: 0, serving: '100g', diet: true },
  { id: 'strawberry', name: '딸기', category: '과일', calories: 32, protein: 1, carbs: 8, fat: 0, serving: '100g', diet: true },
  { id: 'watermelon', name: '수박', category: '과일', calories: 30, protein: 1, carbs: 8, fat: 0, serving: '100g', diet: true },
  { id: 'orange', name: '오렌지', category: '과일', calories: 62, protein: 1, carbs: 15, fat: 0, serving: '1개', diet: true },
  { id: 'blueberry', name: '블루베리', category: '과일', calories: 57, protein: 1, carbs: 14, fat: 0, serving: '100g', diet: true },

  // 패스트푸드
  { id: 'hamburger', name: '햄버거', category: '패스트푸드', calories: 500, protein: 25, carbs: 40, fat: 25, serving: '1개' },
  { id: 'pizza', name: '피자', category: '패스트푸드', calories: 280, protein: 12, carbs: 30, fat: 12, serving: '1조각' },
  { id: 'fries', name: '감자튀김', category: '패스트푸드', calories: 350, protein: 4, carbs: 42, fat: 17, serving: '1인분 (중)' },
  { id: 'donkatsu', name: '돈까스', category: '패스트푸드', calories: 550, protein: 28, carbs: 40, fat: 28, serving: '1인분' },
  { id: 'gimbap_triangle', name: '삼각김밥', category: '패스트푸드', calories: 180, protein: 5, carbs: 30, fat: 4, serving: '1개' },

  // ===== 단백질/다이어트 식품 =====
  { id: 'boiled_egg', name: '삶은 달걀', category: '단백질/다이어트', calories: 78, protein: 6, carbs: 0, fat: 5, serving: '1개', diet: true },
  { id: 'boiled_egg_white', name: '삶은 달걀 흰자', category: '단백질/다이어트', calories: 17, protein: 4, carbs: 0, fat: 0, serving: '1개', diet: true },
  { id: 'boiled_chicken_breast', name: '삶은 닭가슴살', category: '단백질/다이어트', calories: 165, protein: 31, carbs: 0, fat: 4, serving: '100g', diet: true },
  { id: 'boiled_chicken_leg', name: '삶은 닭다리', category: '단백질/다이어트', calories: 185, protein: 27, carbs: 0, fat: 8, serving: '100g', diet: true },
  { id: 'grilled_chicken_breast', name: '닭가슴살 구이', category: '단백질/다이어트', calories: 165, protein: 31, carbs: 0, fat: 4, serving: '100g', diet: true },
  { id: 'chicken_breast_salad', name: '닭가슴살 샐러드', category: '단백질/다이어트', calories: 220, protein: 28, carbs: 12, fat: 6, serving: '1인분', diet: true },
  { id: 'grilled_salmon', name: '연어 구이', category: '단백질/다이어트', calories: 208, protein: 20, carbs: 0, fat: 13, serving: '100g', diet: true },
  { id: 'canned_tuna', name: '참치캔', category: '단백질/다이어트', calories: 103, protein: 23, carbs: 0, fat: 1, serving: '1캔 (100g)', diet: true },
  { id: 'tofu_diet', name: '두부', category: '단백질/다이어트', calories: 76, protein: 8, carbs: 2, fat: 4, serving: '100g', diet: true },
  { id: 'grilled_tofu', name: '두부 구이', category: '단백질/다이어트', calories: 100, protein: 9, carbs: 3, fat: 6, serving: '100g', diet: true },
  { id: 'greek_yogurt', name: '그릭요거트', category: '단백질/다이어트', calories: 59, protein: 10, carbs: 4, fat: 0, serving: '100g', diet: true },
  { id: 'lowfat_milk', name: '저지방 우유', category: '단백질/다이어트', calories: 82, protein: 8, carbs: 12, fat: 2, serving: '200ml', diet: true },
  { id: 'protein_shake', name: '프로틴 쉐이크', category: '단백질/다이어트', calories: 120, protein: 24, carbs: 5, fat: 2, serving: '1스쿱', diet: true },
  { id: 'beef_tenderloin', name: '소고기 안심', category: '단백질/다이어트', calories: 143, protein: 22, carbs: 0, fat: 6, serving: '100g', diet: true },
  { id: 'shrimp', name: '새우', category: '단백질/다이어트', calories: 99, protein: 19, carbs: 1, fat: 1, serving: '100g', diet: true },
  { id: 'squid', name: '오징어', category: '단백질/다이어트', calories: 92, protein: 16, carbs: 3, fat: 1, serving: '100g', diet: true },

  // ===== 샐러드/채소 =====
  { id: 'green_salad', name: '그린 샐러드', category: '샐러드/채소', calories: 45, protein: 3, carbs: 8, fat: 0, serving: '1인분 (200g)', diet: true },
  { id: 'chicken_salad', name: '닭가슴살 샐러드', category: '샐러드/채소', calories: 220, protein: 28, carbs: 12, fat: 6, serving: '1인분', diet: true },
  { id: 'egg_salad', name: '계란 샐러드', category: '샐러드/채소', calories: 180, protein: 12, carbs: 8, fat: 10, serving: '1인분', diet: true },
  { id: 'broccoli', name: '브로콜리', category: '샐러드/채소', calories: 34, protein: 3, carbs: 7, fat: 0, serving: '100g', diet: true },
  { id: 'sweet_potato', name: '고구마', category: '샐러드/채소', calories: 86, protein: 2, carbs: 20, fat: 0, serving: '100g', diet: true },
  { id: 'kabocha', name: '단호박', category: '샐러드/채소', calories: 31, protein: 1, carbs: 7, fat: 0, serving: '100g', diet: true },
  { id: 'avocado', name: '아보카도', category: '샐러드/채소', calories: 160, protein: 2, carbs: 9, fat: 15, serving: '100g', diet: true },
  { id: 'tomato', name: '토마토', category: '샐러드/채소', calories: 22, protein: 1, carbs: 5, fat: 0, serving: '1개', diet: true },
  { id: 'cucumber', name: '오이', category: '샐러드/채소', calories: 16, protein: 1, carbs: 4, fat: 0, serving: '100g', diet: true },
  { id: 'carrot', name: '당근', category: '샐러드/채소', calories: 41, protein: 1, carbs: 10, fat: 0, serving: '100g', diet: true },
  { id: 'lettuce', name: '양상추', category: '샐러드/채소', calories: 14, protein: 1, carbs: 3, fat: 0, serving: '100g', diet: true },
  { id: 'spinach', name: '시금치', category: '샐러드/채소', calories: 23, protein: 3, carbs: 4, fat: 0, serving: '100g', diet: true },
  { id: 'paprika', name: '파프리카', category: '샐러드/채소', calories: 31, protein: 1, carbs: 6, fat: 0, serving: '1개', diet: true },
  { id: 'mushroom', name: '버섯', category: '샐러드/채소', calories: 22, protein: 3, carbs: 3, fat: 0, serving: '100g', diet: true },
  { id: 'cabbage', name: '양배추', category: '샐러드/채소', calories: 25, protein: 1, carbs: 6, fat: 0, serving: '100g', diet: true },
  { id: 'bean_sprouts', name: '콩나물', category: '샐러드/채소', calories: 30, protein: 3, carbs: 5, fat: 0, serving: '100g', diet: true },

  // ===== 다이어트 간식 =====
  { id: 'almonds', name: '아몬드', category: '다이어트 간식', calories: 70, protein: 3, carbs: 3, fat: 6, serving: '10개', diet: true },
  { id: 'mixed_nuts', name: '견과류 믹스', category: '다이어트 간식', calories: 180, protein: 5, carbs: 8, fat: 15, serving: '30g', diet: true },
  { id: 'brown_rice', name: '현미밥', category: '다이어트 간식', calories: 280, protein: 6, carbs: 60, fat: 2, serving: '1공기', diet: true },
  { id: 'oatmeal', name: '귀리죽', category: '다이어트 간식', calories: 150, protein: 5, carbs: 27, fat: 3, serving: '1인분', diet: true },
  { id: 'baked_sweet_potato', name: '고구마 구이', category: '다이어트 간식', calories: 129, protein: 3, carbs: 30, fat: 0, serving: '1개 (150g)', diet: true },
  { id: 'protein_bar', name: '단백질바', category: '다이어트 간식', calories: 200, protein: 20, carbs: 20, fat: 7, serving: '1개', diet: true },
  { id: 'konjac_jelly', name: '곤약젤리', category: '다이어트 간식', calories: 10, protein: 0, carbs: 2, fat: 0, serving: '1개', diet: true },
  { id: 'lowcal_soymilk', name: '저칼로리 두유', category: '다이어트 간식', calories: 90, protein: 6, carbs: 10, fat: 3, serving: '200ml', diet: true },
  { id: 'rice_cake_plain', name: '현미떡', category: '다이어트 간식', calories: 120, protein: 3, carbs: 25, fat: 1, serving: '2개', diet: true },
  { id: 'dried_mango', name: '건망고', category: '다이어트 간식', calories: 100, protein: 1, carbs: 24, fat: 0, serving: '30g' },
  { id: 'chia_pudding', name: '치아푸딩', category: '다이어트 간식', calories: 120, protein: 4, carbs: 12, fat: 7, serving: '1컵', diet: true },
  { id: 'dark_chocolate', name: '다크초콜릿', category: '다이어트 간식', calories: 60, protein: 1, carbs: 7, fat: 4, serving: '1조각 (10g)' },

  // ===== 중국 음식 =====
  { id: 'white_rice_cn', name: '白米饭/흰쌀밥', category: '밥류', calories: 300, protein: 6, carbs: 65, fat: 1, serving: '1공기' },
  { id: 'veggie_stirfry', name: '青菜炒/채소볶음', category: '반찬', calories: 80, protein: 3, carbs: 10, fat: 3, serving: '1인분', diet: true },

  // ===== 다이어트 세트 메뉴 =====
  { id: 'diet_set_a', name: '다이어트 세트 A (닭가슴살+브로콜리+현미밥)', category: '다이어트 세트', calories: 450, protein: 40, carbs: 67, fat: 6, serving: '1세트', diet: true },
  { id: 'diet_set_b', name: '다이어트 세트 B (삶은달걀2+샐러드+고구마)', category: '다이어트 세트', calories: 350, protein: 18, carbs: 48, fat: 10, serving: '1세트', diet: true },
  { id: 'diet_set_c', name: '다이어트 세트 C (연어+샐러드+현미밥)', category: '다이어트 세트', calories: 480, protein: 30, carbs: 65, fat: 12, serving: '1세트', diet: true },
];
