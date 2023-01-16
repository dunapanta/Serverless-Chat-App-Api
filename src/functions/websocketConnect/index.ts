import { APIGatewayProxyEvent } from 'aws-lambda';
import * as Cognito from '@libs/Cognito';
import { formatJSONResponse } from '@libs/APIResponses';
import { websocket } from '@libs/Websocket';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const tableName = process.env.singleTable;

    const { connectionId, domainName, stage } = event.requestContext;
    const token = event.queryStringParameters?.token;

    if (!token) {
      return authFailed({ connectionId, domainName, stage });
    }

    const { userName, userId, isValid, error } = await Cognito.verifyToken({ token });

    if (!isValid || error) {
      console.log(error);
      return authFailed({ connectionId, domainName, stage });
    }

    formatJSONResponse({
      body: {},
    });
  } catch (error) {
    console.log(error);
    return;
  }
};

const authFailed = async ({
  connectionId,
  domainName,
  stage,
}: {
  connectionId: string;
  domainName: string;
  stage: string;
}) => {
  await websocket.delete({
    connectionId,
    domainName,
    stage,
  });
  return;
};
