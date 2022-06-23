class LikeMeal {
  constructor() {
    this.likeURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
    this.uniqueID = 'OQCl7yEXf4GxJhpasEHV';
  }

  postLike = async (itemID) => {
    const response = await fetch(`${this.likeurl} & ${this.uniqueID}/likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item_id: itemID }),
    });
    const post = await response.text();
    return post;
  };

  getLikes = async () => {
    const response = await fetch(`${this.likeurl} & ${this.uniqueID}/likes`);
    const likes = await response.json();
    return likes;
  };
}

module.exports = LikeMeal;
















const likeurl = '/';

const postLike = async (itemID) => {
  const response = await fetch(`${likeurl}/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item_id: itemID }),
  });
  const post = await response.text();
  return post;
};


export {
  postLike,
  getLikes,
};
