// @flow
// eslint-disable-next-line import/prefer-default-export

export function formatCountsByCodeSection(
  convictionCounts: ConvictionCountByType
) {
  const countPhrases = Object.entries(convictionCounts).map(entry => {
    // $FlowFixMe
    return `H&S § ${entry[0]}: ${pluralize(entry[1])}`;
  });
  return countPhrases.join('; ');
}

export function formatCountsByAdditionalRelief(
  convictionCounts: ConvictionCountByType
) {
  const countPhrases = Object.entries(convictionCounts).map(entry => {
    // $FlowFixMe
    return `${entry[0]}: ${pluralize(entry[1])}`;
  });
  return countPhrases.join('; ');
}

export function formatDateTime() {
  const date = new Date();
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });
}

export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, txt => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function convertTimestamp(timestamp: string) {
  const monthNames = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  };
  const dateArray = timestamp.split(' ')[0].split('-');
  const monthNumber = dateArray[1];
  const dayNumber = parseInt(dateArray[2], 10);
  return `${monthNames[monthNumber]} ${dayNumber}, ${dateArray[0]}`;
}

export function formatLineCountWithCommas(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formattedProcessingTime(timeInSeconds: number) {
  if (timeInSeconds <= 1) {
    return `${Math.round(timeInSeconds * 1000) / 1000} seconds`;
  }
  if (timeInSeconds <= 10 && timeInSeconds > 1) {
    return `${Math.round(timeInSeconds * 100) / 100} seconds`;
  }
  if (timeInSeconds >= 90) {
    return `${Math.round(timeInSeconds / 6) / 10} minutes`;
  }
  return `${Math.round(timeInSeconds * 10) / 10} seconds`;
}

function pluralize(item: number) {
  if (item === 1) {
    return `1 conviction`;
  }
  return `${item} convictions`;
}
