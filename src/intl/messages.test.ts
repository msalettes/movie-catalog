import messages from '.';

describe('intl', () => {
  test('should have fr and en translations', () => {
    const keys = Object.keys(messages);
    expect(keys).toEqual(['en', 'fr']);
  });

  test('should have same keys', () => {
    const frKeys = Object.keys(messages.fr);
    const enKeys = Object.keys(messages.en);
    expect(frKeys).toEqual(enKeys);
  });
});
