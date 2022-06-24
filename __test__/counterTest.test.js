import Counter from '../src/modules/Counter.js';

const counter = new Counter();

describe('Testing the comment counter', () => {
  test('comment counting test.', () => {
    const comments = [
      {
        username: 'Yohanna',
        comment: 'This food looks delicious.',
        creation_date: '2022-06-23',
      },
      {
        username: 'Yohanna',
        comment: 'This food looks delicious.',
        creation_date: '2022-06-23',
      },
      {
        username: 'Yohanna',
        comment: 'This food looks delicious.',
        creation_date: '2022-06-23',
      },
    ];
    expect(counter.commentCounter(comments)).toBe(3);
  });

  test('no comment counting test', () => {
    const comments = {
      error: {
        status: 400,
        message: "'item_id' not found.",
      },
    };
    expect(counter.commentCounter(comments)).toBe(0);
  });
});
