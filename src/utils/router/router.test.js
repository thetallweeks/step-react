import {expect} from 'chai';
import router from './index';

describe('router', () => {
  describe('ensureValidSearch', () => {
    it('should add "?" to the beginning of the search', () => {
      expect(router.ensureValidSearch('q=somevalue')).to.equal('?q=somevalue');
    });

    it('should not add "?" if already present', () => {
      expect(router.ensureValidSearch('?q=somevalue')).to.equal('?q=somevalue');
    });
  });

  describe('parsePanelArgString', () => {
    it('should convert an argString to an object', function () {
      const argString = 'version=ESV!ref=Exod.3';
      expect(router.parseArgString(argString)).to.eql({
        version: 'ESV',
        ref: 'Exod.3'
      });
    });
  });

  describe('parseSearch', () => {
    it('should handle multiple panels', () => {
      const search = '?p0=ref=Gen.13&p1=ref=Exod.4';
      expect(router.parseSearch(search)).to.eql({
        p0: {
          ref: 'Gen.13'
        },
        p1: {
          ref: 'Exod.4'
        }
      });
    });

    it('should handle many keys', () => {
      const search = '?p0=ref=Gen.13!version=ESV&p1=ref=Exod.4';
      expect(router.parseSearch(search)).to.eql({
        p0: {
          ref: 'Gen.13',
          version: 'ESV'
        },
        p1: {
          ref: 'Exod.4'
        }
      });
    });
  });

  describe('stringifySearch', () => {
    it('should handle multiple panels', () => {
      const parsedSearch = {
        p0: {
          ref: 'Gen.13'
        },
        p1: {
          ref: 'Exod.4'
        }
      };
      expect(router.stringifySearch(parsedSearch)).to.equal('?p0=ref=Gen.13&p1=ref=Exod.4');
    });

    it('should handle many keys', () => {
      const parsedSearch = {
        p0: {
          ref: 'Gen.13',
          version: 'ESV'
        },
        p1: {
          ref: 'Exod.4'
        }
      };
      expect(router.stringifySearch(parsedSearch)).to.equal('?p0=ref=Gen.13!version=ESV&p1=ref=Exod.4');
    });
  });

  describe('getUpdatedUrlForPanel', () => {
    it('should handle updating only the panel indicated', () => {
      const search = '?p0=ref=Gen.13!version=ESV&p1=ref=Exod.4';
      const data = {osisId: 'Lev.1'};
      expect(router.getUpdatedUrlForPanel(search, data, 0)).to.equal('?p0=ref=Lev.1!version=ESV&p1=ref=Exod.4');
    });
  });
});
