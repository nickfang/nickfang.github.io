import { score } from '../greed-is-good';

describe('Scorer Function', function () {
  it('should value this as worthless', function () {
    expect(score([2, 3, 4, 6, 2])).toEqual(0); // 'Incorrect answer for dice = [2, 3, 4, 6, 2]');
  });

  it('should value this triplet correctly', function () {
    expect(score([4, 4, 4, 3, 3])).toEqual(400); //, 'Incorrect answer for dice = [4, 4, 4, 3, 3]');
  });

  it('should value this mixed set correctly', function () {
    expect(score([2, 4, 4, 5, 4])).toEqual(450); //, 'Incorrect answer for dice = [2, 4, 4, 5, 4]');
  });
});
