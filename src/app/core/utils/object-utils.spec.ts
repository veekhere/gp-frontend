import { ObjectUtils } from './object-utils';

const shortObj1 = {
  prop1: 'string',
  prop2: false,
};

const obj1 = {
  prop1: 'string',
  prop2: false,
  prop3: [
    {
      arrProp1: 'value1',
    },
    {
      arrProp2: 'value2',
    },
    {
      arrProp3: 'value3',
    },
  ],
};

describe('ObjectUtils', () => {
  describe('#removeNullFields', () => {
    it('should return null if got null', () => {
      expect(ObjectUtils.removeNullFields(null)).toBeNull();
    });
    it('should return null if got undefined', () => {
      expect(ObjectUtils.removeNullFields(undefined)).toBeNull();
    });
    it('should return same object if all properties have values', () => {
      expect(ObjectUtils.removeNullFields(shortObj1)).toEqual(shortObj1);
    });
    it('should return object with null fields', () => {
      const extendedObj1: any = {
        prop1: 'string',
        prop2: false,
        prop3: null,
        prop4: undefined,
      };
      expect(ObjectUtils.removeNullFields(extendedObj1)).toEqual(shortObj1);
    });
  });

  describe('#deepEquals', () => {
    it('should return true if both objects are null', () => {
      expect(ObjectUtils.deepEquals(null, null)).toBeTrue();
    });
    it('should return true if both objects are undefined', () => {
      expect(ObjectUtils.deepEquals(undefined, undefined)).toBeTrue();
    });
    it('should return true if first object is null and second is undefined', () => {
      expect(ObjectUtils.deepEquals(null, undefined)).toBeTrue();
    });
    it('should return true if first object is undefined and second is null', () => {
      expect(ObjectUtils.deepEquals(undefined, null)).toBeTrue();
    });
    it('should return true if first object exists and second is null', () => {
      expect(ObjectUtils.deepEquals(obj1, null)).toBeFalse();
    });
    it('should return true if first object is null and second exists', () => {
      expect(ObjectUtils.deepEquals(null, obj1)).toBeFalse();
    });
    it('should return true if first object exists and second is undefined', () => {
      expect(ObjectUtils.deepEquals(obj1, undefined)).toBeFalse();
    });
    it('should return true if first object is undefined and second exists', () => {
      expect(ObjectUtils.deepEquals(undefined, obj1)).toBeFalse();
    });
    it('should return true if object compares with itself', () => {
      expect(ObjectUtils.deepEquals(obj1, obj1)).toBeTrue();
    });
    it('should return true is objects are same', () => {
      const obj2: any = {
        ...obj1,
      };
      expect(ObjectUtils.deepEquals(obj1, obj2)).toBeTrue();
    });
    it('should return true is objects are not same', () => {
      const obj2: any = {
        ...obj1,
        prop2: 'diff',
      };
      expect(ObjectUtils.deepEquals(obj1, obj2)).toBeFalse();
    });
  });
});
