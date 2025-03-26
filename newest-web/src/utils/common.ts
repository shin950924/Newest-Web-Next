
export const keyExtractor = (index: number): string => {
    return index.toString();
};

export function timeDiff(timestampStr: string): string {
    const dt = new Date(timestampStr);
    const now = new Date();

    const diffMs = now.getTime() - dt.getTime();
    const diffSeconds = diffMs / 1000;

    if (diffSeconds < 0) {
        return "방금 전";
    }

    if (diffSeconds < 60) {
        const seconds = Math.floor(diffSeconds);
        return seconds > 0 ? `${seconds}초 전` : "방금 전";
    }

    const minutes = Math.floor(diffSeconds / 60);
    if (minutes < 60) {
        return `${minutes}분 전`;
    }

    const hours = Math.floor(diffSeconds / 3600);
    if (hours < 24) {
        return `${hours}시간 전`;
    }

    const days = Math.floor(diffSeconds / 86400);
    if (days < 365) {
        return `${days}일 전`;
    }

    const years = Math.floor(days / 365);
    return `${years}년 전`;
}

export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const formatNumber = (num: number, decimals: number = 1): string => {
    const units: { value: number; symbol: string }[] = [
        { value: 1_000_000_000_000, symbol: 'T' }, // 조
        { value: 1_000_000_000, symbol: 'B' },     // 억
        { value: 1_000_000, symbol: 'M' },         // 백만
        { value: 1_000, symbol: 'K' },             // 천
    ];

    for (const unit of units) {
        if (num >= unit.value) {
            const formatted = (num / unit.value).toFixed(decimals);
            return `${parseFloat(formatted)}${unit.symbol}`;
        }
    }

    if (num < 1_000) {
        return `${num}+`;
    }

    return num.toString();
};

export const formatNumberString = (str: string, decimals: number = 1): string => {
    const regex = /^(\d+)\+$/;
    const match = str.match(regex);

    if (match) {
        const num = parseInt(match[1], 10);
        return formatNumber(num, decimals);
    }

    return str;
};

export const formatISODateToLongDate = (isoDateString: string): string => {
    const date = new Date(isoDateString);
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date format');
    }

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    return date.toLocaleDateString(undefined, options);
}

export function extractDomain(url?: string): string | null {
  if (!url) {
    return null;
  }
  
  const match = url.match(/https?:\/\/(?:www\.)?([^\/]+)/);
  return match ? match[1] : null;
}