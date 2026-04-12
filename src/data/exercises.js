export const EXERCISE_CATEGORIES = ['유산소', '근력운동', '스포츠', '일상활동'];
export const EXERCISE_CATEGORIES_ZH = ['有氧', '力量训练', '球类运动', '日常活动'];

export const EXERCISES = [
  // 유산소
  { id: 'walking', name: '걷기 (보통)', nameZh: '步行(正常)', category: '유산소', categoryZh: '有氧', met: 3.5 },
  { id: 'brisk_walking', name: '빠르게 걷기', nameZh: '快走', category: '유산소', categoryZh: '有氧', met: 4.5 },
  { id: 'jogging', name: '조깅', nameZh: '慢跑', category: '유산소', categoryZh: '有氧', met: 7.0 },
  { id: 'running', name: '달리기', nameZh: '跑步', category: '유산소', categoryZh: '有氧', met: 11.0 },
  { id: 'cycling', name: '자전거 (보통)', nameZh: '骑车(正常)', category: '유산소', categoryZh: '有氧', met: 6.0 },
  { id: 'swimming', name: '수영', nameZh: '游泳', category: '유산소', categoryZh: '有氧', met: 8.0 },
  { id: 'jump_rope', name: '줄넘기', nameZh: '跳绳', category: '유산소', categoryZh: '有氧', met: 10.0 },
  { id: 'hiking', name: '등산', nameZh: '爬山', category: '유산소', categoryZh: '有氧', met: 6.0 },
  { id: 'stair_climbing', name: '계단오르기', nameZh: '爬楼梯', category: '유산소', categoryZh: '有氧', met: 8.0 },
  { id: 'dance', name: '댄스', nameZh: '跳舞', category: '유산소', categoryZh: '有氧', met: 5.0 },

  // 근력운동
  { id: 'weight_training', name: '헬스/웨이트', nameZh: '健身/举重', category: '근력운동', categoryZh: '力量训练', met: 5.0 },
  { id: 'squat', name: '스쿼트', nameZh: '深蹲', category: '근력운동', categoryZh: '力量训练', met: 5.0 },
  { id: 'abs', name: '복근운동', nameZh: '腹肌训练', category: '근력운동', categoryZh: '力量训练', met: 3.8 },
  { id: 'pushup', name: '팔굽혀펴기', nameZh: '俯卧撑', category: '근력운동', categoryZh: '力量训练', met: 3.8 },
  { id: 'pullup', name: '턱걸이', nameZh: '引体向上', category: '근력운동', categoryZh: '力量训练', met: 4.0 },
  { id: 'plank', name: '플랭크', nameZh: '平板支撑', category: '근력운동', categoryZh: '力量训练', met: 3.5 },
  { id: 'yoga', name: '요가', nameZh: '瑜伽', category: '근력운동', categoryZh: '力量训练', met: 2.5 },
  { id: 'pilates', name: '필라테스', nameZh: '普拉提', category: '근력운동', categoryZh: '力量训练', met: 3.0 },
  { id: 'stretching', name: '스트레칭', nameZh: '拉伸', category: '근력운동', categoryZh: '力量训练', met: 2.3 },

  // 스포츠
  { id: 'tennis', name: '테니스', nameZh: '网球', category: '스포츠', categoryZh: '球类运动', met: 7.0 },
  { id: 'badminton', name: '배드민턴', nameZh: '羽毛球', category: '스포츠', categoryZh: '球类运动', met: 5.5 },
  { id: 'basketball', name: '농구', nameZh: '篮球', category: '스포츠', categoryZh: '球类运动', met: 8.0 },
  { id: 'soccer', name: '축구', nameZh: '足球', category: '스포츠', categoryZh: '球类运动', met: 10.0 },
  { id: 'golf', name: '골프', nameZh: '高尔夫', category: '스포츠', categoryZh: '球类运动', met: 3.5 },
  { id: 'bowling', name: '볼링', nameZh: '保龄球', category: '스포츠', categoryZh: '球类运动', met: 3.0 },
  { id: 'billiards', name: '당구', nameZh: '台球', category: '스포츠', categoryZh: '球类运动', met: 2.5 },
  { id: 'screen_golf', name: '스크린골프', nameZh: '模拟高尔夫', category: '스포츠', categoryZh: '球类运动', met: 3.0 },
  { id: 'table_tennis', name: '탁구', nameZh: '乒乓球', category: '스포츠', categoryZh: '球类运动', met: 4.0 },

  // 일상활동
  { id: 'cleaning', name: '청소', nameZh: '打扫', category: '일상활동', categoryZh: '日常活动', met: 3.5 },
  { id: 'shopping', name: '쇼핑', nameZh: '购物', category: '일상활동', categoryZh: '日常活动', met: 2.5 },
  { id: 'cooking', name: '요리', nameZh: '做饭', category: '일상활동', categoryZh: '日常活动', met: 2.5 },
  { id: 'gardening', name: '정원 가꾸기', nameZh: '园艺', category: '일상활동', categoryZh: '日常活动', met: 4.0 },
  { id: 'moving', name: '이사/짐옮기기', nameZh: '搬家/搬东西', category: '일상활동', categoryZh: '日常活动', met: 6.0 },
];
