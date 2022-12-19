import * as functions from 'firebase-functions';

export const testauth = functions.https.onCall((data: unknown, context: functions.https.CallableContext) => {
  console.log({ data }, context.auth);

  return { success: !!context.auth };
});
