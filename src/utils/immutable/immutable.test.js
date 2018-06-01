import {expect} from 'chai';

import {setIn} from './index';

describe('utils - immutable', () => {
  describe('setIn', () => {
    it('should update the data at the given path', () => {
      const collection = [{}, {data: 'OLD'}];
      expect(setIn(collection, '[1].data', 'NEW')).to.eql([{}, {data: 'NEW'}]);
    });

    it('should handle an array for path', () => {
      const collection = [{}, {data: 'OLD'}];
      expect(setIn(collection, [1, 'data'], 'NEW')).to.eql([{}, {data: 'NEW'}]);
    });

    it('should not mutate', () => {
      const collection = [{}, {data: 'OLD'}];
      setIn(collection, '[1].data', 'NEW');
      expect(collection).to.equal(collection);
    });

    it('should accept a function for the 3rd argument which is called on the data at the path', () => {
      const collection = [{}, {data: 'OLD'}];
      expect(setIn(collection, '[1].data', d => d.toLowerCase())).to.eql([{}, {data: 'old'}]);
    });
  });
});
