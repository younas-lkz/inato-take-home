import { Request, Response, Router } from 'express';

import { TrialMapper } from '../../../../../domain/models/trials/trial-mapper.type';
import { GetOngoingTrials } from '../../../application/query/get-ongoing-trials.interface';
import { GetOngoingTrialsQuery } from '../../../application/query/get-ongoing-trials.query';

export function makeGetOngoingTrialsExpressRouter<MappedTrial>(
  handler: GetOngoingTrials<MappedTrial>,
  mapper: TrialMapper<MappedTrial>,
) {
  const getOngoingTrialsRouter = Router();

  getOngoingTrialsRouter.get(
    '/ongoing',
    async function (req: Request<unknown, unknown, unknown, ReqBody>, res: Response) {
      const { sponsor, country } = req.query;

      const filter = { sponsor, countryCode: country };
      const query = new GetOngoingTrialsQuery<MappedTrial>(filter, mapper);
      const result = await handler.execute(query);

      res.status(200);
      res.send(result);
    },
  );

  return { getOngoingTrialsRouter };
}

type ReqBody = { sponsor?: string; country?: string };
