export const common = {
  actions: {
    next: "다음",
    prev: "이전",
    submit: "제출",
    cancel: "취소",
    confirm: "확인",
    complete: "완료",
    more: "더보기",
    less: "접기",
    loading: "로딩 중...",
    provide: "제공하기",
    request: "요청하기",
    linkProvide: "링크 제공하기",
  },
  status: {
    success: "성공",
    error: "오류",
    warning: "경고",
    info: "안내",
    trending: "인기",
  },
  validation: {
    required: "필수 입력 항목입니다",
    invalid: "잘못된 입력입니다",
    minLength: "최소 {{count}}자 이상 입력해주세요",
    maxLength: "최대 {{count}}자까지 입력 가능합니다",
  },
  time: {
    now: "방금 전",
    minutesAgo: "{{count}}분 전",
    hoursAgo: "{{count}}시간 전",
    daysAgo: "{{count}}일 전",
  },
  errors: {
    dataFetchFailed: "데이터를 불러오는데 실패했습니다.",
    brandNotFound: "브랜드 정보를 찾을 수 없습니다.",
  },
  terminology: {
    trending: "인기",
    exposureRate: "노출률",
    viewCount: "조회수",
  },
} as const;
