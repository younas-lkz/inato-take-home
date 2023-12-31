import { beforeEach, describe, expect, test } from 'vitest';

import { GetOngoingTrials } from '../../../application/query/get-ongoing-trials.interface';
import { SpyLogger } from '../../gateway/logger/spy.gateway';
import { nameCountryStringTrialMapper } from '../../mapper/name-country-string.mapper';
import { makeGetOngoingTrialsCommander } from './commander';

describe('Get Ongoing Trials Commander', () => {
  let handler: GetOngoingTrials<string>;
  let logger: SpyLogger;
  const ongoingTrials = [
    'Neratinib +/- Fulvestrant in HER2+, ER+ Metastatic Breast Cancer, Germany',
    'Atezolizumab + Stereotactic Radiation in Triple-negative Breast Cancer and Brain Metastasis, Austria',
  ];

  beforeEach(() => {
    handler = { execute: async () => ongoingTrials };
    logger = new SpyLogger();
  });

  test('Should display on stdout the list of ongoing trials', async () => {
    const command = makeGetOngoingTrialsCommander(handler, nameCountryStringTrialMapper, logger, [
      'node',
      './scriptName',
      '--country=ES',
    ]);
    command();
    await waitCommandExecution();
    expect(logger.logs).toEqual(ongoingTrials);
  });
});

function waitCommandExecution() {
  return new Promise(setImmediate);
}
