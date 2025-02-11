import { referenceAuth } from "@aws-amplify/backend";

export const auth = referenceAuth({
  userPoolId: "ap-southeast-2_rruq9wbbt",
  identityPoolId: "ap-southeast-2:171155e8-3313-4646-814f-ea843a9f0201",
  authRoleArn:
    "arn:aws:iam::890742576553:role/amplify-expensetrackerpro-amplifyAuthauthenticatedU-0qMWgTCp0Wwq",
  unauthRoleArn: "arn:aws:iam::890742576553:role/service-role/unauth",
  userPoolClientId: "4246clk66t94benaeu9sqj9dvb",
});
