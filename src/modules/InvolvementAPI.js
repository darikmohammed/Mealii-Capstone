class InvolvementAPI {
  constructor() {
    this.baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
    this.APIid = 'AxlSVRjF4ReZv9RGWYte';
  }

  createComment = async (id, name, Addcomment) => {
    const response = await fetch(`${this.baseUrl}${this.APIid}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item_id: id,
        username: name,
        comment: Addcomment,
      }),
    });
    const post = await response.text();
    return post;
  };

  getComment = async (itemid) => {
    const response = await fetch(
      `${this.baseUrl}${this.APIid}/comments?item_id=${itemid}`
    );
    const comments = await response.json();
    return comments;
  };

  postLike = async (itemID) => {
    const response = await fetch(`${this.baseUrl}${this.APIid}/likes`, {
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
    const response = await fetch(`${this.baseUrl}${this.APIid}/likes`);
    const likes = await response.json();
    return likes;
  };
}

module.exports = InvolvementAPI;
