import { referenceAuth } from "@aws-amplify/backend";

export const auth = referenceAuth({
  userPoolId: "ap-southeast-2_rruq9wbbt",
  identityPoolId: "ap-southeast-2:171155e8-3313-4646-814f-ea843a9f0201",
  authRoleArn:
    "arn:aws:iam::171155e8-3313-4646-814f-ea843a9f0201:role/amplify-budget-tracker-main-amplifyAuthauthenticatedU-171155e8-3313-4646-814f-ea843a9f0201",
  unauthRoleArn:
    "arn:aws:iam::171155e8-3313-4646-814f-ea843a9f0201:role/amplify-budget-tracker-main-amplifyAuthunauthenticate-171155e8-3313-4646-814f-ea843a9f0201",
  userPoolClientId: "7kicblbtb3fujk649gb7rhm673",
});
