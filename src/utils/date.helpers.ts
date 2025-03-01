import dayjs from 'dayjs';

/**
 * formats a date to a certain format
 * @param date 
 * @param format 
 * @returns formatDate, string
 */
export const formatDate = (date:Date|string, format:string):string => dayjs(date).format(format);

/**
 * computes the number of days and hours difference between
 * a certain time and now
 * @param dateString 
 * @returns string
 */
export const getDayHoursAgo = (dateString:string):string => {
    const now = new Date();
    const passed = new Date(dateString);
  
    // check if date is in the past
    if (passed > now) {
      return "The date is in the future.";
    }
  
    const diffInMilliseconds = now.getTime() - passed.getTime();
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    // const remainingHours = diffInHours % 24;
  
    if (diffInHours < 1) return `less than one hour ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's':''} ago`;
    return `${diffInDays} days ago`;
  }
  