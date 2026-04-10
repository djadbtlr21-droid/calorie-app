export const EXERCISE_CATEGORIES = ['유산소', '근력운동', '스포츠', '일상활동'];

export const EXERCISES = [
  // 유산소
  { id: 'walking', name: '걷기 (보통)', category: '유산소', met: 3.5 },
  { id: 'brisk_walking', name: '빠르게 걷기', category: '유산소', met: 4.5 },
  { id: 'jogging', name: '조깅', category: '유산소', met: 7.0 },
  { id: 'running', name: '달리기', category: '유산소', met: 11.0 },
  { id: 'cycling', name: '자전거 (보통)', category: '유산소', met: 6.0 },
  { id: 'swimming', name: '수영', category: '유산소', met: 8.0 },
  { id: 'jump_rope', name: '줄넘기', category: '유산소', met: 10.0 },
  { id: 'hiking', name: '등산', category: '유산소', met: 6.0 },
  { id: 'stair_climbing', name: '계단오르기', category: '유산소', met: 8.0 },
  { id: 'dance', name: '댄스', category: '유산소', met: 5.0 },

  // 근력운동
  { id: 'weight_training', name: '헬스/웨이트', category: '근력운동', met: 5.0 },
  { id: 'squat', name: '스쿼트', category: '근력운동', met: 5.0 },
  { id: 'abs', name: '복근운동', category: '근력운동', met: 3.8 },
  { id: 'pushup', name: '팔굽혀펴기', category: '근력운동', met: 3.8 },
  { id: 'pullup', name: '턱걸이', category: '근력운동', met: 4.0 },
  { id: 'plank', name: '플랭크', category: '근력운동', met: 3.5 },
  { id: 'yoga', name: '요가', category: '근력운동', met: 2.5 },
  { id: 'pilates', name: '필라테스', category: '근력운동', met: 3.0 },
  { id: 'stretching', name: '스트레칭', category: '근력운동', met: 2.3 },

  // 스포츠
  { id: 'tennis', name: '테니스', category: '스포츠', met: 7.0 },
  { id: 'badminton', name: '배드민턴', category: '스포츠', met: 5.5 },
  { id: 'basketball', name: '농구', category: '스포츠', met: 8.0 },
  { id: 'soccer', name: '축구', category: '스포츠', met: 10.0 },
  { id: 'golf', name: '골프', category: '스포츠', met: 3.5 },
  { id: 'bowling', name: '볼링', category: '스포츠', met: 3.0 },
  { id: 'billiards', name: '당구', category: '스포츠', met: 2.5 },
  { id: 'screen_golf', name: '스크린골프', category: '스포츠', met: 3.0 },
  { id: 'table_tennis', name: '탁구', category: '스포츠', met: 4.0 },

  // 일상활동
  { id: 'cleaning', name: '청소', category: '일상활동', met: 3.5 },
  { id: 'shopping', name: '쇼핑', category: '일상활동', met: 2.5 },
  { id: 'cooking', name: '요리', category: '일상활동', met: 2.5 },
  { id: 'gardening', name: '정원 가꾸기', category: '일상활동', met: 4.0 },
  { id: 'moving', name: '이사/짐옮기기', category: '일상활동', met: 6.0 },
];
