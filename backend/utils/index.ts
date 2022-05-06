interface ResBody {
  message: string;
  data?: {};
}
interface Res {
  status: number;
  body: ResBody;
}

export const ResponseHandler = (
  status: number,
  message: string,
  data?: {}
): Res => {
  return { status, body: { message, data } };
};
