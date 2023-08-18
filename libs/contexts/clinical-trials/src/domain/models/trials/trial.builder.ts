import { Trial } from './trial.value-object';

export class TrialBuilder {
  private name = 'Triple Negative Breast Cancer';
  private country = 'ES';
  private startDate = '2018-06-13';
  private endDate = '2023-07-17';
  private sponsor = 'Sanofi';
  private isCanceled = false;
  private studyType = 'interventional';
  private primaryPurpose = 'treatment';

  public named(name: string) {
    this.name = name;
    return this;
  }

  public starts(startDate: string) {
    this.startDate = startDate;
    return this;
  }

  public ends(endDate: string) {
    this.endDate = endDate;
    return this;
  }

  public canceled() {
    this.isCanceled = true;
    return this;
  }

  public sponsoredBy(sponsor: string) {
    this.sponsor = sponsor;
    return this;
  }

  public fromCountry(country: string) {
    this.country = country;
    return this;
  }

  public build(): Trial {
    return Trial.from({
      name: this.name,
      country: this.country,
      start_date: this.startDate,
      end_date: this.endDate,
      sponsor: this.sponsor,
      canceled: this.isCanceled,
      study_type: this.studyType,
      primary_purpose: this.primaryPurpose,
    });
  }
}
