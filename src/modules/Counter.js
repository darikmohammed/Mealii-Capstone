class Counter {
  commentCounter = (comments) => {
    let commentCount = 0;
    if (!comments.error) {
      commentCount = comments.length;
    }
    return commentCount;
  };
}

module.exports = Counter;
