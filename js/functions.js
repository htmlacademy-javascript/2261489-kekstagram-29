// Функция для проверки длины строки

const stringLength = (string, length) => string.length <= length;
stringLength();

// Функция для проверки строки на палиндромность

const isPalindrome = function (string) {
  const normalizedString = string.toLowerCase();
  let newString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    const index = normalizedString[i];
    newString += index;
  }
  return normalizedString === newString;
};

isPalindrome();

// Функция для извлечения чисел

const extractNumbers = function (string) {
  let newString = '';

  for (let i = 0; i <= string.length; i++) {
    const insert = parseInt(string[i], 10);
    if (!isNaN(insert)) {
      newString += insert;
    }
  }
  return newString ? parseInt(newString, 10) : NaN;
};

extractNumbers();

// Функция для проверки встречи в рабочее время

const getMinsFromTime = function (timeString) {
  const [hours, minutes] = timeString.split(':');
  return hours * 60 + Number(minutes);
};

const checkMeetingTime = function (workStart, workEnd, meetingStart, meetingDuration) {
  const workStartInMins = getMinsFromTime(workStart);
  const workEndInMins = getMinsFromTime(workEnd);
  const meetingStartInMins = getMinsFromTime(meetingStart);

  return meetingStartInMins >= workStartInMins && meetingStartInMins + meetingDuration <= workEndInMins;
};
checkMeetingTime('08:00', '18:00', '14:00', 90);

