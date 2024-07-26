import { isAxiosError } from 'axios';

const getAxiosErrorInfo = (error: any) => {
  if (isAxiosError(error)) {
    return {
      status: error.status,
      code: error.code,
      message: error.message,
    };
  }

  return error;
};

export default getAxiosErrorInfo;
