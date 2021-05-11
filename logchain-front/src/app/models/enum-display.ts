export class EnumDisplay {

  static readonly TABLE = new EnumDisplay('TABLE', 'TABLEAU');
  static readonly TIMELINE = new EnumDisplay('TIMELINE', 'TIMELINE');

  constructor(readonly code: string, readonly label: string) {}


}
